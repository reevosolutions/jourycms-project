"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
/**
 * @description
 * @param {Levelup.CMS.V1.Content.Api.ArticleTypes.Create.Request['data']} body
 * @returns {Levelup.CMS.V1.Content.Api.ArticleTypes.Create.Request['data']}
 */
const sanitizeCreateBody = async (body, authData) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    /**
     * @description Sanitize all string values in the object
     */
    body = (0, utils_1.sanitizeObjectStrings)(body);
    /**
     * @description Remove all unwanted properties already set at the time of creation
     */
    [
        // all unwanted properties already set at the time of creation
        '_id',
        'tracking_id',
        'created_by',
        'created_by_original_user',
        'created_at',
        // all unwanted properties that will be set automatically
        'updated_at',
        'search_meta',
        'snapshots',
        'deliverer_data',
        'auth_meta',
        'insights',
        // security
        'is_suspended',
        'is_deleted',
        'permissions',
        'permissions_other_than_role',
    ].forEach(p => {
        Reflect.deleteProperty(body, p);
    });
    /**
     * @description inject the current user id as the creator of the object
     */
    body.created_by = (_b = (_a = authData === null || authData === void 0 ? void 0 : authData.current) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id;
    body.app = ((_d = (_c = authData === null || authData === void 0 ? void 0 : authData.current) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.app) ? (_f = (_e = authData === null || authData === void 0 ? void 0 : authData.current) === null || _e === void 0 ? void 0 : _e.user) === null || _f === void 0 ? void 0 : _f.app : body.app || ((_h = (_g = authData === null || authData === void 0 ? void 0 : authData.current) === null || _g === void 0 ? void 0 : _g.app) === null || _h === void 0 ? void 0 : _h._id);
    /**
     * @description return the sanitized object
     */
    return body;
};
/**
 * @description
 * @param {Levelup.CMS.V1.Content.Api.ArticleTypes.Update.Request['data']} body
 * @returns {Levelup.CMS.V1.Content.Api.ArticleTypes.Update.Request['data']}
 */
const sanitizeUpdateBody = async (body, authData) => {
    /**
     * @description Sanitize all string values in the object
     */
    body = (0, utils_1.sanitizeObjectStrings)(body);
    /**
     * @description Remove all unwanted properties already set at the time of creation
     */
    [
        // all unwanted properties already set at the time of creation
        '_id',
        'tracking_id',
        'created_by',
        'created_by_original_user',
        'created_at',
        'app',
        'company',
        // all unwanted properties that will be set automatically
        'updated_at',
        'search_meta',
        'snapshots',
        'deliverer_data',
        'auth_meta',
        'insights',
        // security
        'email',
        'password',
        'confirm_password',
        'is_suspended',
        'is_deleted',
        'permissions',
        'permissions_other_than_role',
    ].forEach(p => {
        Reflect.deleteProperty(body, p);
    });
    /**
     * @description return the sanitized object
     */
    return body;
};
/**
 * @generator Levelup
 */
const ArticleTypeSanitizers = {
    sanitizeCreateBody,
    sanitizeUpdateBody
};
exports.default = ArticleTypeSanitizers;
//# sourceMappingURL=article-type.sanitizers.js.map