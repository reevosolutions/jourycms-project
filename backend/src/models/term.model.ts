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
 * Aliasing the typings for the Term entity and model.
 */
type _Entity = Levelup.V2.Cm.Entity.Term;
type _Model = Levelup.V2.Cm.Model.Term;
type _Document = Levelup.V2.Cm.Model.TermDocument;
type StrictSchemaDefinition<T = undefined, EnforcedDocType = any> = Levelup.V2.Utils.Mongodb.StrictSchemaDefinition<
  T,
  EnforcedDocType
>;
type DeepStrictSchemaDefinition<T = undefined> = Levelup.V2.Utils.Mongodb.DeepStrictSchemaDefinition<T>;

/**
 * Represents the embedded objects of the TermSchema.
 */
const EmbeddedObjects: DeepStrictSchemaDefinition<Pick<_Entity, 'insights' | 'snapshots'>> = {
  snapshots: {
    type: {
      created_by: {
        type: _UserSnapshotSchemaFields,
        default: null
      },
      taxonomy: {
        type: {
          _id: { type: Schema.Types.ObjectId as any, ref: 'Taxonomy' },
          slug: { type: String },
          name: { type: String },
          is_hierarchical: { type: Boolean, default: false },
          is_multi: { type: Boolean, default: false }
        },
        default: null,
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
 * Represents the fields of the Term Schema.
 */
const TermSchemaFields: StrictSchemaDefinition<Omit<_Entity, '_id' | 'created_at' | 'updated_at'>> = {
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
  taxonomy: { type: Schema.Types.ObjectId as any, ref: 'Taxonomy', required: true },
  parent: { type: Schema.Types.ObjectId as any, ref: 'Term' },
  children: [{ type: Schema.Types.ObjectId as any, ref: 'Term' }],
  slug: { type: String },
  name: { type: String },
  //
  description: { type: String },
  description_unformatted: { type: String },
  description_structured: { type: Schema.Types.Mixed }
};

/**
 * The Mongoose schema for the Term model.
 *
 * @remarks
 * This schema defines the fields and their types for the Term model.
 *
 */
const TermSchema = new Schema<_Document>(TermSchemaFields, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Apply the middleware to the schema before any `find` operation
TermSchema.pre('find', trackUsedFieldsDBMiddleware);
TermSchema.pre('findOne', trackUsedFieldsDBMiddleware);
TermSchema.pre('findOneAndUpdate', trackUsedFieldsDBMiddleware);

/**
 * The Mongoose fuzzy search plugin for the TermSchema.
 */
TermSchema.plugin(fuzzySearching, {
  fields: [
    {
      name: 'search_meta'
    }
  ]
});

/**
 * The Mongoose model for the Term model.
 *
 * @remarks
 * This model is used to perform CRUD operations on the Term model.
 *
 */
const Term: _Model = models?.Term || model<_Document>('Term', TermSchema);

/**
 * The Term model and its associated Schema.
 */
export { Term, TermSchema, TermSchemaFields };

/**
 * Ensure indexes
 */
ensureIndexes(Term);
