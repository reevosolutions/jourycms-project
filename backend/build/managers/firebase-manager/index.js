"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const typedi_1 = require("typedi");
const exceptions_1 = __importDefault(require("../../exceptions"));
const base_service_1 = __importDefault(require("../../common/base.service"));
const admin = require("firebase-admin");
let FirebaseManager = class FirebaseManager extends base_service_1.default {
    constructor() {
        super();
        this.EVENTS = {
            EXPORT_INITIALIZED: "EXPORT_INITIALIZED",
            EXPORT_IN_PROGRESS: "EXPORT_IN_PROGRESS",
            EXPORT_COMPLETED: "EXPORT_COMPLETED",
            EXPORT_FAILED: "EXPORT_FAILED",
        };
        this._initialized = false;
        this.init();
    }
    async init() {
        try {
            if (this._initialized)
                return;
            const serviceAccountFile = path_1.default.join(__dirname, `../../../firebase/serviceAccountKey.json`);
            if (!fs_1.default.existsSync(serviceAccountFile)) {
                throw new exceptions_1.default.InternalServerError("Google service account file does not exist at: " + serviceAccountFile);
            }
            const serviceAccount = require(serviceAccountFile);
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
            this.auth = admin.auth();
            this.db = admin.firestore();
            this.messaging = admin.messaging();
            this._initialized = true;
        }
        catch (error) {
            this.logger.error(error.message);
        }
    }
    async notify(message) {
        try {
            message.webpush;
            if (!this._initialized)
                throw new Error("Firebase service not initialized");
            else {
                this.messaging.send(message);
                // console.log(colors.magenta('NOTIFY'), message);
            }
        }
        catch (error) {
            this.logger.error(this.notify.name, error);
        }
    }
    async _deleteAllFromCollection(collectionName) {
        const collectionRef = this.db.collection(collectionName);
        const batchSize = 400; // Adjust batch size as needed
        let snapshot = await collectionRef.limit(batchSize).get();
        while (!snapshot.empty) {
            this.logger.event("Bulk deleting documents from collection", collectionName);
            const batch = this.db.batch();
            snapshot.docs.forEach((doc) => {
                batch.delete(doc.ref);
            });
            await batch.commit();
            snapshot = await collectionRef.limit(batchSize).get();
        }
        this.logger.error(`All documents deleted from collection: ${collectionName}`);
    }
};
FirebaseManager = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], FirebaseManager);
exports.default = FirebaseManager;
//# sourceMappingURL=index.js.map