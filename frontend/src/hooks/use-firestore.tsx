"use client";

import FirestoreContext, {
  FirestoreContextProps,
} from "@hooks/context/firestore.context";
import FirebaseManager from "@lib/firebase-manager";
import initLogger, { LoggerContext } from "@lib/logging";
import {
  CollectionReference,
  FieldPath,
  Timestamp,
  WhereFilterOp,
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Firestore } from "firebase/firestore/lite";
import { debounce, last } from "lodash";
import moment from "moment";
import React, { useCallback, useContext, useEffect, useState } from "react";

const logger = initLogger(LoggerContext.HOOK, "useFirebase");

export const ProvideFirestore: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const value = useProvideFirestore();
  return (
    <FirestoreContext.Provider value={value}>
      {children}
    </FirestoreContext.Provider>
  );
};

const useProvideFirestore: () => FirestoreContextProps = () => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [db, setDb] = useState<Firestore | null>(null);

  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */
  const initFirebase = useCallback(async () => {
    try {
      logger.event("Firestore initializeFirebase");
      const firebaseManager = FirebaseManager.getInstance();
      const { messaging, db, auth, app } = firebaseManager.initializeFirebase();
      logger.value("Firestore firebase", {
        messaging,
        db,
        auth,
        app,
      });
      setDb(db || null);
    } catch (error) {
      logger.error("Firestore initFirebase error", error);
      return Promise.resolve();
    }
  }, []);

  const subscribeParcelsInStatus = useCallback(
    async (
      status: Levelup.V2.Shipping.Entity.TParcelStatus[],
      listener: (
        docs: Levelup.V2.Features.Firestore.ParcelDocument[],
      ) => void | PromiseLike<void>,
      filters: [string | FieldPath, WhereFilterOp, unknown][] = [],
      count: number = 10000,
    ) => {
      try {
        if (!db) {
          logger.error("Firestore DB not initialized");

          throw new Error("Firestore DB not initialized");
        }
        const coll = collection(
          db,
          "parcels",
        ) as CollectionReference<Levelup.V2.Features.Firestore.ParcelDocument>;

        const q = query(
          coll,
          ...[
            where("status", "in", status),
            ...filters
              .filter(f => f[2] !== undefined)
              .map(filter => where(...filter)),
            orderBy("date", "desc"),
            limit(count),
          ],
        );
        const unsubscribe = onSnapshot(
          q,
          querySnapshot => {
            let docs: Levelup.V2.Features.Firestore.ParcelDocument[] = [];
            listener(docs);
            const debounced = debounce(listener, 500, { maxWait: 3000 });

            logger.debug(
              "parcels in status: ",
              status.join(", "),
              filters,
              querySnapshot.docs.length,
            );
            docs = querySnapshot.docs.map(doc => doc.data());
            listener(docs);
            // querySnapshot.docChanges().forEach((change) => {
            // 	if (change.type === "added") {
            // 		const doc = change.doc.data();
            // 		console.log("Firestore New parcel: ", doc);
            // 		docs = [...docs, doc];
            // 	}
            // 	if (change.type === "modified") {
            // 		const doc = change.doc.data();
            // 		console.log("Firestore Modified parcel: ");
            // 		docs = docs.map((d) =>
            // 			d.tracking_id === doc.tracking_id ? doc : d
            // 		);
            // 	}
            // 	if (change.type === "removed") {
            // 		const doc = change.doc.data();
            // 		console.log("Firestore Removed parcel: ", change.doc.data());
            // 		docs = docs.filter((d) => d.tracking_id !== doc.tracking_id);
            // 	}
            // 	listener(docs);
            // });
          },
          error => {
            logger.error(error.message, error);
            throw error;
          },
        );
        return unsubscribe;
      } catch (error: any) {
        logger.error(error.message, error);
      }
    },
    [db],
  );

  const mapParcelToFirestoreDocument = useCallback(
    (
      parcel: Levelup.V2.Shipping.Entity.Parcel,
    ): Levelup.V2.Features.Firestore.ParcelDocument => {
      const ls = last(parcel.status_history);
      const doc: Levelup.V2.Features.Firestore.ParcelDocument = {
        tracking_id: parcel.tracking_id || "",
        parent_tracking_id: parcel.parent_tracking || "",
        sac_tracking_id: ls?.sac || "",
        store: parcel.attributes?.store || "",
        company: parcel.attributes?.store || "",
        //
        starting_state: parcel.starting_address?.state_code
          ? parcel.starting_address?.state_code
          : parcel.attributes?.starting_state || "",
        current_state: parcel.current_address?.state_code || "",
        destination_state: parcel.destination_address?.state_code || "",
        destination_city: parcel.destination_address?.city_code || "",
        starting_office: parcel.attributes?.starting_office || "",
        current_office: parcel.attributes?.current_office || "",
        destination_office: parcel.attributes?.destination_office || "",

        deliverer: parcel.attributes?.last_deliverer || "",
        date: Timestamp.fromDate(moment(parcel.last_status_date).toDate()),

        type: parcel.type || "",
        sub_type: parcel.sub_type || "",
        shipment_to: parcel.shipment_to || "",
        parent_shipment_to: parcel.parent_shipment_to || "",
        shipment_type: parcel.shipment_type || "",
        payment_status: parcel.fees?.payment_status || "",
        status: parcel.last_status || "",
        delivery_fees_payment_mode:
          parcel.fees?.delivery_fees_payment_mode || "by_customer",
      };

      return doc;
    },
    [],
  );

  const setFirestoreParcel = useCallback(
    async (parcel: Levelup.V2.Features.Firestore.ParcelDocument) => {
      try {
        if (!db) throw new Error("Firestore DB not initialized");
        const coll = collection(
          db,
          "parcels",
        ) as CollectionReference<Levelup.V2.Features.Firestore.ParcelDocument>;

        await setDoc(doc(db, "parcels", parcel.tracking_id), parcel);
      } catch (error: any) {
        logger.error(error.message, error);
      }
    },
    [db],
  );

  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {}, []);

  useEffect(() => {
    initFirebase()
      .then(() => {
        logger.success("initialized");
      })
      .catch(e => {
        logger.error("error", e);
      });
  }, [initFirebase]);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return {
    subscribeParcelsInStatus,
    mapParcelToFirestoreDocument,
    setFirestoreParcel,
  };
};

export const useFirestore = () => {
  return useContext(FirestoreContext);
};
