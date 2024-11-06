"use strict";
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 28-02-2024 17:16:53
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthData = exports.getRequestCurrentAssignments = void 0;
const snapshots_utilities_1 = require("../entities/snapshots.utilities");
const getRequestCurrentAssignments = async (req) => {
    var _a;
    const result = {
        user: null,
    };
    // user
    if ((_a = req.attached_entities.user) === null || _a === void 0 ? void 0 : _a._id) {
        result.user = (0, snapshots_utilities_1.getUserSnapshot)(req.attached_entities.user);
    }
    return result;
};
exports.getRequestCurrentAssignments = getRequestCurrentAssignments;
const getAuthData = async (req) => {
    return {
        attributed: await (0, exports.getRequestCurrentAssignments)(req),
        current: req.attached_entities,
        req: () => req,
        isServiceRequest: () => { var _a; return ((_a = req.attached_entities.service) === null || _a === void 0 ? void 0 : _a.name) ? true : false; },
    };
};
exports.getAuthData = getAuthData;
//# sourceMappingURL=get-auth-data.js.map