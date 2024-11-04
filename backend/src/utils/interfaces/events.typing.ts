import events from "../../config/events.config";

export type EventNames = Levelup.V2.Utils.RecursiveKeyUnion<typeof events>;

export type AmqpEventSubscriber<E extends EventNames> = {
  event: E;
  handler: AmqpEventHandler<E, boolean>;
};
export type AmqpEventSubscribers<Events extends EventNames> = {
  [E in Events]: AmqpEventSubscriber<E>;
};

export type AmqpEventHandlerReturnType<
  E extends EventNames,
  IsFulfilled extends boolean = boolean
> = NonNullable<{
  fulfilled: IsFulfilled;
  result?: IsFulfilled extends true ? DetectEventExecutionResult<E> : never;
  error?: IsFulfilled extends false ? Error : never;
}>;
export type AmqpEventHandler<
  E extends EventNames,
  IsFulfilled extends boolean = boolean
> = (
  event: E,
  payload: DetectEventPayload<E>
) =>
  | AmqpEventHandlerReturnType<E, IsFulfilled>
  | PromiseLike<AmqpEventHandlerReturnType<E, IsFulfilled>>;

export type GenericAmqpEventService<Events extends EventNames> = {
  [E in Events]: AmqpEventHandler<E, boolean>;
};

export type DetectEventExecutionResult<E extends EventNames> = {
  event: E;
  finishedAt: Date;
  service: string;
  error?: Error;
} & {
  [K: string]: any;
};

