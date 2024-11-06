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
exports.TranslationNamespaceSchemaFields = exports.TranslationNamespaceSchema = exports.TranslationNamespace = void 0;
const mongoose_1 = require("mongoose");
const mongoose_fuzzy_searching_1 = __importDefault(require("mongoose-fuzzy-searching"));
const snapshots_model_1 = require("../../../common/models/snapshots.model");
const optimization_utilities_1 = require("../../../utilities/data/db/optimization.utilities");
const mogodb_helpers_1 = require("../../../utilities/helpers/mogodb.helpers");
/**
 * Represents the fields of the TranslationNamespace Schema.
 */
const TranslationNamespaceSchemaFields = {
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
    project: { type: mongoose_1.Schema.Types.ObjectId, ref: 'TranslationProject', required: true },
    name: { type: String, required: true },
    description: { type: String, default: null },
    settings: {
        can_delete_translation_items: { type: Boolean, default: false },
    },
};
exports.TranslationNamespaceSchemaFields = TranslationNamespaceSchemaFields;
/**
 * The Mongoose schema for the TranslationNamespace model.
 *
 * @remarks
 * This schema defines the fields and their types for the TranslationNamespace model.
 *
 */
const TranslationNamespaceSchema = new mongoose_1.Schema(TranslationNamespaceSchemaFields, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
exports.TranslationNamespaceSchema = TranslationNamespaceSchema;
// Apply the middleware to the schema before any `find` operation
TranslationNamespaceSchema.pre('find', optimization_utilities_1.trackUsedFieldsDBMiddleware);
TranslationNamespaceSchema.pre('findOne', optimization_utilities_1.trackUsedFieldsDBMiddleware);
TranslationNamespaceSchema.pre('findOneAndUpdate', optimization_utilities_1.trackUsedFieldsDBMiddleware);
/**
* The Mongoose fuzzy search plugin for the TranslationNamespaceSchema.
*/
TranslationNamespaceSchema.plugin(mongoose_fuzzy_searching_1.default, {
    fields: [
        {
            name: 'search_meta',
        },
    ]
});
/* -------------------------- Start Schema Indexes -------------------------- */
TranslationNamespaceSchema.index({ app: 1, project: 1, name: 1, is_deleted: 1, deleted_at: 1 }, { unique: true });
/* --------------------------- End Schema Indexes --------------------------- */
/**
 * The Mongoose model for the TranslationNamespace model.
 *
 * @remarks
 * This model is used to perform CRUD operations on the TranslationNamespace model.
 *
 */
const TranslationNamespace = (mongoose_1.models === null || mongoose_1.models === void 0 ? void 0 : mongoose_1.models.TranslationNamespace) || (0, mongoose_1.model)('TranslationNamespace', TranslationNamespaceSchema);
exports.TranslationNamespace = TranslationNamespace;
/**
 * Ensure indexes
 */
(0, mogodb_helpers_1.ensureIndexes)(TranslationNamespace);
//# sourceMappingURL=translation.namespace.model.js.map