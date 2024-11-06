"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportItemSchemaFields = exports.ExportItemSchema = exports.ExportItem = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26 July 2000 👑
 * @since 30-04-2024 01:11:32
 */
const moment_1 = __importDefault(require("moment"));
const mongoose_1 = require("mongoose");
const mongoose_fuzzy_searching_1 = __importDefault(require("mongoose-fuzzy-searching"));
const mogodb_helpers_1 = require("../../../utilities/helpers/mogodb.helpers");
const snapshots_model_1 = require("./snapshots.model");
const optimization_utilities_1 = require("../../../utilities/data/db/optimization.utilities");
/**
 * Status History Item Schema
 */
const statusHistoryItemSchema = [
    {
        type: {
            date: { type: Date, default: Date.now },
            status: { type: String },
            reason: { type: String, default: null },
            duration: { type: Number, default: null },
            progress: { type: Number, default: null },
        },
        _id: false, // Disable _id for this subdocument
    },
];
/**
 * Represents the embedded objects of the OrderSchema.
 */
const EmbeddedObjects = {
    attributes: {
        type: {
            store: { type: String, default: null },
            office: { type: String, default: null },
        },
        _id: false, // Disable _id for this subdocument
    },
    snapshots: {
        type: {
            created_by: {
                type: snapshots_model_1._UserSnapshotSchemaFields,
                default: null,
                _id: false, // Disable _id for this subdocument
            },
            store: {
                type: snapshots_model_1._StoreSnapshotSchemaFields,
                default: null,
                _id: false, // Disable _id for this subdocument
            },
            office: {
                type: snapshots_model_1._OfficeSnapshotSchemaFields,
                default: null,
                _id: false, // Disable _id for this subdocument
            },
        },
        _id: false, // Disable _id for this subdocument
    },
};
const ExportItemSchemaFields = Object.assign(Object.assign({ 
    /**
     * inherited from ICreatable
     */
    app: { type: String, required: true }, company: { type: String, default: null }, created_by: { type: mongoose_1.Schema.Types.String, required: true }, created_by_original_user: {
        type: snapshots_model_1._UserSnapshotSchemaFields,
        default: null,
    }, is_deleted: { type: Boolean, default: false }, deleted_at: { type: Date, default: null }, tags: snapshots_model_1._ItemTagsSchemaFields, updates: [snapshots_model_1._ItemUpdateSchemaFields], 
    /**
     * inherited from IHasSearchMeta
     */
    search_meta: { type: String } }, EmbeddedObjects), { status_history: { type: statusHistoryItemSchema, _id: false }, 
    /**
     * specific to ExportItem
     */
    tracking_id: { type: String, required: true, unique: true }, entity: { type: String }, duration: { type: Number, default: 0 }, progress: { type: Number, default: 0 }, requested_item_count: { type: Number, default: 0 }, found_item_count: { type: Number, default: 0 }, last_status_date: { type: Date, default: new Date() }, last_status: { type: String, default: "processing" }, last_status_reason: { type: String, default: null }, fcm_token: { type: String }, labels: { type: mongoose_1.Schema.Types.Mixed, default: {} } });
exports.ExportItemSchemaFields = ExportItemSchemaFields;
const ExportItemSchema = new mongoose_1.Schema(ExportItemSchemaFields, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});
exports.ExportItemSchema = ExportItemSchema;
// Apply the middleware to the schema before any `find` operation
ExportItemSchema.pre("find", optimization_utilities_1.trackUsedFieldsDBMiddleware);
ExportItemSchema.pre("findOne", optimization_utilities_1.trackUsedFieldsDBMiddleware);
ExportItemSchema.pre("findOneAndUpdate", optimization_utilities_1.trackUsedFieldsDBMiddleware);
ExportItemSchema.plugin(mongoose_fuzzy_searching_1.default, {
    fields: [
        {
            name: "search_meta",
        },
    ],
});
ExportItemSchema.pre("save", async function (next) {
    const doc = this;
    for (let i = 0; i < doc.status_history.length; i++) {
        if (i > 0) {
            doc.status_history[i - 1].duration =
                (0, moment_1.default)(doc.status_history[i].date).unix() -
                    (0, moment_1.default)(doc.status_history[i - 1].date).unix();
        }
    }
    next();
});
const ExportItem = (mongoose_1.models === null || mongoose_1.models === void 0 ? void 0 : mongoose_1.models.ExportItem) || (0, mongoose_1.model)("ExportItem", ExportItemSchema);
exports.ExportItem = ExportItem;
/**
 * Ensure indexes
 */
(0, mogodb_helpers_1.ensureIndexes)(ExportItem);
//# sourceMappingURL=export-item.model.js.map