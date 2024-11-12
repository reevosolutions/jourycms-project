/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 06-03-2024 05:30:31
 * @description This file is used to build mongoose model
 */
import { model, models, Schema } from 'mongoose';
import fuzzySearching from 'mongoose-fuzzy-searching';
import { _FileAttributeSchemaFields, _ItemTagsSchemaFields, _ItemUpdateSchemaFields, _UserSnapshotSchemaFields } from "../../../common/models/snapshots.model";
import { trackUsedFieldsDBMiddleware } from '../../../utilities/data/db/optimization.utilities';
import { ensureIndexes } from '../../../utilities/helpers/mogodb.helpers';
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
                type: _UserSnapshotSchemaFields,
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
    app: { type: String, required: false, default: null }, company: { type: String, default: null }, created_by: { type: Schema.Types.String, required: false, default: null }, created_by_original_user: {
        type: _UserSnapshotSchemaFields,
        default: null
    }, is_deleted: { type: Boolean, default: false }, deleted_at: { type: Date, default: null }, tags: _ItemTagsSchemaFields, updates: [_ItemUpdateSchemaFields], 
    /**
     * Inherited from IHasSearchMeta
    */
    search_meta: { type: String } }, EmbeddedObjects), { 
    /**
     * Specific to Entity
    */
    is_published: { type: Boolean, default: false }, published_at: { type: Date, default: null }, slug: { type: String }, 
    //
    body: { type: String }, body_unformatted: { type: String }, body_structured: { type: Schema.Types.Mixed }, title: { type: String }, _type: { type: String, default: 'base' }, is_featured: { type: Boolean, default: false }, featured_image: {
        type: _FileAttributeSchemaFields,
        default: null,
        _id: false // Disable _id for this subdocument
    }, article_type: { type: Schema.Types.ObjectId, ref: 'ArticleType', required: true }, meta_fields: {
        type: Schema.Types.Mixed,
        index: true,
        default: {},
        _id: false // Disable _id for this subdocument
    }, related_tags: [
        {
            _id: { type: Schema.Types.ObjectId, ref: 'Tag' },
            taxonomy: { type: Schema.Types.ObjectId, ref: 'Tag' },
            name: { type: String },
            slug: { type: String }
        }
    ] });
/**
 * The Mongoose schema for the Article model.
 *
 * @remarks
 * This schema defines the fields and their types for the Article model.
 *
 */
const ArticleSchema = new Schema(ArticleSchemaFields, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
// Apply the middleware to the schema before any `find` operation
ArticleSchema.pre('find', trackUsedFieldsDBMiddleware);
ArticleSchema.pre('findOne', trackUsedFieldsDBMiddleware);
ArticleSchema.pre('findOneAndUpdate', trackUsedFieldsDBMiddleware);
/**
 * The Mongoose fuzzy search plugin for the ArticleSchema.
 */
ArticleSchema.plugin(fuzzySearching, {
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
const Article = (models === null || models === void 0 ? void 0 : models.Article) || model('Article', ArticleSchema);
/**
 * The Article model and its associated Schema.
 */
export { Article, ArticleSchema, ArticleSchemaFields };
/**
 * Ensure indexes
 */
ensureIndexes(Article);
//# sourceMappingURL=article.model.js.map