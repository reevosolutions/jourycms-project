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
 * Aliasing the typings for the Taxonomy entity and model.
 */
type _Entity = Levelup.CMS.V1.Content.Entity.Taxonomy;
type _Model = Levelup.CMS.V1.Content.Model.Taxonomy;
type _Document = Levelup.CMS.V1.Content.Model.TaxonomyDocument;
type StrictSchemaDefinition<T = undefined, EnforcedDocType = any> = Levelup.CMS.V1.Utils.Mongodb.StrictSchemaDefinition<T, EnforcedDocType>;
type DeepStrictSchemaDefinition<T = undefined> = Levelup.CMS.V1.Utils.Mongodb.DeepStrictSchemaDefinition<T>;



/**
 * Represents the embedded objects of the TaxonomySchema.
 */
const EmbeddedObjects: DeepStrictSchemaDefinition<Pick<_Entity, 'snapshots'>> = {
  snapshots: {
    type: {
      created_by: {
        type: _UserSnapshotSchemaFields,
        default: null
      }
    },
    _id: false // Disable _id for this subdocument
  }
};



/**
 * Represents the fields of the Taxonomy Schema.
 */
const TaxonomySchemaFields: StrictSchemaDefinition<Omit<_Entity, '_id' | 'created_at' | 'updated_at'>> = {
  /**
   * Inherited from ICreatable
   */
  app: { type: String, required: false, default: null },
  company: { type: String, default: null },
  created_by: { type: Schema.Types.String, required: false, default: null },
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
  slug: { type: String },
  name: { type: String },
  // 
  description: { type: String },
  description_unformatted: { type: String },
  description_structured: { type: Schema.Types.Mixed },
  // hierarchy
  is_hierarchical: { type: Boolean, default: false },
  is_multi: { type: Boolean, default: false },
  labels: {
    type: {
      singular: String,
      plural: String,
      list: String,
      add: String,
      edit: String,
      delete: String,
    },
    _id: false
  }
};


/**
 * The Mongoose schema for the Taxonomy model.
 *
 * @remarks
 * This schema defines the fields and their types for the Taxonomy model.
 *
 */
const TaxonomySchema = new Schema<_Document>(TaxonomySchemaFields, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Apply the middleware to the schema before any `find` operation
TaxonomySchema.pre('find', trackUsedFieldsDBMiddleware);
TaxonomySchema.pre('findOne', trackUsedFieldsDBMiddleware);
TaxonomySchema.pre('findOneAndUpdate', trackUsedFieldsDBMiddleware);


/**
* The Mongoose fuzzy search plugin for the TaxonomySchema.
*/
TaxonomySchema.plugin(fuzzySearching, {
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
const Taxonomy: _Model = models?.Taxonomy || model<_Document>('Taxonomy', TaxonomySchema);



/**
 * The Taxonomy model and its associated Schema.
 */
export { Taxonomy, TaxonomySchema, TaxonomySchemaFields };


/**
 * Ensure indexes
 */
ensureIndexes(Taxonomy);