export type DetectEventPayload<E extends EventNames> =
  // Shared
  E extends "ON_AMQP_TEST"
    ? { number: number }
    : E extends "ON_SERVICE_LOAD_FAILED"
    ? { service: string; error: Error }
    : E extends "ON_SERVICE_LOAD_SUCCEEDED"
    ? { service: string }
    : E extends "ON_DB_CONNECT"
    ? { service: string; url: string }
    : E extends "ON_DB_DISCONNECT"
    ? { service: string; url: string }
    : E extends "ON_DB_ERROR"
    ? { service: string; error: Error }
    : E extends "ON_DB_RECONNECT"
    ? { service: string; url: string }
    : E extends "ON_DB_RECONNECT_FAILED"
    ? { service: string; url: string }
    : E extends "ON_DB_RECONNECT_SUCCEEDED"
    ? { service: string; url: string }
    : E extends "ON_DB_RECONNECT_ATTEMPT"
    ? { service: string; url: string }
    : E extends "ON_DB_RECONNECT_ATTEMPT_FAILED"
    ? { service: string; url: string }
    : E extends "ON_DB_RECONNECT_ATTEMPT_SUCCEEDED"
    ? { service: string; url: string }
    : // Activity
    E extends "ON_LOG_ITEM_CREATED"
    ? Levelup.V2.Events.Payloads.Activity.LogItem.created
    : E extends "ON_LOG_ITEM_UPDATED"
    ? Levelup.V2.Events.Payloads.Activity.LogItem.updated
    : E extends "ON_LOG_ITEM_DELETED"
    ? Levelup.V2.Events.Payloads.Activity.LogItem.deleted
    : E extends "ON_LOG_ITEM_RESTORED"
    ? Levelup.V2.Events.Payloads.Activity.LogItem.restored
    : // Auth
    E extends "ON_USER_SET_ROLE"
    ? never
    : E extends "ON_USER_CREATED"
    ? Levelup.V2.Events.Payloads.Users.User.created
    : E extends "ON_USER_UPDATED"
    ? Levelup.V2.Events.Payloads.Users.User.updated
    : E extends "ON_USER_DELETED"
    ? Levelup.V2.Events.Payloads.Users.User.deleted
    : E extends "ON_USER_RESTORED"
    ? Levelup.V2.Events.Payloads.Users.User.restored
    : E extends "ON_USER_SUSPEND_STATUS_CHANGED"
    ? never
    : E extends "ON_USER_CHANGE_ROLE"
    ? never
    : E extends "ON_USER_CHANGE_PERMISSIONS"
    ? never
    : E extends "ON_ASSIGN_STORE_TO_SELLER"
    ? never
    : E extends "ON_REMOVE_STORE_FROM_SELLER"
    ? never
    : E extends "ON_USER_LOGIN_INFO_UPDATED"
    ? never
    : E extends "ON_USER_SIGN_UP"
    ? Levelup.V2.Events.Payloads.Auth.register
    : E extends "ON_USER_SIGN_IN"
    ? Levelup.V2.Events.Payloads.Auth.login
    : E extends "ON_USER_SIGN_OUT"
    ? Levelup.V2.Events.Payloads.Auth.logout
    : E extends "ON_ROLE_CREATED"
    ? Levelup.V2.Events.Payloads.Auth.Role.created
    : E extends "ON_ROLE_UPDATED"
    ? Levelup.V2.Events.Payloads.Auth.Role.updated
    : E extends "ON_ROLE_DELETED"
    ? Levelup.V2.Events.Payloads.Auth.Role.deleted
    : E extends "ON_ROLE_RESTORED"
    ? Levelup.V2.Events.Payloads.Auth.Role.restored
    : E extends "ON_ROLE_ADD_USER"
    ? never
    : E extends "ON_ROLE_CHANGE_PERMISSIONS"
    ? never
    : E extends "ON_PERMISSION_CREATED"
    ? Levelup.V2.Events.Payloads.Auth.Permission.created
    : E extends "ON_PERMISSION_UPDATED"
    ? Levelup.V2.Events.Payloads.Auth.Permission.updated
    : E extends "ON_PERMISSION_DELETED"
    ? Levelup.V2.Events.Payloads.Auth.Permission.deleted
    : E extends "ON_PERMISSION_RESTORED"
    ? Levelup.V2.Events.Payloads.Auth.Permission.restored
    : E extends "ON_PERMISSION_ADD_ROLE"
    ? never
    : E extends "ON_PERMISSION_ADD_USER"
    ? never
    : E extends "ON_PERMISSION_GROUP_CREATED"
    ? Levelup.V2.Events.Payloads.Auth.PermissionGroup.created
    : E extends "ON_PERMISSION_GROUP_UPDATED"
    ? Levelup.V2.Events.Payloads.Auth.PermissionGroup.updated
    : E extends "ON_PERMISSION_GROUP_DELETED"
    ? Levelup.V2.Events.Payloads.Auth.PermissionGroup.deleted
    : E extends "ON_PERMISSION_GROUP_RESTORED"
    ? Levelup.V2.Events.Payloads.Auth.PermissionGroup.restored
    : E extends "ON_API_KEY_CREATED"
    ? Levelup.V2.Events.Payloads.Auth.ApiKey.created
    : E extends "ON_API_KEY_UPDATED"
    ? Levelup.V2.Events.Payloads.Auth.ApiKey.updated
    : E extends "ON_API_KEY_DELETED"
    ? Levelup.V2.Events.Payloads.Auth.ApiKey.deleted
    : E extends "ON_API_KEY_RESTORED"
    ? Levelup.V2.Events.Payloads.Auth.ApiKey.restored
    : E extends "ON_API_KEY_ENABLE_STATUS_CHANGED"
    ? Levelup.V2.Events.Payloads.Auth.ApiKey.enableStatusChanged
    : // Accounts
    E extends "ON_STORE_CREATED"
    ? Levelup.V2.Events.Payloads.Accounts.Store.created
    : E extends "ON_STORE_UPDATED"
    ? Levelup.V2.Events.Payloads.Accounts.Store.updated
    : E extends "ON_STORE_DELETED"
    ? Levelup.V2.Events.Payloads.Accounts.Store.deleted
    : E extends "ON_STORE_RESTORED"
    ? Levelup.V2.Events.Payloads.Accounts.Store.restored
    : E extends "ON_STORE_SUSPEND_STATUS_CHANGED"
    ? Levelup.V2.Events.Payloads.Accounts.Store.suspendStatusChanged
    : E extends "ON_SUB_STORE_CREATED"
    ? Levelup.V2.Events.Payloads.Accounts.Store.subStoreCreated
    : E extends "ON_SUB_STORE_UPDATED"
    ? Levelup.V2.Events.Payloads.Accounts.Store.subStoreUpdated
    : E extends "ON_SUB_STORE_DELETED"
    ? Levelup.V2.Events.Payloads.Accounts.Store.subStoreDeleted
    : E extends "ON_SUB_STORE_SUSPEND_STATUS_CHANGED"
    ? Levelup.V2.Events.Payloads.Accounts.Store.subStoreSuspendStatusChanged
    : E extends "ON_COMPANY_CREATED"
    ? Levelup.V2.Events.Payloads.Accounts.Company.created
    : E extends "ON_COMPANY_UPDATED"
    ? Levelup.V2.Events.Payloads.Accounts.Company.updated
    : E extends "ON_COMPANY_DELETED"
    ? Levelup.V2.Events.Payloads.Accounts.Company.deleted
    : E extends "ON_COMPANY_RESTORED"
    ? Levelup.V2.Events.Payloads.Accounts.Company.restored
    : E extends "ON_COMPANY_SUSPEND_STATUS_CHANGED"
    ? Levelup.V2.Events.Payloads.Accounts.Company.suspendStatusChanged
    : E extends "ON_SUPPLIER_CREATED"
    ? Levelup.V2.Events.Payloads.Accounts.Supplier.created
    : E extends "ON_SUPPLIER_UPDATED"
    ? Levelup.V2.Events.Payloads.Accounts.Supplier.updated
    : E extends "ON_SUPPLIER_DELETED"
    ? Levelup.V2.Events.Payloads.Accounts.Supplier.deleted
    : E extends "ON_SUPPLIER_RESTORED"
    ? Levelup.V2.Events.Payloads.Accounts.Supplier.restored
    : E extends "ON_SUPPLIER_SUSPEND_STATUS_CHANGED"
    ? Levelup.V2.Events.Payloads.Accounts.Supplier.suspendStatusChanged
    : E extends "ON_BRAND_CREATED"
    ? Levelup.V2.Events.Payloads.Accounts.Brand.created
    : E extends "ON_BRAND_UPDATED"
    ? Levelup.V2.Events.Payloads.Accounts.Brand.updated
    : E extends "ON_BRAND_DELETED"
    ? Levelup.V2.Events.Payloads.Accounts.Brand.deleted
    : E extends "ON_BRAND_RESTORED"
    ? Levelup.V2.Events.Payloads.Accounts.Brand.restored
    : E extends "ON_BRAND_SUSPEND_STATUS_CHANGED"
    ? Levelup.V2.Events.Payloads.Accounts.Brand.suspendStatusChanged
    : // CM
    E extends "ON_ARTICLE_TYPE_CREATED"
    ? Levelup.V2.Events.Payloads.Cm.ArticleType.created
    : E extends "ON_ARTICLE_TYPE_UPDATED"
    ? Levelup.V2.Events.Payloads.Cm.ArticleType.updated
    : E extends "ON_ARTICLE_TYPE_DELETED"
    ? Levelup.V2.Events.Payloads.Cm.ArticleType.deleted
    : E extends "ON_ARTICLE_TYPE_RESTORED"
    ? Levelup.V2.Events.Payloads.Cm.ArticleType.restored
    : E extends "ON_ARTICLE_CREATED"
    ? Levelup.V2.Events.Payloads.Cm.Article.created
    : E extends "ON_ARTICLE_UPDATED"
    ? Levelup.V2.Events.Payloads.Cm.Article.updated
    : E extends "ON_ARTICLE_DELETED"
    ? Levelup.V2.Events.Payloads.Cm.Article.deleted
    : E extends "ON_ARTICLE_RESTORED"
    ? Levelup.V2.Events.Payloads.Cm.Article.restored
    : E extends "ON_TERM_CREATED"
    ? Levelup.V2.Events.Payloads.Cm.Term.created
    : E extends "ON_TERM_UPDATED"
    ? Levelup.V2.Events.Payloads.Cm.Term.updated
    : E extends "ON_TERM_DELETED"
    ? Levelup.V2.Events.Payloads.Cm.Term.deleted
    : E extends "ON_TERM_RESTORED"
    ? Levelup.V2.Events.Payloads.Cm.Term.restored
    : E extends "ON_TAXONOMY_CREATED"
    ? Levelup.V2.Events.Payloads.Cm.Taxonomy.created
    : E extends "ON_TAXONOMY_UPDATED"
    ? Levelup.V2.Events.Payloads.Cm.Taxonomy.updated
    : E extends "ON_TAXONOMY_DELETED"
    ? Levelup.V2.Events.Payloads.Cm.Taxonomy.deleted
    : E extends "ON_TAXONOMY_RESTORED"
    ? Levelup.V2.Events.Payloads.Cm.Taxonomy.restored
    : E extends "ON_COMMENT_CREATED"
    ? Levelup.V2.Events.Payloads.Cm.Comment.created
    : E extends "ON_COMMENT_UPDATED"
    ? Levelup.V2.Events.Payloads.Cm.Comment.updated
    : E extends "ON_COMMENT_DELETED"
    ? Levelup.V2.Events.Payloads.Cm.Comment.deleted
    : E extends "ON_COMMENT_RESTORED"
    ? Levelup.V2.Events.Payloads.Cm.Comment.restored
    : E extends "ON_REVIEW_CREATED"
    ? Levelup.V2.Events.Payloads.Cm.Review.created
    : E extends "ON_REVIEW_UPDATED"
    ? Levelup.V2.Events.Payloads.Cm.Review.updated
    : E extends "ON_REVIEW_DELETED"
    ? Levelup.V2.Events.Payloads.Cm.Review.deleted
    : E extends "ON_REVIEW_RESTORED"
    ? Levelup.V2.Events.Payloads.Cm.Review.restored
    : E extends "ON_TRANSLATION_PROJECT_CREATED"
    ? Levelup.V2.Events.Payloads.Cm.Translation.Project.created
    : E extends "ON_TRANSLATION_PROJECT_UPDATED"
    ? Levelup.V2.Events.Payloads.Cm.Translation.Project.updated
    : E extends "ON_TRANSLATION_PROJECT_DELETED"
    ? Levelup.V2.Events.Payloads.Cm.Translation.Project.deleted
    : E extends "ON_TRANSLATION_PROJECT_RESTORED"
    ? Levelup.V2.Events.Payloads.Cm.Translation.Project.restored
    : E extends "ON_TRANSLATION_NAMESPACE_CREATED"
    ? Levelup.V2.Events.Payloads.Cm.Translation.Namespace.created
    : E extends "ON_TRANSLATION_NAMESPACE_UPDATED"
    ? Levelup.V2.Events.Payloads.Cm.Translation.Namespace.updated
    : E extends "ON_TRANSLATION_NAMESPACE_DELETED"
    ? Levelup.V2.Events.Payloads.Cm.Translation.Namespace.deleted
    : E extends "ON_TRANSLATION_NAMESPACE_RESTORED"
    ? Levelup.V2.Events.Payloads.Cm.Translation.Namespace.restored
    : E extends "ON_TRANSLATION_ITEM_CREATED"
    ? Levelup.V2.Events.Payloads.Cm.Translation.Item.created
    : E extends "ON_TRANSLATION_ITEM_UPDATED"
    ? Levelup.V2.Events.Payloads.Cm.Translation.Item.updated
    : E extends "ON_TRANSLATION_ITEM_DELETED"
    ? Levelup.V2.Events.Payloads.Cm.Translation.Item.deleted
    : E extends "ON_TRANSLATION_ITEM_RESTORED"
    ? Levelup.V2.Events.Payloads.Cm.Translation.Item.restored
    : // Eventbus
    E extends "ON_WEBHOOK_LISTENER_CREATED"
    ? Levelup.V2.Events.Payloads.Eventbus.WebhookListener.created
    : E extends "ON_WEBHOOK_LISTENER_UPDATED"
    ? Levelup.V2.Events.Payloads.Eventbus.WebhookListener.updated
    : E extends "ON_WEBHOOK_LISTENER_DELETED"
    ? Levelup.V2.Events.Payloads.Eventbus.WebhookListener.deleted
    : E extends "ON_WEBHOOK_LISTENER_RESTORED"
    ? Levelup.V2.Events.Payloads.Eventbus.WebhookListener.restored
    : E extends "ON_WEBHOOK_LISTENER_DISABLE"
    ? never
    : E extends "ON_WEBHOOK_LISTENER_ENABLE"
    ? never
    : // Inventory
    E extends "ON_INBOUND_CREATED"
    ? Levelup.V2.Events.Payloads.Inventory.Inbound.created
    : E extends "ON_INBOUND_UPDATED"
    ? Levelup.V2.Events.Payloads.Inventory.Inbound.updated
    : E extends "ON_INBOUND_DELETED"
    ? Levelup.V2.Events.Payloads.Inventory.Inbound.deleted
    : E extends "ON_INBOUND_RESTORED"
    ? Levelup.V2.Events.Payloads.Inventory.Inbound.restored
    : E extends "ON_OUTBOUND_CREATED"
    ? Levelup.V2.Events.Payloads.Inventory.Outbound.created
    : E extends "ON_OUTBOUND_UPDATED"
    ? Levelup.V2.Events.Payloads.Inventory.Outbound.updated
    : E extends "ON_OUTBOUND_DELETED"
    ? Levelup.V2.Events.Payloads.Inventory.Outbound.deleted
    : E extends "ON_OUTBOUND_RESTORED"
    ? Levelup.V2.Events.Payloads.Inventory.Outbound.restored
    : E extends "ON_INVENTORY_ITEM_CREATED"
    ? Levelup.V2.Events.Payloads.Inventory.InventoryItem.created
    : E extends "ON_INVENTORY_ITEM_UPDATED"
    ? Levelup.V2.Events.Payloads.Inventory.InventoryItem.updated
    : E extends "ON_INVENTORY_ITEM_DELETED"
    ? Levelup.V2.Events.Payloads.Inventory.InventoryItem.deleted
    : E extends "ON_INVENTORY_ITEM_RESTORED"
    ? Levelup.V2.Events.Payloads.Inventory.InventoryItem.restored
    : // Products
    E extends "ON_PRODUCT_CREATED"
    ? Levelup.V2.Events.Payloads.Products.Product.created
    : E extends "ON_PRODUCT_UPDATED"
    ? Levelup.V2.Events.Payloads.Products.Product.updated
    : E extends "ON_PRODUCT_DELETED"
    ? Levelup.V2.Events.Payloads.Products.Product.deleted
    : E extends "ON_PRODUCT_RESTORED"
    ? Levelup.V2.Events.Payloads.Products.Product.restored
    : E extends "ON_PRODUCT_CATEGORY_CREATED"
    ? Levelup.V2.Events.Payloads.Products.ProductCategory.created
    : E extends "ON_PRODUCT_CATEGORY_UPDATED"
    ? Levelup.V2.Events.Payloads.Products.ProductCategory.updated
    : E extends "ON_PRODUCT_CATEGORY_DELETED"
    ? Levelup.V2.Events.Payloads.Products.ProductCategory.deleted
    : E extends "ON_PRODUCT_CATEGORY_RESTORED"
    ? Levelup.V2.Events.Payloads.Products.ProductCategory.restored
    : // Customers
    E extends "ON_CUSTOMER_CREATED"
    ? Levelup.V2.Events.Payloads.Customers.Customer.created
    : E extends "ON_CUSTOMER_UPDATED"
    ? Levelup.V2.Events.Payloads.Customers.Customer.updated
    : E extends "ON_CUSTOMER_DELETED"
    ? Levelup.V2.Events.Payloads.Customers.Customer.deleted
    : E extends "ON_CUSTOMER_RESTORED"
    ? Levelup.V2.Events.Payloads.Customers.Customer.restored
    : E extends "ON_CUSTOMER_SUSPEND_STATUS_CHANGED"
    ? never
    : // Locations
    E extends "ON_COUNTRY_CREATED"
    ? Levelup.V2.Events.Payloads.Locations.Country.created
    : E extends "ON_COUNTRY_UPDATED"
    ? Levelup.V2.Events.Payloads.Locations.Country.updated
    : E extends "ON_COUNTRY_DELETED"
    ? Levelup.V2.Events.Payloads.Locations.Country.deleted
    : E extends "ON_COUNTRY_RESTORED"
    ? Levelup.V2.Events.Payloads.Locations.Country.restored
    : E extends "ON_COUNTRY_ENABLE"
    ? never
    : E extends "ON_COUNTRY_DISABLE"
    ? never
    : E extends "ON_COUNTRY_ADD_STATE"
    ? never
    : E extends "ON_COUNTRY_ADD_CITY"
    ? never
    : E extends "ON_STATE_CREATED"
    ? Levelup.V2.Events.Payloads.Locations.State.created
    : E extends "ON_STATE_UPDATED"
    ? Levelup.V2.Events.Payloads.Locations.State.updated
    : E extends "ON_STATE_DELETED"
    ? Levelup.V2.Events.Payloads.Locations.State.deleted
    : E extends "ON_STATE_RESTORED"
    ? Levelup.V2.Events.Payloads.Locations.State.restored
    : E extends "ON_STATE_ENABLE"
    ? never
    : E extends "ON_STATE_DISABLE"
    ? never
    : E extends "ON_STATE_ADD_CITY"
    ? never
    : E extends "ON_CITY_CREATED"
    ? Levelup.V2.Events.Payloads.Locations.City.created
    : E extends "ON_CITY_UPDATED"
    ? Levelup.V2.Events.Payloads.Locations.City.updated
    : E extends "ON_CITY_DELETED"
    ? Levelup.V2.Events.Payloads.Locations.City.deleted
    : E extends "ON_CITY_RESTORED"
    ? Levelup.V2.Events.Payloads.Locations.City.restored
    : E extends "ON_CITY_ENABLE"
    ? never
    : E extends "ON_CITY_DISABLE"
    ? never
    : // Logistics
    E extends "ON_OFFICE_CREATED"
    ? Levelup.V2.Events.Payloads.Logistics.Office.created
    : E extends "ON_OFFICE_UPDATED"
    ? Levelup.V2.Events.Payloads.Logistics.Office.updated
    : E extends "ON_OFFICE_DELETED"
    ? Levelup.V2.Events.Payloads.Logistics.Office.deleted
    : E extends "ON_OFFICE_RESTORED"
    ? Levelup.V2.Events.Payloads.Logistics.Office.restored
    : // Orders
    E extends "ON_ORDER_CREATED"
    ? Levelup.V2.Events.Payloads.Orders.Order.created
    : E extends "ON_ORDER_UPDATED"
    ? Levelup.V2.Events.Payloads.Orders.Order.updated
    : E extends "ON_ORDER_DELETED"
    ? Levelup.V2.Events.Payloads.Orders.Order.deleted
    : E extends "ON_ORDER_RESTORED"
    ? Levelup.V2.Events.Payloads.Orders.Order.restored
    : E extends "ON_ORDER_STATUS_CHANGED"
    ? Levelup.V2.Events.Payloads.Orders.Order.statusChanged
    : E extends "ON_ORDER_CONFIRMED"
    ? Levelup.V2.Events.Payloads.Orders.Order.confirmed
    : E extends "ON_ORDER_CANCELED"
    ? Levelup.V2.Events.Payloads.Orders.Order.canceled
    : E extends "ON_ORDER_RETURNED"
    ? Levelup.V2.Events.Payloads.Orders.Order.returned
    : // Payments
    E extends "ON_PAYMENT_CREATED"
    ? Levelup.V2.Events.Payloads.Payment.Payment.created
    : E extends "ON_PAYMENT_UPDATED"
    ? Levelup.V2.Events.Payloads.Payment.Payment.updated
    : E extends "ON_PAYMENT_DELETED"
    ? Levelup.V2.Events.Payloads.Payment.Payment.deleted
    : E extends "ON_PAYMENT_RESTORED"
    ? Levelup.V2.Events.Payloads.Payment.Payment.restored
    : E extends "ON_PAYMENT_STATUS_CHANGED"
    ? Levelup.V2.Events.Payloads.Payment.Payment.statusChanged
    : E extends "ON_DEPOSIT_CREATED"
    ? Levelup.V2.Events.Payloads.Payment.Deposit.created
    : E extends "ON_DEPOSIT_UPDATED"
    ? Levelup.V2.Events.Payloads.Payment.Deposit.updated
    : E extends "ON_DEPOSIT_DELETED"
    ? Levelup.V2.Events.Payloads.Payment.Deposit.deleted
    : E extends "ON_DEPOSIT_RESTORED"
    ? Levelup.V2.Events.Payloads.Payment.Deposit.restored
    : E extends "ON_DEPOSIT_STATUS_CHANGED"
    ? Levelup.V2.Events.Payloads.Payment.Deposit.statusChanged
    : E extends "ON_PAYMENT_REQUESTED"
    ? Levelup.V2.Events.Payloads.Payment.Payment.paymentRequested
    : E extends "ON_STORE_PAYMENT_CONFIRMED"
    ? Levelup.V2.Events.Payloads.Payment.Payment.storePaymentConfirmed
    : E extends "ON_STORE_PAYED"
    ? Levelup.V2.Events.Payloads.Payment.Payment.storePayed
    : E extends "ON_STORE_PARTIALLY_PAYED"
    ? Levelup.V2.Events.Payloads.Payment.Payment.storePartiallyPayed
    : E extends "ON_DELIVERER_PAYED"
    ? Levelup.V2.Events.Payloads.Payment.Payment.delivererPayed
    : E extends "ON_COLLECT_FROM_USER"
    ? Levelup.V2.Events.Payloads.Payment.Payment.collectFromUser
    : E extends "ON_ENCASE_FROM_AGENT"
    ? Levelup.V2.Events.Payloads.Payment.Payment.encaseFromAgent
    : E extends "ON_USER_BALANCE_UPDATED"
    ? Levelup.V2.Events.Payloads.Payment.Payment.userBalanceUpdated
    : E extends "ON_BULK_UPDATED_USER_BALANCE"
    ? Levelup.V2.Events.Payloads.Payment.Payment.bulkUpdateUserBalance
    : E extends "ON_STORE_BALANCE_UPDATED"
    ? Levelup.V2.Events.Payloads.Payment.Payment.storeBalanceUpdated
    : E extends "ON_OFFICE_BALANCE_UPDATEDE"
    ? Levelup.V2.Events.Payloads.Payment.Payment.officeBalanceUpdated
    : // Shipping
    E extends "ON_PARCEL_CREATED"
    ? Levelup.V2.Events.Payloads.Shipping.Parcel.created
    : E extends "ON_PARCEL_UPDATED"
    ? Levelup.V2.Events.Payloads.Shipping.Parcel.updated
    : E extends "ON_PARCEL_DELETED"
    ? Levelup.V2.Events.Payloads.Shipping.Parcel.deleted
    : E extends "ON_PARCEL_RESTORED"
    ? Levelup.V2.Events.Payloads.Shipping.Parcel.restored
    : E extends "ON_PARCEL_STATUS_CHANGED"
    ? Levelup.V2.Events.Payloads.Shipping.Parcel.statusChanged
    : E extends "ON_PARCEL_BULK_STATUS_CHANGED"
    ? Levelup.V2.Events.Payloads.Shipping.Parcel.bulkStatusChanged
    : E extends "ON_PARCEL_DELIVERED"
    ? Levelup.V2.Events.Payloads.Shipping.Parcel.delivered
    : E extends "ON_PARCEL_UNDELIVERED"
    ? Levelup.V2.Events.Payloads.Shipping.Parcel.undelivered
    : E extends "ON_PARCEL_RETURNED"
    ? Levelup.V2.Events.Payloads.Shipping.Parcel.returned
    : E extends "ON_PARCEL_BULK_EXPEDITED"
    ? Levelup.V2.Events.Payloads.Shipping.Parcel.bulkExpedited
    : E extends "ON_PARCEL_EXPEDITED"
    ? Levelup.V2.Events.Payloads.Shipping.Parcel.expedited
    : E extends "ON_PARCEL_CREATION_FAILED"
    ? Levelup.V2.Events.Payloads.Shipping.Parcel.creationFailed
    : E extends "ON_PARCEL_CLASSIC_PARCEL_RECONSIGNED"
    ? Levelup.V2.Events.Payloads.Shipping.Parcel.classicParcelReconsigned
    : E extends "ON_PARCEL_IMPORTED"
    ? Levelup.V2.Events.Payloads.Shipping.Parcel.imported
    : E extends "ON_PARCEL_BULK_DELETED"
    ? Levelup.V2.Events.Payloads.Shipping.Parcel.bulkDeleted
    : never;

export default events;
