/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 06-03-2024 05:30:31
 * @description This file is used to build mongoose model
 */


import { model, models, Schema } from 'mongoose';
import fuzzySearching from 'mongoose-fuzzy-searching';
import {
  _ItemTagsSchemaFields,
  _ItemUpdateSchemaFields,
  _UserSnapshotSchemaFields
} from "../../../common/models/snapshots.model";
import { trackUsedFieldsDBMiddleware } from '../../../utilities/data/db/optimization.utilities';
import { ensureIndexes } from '../../../utilities/helpers/mogodb.helpers';

/**
 * Aliasing the typings for the Comment entity and model.
 */
type _Entity = Levelup.CMS.V1.Content.Entity.Comment;
type _Model = Levelup.CMS.V1.Content.Model.Comment;
type _Document = Levelup.CMS.V1.Content.Model.CommentDocument;
type StrictSchemaDefinition<T = undefined, EnforcedDocType = any> = Levelup.CMS.V1.Utils.Mongodb.StrictSchemaDefinition<T, EnforcedDocType>;
type DeepStrictSchemaDefinition<T = undefined> = Levelup.CMS.V1.Utils.Mongodb.DeepStrictSchemaDefinition<T>;

/**
 * Represents the embedded objects of the CommentSchema.
 */
const EmbeddedObjects: DeepStrictSchemaDefinition<Pick<_Entity, 'snapshots'>> = {
  snapshots: {
    type: {
      created_by: {
        type: _UserSnapshotSchemaFields,
        default: null
      },
      article: {
        type: {
          _id: { type: Schema.Types.ObjectId as any, ref: 'Article', required: true },
          slug: { type: String, required: true },
          title: { type: String, required: true }
        },
        default: null,
        _id: false // Disable _id for this subdocument
      }
    },
    _id: false // Disable _id for this subdocument
  }
};



/**
 * Represents the fields of the Comment Schema.
 */
const CommentSchemaFields: StrictSchemaDefinition<Omit<_Entity, '_id' | 'created_at' | 'updated_at'>> = {
  /**
   * Inherited from ICreatable
   */
  app: { type: String, required: true },
  company: { type: String, default: null },
  created_by: { type: Schema.Types.String, required: true },
  created_by_original_user: {
    type: _UserSnapshotSchemaFields,
        default: null
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
  parent: { type: Schema.Types.ObjectId as any, ref: 'Comment', required: true },
  children: [{ type: Schema.Types.ObjectId as any, ref: 'Comment', required: true }],
  article: { type: Schema.Types.ObjectId as any, ref: 'Article', required: true },
  slug: { type: String },
  // 
  body: { type: String },
  body_unformatted: { type: String },
  body_structured: { type: Schema.Types.Mixed },
};


/**
 * The Mongoose schema for the Comment model.
 *
 * @remarks
 * This schema defines the fields and their types for the Comment model.
 *
 */
const CommentSchema = new Schema<_Document>(CommentSchemaFields, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Apply the middleware to the schema before any `find` operation
CommentSchema.pre('find', trackUsedFieldsDBMiddleware);
CommentSchema.pre('findOne', trackUsedFieldsDBMiddleware);
CommentSchema.pre('findOneAndUpdate', trackUsedFieldsDBMiddleware);


/**
* The Mongoose fuzzy search plugin for the CommentSchema.
*/
CommentSchema.plugin(fuzzySearching, {
  fields: [
    {
      name: 'search_meta',
    },
  ]
});

/**
 * The Mongoose model for the Comment model.
 *
 * @remarks
 * This model is used to perform CRUD operations on the Comment model.
 *
 */
const Comment: _Model = models?.Comment || model<_Document>('Comment', CommentSchema);



/**
 * The Comment model and its associated Schema.
 */
export { Comment, CommentSchema, CommentSchemaFields };


/**
 * Ensure indexes
 */
ensureIndexes(Comment);
