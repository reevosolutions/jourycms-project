import {
  SECONDS_IN_A_DAY,
  SECONDS_IN_A_MINUTE,
  SECONDS_IN_A_WEEK,
  SECONDS_IN_AN_HOUR,
} from "../constants/date.constants";

/**
 * all values in seconds
 */
export const cacheDuration = {
  dev: SECONDS_IN_A_MINUTE * 10,
  insights: {
    /**
     * Customers
     */
    customers: {
      aggregateCustomersByParcelStatus: parseInt(
        process.env.CACHE_DURATION_AGGREGATE_CUSTOMERS_BY_PARCEL_STATUS ||
          `${SECONDS_IN_AN_HOUR / 2}`
      ),
      aggregateCustomersByOrderStatus: parseInt(
        process.env.CACHE_DURATION_AGGREGATE_CUSTOMERS_BY_ORDER_STATUS ||
          `${SECONDS_IN_AN_HOUR / 2}`
      ),
    },
    /**
     * Products
     */
    products: {
      aggregateProductsByParcelStatus: parseInt(
        process.env.CACHE_DURATION_AGGREGATE_PRODUCTS_BY_PARCEL_STATUS ||
          `${SECONDS_IN_AN_HOUR / 2}`
      ),
      aggregateProductsByOrderStatus: parseInt(
        process.env.CACHE_DURATION_AGGREGATE_PRODUCTS_BY_ORDER_STATUS ||
          `${SECONDS_IN_AN_HOUR / 2}`
      ),
    },

    /**
     * Orders
     */
    orders: {
      storesPerformanceInsights: parseInt(
        process.env
          .CACHE_DURATION_AGGREGATE_ORDERS_STORES_PERFORMANCE_INSIGHTS ||
          `${SECONDS_IN_A_WEEK * 2}`
      ),
      aggregateOrderGlobalInsights: parseInt(
        process.env
          .CACHE_DURATION_AGGREGATE_ORDERS_AGGREGATE_ORDER_GLOBAL_INSIGHTS ||
          `${SECONDS_IN_A_DAY}`
      ),
      aggregateOrderGlobalInsightsForStore: parseInt(
        process.env
          .CACHE_DURATION_AGGREGATE_ORDERS_AGGREGATE_ORDER_GLOBAL_INSIGHTS_FOR_STORE ||
          `${SECONDS_IN_A_WEEK}`
      ),
    },

    /**
     * Shipping
     */
    shipping: {
      zoningPerformanceData: parseInt(
        process.env.CACHE_DURATION_AGGREGATE_SHIPPING_ZONING_PERFORMANCE_DATA ||
          `${SECONDS_IN_A_WEEK / 2}`
      ),
      storesPerformanceInsights: parseInt(
        process.env
          .CACHE_DURATION_AGGREGATE_SHIPPING_STORES_PERFORMANCE_INSIGHTS ||
          `${SECONDS_IN_A_WEEK * 2}`
      ),
      aggregateParcelGlobalInsights: parseInt(
        process.env
          .CACHE_DURATION_AGGREGATE_SHIPPING_AGGREGATE_PARCEL_GLOBAL_INSIGHTS ||
          `${SECONDS_IN_A_WEEK}`
      ),
      aggregateParcelGlobalInsightsForStore: parseInt(
        process.env
          .CACHE_DURATION_AGGREGATE_SHIPPING_AGGREGATE_PARCEL_GLOBAL_INSIGHTS_FOR_STORE ||
          `${SECONDS_IN_A_WEEK}`
      ),
    },
  },

  reports: {
    payment: {
      allOfficesPaymentSummaries: parseInt(
        process.env
          .CACHE_DURATION_REPORTS_PAYMENT_ALL_OFFICES_PAYMENT_SUMMARIES ||
          `${SECONDS_IN_A_DAY}`
      ),
    },
  },
};

type DeepKeys<T> = T extends object & {
  push?: never;
  unshift?: never;
}
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | `${K}.${DeepKeys<T[K]>}`
        : never;
    }[keyof T]
  : never;

export default cacheDuration;
