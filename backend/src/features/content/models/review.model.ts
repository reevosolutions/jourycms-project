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
 * Aliasing the typings for the Review entity and model.
 */
type _Entity = Levelup.CMS.V1.Content.Entity.Review;
type _Model = Levelup.CMS.V1.Content.Model.Review;
type _Document = Levelup.CMS.V1.Content.Model.ReviewDocument;
type StrictSchemaDefinition<T = undefined, EnforcedDocType = any> = Levelup.CMS.V1.Utils.Mongodb.StrictSchemaDefinition<T, EnforcedDocType>;
type DeepStrictSchemaDefinition<T = undefined> = Levelup.CMS.V1.Utils.Mongodb.DeepStrictSchemaDefinition<T>;


/**
 * Represents the embedded objects of the ReviewSchema.
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
 * Represents the fields of the Review Schema.
 */
const ReviewSchemaFields: StrictSchemaDefinition<Omit<_Entity, '_id' | 'created_at' | 'updated_at'>> = {
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
  article: { type: Schema.Types.ObjectId as any, ref: 'Article', required: true },
  slug: { type: String },

  // 
  body: { type: String },
  body_unformatted: { type: String },
  body_structured: { type: Schema.Types.Mixed },
  
  value: { type: Number, default: 0 },
};


/**
 * The Mongoose schema for the Review model.
 *
 * @remarks
 * This schema defines the fields and their types for the Review model.
 *
 */
const ReviewSchema = new Schema<_Document>(ReviewSchemaFields, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Apply the middleware to the schema before any `find` operation
ReviewSchema.pre('find', trackUsedFieldsDBMiddleware);
ReviewSchema.pre('findOne', trackUsedFieldsDBMiddleware);
ReviewSchema.pre('findOneAndUpdate', trackUsedFieldsDBMiddleware);


/**
* The Mongoose fuzzy search plugin for the ReviewSchema.
*/
ReviewSchema.plugin(fuzzySearching, {
  fields: [
    {
      name: 'search_meta',
    },
  ]
});

/**
 * The Mongoose model for the Review model.
 *
 * @remarks
 * This model is used to perform CRUD operations on the Review model.
 *
 */
const Review: _Model = models?.Review ||  model<_Document>('Review', ReviewSchema);


  
/**
 * The Review model and its associated Schema.
 */
export { Review, ReviewSchema, ReviewSchemaFields };


/**
 * Ensure indexes
 */
ensureIndexes(Review);
