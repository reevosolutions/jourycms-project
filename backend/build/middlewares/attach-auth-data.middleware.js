import { Container } from "typedi";
import CacheManager from "../managers/cache-manager";
import exceptions from "../exceptions";
import initLogger from "../utilities/logging";
import { getTokenFromHeader } from "./handle-jwt.middleware";
const logger = initLogger("MIDDLEWARE", "attachAuthData");
/**
 * @description Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachAuthData = async (req, res, next) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    try {
        if (!req.attached_entities)
            req.attached_entities = {};
        const cache = Container.get(CacheManager);
        const token = getTokenFromHeader(req);
        req.current_token = token;
        req.attached_entities.token = token;
        let loadUser = true;
        let user;
        if (!token || req.jwt_expired) {
            if (!token)
                logger.warn("! JWT: No Token");
            else
                logger.error("x JWT: Expired");
            if (((_b = (_a = req.attached_entities) === null || _a === void 0 ? void 0 : _a.service) === null || _b === void 0 ? void 0 : _b.is_external) ||
                !((_d = (_c = req.attached_entities) === null || _c === void 0 ? void 0 : _c.service) === null || _d === void 0 ? void 0 : _d.name))
                return next();
            else
                loadUser = false;
        }
        if (loadUser) {
            /* -------------------------------------------------------------------------- */
            /*                                    USER                                    */
            /* -------------------------------------------------------------------------- */
            user = await cache.users.get((_e = req.auth) === null || _e === void 0 ? void 0 : _e._id);
            if (user) {
                if (user.is_deleted || ((_f = user.attributes) === null || _f === void 0 ? void 0 : _f.is_suspended))
                    throw new exceptions.UnauthorizedException("User deleted or suspended");
                req.attached_entities.user = user;
                logger.success("attachCurrentUser from redis", (_g = req.auth) === null || _g === void 0 ? void 0 : _g._id);
            }
            else {
                throw new exceptions.UnauthorizedException("User not found");
            }
        }
        /* -------------------------------------------------------------------------- */
        /*                                     APP                                    */
        /* -------------------------------------------------------------------------- */
        let app_id;
        if ((_h = req.attached_entities.user) === null || _h === void 0 ? void 0 : _h.app)
            app_id = req.attached_entities.user.app;
        else if (req.headers["x-app-id"])
            app_id = req.headers["x-app-id"];
        if (app_id) {
            const app = await cache.apps.get(app_id);
            if (app) {
                if (app.is_deleted || ((_j = app.attributes) === null || _j === void 0 ? void 0 : _j.is_suspended))
                    throw new exceptions.UnauthorizedException("Company deleted or suspended");
                req.attached_entities.app = app;
            }
        }
        req.attached_entities.service
            ? logger.success("✔️ service", req.attached_entities.service.is_external
                ? "external".red
                : "internal".blue, (_k = req.attached_entities.service.name) === null || _k === void 0 ? void 0 : _k.green)
            : logger.warn("x not a service call");
        req.attached_entities.user
            ? logger.success("✔️ user", req.attached_entities.user._id, req.attached_entities.user.email)
            : logger.warn("x no user");
        req.attached_entities.app
            ? logger.success("✔️ app", req.attached_entities.app._id, req.attached_entities.app.name)
            : logger.warn("x no app");
        return next();
    }
    catch (error) {
        logger.error("🔥 Error attaching user to req: %o", error);
        return next(error);
    }
};
export default attachAuthData;
//# sourceMappingURL=attach-auth-data.middleware.js.map