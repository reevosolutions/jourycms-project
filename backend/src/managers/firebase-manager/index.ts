import { Message } from "firebase-admin/lib/messaging/messaging-api";
import fs from "fs";
import { last } from "lodash";
import moment from "moment";
import path from "path";
import { RedisClientType } from "redis";
import { Service } from "typedi";
import exceptions from "../../exceptions";
import BaseService from "../../services/base.service";
import admin = require("firebase-admin");

@Service()
export default class FirebaseManager extends BaseService {
  public EVENTS = {
    EXPORT_INITIALIZED: "EXPORT_INITIALIZED",
    EXPORT_IN_PROGRESS: "EXPORT_IN_PROGRESS",
    EXPORT_COMPLETED: "EXPORT_COMPLETED",
    EXPORT_FAILED: "EXPORT_FAILED",
  };

  private _initialized: boolean = false;
  private auth: admin.auth.Auth;
  private messaging: admin.messaging.Messaging;
  private db: admin.firestore.Firestore;

  public constructor() {
    super();
    this.init();
  }

  private async init(): Promise<RedisClientType> {
    try {
      if (this._initialized) return;
      const serviceAccountFile = path.join(
        __dirname,
        `../../../firebase/serviceAccountKey.json`
      );
      if (!fs.existsSync(serviceAccountFile)) {
        throw new exceptions.InternalServerError(
          "Google service account file does not exist at: " + serviceAccountFile
        );
      }

      const serviceAccount = require(serviceAccountFile);

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });

      this.auth = admin.auth();
      this.db = admin.firestore();
      this.messaging = admin.messaging();

      this._initialized = true;
    } catch (error) {
      this.logger.error(error.message);
    }
  }

  public async notify(message: Message) {
    try {
      message.webpush;
      if (!this._initialized)
        throw new Error("Firebase service not initialized");
      else {
        this.messaging.send(message);
        // console.log(colors.magenta('NOTIFY'), message);
      }
    } catch (error) {
      this.logger.error(this.notify.name, error);
    }
  }

  public mapParcelToFirestoreDocument(
    parcel: Levelup.V2.Shipping.Entity.Parcel
  ): Levelup.V2.Features.Firestore.ParcelDocument {
    const ls = last(parcel.status_history);
    const doc: Levelup.V2.Features.Firestore.ParcelDocument = {
      tracking_id: parcel.tracking_id || "",
      parent_tracking_id: parcel.parent_tracking || "",
      sac_tracking_id: ls?.sac || "",
      store: parcel.attributes?.store || "",
      company: parcel.company || "",
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
      date: admin.firestore.Timestamp.fromDate(
        moment(parcel.last_status_date).toDate()
      ),

      type: parcel.type || "",
      sub_type: parcel.sub_type || "",
      shipment_to: parcel.shipment_to || "",
      parent_shipment_to: parcel.parent_shipment_to || "",
      shipment_type: parcel.shipment_type || "",
      payment_status: parcel.fees?.payment_status || "",
      status: parcel.last_status || "",
      delivery_fees_payment_mode: parcel.fees?.delivery_fees_payment_mode,
    };

    return doc;
  }

  public async setParcel(parcel: Levelup.V2.Shipping.Entity.Parcel) {
    const doc = this.mapParcelToFirestoreDocument(parcel);
    // this.logger.tree("Setting parcel to firebase", doc);
    try {
      if (!this._initialized)
        throw new Error("Firebase service not initialized");
      else {
        const coll = this.db.collection(
          "parcels"
        ) as admin.firestore.CollectionReference<Levelup.V2.Features.Firestore.ParcelDocument>;

        await coll.doc(doc.tracking_id).set(doc);
        this.logger.success("Parcel set to firebase", doc.tracking_id);
      }
    } catch (error) {
      this.logger.error(`${this.setParcel.name}, ${error.message}`, error);
    }
  }

  public async changeParcelStatus(params: {
    tracking_id: string;
    sac_id: string;
    sac_tracking_id: string;
    deliverer: string;
    current_state: string;
    current_office: string;
    status: Levelup.V2.Shipping.Entity.TParcelStatus;
    payment_status?: Levelup.V2.Payment.Entity.TParcelPaymentStatus;
  }) {
    try {
      if (!this._initialized)
        throw new Error("Firebase service not initialized");
      else {
        const coll = this.db.collection(
          "parcels"
        ) as admin.firestore.CollectionReference<Levelup.V2.Features.Firestore.ParcelDocument>;

        const updateObject: Partial<Levelup.V2.Features.Firestore.ParcelDocument> =
          {
            sac_tracking_id: params.sac_tracking_id,
            deliverer: params.deliverer,
            current_state: params.current_state,
            current_office: params.current_office,
            status: params.status,
            date: admin.firestore.Timestamp.fromDate(moment().toDate()),
          };
        if (params.payment_status)
          updateObject.payment_status = params.payment_status;
        await coll.doc(params.tracking_id).update(updateObject);
      }
    } catch (error) {
      this.logger.error(this.changeParcelStatus.name, error.message);
    }
  }

  public async deleteParcel(tracking_id: string) {
    try {
      if (!this._initialized)
        throw new Error("Firebase service not initialized");
      else {
        const coll = this.db.collection(
          "parcels"
        ) as admin.firestore.CollectionReference<Levelup.V2.Features.Firestore.ParcelDocument>;

        await coll.doc(tracking_id).delete();
      }
    } catch (error) {
      this.logger.error(this.deleteParcel.name, error.message);
    }
  }

  public async resetParcelCollection() {
    try {
      if (!this._initialized)
        throw new Error("Firebase service not initialized");
      else {
        await this._deleteAllFromCollection("parcels");
      }
    } catch (error) {
      this.logger.error(this.resetParcelCollection.name, error.message);
    }
  }

  private async _deleteAllFromCollection(collectionName: string) {
    const collectionRef = this.db.collection(collectionName);
    const batchSize = 400; // Adjust batch size as needed

    let snapshot = await collectionRef.limit(batchSize).get();
    while (!snapshot.empty) {
      this.logger.event(
        "Bulk deleting documents from collection",
        collectionName
      );
      const batch = this.db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      snapshot = await collectionRef.limit(batchSize).get();
    }
    this.logger.error(
      `All documents deleted from collection: ${collectionName}`
    );
  }
}
