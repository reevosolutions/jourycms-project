import { Model, Schema, model, models } from 'mongoose';
import fuzzySearching from 'mongoose-fuzzy-searching';
import {
  _FileAttributeSchemaFields,
  _ItemTagsSchemaFields,
  _ItemUpdateSchemaFields,
  _UserSnapshotSchemaFields,
  _AddressSchemaFields
} from '../../../common/models/snapshots.model';
import { trackUsedFieldsDBMiddleware } from '../../../utilities/data/db/optimization.utilities';
import { ensureIndexes } from '../../../utilities/helpers/mogodb.helpers';

/**
 * Aliasing the typings for the Ticket entity and model.
 */
type _Entity = Levelup.CMS.V1.Users.Entity.User;
type _Model = Levelup.CMS.V1.Users.Model.User;
type _Document = Levelup.CMS.V1.Users.Model.UserDocument;
type StrictSchemaDefinition<T = undefined, EnforcedDocType = any> = Levelup.CMS.V1.Utils.Mongodb.StrictSchemaDefinition<
  T,
  EnforcedDocType
>;
type DeepStrictSchemaDefinition<T = undefined> = Levelup.CMS.V1.Utils.Mongodb.DeepStrictSchemaDefinition<T>;

const EmbeddedObjects: DeepStrictSchemaDefinition<
  Pick<_Entity, 'preferences' | 'profile' | 'attributes' | 'snapshots' | 'insights' | 'auth_meta'>
> = {
  preferences: {
    ui_mode: { type: String, default: 'light' },
    ui_language: { type: String, default: 'en' },
    printer_format: { type: String, default: 'A4' }
  },
  profile: {
    full_name: { type: String },
    first_name: { type: String },
    family_name: { type: String },
    sex: { type: String, default: null },
    photo: {
      type: _FileAttributeSchemaFields,
      default: null,
      _id: false // Disable _id for this subdocument
    },
    phones: [{ type: String }],
    website: { type: String },
    address: {
      type: _AddressSchemaFields,
      default: null,
      _id: false // Disable _id for this subdocument
    },
    social_links: {
      type: [{
        type: {
          network: String,
          url: { type: String, default: null },
        }
      }],
      _id: false
    }
  },
  attributes: {
    is_suspended: { type: Boolean, default: false },
    is_approved: { type: Boolean, default: true },
    is_active: { type: Boolean, default: true },
    inactive_since: { type: Date, default: null },

    nid: { type: String, default: null },
    started_at: { type: Date, default: null },
    related_article: { type: Schema.Types.ObjectId as any, ref: 'Article', default: null },

  },
  snapshots: {

  },
  insights: {
    last_updated: { type: Date, default: new Date() },
    rating: { type: Number, default: 0 }
  },
  auth_meta: {
    last_login: { type: Date, default: new Date() },
    last_logout: { type: Date, default: new Date() },
    last_password_change: { type: Date, default: new Date() },
    last_password_reset: { type: Date, default: new Date() },
    last_password_reset_request: { type: Date, default: new Date() },
    password_reset_token: { type: String, default: null },
    password_reset_token_expiration: { type: Date, default: new Date() },
    password_reset_token_used: { type: Boolean, default: false },
    password_reset_token_used_at: { type: Date, default: new Date() }
  }
};

const UserSchemaFields: StrictSchemaDefinition<Omit<_Entity, '_id' | 'created_at' | 'updated_at'>, unknown> = {
  /**
   * inherited from ICreatable
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
  /**
   * inherited from IHasSearchMeta
   */
  search_meta: { type: String },

  ...EmbeddedObjects,
  /**
   * specific to ExportItem
   */
  tracking_id: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  role: { type: String, default: 'user' },
  permissions: [{ type: Schema.Types.ObjectId }],
  permissions_other_than_role: { type: Boolean, default: false }
};
const UserSchema = new Schema<_Document>(UserSchemaFields, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

// Apply the middleware to the schema before any `find` operation
UserSchema.pre('find', trackUsedFieldsDBMiddleware);
UserSchema.pre('findOne', trackUsedFieldsDBMiddleware);
UserSchema.pre('findOneAndUpdate', trackUsedFieldsDBMiddleware);

UserSchema.index({
  is_deleted: 1,
  created_at: -1
});

UserSchema.plugin(fuzzySearching, {
  fields: [
    {
      name: 'search_meta'
    }
  ]
});

const User: _Model = models?.User || model<_Document>('User', UserSchema);

/**
 * Exports
 */
export { User, UserSchema, UserSchemaFields };

/**
 * Ensure indexes
 */
ensureIndexes(User as any);
