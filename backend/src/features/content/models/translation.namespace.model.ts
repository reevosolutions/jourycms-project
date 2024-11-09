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
 * Aliasing the typings for the TranslationNamespace entity and model.
 */
type _Entity = Levelup.CMS.V1.Content.Translation.Entity.Namespace;
type _Model = Levelup.CMS.V1.Content.Translation.Model.Namespace;
type _Document = Levelup.CMS.V1.Content.Translation.Model.NamespaceDocument;
type StrictSchemaDefinition<T = undefined, EnforcedDocType = any> = Levelup.CMS.V1.Utils.Mongodb.StrictSchemaDefinition<T, EnforcedDocType>;
type DeepStrictSchemaDefinition<T = undefined> = Levelup.CMS.V1.Utils.Mongodb.DeepStrictSchemaDefinition<T>;



/**
 * Represents the fields of the TranslationNamespace Schema.
 */
const TranslationNamespaceSchemaFields: StrictSchemaDefinition<Omit<_Entity, '_id' | 'created_at' | 'updated_at'>> = {
  /**
   * Inherited from ICreatable
   */
  app: { type: String, required: false, default: null },
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
  project: { type: Schema.Types.ObjectId as any, ref: 'TranslationProject', required: true },
  name: { type: String, required: true },
  description: { type: String, default: null },
  settings: {
    can_delete_translation_items: { type: Boolean, default: false },
  },
};



/**
 * The Mongoose schema for the TranslationNamespace model.
 *
 * @remarks
 * This schema defines the fields and their types for the TranslationNamespace model.
 *
 */
const TranslationNamespaceSchema = new Schema<_Document>(TranslationNamespaceSchemaFields, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Apply the middleware to the schema before any `find` operation
TranslationNamespaceSchema.pre('find', trackUsedFieldsDBMiddleware);
TranslationNamespaceSchema.pre('findOne', trackUsedFieldsDBMiddleware);
TranslationNamespaceSchema.pre('findOneAndUpdate', trackUsedFieldsDBMiddleware);


/**
* The Mongoose fuzzy search plugin for the TranslationNamespaceSchema.
*/
TranslationNamespaceSchema.plugin(fuzzySearching, {
  fields: [
    {
      name: 'search_meta',
    },
  ]
});

/* -------------------------- Start Schema Indexes -------------------------- */
TranslationNamespaceSchema.index(
  { app: 1, project: 1, name: 1, is_deleted: 1, deleted_at: 1 },
  { unique: true }
);
/* --------------------------- End Schema Indexes --------------------------- */


/**
 * The Mongoose model for the TranslationNamespace model.
 *
 * @remarks
 * This model is used to perform CRUD operations on the TranslationNamespace model.
 *
 */
const TranslationNamespace: _Model = models?.TranslationNamespace || model<_Document>('TranslationNamespace', TranslationNamespaceSchema);



/**
 * The TranslationNamespace model and its associated Schema.
 */
export { TranslationNamespace, TranslationNamespaceSchema, TranslationNamespaceSchemaFields };


/**
 * Ensure indexes
 */
ensureIndexes(TranslationNamespace);
