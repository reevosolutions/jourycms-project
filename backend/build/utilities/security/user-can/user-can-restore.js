"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCanRestoreObject = void 0;
const userCanRestoreObject = (entity, doc, authData) => {
    var _a;
    if ((_a = authData === null || authData === void 0 ? void 0 : authData.current) === null || _a === void 0 ? void 0 : _a.service)
        return true;
    /**
     * Handle the case where the user is a company admin
     */
    return true;
};
exports.userCanRestoreObject = userCanRestoreObject;
//# sourceMappingURL=user-can-restore.js.map