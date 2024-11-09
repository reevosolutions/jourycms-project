/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 06-03-2024 05:30:31
 * @description This file is used to build mongoose model
 */

import { model, models, Schema } from 'mongoose';
import fuzzySearching from 'mongoose-fuzzy-searching';
import { ensureIndexes } from '../../../utilities/helpers/mogodb.helpers';
import {
  _ItemTagsSchemaFields,
  _ItemUpdateSchemaFields,
  _UserSnapshotSchemaFields
} from "../../../common/models/snapshots.model";
import { trackUsedFieldsDBMiddleware } from '../../../utilities/data/db/optimization.utilities';

/**
 * Aliasing the typings for the UploadedFile entity and model.
 */
type _Entity = Levelup.CMS.V1.Storage.Entity.UploadedFile;
type _Model = Levelup.CMS.V1.Storage.Model.UploadedFile;
type _Document = Levelup.CMS.V1.Storage.Model.UploadedFileDocument;
type StrictSchemaDefinition<T = undefined, EnforcedDocType = any> = Levelup.CMS.V1.Utils.Mongodb.StrictSchemaDefinition<
  T,
  EnforcedDocType
>;
type DeepStrictSchemaDefinition<T = undefined> = Levelup.CMS.V1.Utils.Mongodb.DeepStrictSchemaDefinition<T>;

/**
 * Represents the embedded objects of the UploadedFileSchema.
 */
const EmbeddedObjects: DeepStrictSchemaDefinition<Pick<_Entity, 'attributes' | 'snapshots'>> = {
  attributes: {
    store: { type: String, default: null }
  },
  snapshots: {

  }
};

/**
 * Represents the fields of the UploadedFile Schema.
 */
const UploadedFileSchemaFields: StrictSchemaDefinition<Omit<_Entity, '_id' | 'created_at' | 'updated_at'>> = {
  /**
   * Inherited from ICreatable
   */
  app: { type: String, default: null },
  company: { type: String, default: null },
  created_by: { type: Schema.Types.String, default: null },
  created_by_original_user: {
    type: _UserSnapshotSchemaFields,
    default: null
  },
  is_deleted: { type: Boolean, default: false },
  deleted_at: { type: Date, default: null },
  tags: _ItemTagsSchemaFields,
  updates: [_ItemUpdateSchemaFields],

  search_meta: { type: String },
  /**
   * Inject the embedded objects
   */
  ...EmbeddedObjects,

  /**
   * Specific to Entity
   */
  field_name: { type: String },
  original_name: { type: String, default: null },
  remote_url: { type: String, default: null, index: 1 },
  file_name: { type: String, default: null },
  file_path: { type: String, default: null },
  destination: { type: String, default: null },
  caption: { type: String, default: null },
  encoding: { type: String, default: null },
  mimetype: { type: String, default: null },
  size: { type: Number, default: null }
};

/**
 * The Mongoose schema for the UploadedFile model.
 *
 * @remarks
 * This schema defines the fields and their types for the UploadedFile model.
 *
 */
const UploadedFileSchema = new Schema<_Document>(UploadedFileSchemaFields, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Apply the middleware to the schema before any `find` operation
UploadedFileSchema.pre('find', trackUsedFieldsDBMiddleware);
UploadedFileSchema.pre('findOne', trackUsedFieldsDBMiddleware);
UploadedFileSchema.pre('findOneAndUpdate', trackUsedFieldsDBMiddleware);

/**
 * The Mongoose fuzzy search plugin for the UploadedFileSchema.
 */
UploadedFileSchema.plugin(fuzzySearching, {
  fields: [
    {
      name: 'search_meta'
    }
  ]
});

/**
 * The Mongoose model for the UploadedFile model.
 *
 * @remarks
 * This model is used to perform CRUD operations on the UploadedFile model.
 *
 */
const UploadedFile: _Model = models?.UploadedFile || model<_Document>('UploadedFile', UploadedFileSchema);

/**
 * The UploadedFile model and its associated Schema.
 */
export { UploadedFile, UploadedFileSchema, UploadedFileSchemaFields };

/**
 * Ensure indexes
 */
ensureIndexes(UploadedFile);
