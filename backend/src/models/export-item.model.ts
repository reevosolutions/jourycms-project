/* eslint-disable @typescript-eslint/no-this-alias */
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26 July 2000 👑
 * @since 30-04-2024 01:11:32
 */
import moment from "moment";
import { model, models, Schema } from "mongoose";
import fuzzySearching from "mongoose-fuzzy-searching";
import { ensureIndexes } from "../utilities/helpers/mogodb.helpers";
import {
  _ItemTagsSchemaFields,
  _ItemUpdateSchemaFields,
  _OfficeSnapshotSchemaFields,
  _StoreSnapshotSchemaFields,
  _UserSnapshotSchemaFields,
} from "./snapshots.model";
import { trackUsedFieldsDBMiddleware } from '../utilities/data/db/optimization.utilities';

/**
 * Aliasing the typings for the Warehouse entity and model.
 */
type _Entity = Levelup.V2.Shared.Export.Entity.ExportItem;
type _Model = Levelup.V2.Shared.Export.Model.ExportItem;
type _Document = Levelup.V2.Shared.Export.Model.ExportItemDocument;
type StrictSchemaDefinition<
  T = undefined,
  EnforcedDocType = any
> = Levelup.V2.Utils.Mongodb.StrictSchemaDefinition<T, EnforcedDocType>;
type DeepStrictSchemaDefinition<T = undefined> =
  Levelup.V2.Utils.Mongodb.DeepStrictSchemaDefinition<T>;

/**
 * Status History Item Schema
 */
const statusHistoryItemSchema: DeepStrictSchemaDefinition<
  _Entity["status_history"]
> = [
  {
    type: {
      date: { type: Date, default: Date.now },
      status: { type: String },
      reason: { type: String, default: null },
      duration: { type: Number, default: null },
      progress: { type: Number, default: null },
    },
    _id: false, // Disable _id for this subdocument
  },
];

/**
 * Represents the embedded objects of the OrderSchema.
 */
const EmbeddedObjects: DeepStrictSchemaDefinition<
  Pick<_Entity, "attributes" | "snapshots">
> = {
  attributes: {
    type: {
      store: { type: String, default: null },
      office: { type: String, default: null },
    },
    _id: false, // Disable _id for this subdocument
  },
  snapshots: {
    type: {
      created_by: {
        type: _UserSnapshotSchemaFields,
        default: null,
        _id: false, // Disable _id for this subdocument
      },
      store: {
        type: _StoreSnapshotSchemaFields,
        default: null,
        _id: false, // Disable _id for this subdocument
      },
      office: {
        type: _OfficeSnapshotSchemaFields,
        default: null,
        _id: false, // Disable _id for this subdocument
      },
    },
    _id: false, // Disable _id for this subdocument
  },
};

const ExportItemSchemaFields: StrictSchemaDefinition<
  Omit<_Entity, "_id" | "created_at" | "updated_at">
> = {
  /**
   * inherited from ICreatable
   */
  app: { type: String, required: true },
  company: { type: String, default: null },
  created_by: { type: Schema.Types.String, required: true },
  created_by_original_user: {
    type: _UserSnapshotSchemaFields,
    default: null,
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
  status_history: {type: statusHistoryItemSchema, _id: false},
  /**
   * specific to ExportItem
   */
  tracking_id: { type: String, required: true, unique: true },
  entity: { type: String },

  duration: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  requested_item_count: { type: Number, default: 0 },
  found_item_count: { type: Number, default: 0 },

  last_status_date: { type: Date, default: new Date() },
  last_status: { type: String, default: "processing" },
  last_status_reason: { type: String, default: null },
  fcm_token: { type: String },
  labels: { type: Schema.Types.Mixed, default: {} },
};
const ExportItemSchema = new Schema<_Document>(ExportItemSchemaFields, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

// Apply the middleware to the schema before any `find` operation
ExportItemSchema.pre("find", trackUsedFieldsDBMiddleware);
ExportItemSchema.pre("findOne", trackUsedFieldsDBMiddleware);
ExportItemSchema.pre("findOneAndUpdate", trackUsedFieldsDBMiddleware);

ExportItemSchema.plugin(fuzzySearching, {
  fields: [
    {
      name: "search_meta",
    },
  ],
});

ExportItemSchema.pre("save", async function (next) {
  const doc = this;
  for (let i = 0; i < doc.status_history.length; i++) {
    if (i > 0) {
      doc.status_history[i - 1].duration =
        moment(doc.status_history[i].date).unix() -
        moment(doc.status_history[i - 1].date).unix();
    }
  }
  next();
});

const ExportItem: _Model =
  models?.ExportItem || model<_Document>("ExportItem", ExportItemSchema);

// EXPORTS
export { ExportItem, ExportItemSchema, ExportItemSchemaFields };

/**
 * Ensure indexes
 */
ensureIndexes(ExportItem);
