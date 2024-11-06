"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCurrentPaymentStatusAfter = isCurrentPaymentStatusAfter;
exports.isCurrentPaymentStatusBefore = isCurrentPaymentStatusBefore;
const payment_constants_1 = require("../../constants/payment.constants");
/**
 * Determines if the current payment status is after the new payment status.
 * @param currentStatus - The current payment status.
 * @param newStatus - The new payment status.
 * @returns A boolean indicating if the current payment status is after the new payment status.
 */
function isCurrentPaymentStatusAfter(currentStatus, newStatus) {
    return payment_constants_1.PAYMENT_STATUS_ORDER[currentStatus] > payment_constants_1.PAYMENT_STATUS_ORDER[newStatus];
}
/**
 * Determines if the current payment status is before the new payment status.
 * @param currentStatus - The current payment status.
 * @param newStatus - The new payment status.
 * @returns A boolean indicating if the current payment status is before the new payment status.
 */
function isCurrentPaymentStatusBefore(currentStatus, newStatus) {
    return payment_constants_1.PAYMENT_STATUS_ORDER[currentStatus] < payment_constants_1.PAYMENT_STATUS_ORDER[newStatus];
}
//# sourceMappingURL=payment.utilities.js.map