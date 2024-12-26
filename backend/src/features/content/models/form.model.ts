/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 06-03-2024 05:30:31
 * @description This file is used to build mongoose model
 */

import { model, models, Schema } from "mongoose";
import fuzzySearching from "mongoose-fuzzy-searching";
import {
  _FileAttributeSchemaFields,
  _ItemTagsSchemaFields,
  _ItemUpdateSchemaFields,
  _UserSnapshotSchemaFields,
} from "../../../common/models/snapshots.model";
import { trackUsedFieldsDBMiddleware } from "../../../utilities/data/db/optimization.utilities";
import { ensureIndexes } from "../../../utilities/helpers/mogodb.helpers";

/**
 * Aliasing the typings for the Form entity and model.
 */
type _Entity = Levelup.CMS.V1.Content.Entity.Form;
type _Model = Levelup.CMS.V1.Content.Model.Form;
type _Document = Levelup.CMS.V1.Content.Model.FormDocument;
type StrictSchemaDefinition<
  T = undefined,
  EnforcedDocType = any,
> = Levelup.CMS.V1.Utils.Mongodb.StrictSchemaDefinition<T, EnforcedDocType>;
type DeepStrictSchemaDefinition<T = undefined> =
  Levelup.CMS.V1.Utils.Mongodb.DeepStrictSchemaDefinition<T>;

/**
 * Represents the embedded objects of the FormSchema.
 */
const EmbeddedObjects: DeepStrictSchemaDefinition<Pick<_Entity, "insights" | "snapshots" | "settings">> = {
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
      entry_count: { type: Number, default: 0 },
    },
    _id: false, // Disable _id for this subdocument
  },
  settings: {
    type: {
      has_reset_button: { type: Boolean, default: false },
      reset_button_label: { type: String, default: "Reset" },
      has_submit_button: { type: Boolean, default: true },
      submit_button_label: { type: String, default: "إرسال" },
      shown_fields_on_dashboard: { type: [String], default: [] },
    },
    _id: false, // Disable _id for this subdocument
  },
};

/**
 * Represents the fields of the Form Schema.
 */
const FormSchemaFields: DeepStrictSchemaDefinition<
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
  is_published: { type: Boolean, default: false },
  published_at: { type: Date, default: null },
  slug: { type: String },
  //
  description: { type: String },
  description_unformatted: { type: String },
  description_structured: { type: Schema.Types.Mixed },

  name: { type: String },
  fields: [
    new Schema(
      {
        field_key: { type: String },
        field_label: { type: String },
        field_type: { type: String },
        field_options: { type: Schema.Types.Mixed },
      },
      { _id: false }
    ),
  ],
};

/**
 * The Mongoose schema for the Form model.
 *
 * @remarks
 * This schema defines the fields and their types for the Form model.
 *
 */
const FormSchema = new Schema<_Document>(FormSchemaFields, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

// Apply the middleware to the schema before any `find` operation
FormSchema.pre("find", trackUsedFieldsDBMiddleware);
FormSchema.pre("findOne", trackUsedFieldsDBMiddleware);
FormSchema.pre("findOneAndUpdate", trackUsedFieldsDBMiddleware);

/**
 * The Mongoose fuzzy search plugin for the FormSchema.
 */
FormSchema.plugin(fuzzySearching, {
  fields: [
    {
      name: "search_meta",
    },
  ],
});
FormSchema.index({ app: 1, slug: 1 }, { unique: true });
/**
 * The Mongoose model for the Form model.
 *
 * @remarks
 * This model is used to perform CRUD operations on the Form model.
 *
 */
const Form: _Model = models?.Form || model<_Document>("Form", FormSchema);

/**
 * The Form model and its associated Schema.
 */
export { Form, FormSchema, FormSchemaFields };

/**
 * Ensure indexes
 */
ensureIndexes(Form);
