export const ORDER_STATUS_REASONS: Levelup.V2.Orders.Entity.TOrderStatusReason[] =
  [
    "unreachable_phone",
    "client_does_not_respond",
    "wrong_number",
    "customer_absent_postponed",
    "client_absent_failed",
    "canceled_by_the_customer",
    "double_order",
    "the_customer_has_not_ordered",
    "wrong_product",
    "missing_product",
    "client_unable_to_pay",
    "wrong_state",
    "erroneous_municipality",
  ];

export const ORDER_STATUSES: Levelup.V2.Orders.Entity.TOrderStatus[] = [
  "pending",
  "processing",
  "call_later",
  "no_answer",
  "confirmed",
  "canceled",
];

export const ORDER_STATUS_COLORS = {
  // "in_preparation": "#e9b752",
  pending: "#facc15",
  call_later: "#38bdf8",
  processing: "#38bdf8",
  confirmed: "#4ade80",
  not_answer: "#fb923c",
  canceled: "#f87171",
} as const;

