import events from "../../config/events.config";

export type EventNames = Levelup.CMS.V1.Utils.RecursiveKeyUnion<typeof events>;

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
    : // Auth
    E extends "ON_USER_SET_ROLE"
    ? never
    : E extends "ON_USER_CREATED"
    ? Levelup.CMS.V1.Events.Payloads.Users.User.created
    : E extends "ON_USER_UPDATED"
    ? Levelup.CMS.V1.Events.Payloads.Users.User.updated
    : E extends "ON_USER_DELETED"
    ? Levelup.CMS.V1.Events.Payloads.Users.User.deleted
    : E extends "ON_USER_RESTORED"
    ? Levelup.CMS.V1.Events.Payloads.Users.User.restored
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
    ? Levelup.CMS.V1.Events.Payloads.Auth.register
    : E extends "ON_USER_SIGN_IN"
    ? Levelup.CMS.V1.Events.Payloads.Auth.login
    : E extends "ON_USER_SIGN_OUT"
    ? Levelup.CMS.V1.Events.Payloads.Auth.logout
    : E extends "ON_ROLE_CREATED"
    ? Levelup.CMS.V1.Events.Payloads.Auth.Role.created
    : E extends "ON_ROLE_UPDATED"
    ? Levelup.CMS.V1.Events.Payloads.Auth.Role.updated
    : E extends "ON_ROLE_DELETED"
    ? Levelup.CMS.V1.Events.Payloads.Auth.Role.deleted
    : E extends "ON_ROLE_RESTORED"
    ? Levelup.CMS.V1.Events.Payloads.Auth.Role.restored
    : E extends "ON_ROLE_ADD_USER"
    ? never
    : E extends "ON_ROLE_CHANGE_PERMISSIONS"
    ? never
    : E extends "ON_PERMISSION_CREATED"
    ? Levelup.CMS.V1.Events.Payloads.Auth.Permission.created
    : E extends "ON_PERMISSION_UPDATED"
    ? Levelup.CMS.V1.Events.Payloads.Auth.Permission.updated
    : E extends "ON_PERMISSION_DELETED"
    ? Levelup.CMS.V1.Events.Payloads.Auth.Permission.deleted
    : E extends "ON_PERMISSION_RESTORED"
    ? Levelup.CMS.V1.Events.Payloads.Auth.Permission.restored
    : E extends "ON_PERMISSION_ADD_ROLE"
    ? never
    : E extends "ON_PERMISSION_ADD_USER"
    ? never
    : E extends "ON_PERMISSION_GROUP_CREATED"
    ? Levelup.CMS.V1.Events.Payloads.Auth.PermissionGroup.created
    : E extends "ON_PERMISSION_GROUP_UPDATED"
    ? Levelup.CMS.V1.Events.Payloads.Auth.PermissionGroup.updated
    : E extends "ON_PERMISSION_GROUP_DELETED"
    ? Levelup.CMS.V1.Events.Payloads.Auth.PermissionGroup.deleted
    : E extends "ON_PERMISSION_GROUP_RESTORED"
    ? Levelup.CMS.V1.Events.Payloads.Auth.PermissionGroup.restored
    : E extends "ON_API_KEY_CREATED"
    ? Levelup.CMS.V1.Events.Payloads.Auth.ApiKey.created
    : E extends "ON_API_KEY_UPDATED"
    ? Levelup.CMS.V1.Events.Payloads.Auth.ApiKey.updated
    : E extends "ON_API_KEY_DELETED"
    ? Levelup.CMS.V1.Events.Payloads.Auth.ApiKey.deleted
    : E extends "ON_API_KEY_RESTORED"
    ? Levelup.CMS.V1.Events.Payloads.Auth.ApiKey.restored
    : E extends "ON_API_KEY_ENABLE_STATUS_CHANGED"
    ? Levelup.CMS.V1.Events.Payloads.Auth.ApiKey.enableStatusChanged
    
    : // CM
    E extends "ON_ARTICLE_TYPE_CREATED"
    ? Levelup.CMS.V1.Events.Payloads.Content.ArticleType.created
    : E extends "ON_ARTICLE_TYPE_UPDATED"
    ? Levelup.CMS.V1.Events.Payloads.Content.ArticleType.updated
    : E extends "ON_ARTICLE_TYPE_DELETED"
    ? Levelup.CMS.V1.Events.Payloads.Content.ArticleType.deleted
    : E extends "ON_ARTICLE_TYPE_RESTORED"
    ? Levelup.CMS.V1.Events.Payloads.Content.ArticleType.restored
    : E extends "ON_ARTICLE_CREATED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Article.created
    : E extends "ON_ARTICLE_UPDATED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Article.updated
    : E extends "ON_ARTICLE_DELETED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Article.deleted
    : E extends "ON_ARTICLE_RESTORED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Article.restored
    : E extends "ON_TERM_CREATED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Term.created
    : E extends "ON_TERM_UPDATED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Term.updated
    : E extends "ON_TERM_DELETED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Term.deleted
    : E extends "ON_TERM_RESTORED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Term.restored
    : E extends "ON_TAXONOMY_CREATED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Taxonomy.created
    : E extends "ON_TAXONOMY_UPDATED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Taxonomy.updated
    : E extends "ON_TAXONOMY_DELETED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Taxonomy.deleted
    : E extends "ON_TAXONOMY_RESTORED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Taxonomy.restored
    : E extends "ON_COMMENT_CREATED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Comment.created
    : E extends "ON_COMMENT_UPDATED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Comment.updated
    : E extends "ON_COMMENT_DELETED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Comment.deleted
    : E extends "ON_COMMENT_RESTORED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Comment.restored
    : E extends "ON_REVIEW_CREATED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Review.created
    : E extends "ON_REVIEW_UPDATED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Review.updated
    : E extends "ON_REVIEW_DELETED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Review.deleted
    : E extends "ON_REVIEW_RESTORED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Review.restored
    : E extends "ON_TRANSLATION_PROJECT_CREATED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Translation.Project.created
    : E extends "ON_TRANSLATION_PROJECT_UPDATED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Translation.Project.updated
    : E extends "ON_TRANSLATION_PROJECT_DELETED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Translation.Project.deleted
    : E extends "ON_TRANSLATION_PROJECT_RESTORED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Translation.Project.restored
    : E extends "ON_TRANSLATION_NAMESPACE_CREATED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Translation.Namespace.created
    : E extends "ON_TRANSLATION_NAMESPACE_UPDATED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Translation.Namespace.updated
    : E extends "ON_TRANSLATION_NAMESPACE_DELETED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Translation.Namespace.deleted
    : E extends "ON_TRANSLATION_NAMESPACE_RESTORED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Translation.Namespace.restored
    : E extends "ON_TRANSLATION_ITEM_CREATED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Translation.Item.created
    : E extends "ON_TRANSLATION_ITEM_UPDATED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Translation.Item.updated
    : E extends "ON_TRANSLATION_ITEM_DELETED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Translation.Item.deleted
    : E extends "ON_TRANSLATION_ITEM_RESTORED"
    ? Levelup.CMS.V1.Events.Payloads.Content.Translation.Item.restored
    : never;

export default events;
