/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 06-03-2024 05:30:31
 * @description This file is used to build mongoose model
 */

import { model, models, Schema } from 'mongoose';
import fuzzySearching from 'mongoose-fuzzy-searching';
import {
  _FileAttributeSchemaFields,
  _ItemTagsSchemaFields,
  _ItemUpdateSchemaFields,
  _UserSnapshotSchemaFields
} from "../../../common/models/snapshots.model";
import { trackUsedFieldsDBMiddleware } from '../../../utilities/data/db/optimization.utilities';
import { ensureIndexes } from '../../../utilities/helpers/mogodb.helpers';

/**
 * Aliasing the typings for the FormEntry entity and model.
 */
type _Entity = Levelup.CMS.V1.Content.Entity.FormEntry;
type _Model = Levelup.CMS.V1.Content.Model.FormEntry;
type _Document = Levelup.CMS.V1.Content.Model.FormEntryDocument;
type StrictSchemaDefinition<T = undefined, EnforcedDocType = any> = Levelup.CMS.V1.Utils.Mongodb.StrictSchemaDefinition<
  T,
  EnforcedDocType
>;
type DeepStrictSchemaDefinition<T = undefined> = Levelup.CMS.V1.Utils.Mongodb.DeepStrictSchemaDefinition<T>;

/**
 * Represents the embedded objects of the FormEntrySchema.
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
  },
};

/**
 * Represents the fields of the FormEntry Schema.
 */
const FormEntrySchemaFields: DeepStrictSchemaDefinition<
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
  slug: { type: String },

  //

  form: { type: Schema.Types.ObjectId as any, ref: "Form", required: true },
  data: {
    type: Schema.Types.Mixed as any,
    index: true,
    default: {},
    _id: false, // Disable _id for this subdocument
  },
};

/**
 * The Mongoose schema for the FormEntry model.
 *
 * @remarks
 * This schema defines the fields and their types for the FormEntry model.
 *
 */
const FormEntrySchema = new Schema<_Document>(FormEntrySchemaFields, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Apply the middleware to the schema before any `find` operation
FormEntrySchema.pre('find', trackUsedFieldsDBMiddleware);
FormEntrySchema.pre('findOne', trackUsedFieldsDBMiddleware);
FormEntrySchema.pre('findOneAndUpdate', trackUsedFieldsDBMiddleware);

/**
 * The Mongoose fuzzy search plugin for the FormEntrySchema.
 */
FormEntrySchema.plugin(fuzzySearching, {
  fields: [
    {
      name: 'search_meta'
    }
  ]
});
FormEntrySchema.index({ app: 1, slug: 1 }, { unique: true });
/**
 * The Mongoose model for the FormEntry model.
 *
 * @remarks
 * This model is used to perform CRUD operations on the FormEntry model.
 *
 */
const FormEntry: _Model = models?.FormEntry || model<_Document>('FormEntry', FormEntrySchema);

/**
 * The FormEntry model and its associated Schema.
 */
export { FormEntry, FormEntrySchema, FormEntrySchemaFields };

/**
 * Ensure indexes
 */
ensureIndexes(FormEntry);
