"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_has_permission_middleware_1 = __importDefault(require("./user-has-permission.middleware"));
const user_required_middleware_1 = __importDefault(require("./user-required.middleware"));
exports.default = {
    /**
     * Check if user is logged in
     * - If the request is identified as a service request, always pass
     * - If user is logged in pass
     * - else throw UnauthorizedException
     */
    requireUser: user_required_middleware_1.default,
    /**
     * Check if user has permission
     *  - If the request is identified as a service request, always pass
     *  - If user is master, always pass
     *  - If user has the permission, pass
     *  - If the passed permissions is an array, check if user has one of the permissions
     *  - If the passed permissions is an array of arrays, check if user has all the permissions in one of the arrays
     *  - else throw UnauthorizedException
     */
    userHasPermission: user_has_permission_middleware_1.default,
};
//# sourceMappingURL=index.js.map