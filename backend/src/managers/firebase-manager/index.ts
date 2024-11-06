import { Message } from "firebase-admin/lib/messaging/messaging-api";
import fs from "fs";
import { last } from "lodash";
import moment from "moment";
import path from "path";
import { RedisClientType } from "redis";
import { Service } from "typedi";
import exceptions from "../../exceptions";
import BaseService from "../../common/base.service";
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
