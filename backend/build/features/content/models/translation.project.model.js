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
exports.TranslationProjectSchemaFields = exports.TranslationProjectSchema = exports.TranslationProject = void 0;
const mongoose_1 = require("mongoose");
const mongoose_fuzzy_searching_1 = __importDefault(require("mongoose-fuzzy-searching"));
const optimization_utilities_1 = require("../../../utilities/data/db/optimization.utilities");
const mogodb_helpers_1 = require("../../../utilities/helpers/mogodb.helpers");
const snapshots_model_1 = require("../../../common/models/snapshots.model");
/**
 * Represents the fields of the TranslationProject Schema.
 */
const TranslationProjectSchemaFields = {
    /**
     * Inherited from ICreatable
     */
    app: { type: String, required: false, default: null },
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
    name: { type: String, required: true },
    description: { type: String, default: null },
    languages: { type: [String], default: [] },
    default_language: { type: String, default: null },
};
exports.TranslationProjectSchemaFields = TranslationProjectSchemaFields;
/**
 * The Mongoose schema for the TranslationProject model.
 *
 * @remarks
 * This schema defines the fields and their types for the TranslationProject model.
 *
 */
const TranslationProjectSchema = new mongoose_1.Schema(TranslationProjectSchemaFields, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
exports.TranslationProjectSchema = TranslationProjectSchema;
// Apply the middleware to the schema before any `find` operation
TranslationProjectSchema.pre('find', optimization_utilities_1.trackUsedFieldsDBMiddleware);
TranslationProjectSchema.pre('findOne', optimization_utilities_1.trackUsedFieldsDBMiddleware);
TranslationProjectSchema.pre('findOneAndUpdate', optimization_utilities_1.trackUsedFieldsDBMiddleware);
/**
* The Mongoose fuzzy search plugin for the TranslationProjectSchema.
*/
TranslationProjectSchema.plugin(mongoose_fuzzy_searching_1.default, {
    fields: [
        {
            name: 'search_meta',
        },
    ]
});
/* -------------------------- Start Schema Indexes -------------------------- */
TranslationProjectSchema.index({ app: 1, name: 1, is_deleted: 1, deleted_at: 1 }, { unique: true });
/* --------------------------- End Schema Indexes --------------------------- */
/**
 * The Mongoose model for the TranslationProject model.
 *
 * @remarks
 * This model is used to perform CRUD operations on the TranslationProject model.
 *
 */
const TranslationProject = (mongoose_1.models === null || mongoose_1.models === void 0 ? void 0 : mongoose_1.models.TranslationProject) || (0, mongoose_1.model)('TranslationProject', TranslationProjectSchema);
exports.TranslationProject = TranslationProject;
/**
 * Ensure indexes
 */
(0, mogodb_helpers_1.ensureIndexes)(TranslationProject);
//# sourceMappingURL=translation.project.model.js.map