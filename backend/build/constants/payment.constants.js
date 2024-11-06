"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAYMENT_STATUS_ORDER = exports.PAYMENT_TYPES = exports.PAYMENT_STATUSES = exports.PARCEL_PAYMENT_STATUSES = void 0;
exports.PARCEL_PAYMENT_STATUSES = [
    "not_initialized", // before delivery
    "not_ready", //
    "ready", // at caissier                pré à payer (after liberation)
    "receivable", // in central
    "paid", // at seller                   vendeur payé
];
exports.PAYMENT_STATUSES = [
    "not_initialized", // before delivery, initial state
    "not_collected", // on delivery, waiting to be collected by deliverer
    "collected", // on delivery, money collected by deliverer
    "at_local_office", // after gathering, money at office
    "processing", // not ready for next step
    "ready_for_disbursement", // at cashier, ready to be paid out
    "received_at_central_office", // money received at central office
    "store_payment_pending", // type: store_payment, money transfer pending
    "not_receivable", // cannot be received for some reason
    "paid_to_seller", // at seller, seller has been paid
    "preparing_fund_transfer", // type: fund_transfer, before sending
    "on_the_way", // money on the way to target
    "received_at_target", // fund_transfer: received in the target office
];
exports.PAYMENT_TYPES = [
    "collect_from_user",
    "encase_from_agent",
    "fund_transfer",
    "office_expenses",
    "ops_action",
    "deliverer_payment",
    "store_balance_topup",
    "store_payment",
];
exports.PAYMENT_STATUS_ORDER = {
    not_initialized: 0, // before delivery, initial state
    not_collected: 1, // on delivery, waiting to be collected by deliverer
    collected: 2, // on delivery, money collected by deliverer
    at_local_office: 3, // after gathering, money at office
    received_at_central_office: 4, // money received at central office
    ready_for_disbursement: 5, // at cashier, ready to be paid out
    store_payment_pending: 6, // type: store_payment, money transfer pending
    paid_to_seller: 7, // at seller, seller has been paid
    preparing_fund_transfer: 10, // type: fund_transfer, before sending
    not_receivable: 11, // cannot be received for some reason
    on_the_way: 11, // money on the way to target
    received_at_target: 12, // fund_transfer: received in the target office
    processing: 0, // not ready for next step
};
//# sourceMappingURL=payment.constants.js.map