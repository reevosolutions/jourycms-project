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
exports.TaxonomySchemaFields = exports.TaxonomySchema = exports.Taxonomy = void 0;
const mongoose_1 = require("mongoose");
const mongoose_fuzzy_searching_1 = __importDefault(require("mongoose-fuzzy-searching"));
const snapshots_model_1 = require("../../../common/models/snapshots.model");
const optimization_utilities_1 = require("../../../utilities/data/db/optimization.utilities");
const mogodb_helpers_1 = require("../../../utilities/helpers/mogodb.helpers");
/**
 * Represents the embedded objects of the TaxonomySchema.
 */
const EmbeddedObjects = {
    snapshots: {
        type: {
            created_by: {
                type: snapshots_model_1._UserSnapshotSchemaFields,
                default: null
            }
        },
        _id: false // Disable _id for this subdocument
    }
};
/**
 * Represents the fields of the Taxonomy Schema.
 */
const TaxonomySchemaFields = Object.assign(Object.assign({ 
    /**
     * Inherited from ICreatable
     */
    app: { type: String, required: true }, company: { type: String, default: null }, created_by: { type: mongoose_1.Schema.Types.String, required: true }, created_by_original_user: {
        type: snapshots_model_1._UserSnapshotSchemaFields,
        default: null
    }, is_deleted: { type: Boolean, default: false }, deleted_at: { type: Date, default: null }, tags: snapshots_model_1._ItemTagsSchemaFields, updates: [snapshots_model_1._ItemUpdateSchemaFields], 
    /**
     * Inherited from IHasSearchMeta
     */
    search_meta: { type: String } }, EmbeddedObjects), { 
    /**
     * Specific to Entity
     */
    slug: { type: String }, name: { type: String }, 
    // 
    description: { type: String }, description_unformatted: { type: String }, description_structured: { type: mongoose_1.Schema.Types.Mixed }, 
    // hierarchy
    is_hierarchical: { type: Boolean, default: false }, is_multi: { type: Boolean, default: false }, labels: {
        type: {
            singular: String,
            plural: String,
            list: String,
            add: String,
            edit: String,
            delete: String,
        },
        _id: false
    } });
exports.TaxonomySchemaFields = TaxonomySchemaFields;
/**
 * The Mongoose schema for the Taxonomy model.
 *
 * @remarks
 * This schema defines the fields and their types for the Taxonomy model.
 *
 */
const TaxonomySchema = new mongoose_1.Schema(TaxonomySchemaFields, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
exports.TaxonomySchema = TaxonomySchema;
// Apply the middleware to the schema before any `find` operation
TaxonomySchema.pre('find', optimization_utilities_1.trackUsedFieldsDBMiddleware);
TaxonomySchema.pre('findOne', optimization_utilities_1.trackUsedFieldsDBMiddleware);
TaxonomySchema.pre('findOneAndUpdate', optimization_utilities_1.trackUsedFieldsDBMiddleware);
/**
* The Mongoose fuzzy search plugin for the TaxonomySchema.
*/
TaxonomySchema.plugin(mongoose_fuzzy_searching_1.default, {
    fields: [
        {
            name: 'search_meta',
        },
    ]
});
/* -------------------------- Start Schema Indexes -------------------------- */
TaxonomySchema.index({ app: 1, name: 1, is_deleted: 1, deleted_at: 1 }, { unique: true });
TaxonomySchema.index({ app: 1, slug: 1, is_deleted: 1, deleted_at: 1 }, { unique: true });
/* --------------------------- End Schema Indexes --------------------------- */
/**
 * The Mongoose model for the Taxonomy model.
 *
 * @remarks
 * This model is used to perform CRUD operations on the Taxonomy model.
 *
 */
const Taxonomy = (mongoose_1.models === null || mongoose_1.models === void 0 ? void 0 : mongoose_1.models.Taxonomy) || (0, mongoose_1.model)('Taxonomy', TaxonomySchema);
exports.Taxonomy = Taxonomy;
/**
 * Ensure indexes
 */
(0, mogodb_helpers_1.ensureIndexes)(Taxonomy);
//# sourceMappingURL=taxonomy.model.js.map