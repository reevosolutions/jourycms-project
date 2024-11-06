"use strict";
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 27-02-2024 21:22:10
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSnapshot = void 0;
/* ------------------------- COMMON AUTH INTERFACES ------------------------- */
const getUserSnapshot = (value, default_value = null) => {
    var _a;
    if (!value)
        return default_value !== null && default_value !== void 0 ? default_value : null;
    const result = {
        role: value.role,
        _id: value._id,
        tracking_id: value.tracking_id,
        first_name: ((_a = value.profile) === null || _a === void 0 ? void 0 : _a.first_name) || '',
        family_name: value.profile.family_name || '',
        phones: value.profile.phones,
        photo: value.profile.photo
    };
    return result;
};
exports.getUserSnapshot = getUserSnapshot;
//# sourceMappingURL=snapshots.utilities.js.map