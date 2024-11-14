"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_can_create_1 = require("./user-can-create");
const user_can_delete_1 = require("./user-can-delete");
const user_can_restore_1 = require("./user-can-restore");
const user_can_update_1 = require("./user-can-update");
const user_can_view_1 = require("./user-can-view");
const userCan = {
    createObject: user_can_create_1.userCanCreateObject,
    deleteObject: user_can_delete_1.userCanDeleteObject,
    restoreObject: user_can_restore_1.userCanRestoreObject,
    updateObject: user_can_update_1.userCanUpdateObject,
    viewObject: user_can_view_1.userCanViewObject
};
exports.default = userCan;
//# sourceMappingURL=index.js.map