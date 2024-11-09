/**
 * @description This file is used to build mongoose model
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 07-03-2024 23:23:09
 */

import { Schema } from "mongoose";

type DeepStrictSchemaDefinition<T = undefined> =
  Levelup.CMS.V1.Utils.Mongodb.DeepStrictSchemaDefinition<T>;

/* -------------------------------------------------------------------------- */
/*                                   COMMON                                   */
/* -------------------------------------------------------------------------- */
export const _FileAttributeSchemaFields: DeepStrictSchemaDefinition<
  Levelup.CMS.V1.Utils.Common.FileAttribute & { _id: false }
> = {
  id: { type: String, default: null },
  url: { type: String, default: null },
  _id: false, // Disable _id for this subdocument
};

/* -------------------------------------------------------------------------- */
/*                                  SNAPSHOTS                                 */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- auth ---------------------------------- */
export const _UserSnapshotSchemaFields: DeepStrictSchemaDefinition<Levelup.CMS.V1.Utils.Entity.Snapshots.Auth.User> =
{
  _id: { type: String, default: null },
  tracking_id: { type: String, default: null },
  first_name: { type: String, default: "" },
  family_name: { type: String, default: "" },
  phones: { type: [String], default: [] },
  photo: {
    type: _FileAttributeSchemaFields,
    default: null,
    _id: false, // Disable _id for this subdocument
  },
  role: { type: String, default: "" },
};



export const _ItemTagsSchemaFields = {
  type: Schema.Types.Mixed as any,
  index: true,
  default: {},
  _id: false as const, // Disable _id for this subdocument
};

export const _ItemUpdateSchemaFields = new Schema<Levelup.CMS.V1.Utils.Entity.General.IItemUpdate>({
  date: { type: Date as any, default: Date.now },
  updated_by_system: { type: Boolean, default: false },
  updated_by: {
    type: _UserSnapshotSchemaFields,
    default: null,
  },
  action: { type: String },
  updates: {
    type: [{
      field: { type: String },
      old_value: { type: Schema.Types.Mixed },
      new_value: { type: Schema.Types.Mixed },
    }],
    _id: false,
    default: []
  }
}, {_id: false});
