import { PAYMENT_STATUS_ORDER } from "../../constants/payment.constants";

/**
 * Determines if the current payment status is after the new payment status.
 * @param currentStatus - The current payment status.
 * @param newStatus - The new payment status.
 * @returns A boolean indicating if the current payment status is after the new payment status.
 */
export function isCurrentPaymentStatusAfter(
  currentStatus: Levelup.V2.Payment.Entity.TPaymentStatus,
  newStatus: Levelup.V2.Payment.Entity.TPaymentStatus
) {
  return PAYMENT_STATUS_ORDER[currentStatus] > PAYMENT_STATUS_ORDER[newStatus];
}

/**
 * Determines if the current payment status is before the new payment status.
 * @param currentStatus - The current payment status.
 * @param newStatus - The new payment status.
 * @returns A boolean indicating if the current payment status is before the new payment status.
 */
export function isCurrentPaymentStatusBefore(
  currentStatus: Levelup.V2.Payment.Entity.TPaymentStatus,
  newStatus: Levelup.V2.Payment.Entity.TPaymentStatus
) {
  return PAYMENT_STATUS_ORDER[currentStatus] < PAYMENT_STATUS_ORDER[newStatus];
}
