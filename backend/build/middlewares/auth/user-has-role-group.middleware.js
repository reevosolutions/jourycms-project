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
const userHasRoleGroup = (role_group) => async (req, res, next) => {
    var _a, _b, _c;
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
         * Masters always have all the role groups
         */
        if (((_a = req.attached_entities.user) === null || _a === void 0 ? void 0 : _a.role_group) === 'master')
            return next();
        /**
         * The condition logic
         */
        if (typeof role_group === 'string') {
            role_group = [role_group];
        }
        if (!role_group.length)
            return next();
        if (!((_b = req.attached_entities.user) === null || _b === void 0 ? void 0 : _b.role_group))
            throw new exceptions_1.default.UnauthorizedException(`You don't have the right permissions`);
        const granted = role_group.includes((_c = req.attached_entities.user) === null || _c === void 0 ? void 0 : _c.role_group);
        if (!granted)
            throw new exceptions_1.default.UnauthorizedException(`You don't have the right permissions`);
        /**
         * Condition fulfilled
         */
        return next();
    }
    catch (error) {
        return next(error);
    }
};
exports.default = userHasRoleGroup;
//# sourceMappingURL=user-has-role-group.middleware.js.map