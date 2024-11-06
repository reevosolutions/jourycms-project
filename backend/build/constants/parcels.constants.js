"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parcelCanPassToStatus = exports.getOldParcelStatus = exports.PARCEL_STATUS_HISTORY = exports.EXCHANGE_STATUS_AFTER_PICKUP_BY_DELIVERER = exports.INITIAL_EXCHANGE_STATUS = exports.ACKNOWLEDGMENT_STATUS_AFTER_PICKUP_BY_DELIVERER = exports.INITIAL_ACKNOWLEDGMENT_STATUS = exports.PARCEL_STATUS_ATTEMPT_REASONS = exports.PARCEL_STATUS_FAILURE_REASONS = exports.PARCEL_STATUSES_AT_DELIVERER = exports.PARCEL_STATUSES_AT_COMPANY = exports.PARCEL_STATUSES_NOT_AT_DELIVERER = exports.PARCEL_STATUSES_AT_SELLER = exports.PARCEL_FINAL_STATUSES = exports.PARCEL_STATUSES_RETURNED_FINAL = exports.PARCEL_STATUSES_DELIVERABLE_ON_STOPDESK = exports.PARCEL_STATUSES_FAILED = exports.UPDATABLE_PARCEL_STATUSES = exports.PARCEL_STATUS_GROUPS = exports.PARCEL_STATUS_GROUP_COLORS = exports.PARCEL_STATUSES_GROUPED = exports.PARCEL_STATUSES_NOT_IDLE = exports.PARCEL_STATUSES = exports.PARCEL_PLACE_STATUSES = exports.PAYMENT_STATUSES = exports.PARCEL_SUB_TYPES = exports.PARCEL_TYPES = exports.SHIPMENT_TYPES = exports.PARCEL_SIZES = exports.SHIPMENT_FROM = exports.SHIPMENT_TO = void 0;
exports.SHIPMENT_TO = [
    "home",
    "desk",
];
exports.SHIPMENT_FROM = [
    "office",
    "warehouse",
];
var PARCEL_SIZES;
(function (PARCEL_SIZES) {
    PARCEL_SIZES["SMALL"] = "small";
    PARCEL_SIZES["MEDIUM"] = "medium";
    PARCEL_SIZES["BIG"] = "big";
    PARCEL_SIZES["HUGE"] = "huge";
})(PARCEL_SIZES || (exports.PARCEL_SIZES = PARCEL_SIZES = {}));
exports.SHIPMENT_TYPES = [
    "express",
    "economic",
    "freight",
];
exports.PARCEL_TYPES = [
    "classic",
    "ecommerce",
    "internal",
    "b2b",
];
exports.PARCEL_SUB_TYPES = [
    "normal",
    "with_exchange",
    "exchange",
    "with_acknowledgement",
    "acknowledgement",
];
exports.PAYMENT_STATUSES = ["not_initialized", "not_ready", "ready", "receivable", "paid"];
exports.PARCEL_PLACE_STATUSES = ["in_office", "at_seller", "on_the_way", "out_in_delivery"];
exports.PARCEL_STATUSES = [
    "in_warehouse", // warehouse
    "packaged", // warehouse
    "returned_to_warehouse", // warehouse
    "_not_shipped_yet",
    "_to_be_checked",
    "_not_yet_picked_up",
    "in_preparation",
    "ready_to_ship",
    "picked_up",
    "transfer",
    "shipped",
    "in_transit",
    "center",
    "toward_state",
    "_received_in_office",
    "_passing_to_deliverer",
    "received_in_state",
    "waiting_for_the_customer",
    "out_in_delivery",
    "waiting",
    "on_alert",
    "alert_resolved",
    "failed_attempt",
    "delivered",
    "delivery_failure",
    // '_passing_to_returned_to_the_center',
    "attempt_returned_to_the_center",
    "returned_to_the_center",
    "return_to_center",
    "group_return",
    "return_to_withdraw",
    "return_to_seller",
    "_passing_to_seller",
    "returned_to_seller",
    "failed_exchange",
    "_current_office_corrected",
    "_hold",
    "_hold_return",
    "return_received_in_the_center",
    "returned_to_sender",
    // integration with other delivery logistics company
    "group_return_for_company",
    "return_to_recover_for_company",
    "return_to_company",
    "returned_to_company",
];
exports.PARCEL_STATUSES_NOT_IDLE = [
    // in ppreparation
    "in_warehouse", // warehouse
    "_not_shipped_yet",
    "_to_be_checked",
    "_not_yet_picked_up",
    "in_preparation",
    "ready_to_ship",
    // returned
    "returned_to_warehouse", // warehouse
    "returned_to_seller",
    "returned_to_sender",
    // delivered
    "delivered",
];
exports.PARCEL_STATUSES_GROUPED = {
    in_preparation: [
        "in_warehouse", // warehouse
        "packaged", // warehouse
        "_not_shipped_yet",
        "_to_be_checked",
        "_not_yet_picked_up",
        "in_preparation",
        "ready_to_ship",
        // '_passing_to_returned_to_the_center',
    ],
    processing: [
        "picked_up",
        "transfer",
        "shipped",
        "in_transit",
        "center",
        "toward_state",
        "_received_in_office",
        "_passing_to_deliverer",
        "received_in_state",
        "waiting_for_the_customer",
        "out_in_delivery",
        "waiting",
        "attempt_returned_to_the_center",
        "on_alert",
        "alert_resolved",
        "failed_attempt",
        "_current_office_corrected",
        "_hold",
    ],
    delivered: ["delivered"],
    returning: [
        "delivery_failure",
        "returned_to_the_center",
        "return_to_center",
        "group_return",
        "return_to_withdraw",
        "return_to_seller",
        "_passing_to_seller",
        "failed_exchange",
        "_hold_return",
        "return_received_in_the_center",
        "return_transfer",
        "_hold_return",
        // integration with other delivery logistics company
        "group_return_for_company",
        "return_to_recover_for_company",
        "return_to_company",
        "returned_to_company",
    ],
    returned: [
        "returned_to_warehouse", // warehouse
        "returned_to_seller",
        "returned_to_sender",
    ],
    return: [],
};
exports.PARCEL_STATUSES_GROUPED.return = [
    ...exports.PARCEL_STATUSES_GROUPED.returning,
    ...exports.PARCEL_STATUSES_GROUPED.returned,
];
exports.PARCEL_STATUS_GROUP_COLORS = {
    // "in_preparation": "#e9b752",
    in_preparation: "#facc15",
    processing: "#38bdf8",
    delivered: "#4ade80",
    returning: "#fb923c",
    returned: "#f87171",
    return: "#f87171",
};
exports.PARCEL_STATUS_GROUPS = {};
Object.keys(exports.PARCEL_STATUSES_GROUPED).forEach((group) => {
    exports.PARCEL_STATUSES_GROUPED[group].forEach((status) => (exports.PARCEL_STATUS_GROUPS[status] = [
        ...(exports.PARCEL_STATUS_GROUPS[status] || []),
        group,
    ]));
});
exports.UPDATABLE_PARCEL_STATUSES = ["_not_shipped_yet", "in_preparation", "ready_to_ship"];
exports.PARCEL_STATUSES_FAILED = [
    "delivery_failure",
    "failed_exchange",
    "return_to_center",
    "return_transfer",
    "return_to_withdraw",
    "return_received_in_the_center",
    // integration with other delivery logistics company
    "group_return_for_company",
    "return_to_recover_for_company",
    "return_to_company",
    "returned_to_company",
];
exports.PARCEL_STATUSES_DELIVERABLE_ON_STOPDESK = [
    // 'in_warehouse', // warehouse
    // 'packaged', // warehouse
    // 'returned_to_warehouse', // warehouse
    // '_not_shipped_yet',
    "_to_be_checked",
    // '_not_yet_picked_up',
    // 'in_preparation',
    // 'ready_to_ship',
    // 'picked_up',
    // 'transfer',
    "shipped",
    "in_transit",
    "center",
    // 'toward_state',
    "_received_in_office",
    "_passing_to_deliverer",
    "received_in_state",
    "waiting_for_the_customer",
    "out_in_delivery",
    "waiting",
    "on_alert",
    "alert_resolved",
    "failed_attempt",
    // 'delivered',
    "delivery_failure",
    // '_passing_to_returned_to_the_center',
    "returned_to_the_center",
    "attempt_returned_to_the_center",
    // 'return_to_center',
    // 'group_return',
    // 'return_to_withdraw',
    // 'return_to_seller',
    // '_passing_to_seller',
    // 'returned_to_seller',
    "failed_exchange",
    "_current_office_corrected",
    "_hold",
    "_hold_return",
    // "return_received_in_the_center"
];
exports.PARCEL_STATUSES_RETURNED_FINAL = ["returned_to_seller", "returned_to_warehouse"];
exports.PARCEL_FINAL_STATUSES = [
    "_passing_to_seller",
    "returned_to_seller", // final, seller
    "_passing_to_warehouse",
    "returned_to_warehouse", // final, warehouse
    "delivered",
];
exports.PARCEL_STATUSES_AT_SELLER = ["_not_shipped_yet", "_not_yet_picked_up", "in_preparation", "ready_to_ship"];
exports.PARCEL_STATUSES_NOT_AT_DELIVERER = [
    "in_warehouse", // warehouse
    "packaged", // warehouse
    "returned_to_warehouse", // warehouse
    "_not_shipped_yet",
    "_to_be_checked",
    "_not_yet_picked_up",
    "in_preparation",
    "ready_to_ship",
    "picked_up",
    "transfer",
    "shipped",
    "in_transit",
    "center",
    "toward_state",
    "_received_in_office",
    "received_in_state",
    "delivered",
    "delivery_failure",
    "return_to_center",
    "returned_to_the_center",
    "attempt_returned_to_the_center",
    "return_transfer",
    "group_return",
    "return_to_withdraw",
    "return_to_seller",
    "returned_to_seller",
    "failed_exchange",
    "_current_office_corrected",
    "_hold",
    "returned_to_sender",
];
exports.PARCEL_STATUSES_AT_COMPANY = [
    // integration with other delivery logistics company
    "return_to_company",
    "returned_to_company",
];
exports.PARCEL_STATUSES_AT_DELIVERER = [
    "_passing_to_deliverer",
    "out_in_delivery",
    "waiting_for_the_customer",
    "waiting",
    "on_alert",
    "alert_resolved",
    "failed_attempt",
    "delivery_failure",
    "failed_exchange",
    // '_passing_to_returned_to_the_center',
    // 'returned_to_the_center',
];
exports.PARCEL_STATUS_FAILURE_REASONS = [
    "wrong_product",
    "missing_product",
    "broken_or_defective_product",
    "client_unable_to_pay",
    "wrong_state",
    "client_does_not_show",
    "client_absent_failed",
    "canceled_by_the_customer",
    "double_order",
    "wrong_number",
    "the_customer_has_not_ordered",
    null,
];
exports.PARCEL_STATUS_ATTEMPT_REASONS = [
    "erroneous_municipality",
    "unreachable_phone",
    "client_does_not_respond",
    "customer_absent_postponed",
    null,
];
exports.INITIAL_ACKNOWLEDGMENT_STATUS = "_not_yet_picked_up";
exports.ACKNOWLEDGMENT_STATUS_AFTER_PICKUP_BY_DELIVERER = "picked_up";
exports.INITIAL_EXCHANGE_STATUS = "_not_yet_picked_up";
exports.EXCHANGE_STATUS_AFTER_PICKUP_BY_DELIVERER = "picked_up";
/**
// on create sac : parcel statuses changed to center
// on create sac[transfer.inter-offices] : parcel statuses changed to transfer
// on create sac[transfer.inter-states] : parcel statuses changed to transfer
toward_state // sacStatus: picked_up
transfer // sacStatus: picked_up
_received_in_office // sacStatus: received_in_office
received_in_state // sacStatus: opened
center // sacStatus: opened
 * TODO stop-desk: received_in_state >> on_alert .. directly,
 * TODO stop-desk (agency) must have pseudo delivery-man account
*/
exports.PARCEL_STATUS_HISTORY = {
    in_warehouse: ["packaged"],
    packaged: ["shipped"],
    in_preparation: ["packaged", "ready_to_ship", "picked_up", "shipped"],
    ready_to_ship: ["in_preparation", "picked_up", "shipped"],
    picked_up: ["shipped"],
    shipped: [
        "_current_office_corrected",
        "_hold",
        "in_transit",
        // START TEMPORARLY ADDED
        "center",
        "transfer",
        "toward_state",
        "_passing_to_deliverer",
        "canceled",
        // END TEMPORARLY ADDED
    ],
    canceled: [
        "_passing_to_seller",
        "_passing_to_warehouse",
        "returned_to_sender",
    ],
    in_transit: [
        "_current_office_corrected",
        "_hold",
        "center",
        "transfer",
        "toward_state",
    ],
    center: [
        "_current_office_corrected",
        "_hold",
        "transfer",
        "toward_state",
        "_passing_to_deliverer",
        "waiting_for_the_customer", // stop-desk
        "delivered",
    ],
    transfer: [
        // added to disable pickup/receive sac
        // the logic will be temporarly create->open
        // 'toward_state', // sacStatus: picked_up
        // 'transfer', // sacStatus: picked_up
        "_received_in_office",
        "received_in_state",
        "center",
        "_hold",
    ],
    toward_state: ["_current_office_corrected", "received_in_state", "_hold"],
    _received_in_office: ["_current_office_corrected", "_hold"],
    received_in_state: [
        "_current_office_corrected",
        "_hold",
        "_passing_to_deliverer",
        "transfer",
        "delivered",
    ],
    _passing_to_deliverer: ["out_in_delivery", "received_in_state", "center"],
    out_in_delivery: [
        "on_alert",
        "waiting",
        "waiting_for_the_customer",
        "failed_attempt",
        "delivery_failure",
        "delivered",
        "_hold",
    ],
    on_alert: [
        "on_alert",
        "alert_resolved",
        "delivered",
        "failed_attempt",
        "delivery_failure",
        "returned_to_sender",
    ],
    alert_resolved: ["*"],
    waiting: [
        "delivered",
        "delivery_failure",
        "failed_attempt", // TODO review this status transform
    ],
    waiting_for_the_customer: [
        "delivered",
        "delivery_failure",
        "failed_attempt",
        "returned_to_sender",
    ],
    failed_attempt: [
        "failed_attempt",
        "delivery_failure",
        // '_passing_to_returned_to_the_center',
        // 'returned_to_the_center',
        "center",
        "delivered",
        "returned_to_the_center",
        "attempt_returned_to_the_center",
        "returned_to_sender",
    ],
    delivered: [],
    delivery_failure: [
        "returned_to_the_center", // FIXME:
        // '_passing_to_returned_to_the_center',
    ],
    failed_exchange: ["returned_to_the_center"],
    // '_passing_to_returned_to_the_center': [
    //   'returned_to_the_center'
    // ],
    returned_to_the_center: [
        "_current_office_corrected",
        "_hold",
        "_hold_return",
        "return_received_in_the_center",
        "_passing_to_deliverer",
        "_passing_to_seller",
        "center",
        "transfer",
        // 'out_in_delivery',
        // 'group_return',
        "return_to_seller",
        // 'return_in_transit',
        "return_to_center",
        "return_transfer",
        "returned_to_sender",
    ],
    attempt_returned_to_the_center: [
        "returned_to_the_center",
        "_hold",
        "_hold_return",
        "return_received_in_the_center",
        "_passing_to_deliverer",
        "_passing_to_seller",
        "center",
        "transfer",
        // 'out_in_delivery',
        // 'group_return',
        "return_to_seller",
        // 'return_in_transit',
        "return_to_center",
        "return_transfer",
        "returned_to_sender",
    ],
    return_to_center: ["return_received_in_the_center", "_hold_return"],
    return_transfer: ["return_received_in_the_center", "_hold_return"],
    return_received_in_the_center: [
        "return_transfer",
        "group_return",
        "_hold_return",
        "returned_to_sender",
    ],
    return_to_withdraw: ["group_return", "_hold_return"],
    group_return_for_company: ["group_return", "return_to_recover_for_company"],
    return_to_recover_for_company: ["group_return", "return_to_company"],
    return_to_company: ["group_return", "returned_to_company"],
    returned_to_company: ["group_return"],
    group_return: [
        "group_return",
        "return_to_seller",
        "_passing_to_seller",
        "returned_to_seller",
        "return_to_withdraw",
        "_hold_return",
    ],
    return_to_seller: [
        "_passing_to_seller",
        "returned_to_seller",
        "_passing_to_warehouse",
        "returned_to_warehouse", // final, warehouse
    ],
    _passing_to_warehouse: ["returned_to_warehouse"],
    _passing_to_seller: ["returned_to_seller"],
    returned_to_seller: [],
    returned_to_warehouse: [],
    // globals
    _not_yet_picked_up: [],
    _to_be_checked: [],
    _not_shipped_yet: [],
    _current_office_corrected: ["*"],
    _hold: ["*"],
    _hold_return: ["*"],
    returned_to_sender: [
    // 'returned_to_sender', // FIXME: remove this on production
    ],
};
const getOldParcelStatus = (new_status) => {
    const _old_status = [];
    Object.keys(exports.PARCEL_STATUS_HISTORY).forEach((status) => {
        if (exports.PARCEL_STATUS_HISTORY[status].includes(new_status) ||
            exports.PARCEL_STATUS_HISTORY[status].includes("*"))
            _old_status.push(status);
    });
    return _old_status;
};
exports.getOldParcelStatus = getOldParcelStatus;
const parcelCanPassToStatus = (old_status, new_status) => {
    const old_probable_statuses = (0, exports.getOldParcelStatus)(new_status);
    return old_probable_statuses.includes(old_status);
};
exports.parcelCanPassToStatus = parcelCanPassToStatus;
//# sourceMappingURL=parcels.constants.js.map