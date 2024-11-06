"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INVENTORY_ITEM_STATUSES = void 0;
exports.INVENTORY_ITEM_STATUSES = [
    // on create inbound
    "coming",
    // agent tasks
    "in_process",
    // on inbound received
    "in_stock",
    // on item in shelf or in box
    "in_shelf",
    // related to delivery
    "returning",
    "returned",
    "delivered",
    // frozen on reserve
    "reserved",
    // danger statuses
    "expired",
    "damaged",
    "lost",
    "stolen",
    "in_review",
    "in_repair",
];
//# sourceMappingURL=inventory-items.constants.js.map