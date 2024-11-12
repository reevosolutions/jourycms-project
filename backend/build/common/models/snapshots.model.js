/**
 * @description This file is used to build mongoose model
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 07-03-2024 23:23:09
 */
import { Schema } from "mongoose";
/* -------------------------------------------------------------------------- */
/*                                   COMMON                                   */
/* -------------------------------------------------------------------------- */
export const _FileAttributeSchemaFields = {
    id: { type: String, default: null },
    url: { type: String, default: null },
    _id: false, // Disable _id for this subdocument
};
/* -------------------------------------------------------------------------- */
/*                                  SNAPSHOTS                                 */
/* -------------------------------------------------------------------------- */
/* ---------------------------------- auth ---------------------------------- */
export const _UserSnapshotSchemaFields = {
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
    type: Schema.Types.Mixed,
    index: true,
    default: {},
    _id: false, // Disable _id for this subdocument
};
export const _ItemUpdateSchemaFields = new Schema({
    date: { type: Date, default: Date.now },
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
}, { _id: false });
export const _AddressSchemaFields = {
    country_code: { type: String },
    country_name: { type: String },
    state_code: { type: String },
    state_name: { type: String },
    city_code: { type: String },
    city_name: { type: String },
    street_address: { type: String },
};
//# sourceMappingURL=snapshots.model.js.map