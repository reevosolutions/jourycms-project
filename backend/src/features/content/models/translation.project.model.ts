/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 06-03-2024 05:30:31
 * @description This file is used to build mongoose model
 */


import { model, models, Schema } from 'mongoose';
import fuzzySearching from 'mongoose-fuzzy-searching';
import { trackUsedFieldsDBMiddleware } from '../../../utilities/data/db/optimization.utilities';
import { ensureIndexes } from '../../../utilities/helpers/mogodb.helpers';
import {
  _ItemTagsSchemaFields,
  _ItemUpdateSchemaFields,
  _UserSnapshotSchemaFields
} from "../../../common/models/snapshots.model";

/**
 * Aliasing the typings for the TranslationProject entity and model.
 */
type _Entity = Levelup.CMS.V1.Content.Translation.Entity.Project;
type _Model = Levelup.CMS.V1.Content.Translation.Model.Project;
type _Document = Levelup.CMS.V1.Content.Translation.Model.ProjectDocument;
type StrictSchemaDefinition<T = undefined, EnforcedDocType = any> = Levelup.CMS.V1.Utils.Mongodb.StrictSchemaDefinition<T, EnforcedDocType>;
type DeepStrictSchemaDefinition<T = undefined> = Levelup.CMS.V1.Utils.Mongodb.DeepStrictSchemaDefinition<T>;



/**
 * Represents the fields of the TranslationProject Schema.
 */
const TranslationProjectSchemaFields: StrictSchemaDefinition<Omit<_Entity, '_id' | 'created_at' | 'updated_at'>> = {
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
  name: { type: String, required: true },
  description: { type: String, default: null },
  languages: { type: [String], default: [] },
  default_language: { type: String, default: null },

};


/**
 * The Mongoose schema for the TranslationProject model.
 *
 * @remarks
 * This schema defines the fields and their types for the TranslationProject model.
 *
 */
const TranslationProjectSchema = new Schema<_Document>(TranslationProjectSchemaFields, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Apply the middleware to the schema before any `find` operation
TranslationProjectSchema.pre('find', trackUsedFieldsDBMiddleware);
TranslationProjectSchema.pre('findOne', trackUsedFieldsDBMiddleware);
TranslationProjectSchema.pre('findOneAndUpdate', trackUsedFieldsDBMiddleware);


/**
* The Mongoose fuzzy search plugin for the TranslationProjectSchema.
*/
TranslationProjectSchema.plugin(fuzzySearching, {
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
const TranslationProject: _Model = models?.TranslationProject ||  model<_Document>('TranslationProject', TranslationProjectSchema);


  
/**
 * The TranslationProject model and its associated Schema.
 */
export { TranslationProject, TranslationProjectSchema, TranslationProjectSchemaFields };


/**
 * Ensure indexes
 */
ensureIndexes(TranslationProject);
