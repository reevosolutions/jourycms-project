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
exports.ArticleSchemaFields = exports.ArticleSchema = exports.Article = void 0;
const mongoose_1 = require("mongoose");
const mongoose_fuzzy_searching_1 = __importDefault(require("mongoose-fuzzy-searching"));
const snapshots_model_1 = require("../../../common/models/snapshots.model");
const optimization_utilities_1 = require("../../../utilities/data/db/optimization.utilities");
const mogodb_helpers_1 = require("../../../utilities/helpers/mogodb.helpers");
/**
 * Represents the embedded objects of the ArticleSchema.
 */
const EmbeddedObjects = {
    attributes: {
        type: {
            google_index_requested: { type: Boolean, default: false }
        },
        _id: false // Disable _id for this subdocument
    },
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
            comment_count: { type: Number, default: 0 },
            vote_count: { type: Number, default: 0 },
            vote_value: { type: Number, default: 0 },
            view_count: { type: Number, default: 0 }
        },
        _id: false // Disable _id for this subdocument
    }
};
/**
 * Represents the fields of the Article Schema.
 */
const ArticleSchemaFields = Object.assign(Object.assign({ 
    /**
     * Inherited from ICreatable
     */
    app: { type: String, required: false, default: null }, company: { type: String, default: null }, created_by: { type: mongoose_1.Schema.Types.String, required: false, default: null }, created_by_original_user: {
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
    is_published: { type: Boolean, default: false }, published_at: { type: Date, default: null }, slug: { type: String }, 
    //
    body: { type: String }, body_unformatted: { type: String }, body_structured: { type: mongoose_1.Schema.Types.Mixed }, title: { type: String }, _type: { type: String, default: 'base' }, is_featured: { type: Boolean, default: false }, featured_image: {
        type: snapshots_model_1._FileAttributeSchemaFields,
        default: null,
        _id: false // Disable _id for this subdocument
    }, article_type: { type: mongoose_1.Schema.Types.ObjectId, ref: 'ArticleType', required: true }, meta_fields: {
        type: mongoose_1.Schema.Types.Mixed,
        index: true,
        default: {},
        _id: false // Disable _id for this subdocument
    }, related_tags: [
        {
            _id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Tag' },
            taxonomy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Tag' },
            name: { type: String },
            slug: { type: String }
        }
    ] });
exports.ArticleSchemaFields = ArticleSchemaFields;
/**
 * The Mongoose schema for the Article model.
 *
 * @remarks
 * This schema defines the fields and their types for the Article model.
 *
 */
const ArticleSchema = new mongoose_1.Schema(ArticleSchemaFields, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
exports.ArticleSchema = ArticleSchema;
// Apply the middleware to the schema before any `find` operation
ArticleSchema.pre('find', optimization_utilities_1.trackUsedFieldsDBMiddleware);
ArticleSchema.pre('findOne', optimization_utilities_1.trackUsedFieldsDBMiddleware);
ArticleSchema.pre('findOneAndUpdate', optimization_utilities_1.trackUsedFieldsDBMiddleware);
/**
 * The Mongoose fuzzy search plugin for the ArticleSchema.
 */
ArticleSchema.plugin(mongoose_fuzzy_searching_1.default, {
    fields: [
        {
            name: 'search_meta'
        }
    ]
});
ArticleSchema.index({ app: 1, slug: 1 }, { unique: true });
/**
 * The Mongoose model for the Article model.
 *
 * @remarks
 * This model is used to perform CRUD operations on the Article model.
 *
 */
const Article = (mongoose_1.models === null || mongoose_1.models === void 0 ? void 0 : mongoose_1.models.Article) || (0, mongoose_1.model)('Article', ArticleSchema);
exports.Article = Article;
/**
 * Ensure indexes
 */
(0, mogodb_helpers_1.ensureIndexes)(Article);
//# sourceMappingURL=article.model.js.map