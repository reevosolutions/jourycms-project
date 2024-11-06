"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const cache_manager_1 = __importDefault(require("../managers/cache-manager"));
const exceptions_1 = __importDefault(require("../exceptions"));
const logging_1 = __importDefault(require("../utilities/logging"));
const handle_jwt_middleware_1 = require("./handle-jwt.middleware");
const logger = (0, logging_1.default)("MIDDLEWARE", "attachAuthData");
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
        const cache = typedi_1.Container.get(cache_manager_1.default);
        const token = (0, handle_jwt_middleware_1.getTokenFromHeader)(req);
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
                    throw new exceptions_1.default.UnauthorizedException("User deleted or suspended");
                req.attached_entities.user = user;
                logger.success("attachCurrentUser from redis", (_g = req.auth) === null || _g === void 0 ? void 0 : _g._id);
            }
            else {
                throw new exceptions_1.default.UnauthorizedException("User not found");
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
                    throw new exceptions_1.default.UnauthorizedException("Company deleted or suspended");
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
exports.default = attachAuthData;
//# sourceMappingURL=attach-auth-data.middleware.js.map