/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 17-03-2024 01:28:03
 */
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
    /*                                     CM                                     */
    /* -------------------------------------------------------------------------- */
    content: {
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
};
export default events;
//# sourceMappingURL=events.config.js.map