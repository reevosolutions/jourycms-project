import { model, models, Schema } from 'mongoose';
import fuzzySearching from 'mongoose-fuzzy-searching';
import { ensureIndexes } from '../../../utilities/helpers/mogodb.helpers';
import { _ItemTagsSchemaFields, _ItemUpdateSchemaFields, _UserSnapshotSchemaFields } from './../../../common/models/snapshots.model';
import { trackUsedFieldsDBMiddleware } from './../../../utilities/data/db/optimization.utilities';

type _Entity = Levelup.CMS.V1.Auth.Entity.Role;
type _Model = Levelup.CMS.V1.Auth.Model.Role;
type _Document = Levelup.CMS.V1.Auth.Model.RoleDocument;

const EmbeddedObjects: {
  insights: Record<keyof _Entity['insights'], unknown>;
} = {
  insights: {
    user_count: { type: Number, default: 0 }
  }
};

const RoleSchemaFields: Record<keyof Omit<_Entity, '_id' | 'created_at' | 'updated_at'>, unknown> = {
  /**
   * Inherited from ICreatable
   */
  app: { type: String, required: true },
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
  /**
   * Inherited from IHasSearchMeta
   */
  search_meta: { type: String },

  /**
   * Specific to Entity
   */
  is_system: { type: Boolean, default: false },
  name: { type: String, required: true },
  description: { type: String },
  insights: EmbeddedObjects.insights,
  has_all_permissions: { type: Boolean, default: false },
  permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission', default: null }],
  is_company_related: { type: Boolean, default: true }
};
const RoleSchema = new Schema<_Document>(RoleSchemaFields, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Apply the middleware to the schema before any `find` operation
RoleSchema.pre('find', trackUsedFieldsDBMiddleware);
RoleSchema.pre('findOne', trackUsedFieldsDBMiddleware);
RoleSchema.pre('findOneAndUpdate', trackUsedFieldsDBMiddleware);

RoleSchema.plugin(fuzzySearching, {
  fields: [
    {
      name: 'search_meta'
    }
  ]
});

/* -------------------------- Start Schema Indexes -------------------------- */
RoleSchema.index({ app: 1, company: 1, name: 1, is_deleted: 1, deleted_at: 1 }, { unique: true });
/* --------------------------- End Schema Indexes --------------------------- */

const Role: _Model = models?.Role || model<_Document>('Role', RoleSchema);

// EXPORTS
export { Role, RoleSchema, RoleSchemaFields };

/**
 * Ensure indexes
 */
ensureIndexes(Role);
