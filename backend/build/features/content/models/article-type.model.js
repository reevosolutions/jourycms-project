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
exports.ArticleTypeSchemaFields = exports.ArticleTypeSchema = exports.ArticleType = void 0;
const mongoose_1 = require("mongoose");
const mongoose_fuzzy_searching_1 = __importDefault(require("mongoose-fuzzy-searching"));
const snapshots_model_1 = require("../../../common/models/snapshots.model");
const optimization_utilities_1 = require("../../../utilities/data/db/optimization.utilities");
const mogodb_helpers_1 = require("../../../utilities/helpers/mogodb.helpers");
/**
 * Represents the embedded objects of the ArticleTypeSchema.
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
    },
    insights: {
        type: {
            article_count: { type: Number, default: 0 }
        },
        _id: false // Disable _id for this subdocument
    }
};
/**
 * Represents the fields of the ArticleType Schema.
 */
const ArticleTypeSchemaFields = Object.assign(Object.assign({ 
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
    description: { type: String }, description_unformatted: { type: String }, description_structured: { type: mongoose_1.Schema.Types.Mixed }, custom_meta_fields: [new mongoose_1.Schema({
            field_key: { type: String },
            field_label: { type: String },
            field_type: { type: String },
            field_options: { type: mongoose_1.Schema.Types.Mixed },
        })], related_taxonomies: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Taxonomy' }], labels: {
        type: {
            singular: { type: String },
            plural: { type: String },
            list: { type: String },
            create: { type: String },
            edit: { type: String },
            delete: { type: String },
        },
        _id: false
    } });
exports.ArticleTypeSchemaFields = ArticleTypeSchemaFields;
/**
 * The Mongoose schema for the ArticleType model.
 *
 * @remarks
 * This schema defines the fields and their types for the ArticleType model.
 *
 */
const ArticleTypeSchema = new mongoose_1.Schema(ArticleTypeSchemaFields, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
exports.ArticleTypeSchema = ArticleTypeSchema;
// Apply the middleware to the schema before any `find` operation
ArticleTypeSchema.pre('find', optimization_utilities_1.trackUsedFieldsDBMiddleware);
ArticleTypeSchema.pre('findOne', optimization_utilities_1.trackUsedFieldsDBMiddleware);
ArticleTypeSchema.pre('findOneAndUpdate', optimization_utilities_1.trackUsedFieldsDBMiddleware);
/**
* The Mongoose fuzzy search plugin for the ArticleTypeSchema.
*/
ArticleTypeSchema.plugin(mongoose_fuzzy_searching_1.default, {
    fields: [
        {
            name: 'search_meta',
        },
    ]
});
/**
 * The Mongoose model for the ArticleType model.
 *
 * @remarks
 * This model is used to perform CRUD operations on the ArticleType model.
 *
 */
const ArticleType = (mongoose_1.models === null || mongoose_1.models === void 0 ? void 0 : mongoose_1.models.ArticleType) || (0, mongoose_1.model)('ArticleType', ArticleTypeSchema);
exports.ArticleType = ArticleType;
/**
 * Ensure indexes
 */
(0, mogodb_helpers_1.ensureIndexes)(ArticleType);
//# sourceMappingURL=article-type.model.js.map