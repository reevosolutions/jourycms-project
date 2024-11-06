"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const cache_manager_1 = __importDefault(require("../../managers/cache-manager"));
const logging_1 = __importDefault(require("../logging"));
const logger = (0, logging_1.default)("UTILITY", "HAS_PERMISSIONS");
/**
 *
 * @param {Levelup.CMS.V1.Users.Entity.ExposedUser | null} user
 * @param {string} permissionName
 * @returns {Promise<boolean>}
 */
const hasPermission = async (user, permissionName) => {
    const cacheManager = typedi_1.default.get(cache_manager_1.default);
    if (!user)
        return false;
    if (user.role === "master_admin")
        return true;
    return false;
    const permissions = (await cacheManager.list('permission'));
    // .filter(perm => (user?.permissions || []).includes(perm._id)); // TODO: check if this is needed
    const permissionNames = permissions.map(perm => perm.name);
    logger.debug('permissions', permissions);
    const permissionId = null;
    if (!permissions || !permissions.length) {
        return false;
    }
    ;
    let result = false;
    if (permissionNames.includes(permissionName))
        result = true;
    logger.value('hasPermission result', result);
    return result;
};
exports.default = hasPermission;
//# sourceMappingURL=has-permission.js.map