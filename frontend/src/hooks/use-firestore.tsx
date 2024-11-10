"use client";

import FirestoreContext, {
  FirestoreContextProps,
} from "@hooks/context/firestore.context";
import FirebaseManager from "@lib/firebase-manager";
import initLogger, { LoggerContext } from "@lib/logging";
import { Firestore } from "firebase/firestore/lite";
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
  const [, setDatabase] = useState<Firestore | null>(null);

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
      setDatabase(db || null);
    } catch (error) {
      logger.error("Firestore initFirebase error", error);
      return;
    }
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {}, []);

  useEffect(() => {
    initFirebase()
      .then(() => {
        logger.success("initialized");
      })
      .catch(error => {
        logger.error("error", error);
      });
  }, [initFirebase]);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return {};
};

export const useFirestore = () => {
  return useContext(FirestoreContext);
};
