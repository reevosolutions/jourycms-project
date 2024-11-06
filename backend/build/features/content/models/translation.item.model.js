"use strict";
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 06-03-2024 05:30:31
 * @description This file is used to build mongoose model
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationItemSchemaFields = exports.TranslationItemSchema = exports.TranslationItem = void 0;
const mongoose_1 = require("mongoose");
const mongoose_fuzzy_searching_1 = __importDefault(require("mongoose-fuzzy-searching"));
const snapshots_model_1 = require("../../../common/models/snapshots.model");
const optimization_utilities_1 = require("../../../utilities/data/db/optimization.utilities");
const mogodb_helpers_1 = require("../../../utilities/helpers/mogodb.helpers");
/**
 * Represents the fields of the TranslationItem Schema.
 */
const TranslationItemSchemaFields = {
    /**
     * Inherited from ICreatable
     */
    app: { type: String, required: true },
    company: { type: String, default: null },
    created_by: { type: mongoose_1.Schema.Types.String },
    created_by_original_user: {
        type: snapshots_model_1._UserSnapshotSchemaFields,
        default: null
    },
    is_deleted: { type: Boolean, default: false },
    deleted_at: { type: Date, default: null },
    tags: snapshots_model_1._ItemTagsSchemaFields,
    updates: [snapshots_model_1._ItemUpdateSchemaFields],
    /**
     * Inherited from IHasSearchMeta
     */
    search_meta: { type: String },
    /**
     * Specific to Entity
     */
    key: { type: String, required: true },
    project: { type: mongoose_1.Schema.Types.ObjectId, ref: 'TranslationProject', required: true },
    namespace: { type: String, required: true },
    comments: [{
            content: { type: String },
            user: { type: snapshots_model_1._UserSnapshotSchemaFields, default: null },
        }],
    is_new: { type: Boolean, default: true },
    translations: [{
            language: { type: String, required: true },
            translation: { type: String, required: true },
            date: { type: Date, default: Date.now },
            is_auto_translated: { type: Boolean, default: false },
            is_approved: { type: Boolean, default: false },
            updated_by: { type: snapshots_model_1._UserSnapshotSchemaFields, default: null },
            approved_by: { type: snapshots_model_1._UserSnapshotSchemaFields, default: null },
            comments: [{
                    content: { type: String },
                    user: { type: snapshots_model_1._UserSnapshotSchemaFields, default: null },
                    date: { type: Date, default: Date.now },
                }],
            update_history: [{
                    translation: { type: String, required: true },
                    date: { type: Date, default: Date.now },
                    updated_by: { type: snapshots_model_1._UserSnapshotSchemaFields, default: null },
                    comments: [{
                            content: { type: String },
                            user: { type: snapshots_model_1._UserSnapshotSchemaFields, default: null },
                        }],
                    auto_translated: { type: Boolean, default: false },
                }]
        }]
};
exports.TranslationItemSchemaFields = TranslationItemSchemaFields;
/**
 * The Mongoose schema for the TranslationItem model.
 *
 * @remarks
 * This schema defines the fields and their types for the TranslationItem model.
 *
 */
const TranslationItemSchema = new mongoose_1.Schema(TranslationItemSchemaFields, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
exports.TranslationItemSchema = TranslationItemSchema;
// Apply the middleware to the schema before any `find` operation
TranslationItemSchema.pre('find', optimization_utilities_1.trackUsedFieldsDBMiddleware);
TranslationItemSchema.pre('findOne', optimization_utilities_1.trackUsedFieldsDBMiddleware);
TranslationItemSchema.pre('findOneAndUpdate', optimization_utilities_1.trackUsedFieldsDBMiddleware);
/**
* The Mongoose fuzzy search plugin for the TranslationItemSchema.
*/
TranslationItemSchema.plugin(mongoose_fuzzy_searching_1.default, {
    fields: [
        {
            name: 'search_meta',
        },
    ]
});
/* -------------------------- Start Schema Indexes -------------------------- */
TranslationItemSchema.index({ app: 1, project: 1, namespace: 1, key: 1, is_deleted: 1, deleted_at: 1 }, { unique: true });
/* --------------------------- End Schema Indexes --------------------------- */
/**
 * The Mongoose model for the TranslationItem model.
 *
 * @remarks
 * This model is used to perform CRUD operations on the TranslationItem model.
 *
 */
const TranslationItem = (mongoose_1.models === null || mongoose_1.models === void 0 ? void 0 : mongoose_1.models.TranslationItem) || (0, mongoose_1.model)('TranslationItem', TranslationItemSchema);
exports.TranslationItem = TranslationItem;
/**
 * Ensure indexes
 */
(0, mogodb_helpers_1.ensureIndexes)(TranslationItem);
//# sourceMappingURL=translation.item.model.js.map