"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheDuration = void 0;
const date_constants_1 = require("../constants/date.constants");
/**
 * all values in seconds
 */
exports.cacheDuration = {
    dev: date_constants_1.SECONDS_IN_A_MINUTE * 10,
    insights: {
        /**
         * Customers
         */
        customers: {
            aggregateCustomersByParcelStatus: parseInt(process.env.CACHE_DURATION_AGGREGATE_CUSTOMERS_BY_PARCEL_STATUS ||
                `${date_constants_1.SECONDS_IN_AN_HOUR / 2}`),
            aggregateCustomersByOrderStatus: parseInt(process.env.CACHE_DURATION_AGGREGATE_CUSTOMERS_BY_ORDER_STATUS ||
                `${date_constants_1.SECONDS_IN_AN_HOUR / 2}`),
        },
        /**
         * Products
         */
        products: {
            aggregateProductsByParcelStatus: parseInt(process.env.CACHE_DURATION_AGGREGATE_PRODUCTS_BY_PARCEL_STATUS ||
                `${date_constants_1.SECONDS_IN_AN_HOUR / 2}`),
            aggregateProductsByOrderStatus: parseInt(process.env.CACHE_DURATION_AGGREGATE_PRODUCTS_BY_ORDER_STATUS ||
                `${date_constants_1.SECONDS_IN_AN_HOUR / 2}`),
        },
        /**
         * Orders
         */
        orders: {
            storesPerformanceInsights: parseInt(process.env
                .CACHE_DURATION_AGGREGATE_ORDERS_STORES_PERFORMANCE_INSIGHTS ||
                `${date_constants_1.SECONDS_IN_A_WEEK * 2}`),
            aggregateOrderGlobalInsights: parseInt(process.env
                .CACHE_DURATION_AGGREGATE_ORDERS_AGGREGATE_ORDER_GLOBAL_INSIGHTS ||
                `${date_constants_1.SECONDS_IN_A_DAY}`),
            aggregateOrderGlobalInsightsForStore: parseInt(process.env
                .CACHE_DURATION_AGGREGATE_ORDERS_AGGREGATE_ORDER_GLOBAL_INSIGHTS_FOR_STORE ||
                `${date_constants_1.SECONDS_IN_A_WEEK}`),
        },
        /**
         * Shipping
         */
        shipping: {
            zoningPerformanceData: parseInt(process.env.CACHE_DURATION_AGGREGATE_SHIPPING_ZONING_PERFORMANCE_DATA ||
                `${date_constants_1.SECONDS_IN_A_WEEK / 2}`),
            storesPerformanceInsights: parseInt(process.env
                .CACHE_DURATION_AGGREGATE_SHIPPING_STORES_PERFORMANCE_INSIGHTS ||
                `${date_constants_1.SECONDS_IN_A_WEEK * 2}`),
            aggregateParcelGlobalInsights: parseInt(process.env
                .CACHE_DURATION_AGGREGATE_SHIPPING_AGGREGATE_PARCEL_GLOBAL_INSIGHTS ||
                `${date_constants_1.SECONDS_IN_A_WEEK}`),
            aggregateParcelGlobalInsightsForStore: parseInt(process.env
                .CACHE_DURATION_AGGREGATE_SHIPPING_AGGREGATE_PARCEL_GLOBAL_INSIGHTS_FOR_STORE ||
                `${date_constants_1.SECONDS_IN_A_WEEK}`),
        },
    },
    reports: {
        payment: {
            allOfficesPaymentSummaries: parseInt(process.env
                .CACHE_DURATION_REPORTS_PAYMENT_ALL_OFFICES_PAYMENT_SUMMARIES ||
                `${date_constants_1.SECONDS_IN_A_DAY}`),
        },
    },
};
exports.default = exports.cacheDuration;
//# sourceMappingURL=cache.config.js.map