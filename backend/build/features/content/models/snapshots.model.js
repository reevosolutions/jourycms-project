"use strict";
/**
 * @description This file is used to build mongoose model
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 07-03-2024 23:23:09
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._UserSnapshotSchemaFields = exports._FileAttributeSchemaFields = void 0;
/* -------------------------------------------------------------------------- */
/*                                   COMMON                                   */
/* -------------------------------------------------------------------------- */
exports._FileAttributeSchemaFields = {
    id: { type: String, default: null },
    url: { type: String, default: null },
    _id: false, // Disable _id for this subdocument
};
/* -------------------------------------------------------------------------- */
/*                                  SNAPSHOTS                                 */
/* -------------------------------------------------------------------------- */
/* ---------------------------------- auth ---------------------------------- */
exports._UserSnapshotSchemaFields = {
    _id: { type: String, default: null },
    tracking_id: { type: String, default: null },
    first_name: { type: String, default: "" },
    family_name: { type: String, default: "" },
    phones: { type: [String], default: [] },
    photo: {
        type: exports._FileAttributeSchemaFields,
        default: null,
        _id: false, // Disable _id for this subdocument
    },
    role: { type: String, default: "" },
};
//# sourceMappingURL=snapshots.model.js.map