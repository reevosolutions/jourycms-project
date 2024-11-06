"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SAC_TYPES = exports.SAC_STATUSES_NOT_IDLE = exports.SAC_STATUSES = exports.SAC_STATUS_HISTORY = void 0;
exports.SAC_STATUS_HISTORY = {
    in_preparation: ["picked_up", "forced_open", "opened", "returned_to_seller"],
    picked_up: ["picked_up", "received_in_office", "returned_to_seller"],
    received_in_office: [
        "forced_open",
        "opened",
        "picked_up",
        "returned_to_seller",
    ],
    forced_open: ["opened"],
    opened: [],
    returned_to_seller: [],
};
exports.SAC_STATUSES = [
    "in_preparation",
    "picked_up",
    "received_in_office",
    "returned_to_seller",
    "forced_open",
    "opened",
];
exports.SAC_STATUSES_NOT_IDLE = [
    "received_in_office",
    "returned_to_seller",
    "opened",
];
exports.SAC_TYPES = [
    "transfer",
    "toward_state",
    "return",
    "return_transfer",
    "return_seller",
];
//# sourceMappingURL=sacs.constants.js.map