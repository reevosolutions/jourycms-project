/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 06-03-2024 05:30:31
 * @description This file is used to build mongoose model
 */


import { model, models, Schema } from 'mongoose';
import fuzzySearching from 'mongoose-fuzzy-searching';
import { ensureIndexes } from '../utilities/helpers/mogodb.helpers';
import {
  _AccountLegalInfoSchemaFields,
  _AddressSchemaFields,
  _CompanySnapshotSchemaFields,
  _FileAttributeSchemaFields,
  _ItemTagsSchemaFields,
  _ItemUpdateSchemaFields,
  _LocationSchemaFields,
  _OfficeSnapshotSchemaFields,
  _StoreSnapshotSchemaFields,
  _UserSnapshotSchemaFields,
  _WarehouseSnapshotSchemaFields
} from "./snapshots.model";
import { trackUsedFieldsDBMiddleware } from '../utilities/data/db/optimization.utilities';

/**
 * Aliasing the typings for the ArticleType entity and model.
 */
type _Entity = Levelup.V2.Cm.Entity.ArticleType;
type _Model = Levelup.V2.Cm.Model.ArticleType;
type _Document = Levelup.V2.Cm.Model.ArticleTypeDocument;
type StrictSchemaDefinition<T = undefined, EnforcedDocType = any> = Levelup.V2.Utils.Mongodb.StrictSchemaDefinition<T, EnforcedDocType>;
type DeepStrictSchemaDefinition<T = undefined> = Levelup.V2.Utils.Mongodb.DeepStrictSchemaDefinition<T>;


/**
 * Represents the embedded objects of the ArticleTypeSchema.
 */
const EmbeddedObjects: DeepStrictSchemaDefinition<Pick<_Entity, 'insights' | 'snapshots'>> = {
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
      article_count: { type: Number, default: 0 }
    },
    _id: false // Disable _id for this subdocument
  }
};



/**
 * Represents the fields of the ArticleType Schema.
 */
const ArticleTypeSchemaFields: StrictSchemaDefinition<Omit<_Entity, '_id' | 'created_at' | 'updated_at'>> = {
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
  slug: { type: String },
  name: { type: String },
  // 
  description: { type: String },
  description_unformatted: { type: String },
  description_structured: { type: Schema.Types.Mixed },
  
  custom_meta_fields: [{ type: {
    field_key: { type: String },
    field_label: { type: String },
    field_type: { type: String },
    field_options: { type: Schema.Types.Mixed },
  } }],

  related_taxonomies: [{ type: Schema.Types.ObjectId as any, ref: 'Taxonomy' }],
  
  
};


/**
 * The Mongoose schema for the ArticleType model.
 *
 * @remarks
 * This schema defines the fields and their types for the ArticleType model.
 *
 */
const ArticleTypeSchema = new Schema<_Document>(ArticleTypeSchemaFields, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Apply the middleware to the schema before any `find` operation
ArticleTypeSchema.pre('find', trackUsedFieldsDBMiddleware);
ArticleTypeSchema.pre('findOne', trackUsedFieldsDBMiddleware);
ArticleTypeSchema.pre('findOneAndUpdate', trackUsedFieldsDBMiddleware);


/**
* The Mongoose fuzzy search plugin for the ArticleTypeSchema.
*/
ArticleTypeSchema.plugin(fuzzySearching, {
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
const ArticleType: _Model = models?.ArticleType ||  model<_Document>('ArticleType', ArticleTypeSchema);


  
/**
 * The ArticleType model and its associated Schema.
 */
export { ArticleType, ArticleTypeSchema, ArticleTypeSchemaFields };


/**
 * Ensure indexes
 */
ensureIndexes(ArticleType);
