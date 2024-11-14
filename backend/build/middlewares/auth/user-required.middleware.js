"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = __importDefault(require("../../exceptions"));
/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const requireUser = async (req, res, next) => {
    var _a;
    try {
        /**
         * Always pass if another service is authenticated
         */
        if (req.attached_entities.service)
            return next();
        /**
         * Handle JWT token expired
         */
        if (req.jwt_expired)
            throw new exceptions_1.default.JWTTokenExpired('JWT token expired');
        /**
         * The condition logic
         */
        if (!((_a = req.attached_entities.user) === null || _a === void 0 ? void 0 : _a._id))
            throw new exceptions_1.default.UnauthorizedException('You must be logged in to access this resource');
        /**
         * Condition fulfilled
         */
        return next();
    }
    catch (error) {
        return next(error);
    }
};
exports.default = requireUser;
//# sourceMappingURL=user-required.middleware.js.map