/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 28-02-2024 17:16:53
 */
import { getUserSnapshot } from "../entities/snapshots.utilities";
export const getRequestCurrentAssignments = async (req) => {
    var _a;
    const result = {
        user: null,
    };
    // user
    if ((_a = req.attached_entities.user) === null || _a === void 0 ? void 0 : _a._id) {
        result.user = getUserSnapshot(req.attached_entities.user);
    }
    return result;
};
export const getAuthData = async (req) => {
    return {
        attributed: await getRequestCurrentAssignments(req),
        current: req.attached_entities,
        req: () => req,
        isServiceRequest: () => { var _a; return ((_a = req.attached_entities.service) === null || _a === void 0 ? void 0 : _a.name) ? true : false; },
    };
};
//# sourceMappingURL=get-auth-data.js.map