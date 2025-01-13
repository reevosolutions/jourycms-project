/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 06-03-2024 05:30:31
 * @description This file is used to build mongoose model
 */

import { model, models, Schema } from "mongoose";
import fuzzySearching from "mongoose-fuzzy-searching";
import {
  _FileAttributeSchemaFields,
  _ItemTagsSchemaFields,
  _ItemUpdateSchemaFields,
  _UserSnapshotSchemaFields,
} from "../../../common/models/snapshots.model";
import { trackUsedFieldsDBMiddleware } from "../../../utilities/data/db/optimization.utilities";
import { ensureIndexes } from "../../../utilities/helpers/mogodb.helpers";

/**
 * Aliasing the typings for the Article entity and model.
 */
type _Entity = Levelup.CMS.V1.Content.Entity.Article;
type _Model = Levelup.CMS.V1.Content.Model.Article;
type _Document = Levelup.CMS.V1.Content.Model.ArticleDocument;
type StrictSchemaDefinition<
  T = undefined,
  EnforcedDocType = any,
> = Levelup.CMS.V1.Utils.Mongodb.StrictSchemaDefinition<T, EnforcedDocType>;
type DeepStrictSchemaDefinition<T = undefined> =
  Levelup.CMS.V1.Utils.Mongodb.DeepStrictSchemaDefinition<T>;

/**
 * Represents the embedded objects of the ArticleSchema.
 */
const EmbeddedObjects: DeepStrictSchemaDefinition<
  Pick<_Entity, "attributes" | "snapshots" | "insights">
> = {
  attributes: {
    type: {
      google_index_requested: { type: Boolean, default: false },
    },
    _id: false, // Disable _id for this subdocument
  },
  snapshots: {
    type: {
      created_by: {
        type: _UserSnapshotSchemaFields,
        default: null,
      },
    },
    _id: false, // Disable _id for this subdocument
  },
  insights: {
    type: {
      comment_count: { type: Number, default: 0 },
      vote_count: { type: Number, default: 0 },
      vote_value: { type: Number, default: 0 },
      view_count: { type: Number, default: 0 },
    },
    _id: false, // Disable _id for this subdocument
  },
};

/**
 * Represents the fields of the Article Schema.
 */
const ArticleSchemaFields: DeepStrictSchemaDefinition<
  Omit<_Entity, "_id" | "created_at" | "updated_at">
> = {
  /**
   * Inherited from ICreatable
   */
  app: { type: String, required: false, default: null },
  company: { type: String, default: null },
  created_by: { type: Schema.Types.String, required: false, default: null },
  created_by_original_user: {
    type: _UserSnapshotSchemaFields,
    default: null,
  },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date, default: null },
  tags: _ItemTagsSchemaFields,
  updates: [_ItemUpdateSchemaFields],
  /**
   * Inherited from IHasSearchMeta
   */
  search_meta: { type: String },

  /**
   * Inject the embedded objects
   */
  ...EmbeddedObjects,

  /**
   * Specific to Entity
   */
  is_published: { type: Boolean, default: false },
  published_at: { type: Date, default: null },
  slug: { type: String },
  //
  body: { type: String },
  body_unformatted: { type: String },
  body_structured: { type: Schema.Types.Mixed },

  title: { type: String },
  _type: { type: String, default: "base", },
  is_featured: { type: Boolean, default: false },
  featured_image: {
    type: _FileAttributeSchemaFields,
    default: null,
    _id: false, // Disable _id for this subdocument
  },
  article_type: {
    type: Schema.Types.ObjectId as any,
    ref: "ArticleType",
    required: true,
  },
  meta_fields: {
    type: Schema.Types.Mixed as any,
    index: true,
    default: {},
    _id: false, // Disable _id for this subdocument
  },

  related_tags: [
    {
      _id: { type: Schema.Types.ObjectId as any, ref: "Tag" },
      taxonomy: { type: Schema.Types.ObjectId as any, ref: "Tag" },
      name: { type: String },
      slug: { type: String },
    },
  ],
};

/**
 * The Mongoose schema for the Article model.
 *
 * @remarks
 * This schema defines the fields and their types for the Article model.
 *
 */
const ArticleSchema = new Schema<_Document>(ArticleSchemaFields, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

// Apply the middleware to the schema before any `find` operation
ArticleSchema.pre("find", trackUsedFieldsDBMiddleware);
ArticleSchema.pre("findOne", trackUsedFieldsDBMiddleware);
ArticleSchema.pre("findOneAndUpdate", trackUsedFieldsDBMiddleware);

/**
 * The Mongoose fuzzy search plugin for the ArticleSchema.
 */
ArticleSchema.plugin(fuzzySearching, {
  fields: [
    {
      name: "search_meta",
    },
  ],
});
ArticleSchema.index({ app: 1, slug: 1 }, { unique: true });
ArticleSchema.index({ is_featured: -1, created_at: -1, is_deleted: 1 });
ArticleSchema.index({ is_featured: -1, updated_at: -1, is_deleted: 1 });
/**
 * The Mongoose model for the Article model.
 *
 * @remarks
 * This model is used to perform CRUD operations on the Article model.
 *
 */
const Article: _Model =
  models?.Article || model<_Document>("Article", ArticleSchema);

/**
 * The Article model and its associated Schema.
 */
export { Article, ArticleSchema, ArticleSchemaFields };

/**
 * Ensure indexes
 */
ensureIndexes(Article);
