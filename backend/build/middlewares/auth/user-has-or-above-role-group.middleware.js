"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_utilities_1 = require("../../utilities/entities/auth.utilities");
const exceptions_1 = __importDefault(require("../../exceptions"));
/**
 * Role groups are in this order:
 * - 0: master
 * - 10: system_administrators
 * - 20: application_account_owners
 * - 21: application_administrators
 * - 30: company_account_owners
 * - 31: company_administrators
 * - 50: administrators
 * - 51: agents
 * - 60: deliverers
 * - 70: sellers
 * - 100: users
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const userHasOrAboveRoleGroup = (role_group) => async (req, res, next) => {
    var _a, _b;
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
        let granted = false;
        (role_group).forEach(rg => {
            var _a;
            granted = granted || (0, auth_utilities_1.userHasRoleGroupOrAbove)((_a = req.attached_entities.user) === null || _a === void 0 ? void 0 : _a.role_group, rg);
        });
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
exports.default = userHasOrAboveRoleGroup;
//# sourceMappingURL=user-has-or-above-role-group.middleware.js.map