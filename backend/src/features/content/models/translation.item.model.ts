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
 * Aliasing the typings for the TranslationItem entity and model.
 */
type _Entity = Levelup.CMS.V1.Content.Translation.Entity.Item;
type _Model = Levelup.CMS.V1.Content.Translation.Model.Item;
type _Document = Levelup.CMS.V1.Content.Translation.Model.ItemDocument;
type StrictSchemaDefinition<T = undefined, EnforcedDocType = any> = Levelup.CMS.V1.Utils.Mongodb.StrictSchemaDefinition<T, EnforcedDocType>;
type DeepStrictSchemaDefinition<T = undefined> = Levelup.CMS.V1.Utils.Mongodb.DeepStrictSchemaDefinition<T>;




/**
 * Represents the fields of the TranslationItem Schema.
 */
const TranslationItemSchemaFields: StrictSchemaDefinition<Omit<_Entity, '_id' | 'created_at' | 'updated_at'>> = {
  /**
   * Inherited from ICreatable
   */
  app: { type: String, required: true },
  company: { type: String, default: null },
  created_by: { type: Schema.Types.String },
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
   * Specific to Entity
   */
  key: { type: String, required: true },
  project: { type: Schema.Types.ObjectId as any, ref: 'TranslationProject', required: true },
  namespace: { type: String, required: true },
  comments: [{
    content: { type: String },
    user: { type: _UserSnapshotSchemaFields, default: null },
  }],
  is_new: { type: Boolean, default: true },
  translations: [{
    language: { type: String, required: true },
    translation: { type: String, required: true },
    date: { type: Date, default: Date.now },
    is_auto_translated: { type: Boolean, default: false },
    is_approved: { type: Boolean, default: false },
    updated_by: { type: _UserSnapshotSchemaFields, default: null },
    approved_by: { type: _UserSnapshotSchemaFields, default: null },
    comments: [{
      content: { type: String },
      user: { type: _UserSnapshotSchemaFields, default: null },
      date: { type: Date, default: Date.now },
    }],
    update_history: [{
      translation: { type: String, required: true },
      date: { type: Date, default: Date.now },
      updated_by: { type: _UserSnapshotSchemaFields, default: null },
      comments: [{
        content: { type: String },
        user: { type: _UserSnapshotSchemaFields, default: null },
      }],
      auto_translated: { type: Boolean, default: false },
    }]
  }]
};


/**
 * The Mongoose schema for the TranslationItem model.
 *
 * @remarks
 * This schema defines the fields and their types for the TranslationItem model.
 *
 */
const TranslationItemSchema = new Schema<_Document>(TranslationItemSchemaFields, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Apply the middleware to the schema before any `find` operation
TranslationItemSchema.pre('find', trackUsedFieldsDBMiddleware);
TranslationItemSchema.pre('findOne', trackUsedFieldsDBMiddleware);
TranslationItemSchema.pre('findOneAndUpdate', trackUsedFieldsDBMiddleware);


/**
* The Mongoose fuzzy search plugin for the TranslationItemSchema.
*/
TranslationItemSchema.plugin(fuzzySearching, {
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
const TranslationItem: _Model = models?.TranslationItem || model<_Document>('TranslationItem', TranslationItemSchema);



/**
 * The TranslationItem model and its associated Schema.
 */
export { TranslationItem, TranslationItemSchema, TranslationItemSchemaFields };


/**
 * Ensure indexes
 */
ensureIndexes(TranslationItem);
