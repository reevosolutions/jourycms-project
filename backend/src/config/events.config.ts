/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 17-03-2024 01:28:03
 */
export { default as amqpSubscribers } from "./amqp.subscribers.config";
export {
  default as amqpEventListeningServices,
  TEventListeningServices,
} from "./amqp.listening-services.config";
export { CURRENT_SERVICE_NAME } from "./current.service.config";

/**
 * Update : -
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 30-04-2024 22:34:31
 */

const events = {
  /* -------------------------------------------------------------------------- */
  /*                                 AMQP TESTS                                 */
  /* -------------------------------------------------------------------------- */
  amqp: {
    test: "ON_AMQP_TEST",
  },

  /* -------------------------------------------------------------------------- */
  /*                                   SERVICE                                  */
  /* -------------------------------------------------------------------------- */
  service: {
    serviceLoadFailed: "ON_SERVICE_LOAD_FAILED",
    serviceLoadSucceeded: "ON_SERVICE_LOAD_SUCCEEDED",
    dbConnect: "ON_DB_CONNECT",
    dbDisconnect: "ON_DB_DISCONNECT",
    dbError: "ON_DB_ERROR",
    dbReconnect: "ON_DB_RECONNECT",
    dbReconnectFailed: "ON_DB_RECONNECT_FAILED",
    dbReconnectSucceeded: "ON_DB_RECONNECT_SUCCEEDED",
    dbReconnectAttempt: "ON_DB_RECONNECT_ATTEMPT",
    dbReconnectAttemptFailed: "ON_DB_RECONNECT_ATTEMPT_FAILED",
    dbReconnectAttemptSucceeded: "ON_DB_RECONNECT_ATTEMPT_SUCCEEDED",
  },

  /* -------------------------------------------------------------------------- */
  /*                                  ACTIVITY                                  */
  /* -------------------------------------------------------------------------- */
  activity: {
    logItem: {
      created: "ON_LOG_ITEM_CREATED",
      updated: "ON_LOG_ITEM_UPDATED",
      deleted: "ON_LOG_ITEM_DELETED",
      restored: "ON_LOG_ITEM_RESTORED",
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                AUTH CONTEXT                                */
  /* -------------------------------------------------------------------------- */
  users: {
    user: {
      created: "ON_USER_CREATED",
      updated: "ON_USER_UPDATED",
      deleted: "ON_USER_DELETED",
      restored: "ON_USER_RESTORED",
      suspendStatusChanged: "ON_USER_SUSPEND_STATUS_CHANGED",
      roleChanged: "ON_USER_ROLE_CHANGED",
      permissionsChanged: "ON_USER_PERMISSIONS_CHANGED",
      attributedToStore: "ON_USER_ATTRIBUTED_TO_STORE",
      detachedFromStore: "ON_USER_DETACHED_FROM_STORE",
      loginInfoUpdated: "ON_USER_LOGIN_INFO_UPDATED",
    },
  },

  auth: {
    auth: {
      register: "ON_USER_REGISTERED",
      login: "ON_USER_LOGGED_IN",
      logout: "ON_USER_LOGGED_OUT",
    },
    role: {
      created: "ON_ROLE_CREATED",
      updated: "ON_ROLE_UPDATED",
      deleted: "ON_ROLE_DELETED",
      restored: "ON_ROLE_RESTORED",
      permissionsChanged: "ON_ROLE_PERMISSIONS_CHANGED",
    },
    permission: {
      created: "ON_PERMISSION_CREATED",
      updated: "ON_PERMISSION_UPDATED",
      deleted: "ON_PERMISSION_DELETED",
      restored: "ON_PERMISSION_RESTORED",
    },
    permissionGroup: {
      created: "ON_PERMISSION_GROUP_CREATED",
      updated: "ON_PERMISSION_GROUP_UPDATED",
      deleted: "ON_PERMISSION_GROUP_DELETED",
      restored: "ON_PERMISSION_GROUP_RESTORED",
    },
    apiKey: {
      created: "ON_API_KEY_CREATED",
      updated: "ON_API_KEY_UPDATED",
      deleted: "ON_API_KEY_DELETED",
      restored: "ON_API_KEY_RESTORED",
      enableStatusChanged: "ON_API_KEY_ENABLE_STATUS_CHANGED",
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                              ACCOUNTS CONTEXT                              */
  /* -------------------------------------------------------------------------- */
  accounts: {
    store: {
      created: "ON_STORE_CREATED",
      updated: "ON_STORE_UPDATED",
      deleted: "ON_STORE_DELETED",
      restored: "ON_STORE_RESTORED",
      suspendStatusChanged: "ON_STORE_SUSPEND_STATUS_CHANGED",
      subStoreCreated: "ON_SUB_STORE_CREATED",
      subStoreUpdated: "ON_SUB_STORE_UPDATED",
      subStoreDeleted: "ON_SUB_STORE_DELETED",
      subStoreSuspendStatusChanged: "ON_SUB_STORE_SUSPEND_STATUS_CHANGED",
    },
    company: {
      created: "ON_COMPANY_CREATED",
      updated: "ON_COMPANY_UPDATED",
      deleted: "ON_COMPANY_DELETED",
      restored: "ON_COMPANY_RESTORED",
      suspendStatusChanged: "ON_COMPANY_SUSPEND_STATUS_CHANGED",
    },
    supplier: {
      created: "ON_SUPPLIER_CREATED",
      updated: "ON_SUPPLIER_UPDATED",
      deleted: "ON_SUPPLIER_DELETED",
      restored: "ON_SUPPLIER_RESTORED",
      suspendStatusChanged: "ON_SUPPLIER_SUSPEND_STATUS_CHANGED",
    },
    brand: {
      created: "ON_BRAND_CREATED",
      updated: "ON_BRAND_UPDATED",
      deleted: "ON_BRAND_DELETED",
      restored: "ON_BRAND_RESTORED",
      suspendStatusChanged: "ON_BRAND_SUSPEND_STATUS_CHANGED",
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                     CM                                     */
  /* -------------------------------------------------------------------------- */
  cm: {
    articleType: {
      created: "ON_ARTICLE_TYPE_CREATED",
      updated: "ON_ARTICLE_TYPE_UPDATED",
      deleted: "ON_ARTICLE_TYPE_DELETED",
      restored: "ON_ARTICLE_TYPE_RESTORED",
    },
    article: {
      created: "ON_ARTICLE_CREATED",
      updated: "ON_ARTICLE_UPDATED",
      deleted: "ON_ARTICLE_DELETED",
      restored: "ON_ARTICLE_RESTORED",
    },
    term: {
      created: "ON_TERM_CREATED",
      updated: "ON_TERM_UPDATED",
      deleted: "ON_TERM_DELETED",
      restored: "ON_TERM_RESTORED",
    },
    taxonomy: {
      created: "ON_TAXONOMY_CREATED",
      updated: "ON_TAXONOMY_UPDATED",
      deleted: "ON_TAXONOMY_DELETED",
      restored: "ON_TAXONOMY_RESTORED",
    },
    comment: {
      created: "ON_COMMENT_CREATED",
      updated: "ON_COMMENT_UPDATED",
      deleted: "ON_COMMENT_DELETED",
      restored: "ON_COMMENT_RESTORED",
    },
    review: {
      created: "ON_REVIEW_CREATED",
      updated: "ON_REVIEW_UPDATED",
      deleted: "ON_REVIEW_DELETED",
      restored: "ON_REVIEW_RESTORED",
    },
    translation: {
      project: {
        created: "ON_TRANSLATION_PROJECT_CREATED",
        updated: "ON_TRANSLATION_PROJECT_UPDATED",
        deleted: "ON_TRANSLATION_PROJECT_DELETED",
        restored: "ON_TRANSLATION_PROJECT_RESTORED",
      },
      namespace: {
        created: "ON_TRANSLATION_NAMESPACE_CREATED",
        updated: "ON_TRANSLATION_NAMESPACE_UPDATED",
        deleted: "ON_TRANSLATION_NAMESPACE_DELETED",
        restored: "ON_TRANSLATION_NAMESPACE_RESTORED",
      },
      item: {
        created: "ON_TRANSLATION_ITEM_CREATED",
        updated: "ON_TRANSLATION_ITEM_UPDATED",
        deleted: "ON_TRANSLATION_ITEM_DELETED",
        restored: "ON_TRANSLATION_ITEM_RESTORED",
      },
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                  EVENTBUS                                  */
  /* -------------------------------------------------------------------------- */
  eventbus: {
    webhookListener: {
      created: "ON_WEBHOOK_LISTENER_CREATED",
      updated: "ON_WEBHOOK_LISTENER_UPDATED",
      deleted: "ON_WEBHOOK_LISTENER_DELETED",
      restored: "ON_WEBHOOK_LISTENER_RESTORED",
      enableStatusChanged: "ON_WEBHOOK_ENABLE_STATUS_CHANGED",
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                  INVENTORY                                 */
  /* -------------------------------------------------------------------------- */
  inventory: {
    inbound: {
      created: "ON_INBOUND_CREATED",
      updated: "ON_INBOUND_UPDATED",
      deleted: "ON_INBOUND_DELETED",
      restored: "ON_INBOUND_RESTORED",
      statusChanged: "ON_INBOUND_STATUS_CHANGED",
    },
    outbound: {
      created: "ON_OUTBOUND_CREATED",
      updated: "ON_OUTBOUND_UPDATED",
      deleted: "ON_OUTBOUND_DELETED",
      restored: "ON_OUTBOUND_RESTORED",
      statusChanged: "ON_OUTBOUND_STATUS_CHANGED",
    },
    inventoryItem: {
      created: "ON_INVENTORY_ITEM_CREATED",
      updated: "ON_INVENTORY_ITEM_UPDATED",
      deleted: "ON_INVENTORY_ITEM_DELETED",
      restored: "ON_INVENTORY_ITEM_RESTORED",
      statusChanged: "ON_INVENTORY_ITEM_STATUS_CHANGED",
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                               PRODUCTS CONTEXT                             */
  /* -------------------------------------------------------------------------- */
  products: {
    product: {
      created: "ON_PRODUCT_CREATED",
      updated: "ON_PRODUCT_UPDATED",
      deleted: "ON_PRODUCT_DELETED",
      restored: "ON_PRODUCT_RESTORED",
      enableStatusChanged: "ON_PRODUCT_ENABLE_STATUS_CHANGED",
    },
    productCategory: {
      created: "ON_PRODUCT_CATEGORY_CREATED",
      updated: "ON_PRODUCT_CATEGORY_UPDATED",
      deleted: "ON_PRODUCT_CATEGORY_DELETED",
      restored: "ON_PRODUCT_CATEGORY_RESTORED",
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                              CUSTOMER CONTEXT                              */
  /* -------------------------------------------------------------------------- */
  customers: {
    customer: {
      created: "ON_CUSTOMER_CREATED",
      updated: "ON_CUSTOMER_UPDATED",
      deleted: "ON_CUSTOMER_DELETED",
      restored: "ON_CUSTOMER_RESTORED",
      suspendStatusChanged: "ON_CUSTOMER_SUSPEND_STATUS_CHANGED",
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                              LOCATIONS CONTEXT                             */
  /* -------------------------------------------------------------------------- */
  locations: {
    country: {
      created: "ON_COUNTRY_CREATED",
      updated: "ON_COUNTRY_UPDATED",
      deleted: "ON_COUNTRY_DELETED",
      restored: "ON_COUNTRY_RESTORED",
      enableStatusChanged: "ON_COUNTRY_ENABLE_STATUS_CHANGED",
      addState: "ON_COUNTRY_ADD_STATE",
      addCity: "ON_COUNTRY_ADD_CITY",
    },
    state: {
      created: "ON_STATE_CREATED",
      updated: "ON_STATE_UPDATED",
      deleted: "ON_STATE_DELETED",
      restored: "ON_STATE_RESTORED",
      enableStatusChanged: "ON_STATE_ENABLE_STATUS_CHANGED",
      addCity: "ON_STATE_ADD_CITY",
    },
    city: {
      created: "ON_CITY_CREATED",
      updated: "ON_CITY_UPDATED",
      deleted: "ON_CITY_DELETED",
      restored: "ON_CITY_RESTORED",
      enableStatusChanged: "ON_CITY_ENABLE_STATUS_CHANGED",
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                              LOGISTICS CONTEXT                             */
  /* -------------------------------------------------------------------------- */
  logistics: {
    vehicleType: {
      created: "ON_VEHICLE_TYPE_CREATED",
      updated: "ON_VEHICLE_TYPE_UPDATED",
      deleted: "ON_VEHICLE_TYPE_DELETED",
      restored: "ON_VEHICLE_TYPE_RESTORED",
    },
    vehicleMission: {
      created: "ON_VEHICLE_MISSION_CREATED",
      updated: "ON_VEHICLE_MISSION_UPDATED",
      deleted: "ON_VEHICLE_MISSION_DELETED",
      restored: "ON_VEHICLE_MISSION_RESTORED",
    },
    vehicle: {
      created: "ON_VEHICLE_CREATED",
      updated: "ON_VEHICLE_UPDATED",
      deleted: "ON_VEHICLE_DELETED",
      restored: "ON_VEHICLE_RESTORED",
      enableStatusChanged: "ON_VEHICLE_ENABLE_STATUS_CHANGED",
    },
    regionalManagement: {
      created: "ON_REGIONAL_MANAGEMENT_CREATED",
      updated: "ON_REGIONAL_MANAGEMENT_UPDATED",
      deleted: "ON_REGIONAL_MANAGEMENT_DELETED",
      restored: "ON_REGIONAL_MANAGEMENT_RESTORED",
    },
    office: {
      created: "ON_OFFICE_CREATED",
      updated: "ON_OFFICE_UPDATED",
      deleted: "ON_OFFICE_DELETED",
      restored: "ON_OFFICE_RESTORED",
      enableStatusChanged: "ON_OFFICE_ENABLE_STATUS_CHANGED",
    },
    warehouse: {
      created: "ON_WAREHOUSE_CREATED",
      updated: "ON_WAREHOUSE_UPDATED",
      deleted: "ON_WAREHOUSE_DELETED",
      restored: "ON_WAREHOUSE_RESTORED",
      enableStatusChanged: "ON_WAREHOUSE_ENABLE_STATUS_CHANGED",
    },
    warehouseBox: {
      created: "ON_WAREHOUSE_BOX_CREATED",
      updated: "ON_WAREHOUSE_BOX_UPDATED",
      deleted: "ON_WAREHOUSE_BOX_DELETED",
      restored: "ON_WAREHOUSE_BOX_RESTORED",
      enableStatusChanged: "ON_WAREHOUSE_BOX_ENABLE_STATUS_CHANGED",
    },
    warehouseShelf: {
      created: "ON_WAREHOUSE_SHELF_CREATED",
      updated: "ON_WAREHOUSE_SHELF_UPDATED",
      deleted: "ON_WAREHOUSE_SHELF_DELETED",
      restored: "ON_WAREHOUSE_SHELF_RESTORED",
      enableStatusChanged: "ON_WAREHOUSE_SHELF_ENABLE_STATUS_CHANGED",
    },
    warehouseShelfCell: {
      created: "ON_WAREHOUSE_SHELF_CELL_CREATED",
      updated: "ON_WAREHOUSE_SHELF_CELL_UPDATED",
      deleted: "ON_WAREHOUSE_SHELF_CELL_DELETED",
      restored: "ON_WAREHOUSE_SHELF_CELL_RESTORED",
      enableStatusChanged: "ON_WAREHOUSE_SHELF_CELL_ENABLE_STATUS_CHANGED",
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                NOTIFICATIONS                               */
  /* -------------------------------------------------------------------------- */
  notifications: {
    notificationItem: {
      created: "ON_NOTIFICATION_ITEM_CREATED",
      updated: "ON_NOTIFICATION_ITEM_UPDATED",
      deleted: "ON_NOTIFICATION_ITEM_DELETED",
      restored: "ON_NOTIFICATION_ITEM_RESTORED",
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                   OFFERS                                   */
  /* -------------------------------------------------------------------------- */
  offers: {
    discountOffer: {
      created: "ON_DISCOUNT_OFFER_CREATED",
      updated: "ON_DISCOUNT_OFFER_UPDATED",
      deleted: "ON_DISCOUNT_OFFER_DELETED",
      restored: "ON_DISCOUNT_OFFER_RESTORED",
      enableStatusChanged: "ON_DISCOUNT_OFFER_ENABLE_STATUS_CHANGED",
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                    ORDERS                                  */
  /* -------------------------------------------------------------------------- */
  orders: {
    order: {
      created: "ON_ORDER_CREATED",
      updated: "ON_ORDER_UPDATED",
      deleted: "ON_ORDER_DELETED",
      restored: "ON_ORDER_RESTORED",
      confirmed: "ON_ORDER_CONFIRMED",
      canceled: "ON_ORDER_CANCELED",
      returned: "ON_ORDER_RETURNED",
      statusChanged: "ON_ORDER_STATUS_CHANGED",
    },
    orderImport: {
      created: "ON_ORDER_IMPORT_CREATED",
      updated: "ON_ORDER_IMPORT_UPDATED",
      deleted: "ON_ORDER_IMPORT_DELETED",
      restored: "ON_ORDER_IMPORT_RESTORED",
      statusChanged: "ON_ORDER_IMPORT_STATUS_CHANGED",
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                               PAYMENT CONTEXT                              */
  /* -------------------------------------------------------------------------- */
  payment: {
    payment: {
      requested: "ON_PAYMENT_REQUESTED",
      created: "ON_PAYMENT_CREATED",
      updated: "ON_PAYMENT_UPDATED",
      deleted: "ON_PAYMENT_DELETED",
      restored: "ON_PAYMENT_RESTORED",
      storePaymentConfirmed: "ON_STORE_PAYMENT_CONFIRMED",
      storePayed: "ON_STORE_PAYED",
      storePartiallyPayed: "ON_STORE_PARTIALLY_PAYED",
      delivererPayed: "ON_DELIVERER_PAYED",
      statusChanged: "ON_PAYMENT_STATUS_CHANGED",
      collectFromUser: "ON_COLLECT_FROM_USER",
      encaseFromAgent: "ON_ENCASE_FROM_AGENT",
      userBalanceUpdated: "ON_USER_BALANCE_UPDATED",
      bulkUpdateUserBalance: "ON_BULK_UPDATED_USER_BALANCE",
      storeBalanceUpdated: "ON_STORE_BALANCE_UPDATED",
      officeBalanceUpdated: "ON_OFFICE_BALANCE_UPDATEDE",
    },

    deposit: {
      created: "ON_DEPOSIT_CREATED",
      updated: "ON_DEPOSIT_UPDATED",
      deleted: "ON_DEPOSIT_DELETED",
      restored: "ON_DEPOSIT_RESTORED",
      statusChanged: "ON_DEPOSIT_STATUS_CHANGED",
      bulkStatusChanged: "ON_BULK_DEPOSIT_STATUS_CHANGED",
    },
    spc: {
      stateZone: {
        created: "ON_STATE_ZONE_CREATED",
        updated: "ON_STATE_ZONE_UPDATED",
        deleted: "ON_STATE_ZONE_DELETED",
        restored: "ON_STATE_ZONE_RESTORED",
        enableStatusChanged: "ON_STATE_ZONE_ENABLE_STATUS_CHANGED",
      },
      stateBasedZoning: {
        created: "ON_STATE_BASED_ZONING_CREATED",
        updated: "ON_STATE_BASED_ZONING_UPDATED",
        deleted: "ON_STATE_BASED_ZONING_DELETED",
        restored: "ON_STATE_BASED_ZONING_RESTORED",
        enableStatusChanged: "ON_STATE_BASED_ZONING_ENABLE_STATUS_CHANGED",
      },
      zonePricing: {
        created: "ON_ZONE_PRICING_CREATED",
        updated: "ON_ZONE_PRICING_UPDATED",
        deleted: "ON_ZONE_PRICING_DELETED",
        restored: "ON_ZONE_PRICING_RESTORED",
        enableStatusChanged: "ON_ZONE_PRICING_ENABLE_STATUS_CHANGED",
      },
      cityZone: {
        created: "ON_CITY_ZONE_CREATED",
        updated: "ON_CITY_ZONE_UPDATED",
        deleted: "ON_CITY_ZONE_DELETED",
        restored: "ON_CITY_ZONE_RESTORED",
        enableStatusChanged: "ON_CITY_ZONE_ENABLE_STATUS_CHANGED",
      },
      cityBasedZoning: {
        created: "ON_CITY_BASED_ZONING_CREATED",
        updated: "ON_CITY_BASED_ZONING_UPDATED",
        deleted: "ON_CITY_BASED_ZONING_DELETED",
        restored: "ON_CITY_BASED_ZONING_RESTORED",
        enableStatusChanged: "ON_CITY_BASED_ZONING_ENABLE_STATUS_CHANGED",
      },
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                              SHIPPING CONTEXT                              */
  /* -------------------------------------------------------------------------- */
  shipping: {
    sac: {
      created: "ON_SAC_CREATED",
      updated: "ON_SAC_UPDATED",
      deleted: "ON_SAC_DELETED",
      restored: "ON_SAC_RESTORED",
      opened: "ON_SAC_OPENED",
      partiallyOpened: "ON_SAC_PARTIALLY_OPENED",
      returned: "ON_SAC_RETURNED",
      statusChanged: "ON_SAC_STATUS_CHANGED",
      bulkStatusChanged: "ON_SAC_BULK_STATUS_CHANGED",
    },
    parcel: {
      created: "ON_PARCEL_CREATED",
      creationFailed: "ON_PARCEL_CREATION_FAILED",
      imported: "ON_PARCELS_IMPORTED",
      updated: "ON_PARCEL_UPDATED",
      deleted: "ON_PARCEL_DELETED",
      restored: "ON_PARCEL_RESTORED",
      bulkDeleted: "ON_PARCEL_BULK_DELETED",
      delivered: "ON_PARCEL_DELIVERED",
      undelivered: "ON_PARCEL_UNDELIVERED",
      returned: "ON_PARCEL_RETURNED",
      statusChanged: "ON_PARCEL_STATUS_CHANGED",
      bulkStatusChanged: "ON_PARCEL_BULK_STATUS_CHANGED",
      bulkExpedited: "ON_PARCEL_BULK_EXPEDITED",
      classicParcelReconsigned: "ON_CLASSIC_PARCEL_RECONSIGNED",
    },
    pickup: {
      created: "ON_PICKUP_CREATED",
      updated: "ON_PICKUP_UPDATED",
      deleted: "ON_PICKUP_DELETED",
      restored: "ON_PICKUP_RESTORED",
      delivered: "ON_PICKUP_DELIVERED",
      returned: "ON_PICKUP_RETURNED",
      statusChanged: "ON_PICKUP_STATUS_CHANGED",
      bulkStatusChanged: "ON_PICKUP_BULK_STATUS_CHANGED",
    },
    parcelImport: {
      created: "ON_PARCEL_IMPORT_CREATED",
      updated: "ON_PARCEL_IMPORT_UPDATED",
      deleted: "ON_PARCEL_IMPORT_DELETED",
      restored: "ON_PARCEL_IMPORT_RESTORED",
      statusChanged: "ON_PARCEL_IMPORT_STATUS_CHANGED",
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                   STORAGE                                  */
  /* -------------------------------------------------------------------------- */
  storage: {
    uploadedFile: {
      created: "ON_UPLOADED_FILE_CREATED",
      updated: "ON_UPLOADED_FILE_UPDATED",
      deleted: "ON_UPLOADED_FILE_DELETED",
      restored: "ON_UPLOADED_FILE_RESTORED",
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                   SUPPORT                                  */
  /* -------------------------------------------------------------------------- */
  support: {
    ticket: {
      created: "ON_TICKET_CREATED",
      updated: "ON_TICKET_UPDATED",
      deleted: "ON_TICKET_DELETED",
      restored: "ON_TICKET_RESTORED",
      responded: "ON_TICKET_RESPONDED",
      confirmed: "ON_TICKET_CONFIRMED",
      rejected: "ON_TICKET_REJECTED",
      statusChanged: "ON_TICKET_STATUS_CHANGED",
      bulkStatusChanged: "ON_TICKET_BULK_STATUS_CHANGED",
    },
    ticketResponse: {
      created: "ON_TICKET_RESPONSE_CREATED",
      updated: "ON_TICKET_RESPONSE_UPDATED",
      deleted: "ON_TICKET_RESPONSE_DELETED",
      restored: "ON_TICKET_RESPONSE_RESTORED",
    },
    ticketType: {
      created: "ON_TICKET_TYPE_CREATED",
      updated: "ON_TICKET_TYPE_UPDATED",
      deleted: "ON_TICKET_TYPE_DELETED",
      restored: "ON_TICKET_TYPE_RESTORED",
    },
  },

  /* -------------------------------------------------------------------------- */
  /*                                   SYSTEM                                   */
  /* -------------------------------------------------------------------------- */
  system: {
    app: {
      created: "ON_APP_CREATED",
      updated: "ON_APP_UPDATED",
      deleted: "ON_APP_DELETED",
      restored: "ON_APP_RESTORED",
      disabled: "ON_APP_DISABLE",
      enabled: "ON_APP_ENABLE",
      configUpdated: "ON_APP_CONFIG_UPDATED",
    },
  },
} as const;

export default events;
