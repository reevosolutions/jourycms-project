"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const exceptions_1 = __importDefault(require("../../exceptions"));
const index_1 = __importDefault(require("../../managers/cache-manager/index"));
/**
  * Check if user has permission
  *  - If the request is identified as a service request, always pass
  *  - If user is master, always pass
  *  - If the permission is not passed, pass
  *  - If user has the permission, pass
  *  - If the passed permissions is an array, check if user has one of the permissions
  *  - If the passed permissions is an array of arrays, check if user has all the permissions in one of the arrays
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const userHasPermission = (permission) => async (req, res, next) => {
    var _a;
    try {
        const cm = typedi_1.Container.get(index_1.default);
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
        if (!permission || !permission.length) {
            return next();
        }
        /**
         * The condition logic
         */
        if (!req.attached_entities.user || !req.attached_entities.user.permissions || !req.attached_entities.user.permissions.length)
            throw new exceptions_1.default.UnauthorizedException('You must be logged in to access this resource');
        const permissionObjects = await cm.permissions.list();
        const userPermissionNames = (((_a = req.attached_entities.user) === null || _a === void 0 ? void 0 : _a.permissions) || []).map(p => { var _a; return (_a = permissionObjects.find(po => po._id === p)) === null || _a === void 0 ? void 0 : _a.name; });
        if (typeof permission === 'string' && userPermissionNames.indexOf(permission) > -1) {
            return next();
        }
        let granted = false;
        if (typeof permission !== 'string' && permission instanceof Array) {
            permission.forEach(perm => {
                if (typeof perm === 'string') {
                    return granted = granted || (userPermissionNames.indexOf(perm) > -1) || perm.length === 0;
                }
                if (typeof perm !== 'string' && perm instanceof Array) {
                    let _granted = true;
                    perm.forEach(p => {
                        _granted = _granted && (userPermissionNames.indexOf(p) > -1 || p.length === 0);
                    });
                    granted = granted || _granted;
                }
            });
        }
        if (granted) {
            return next();
        }
        return next(new exceptions_1.default.UnauthorizedException(`You don't have permission to access this resource`));
    }
    catch (error) {
        return next(error);
    }
};
exports.default = userHasPermission;
//# sourceMappingURL=user-has-permission.middleware.js.map