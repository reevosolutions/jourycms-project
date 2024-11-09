"use client";

import config from "@config/index";
import { firebaseConfig } from "@config/firebase.config";
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { enableIndexedDbPersistence, Firestore, getFirestore } from "firebase/firestore";

import { getMessaging, Messaging } from "firebase/messaging";
import initLogger, { LoggerContext, LoggerService } from "@lib/logging";

export default class FirebaseManager {
  private static instance: FirebaseManager;
  private logger: LoggerService;
  public app!: FirebaseApp;
  public auth!: Auth;
  public db!: Firestore;
  public messaging!: Messaging;
  public persistanceEnabled = false;

  public static getInstance() {
    if (!this.instance) this.instance = new FirebaseManager();
    return this.instance;
  }

  private constructor() {
    this.logger = initLogger(LoggerContext.SERVICE, this.constructor.name);
    this.init();
  }

  private async init() {
    // Initialize Firebase
    this.app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  }

  public initializeFirebase(initMessaging: boolean = true) {
    this.logger.value("Firebase apps", getApps());
    if (!this.app) {
      this.app = initializeApp(firebaseConfig);
      this.auth = getAuth(this.app);
      this.db = getFirestore(this.app);
      // const settings = {
      //   cache: IndexedDbLocalCache(),
      // };
      if (!this.persistanceEnabled && typeof window !== "undefined") {
        this.persistanceEnabled = true;
        enableIndexedDbPersistence(this.db)
          .then(() => {
            console.log("persistance enabled");
          })
          .catch((err) => {
            if (err.code == "failed-precondition") {
              // Multiple tabs open, persistence can only be enabled
              // in one tab at a a time.
              // ...
            } else if (err.code == "unimplemented") {
              // The current browser does not support all of the
              // features required to enable persistence
              // ...
            }
          });
      }
      if (initMessaging) this.messaging = getMessaging(this.app);
    } else {
      if (!this.auth) this.auth = getAuth(this.app);
      if (!this.db) {
        this.db = getFirestore(this.app);
        if (!this.persistanceEnabled && typeof window !== "undefined") {
          this.persistanceEnabled = true;
          enableIndexedDbPersistence(this.db)
            .then(() => {
              console.log("persistance enabled");
            })
            .catch((err) => {
              if (err.code == "failed-precondition") {
                // Multiple tabs open, persistence can only be enabled
                // in one tab at a a time.
                // ...
              } else if (err.code == "unimplemented") {
                // The current browser does not support all of the
                // features required to enable persistence
                // ...
              }
            });
        }
      }
      if (initMessaging && !this.messaging) {
        this.messaging = getMessaging(this.app);
      }
    }
    return {
      app: this.app,
      auth: this.auth,
      db: this.db,
      messaging: this.messaging,
    };
  }
}

// export { auth, db, messaging, app, initializeFirebase };
