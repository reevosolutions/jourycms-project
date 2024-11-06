"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// must be loaded before other config files
const envFound = dotenv_1.default.config();
const db_config_1 = __importDefault(require("./db.config"));
const services_config_1 = require("./services.config");
const cache_config_1 = __importDefault(require("./cache.config"));
const date_constants_1 = require("../constants/date.constants");
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";
if (envFound.error) {
    // This error should crash whole process
    // throw new exceptions.InternalServerError("Couldn't find .env file");
}
const SERVICE_NAME = (process.env.SERVICE_NAME || "").toLowerCase();
const SERVICES_API_PREFIX = process.env.SYSTEM_API_PREFIX || "/api/v1";
const internalGateway = process.env.INTERNAL_GATEWAY_URL ||
    `http://localhost:${services_config_1.SERVICE_PORTS.DEFAULT}/`;
const serviceApiUrls = services_config_1.SERVICES.reduce((prev, service) => (Object.assign(Object.assign({}, prev), { [service]: `${internalGateway}${service}${SERVICES_API_PREFIX}` })), {});
const serviceHosts = services_config_1.SERVICES.reduce((prev, service) => (Object.assign(Object.assign({}, prev), { [service]: process.env[`SERVICE_HOST_${service.toUpperCase()}`] || 'localhost' })), {});
/**
 * Configuration object for the backend application.
 */
exports.default = {
    /**
     * Environement
     */
    environement: process.env.NODE_ENV === "production"
        ? "production"
        : "development",
    get isDev() {
        return process.env.NODE_ENV !== "production";
    },
    get isProd() {
        return process.env.NODE_ENV === "production";
    },
    /**
     * Development mode
     */
    dev: {
        master: {
            email: process.env.DEV_MASTER_EMAIL || "",
            password: process.env.DEV_MASTER_PASSWORD || "",
        },
        faker: {
            userPassword: process.env.DEV_FAKER_USER_PASSWORD || "123456",
        },
    },
    /**
     * Configuration for logging.
     */
    logging: {
        /**
         * Whether to log duplicate errors or not.
         */
        log_duplicate_errors: process.env.LOG_DUPLICATE_ERRORS === "true" ||
            process.env.LOG_DUPLICATE_ERRORS === "1",
        /**
         * The log level.
         */
        level: process.env.LOG_LEVEL || "silly",
    },
    /**
     * Configuration for Agenda.js.
     */
    agenda: {
        /**
         * The name of the database collection used by Agenda.js.
         */
        dbCollection: process.env.AGENDA_DB_COLLECTION,
        /**
         * The pool time for Agenda.js.
         */
        pooltime: process.env.AGENDA_POOL_TIME,
        /**
         * The concurrency for Agenda.js.
         */
        concurrency: parseInt(process.env.AGENDA_CONCURRENCY || "3", 10),
        /**
         * Configuration for Agendash.
         */
        agendash: {
            /**
             * Whether Agendash is enabled or not.
             */
            enabled: false,
            /**
             * The username for Agendash.
             */
            user: "agendash",
            /**
             * The password for Agendash.
             */
            password: "123456",
        },
    },
    /**
     * Configuration for amqplib.
     */
    amqplib: process.env.NODE_ENV === "production"
        ? {
            /**
             * The host for amqplib.
             */
            host: process.env.AMQPLIB_HOST || "localhost",
            /**
             * The port for amqplib.
             */
            port: parseInt(process.env.AMQPLIB_PORT || "5672"),
            /**
             * The retry delay for amqplib.
             */
            retryDelay: parseInt(process.env.AMQPLIB_RETRY_DELAY || "5000"),
            /**
             * The maximum retries for amqplib.
             */
            maxRetries: parseInt(process.env.AMQPLIB_MAX_RETRIES || "5"),
            user: process.env.AMQPLIB_USER || undefined,
            password: process.env.AMQPLIB_PASS || undefined,
        }
        : {
            /**
             * The host for amqplib.
             */
            host: process.env.DEV_AMQPLIB_HOST || "localhost",
            /**
             * The port for amqplib.
             */
            port: parseInt(process.env.DEV_AMQPLIB_PORT || "5672"),
            /**
             * The retry delay for amqplib.
             */
            retryDelay: parseInt(process.env.DEV_AMQPLIB_RETRY_DELAY || "5000"),
            /**
             * The maximum retries for amqplib.
             */
            maxRetries: parseInt(process.env.DEV_AMQPLIB_MAX_RETRIES || "5"),
            user: process.env.DEV_AMQPLIB_USER || undefined,
            password: process.env.DEV_AMQPLIB_PASS || undefined,
        },
    /**
     * Configuration for email services.
     */
    emails: {
        /**
         * Configuration for Mailgun.
         */
        mailgun: {
            /**
             * The API key for Mailgun.
             */
            apiKey: process.env.MAILGUN_API_KEY,
            /**
             * The API username for Mailgun.
             */
            apiUsername: process.env.MAILGUN_USERNAME,
            /**
             * The domain for Mailgun.
             */
            domain: process.env.MAILGUN_DOMAIN,
        },
        /**
         * Configuration for Nodemailer.
         */
        nodemailer: {
            /**
             * The service for Nodemailer.
             */
            service: "Gmail",
            /**
             * The user for Nodemailer.
             */
            user: process.env.NODEMAILER_USER,
            /**
             * The password for Nodemailer.
             */
            pass: process.env.NODEMAILER_PASSWORD,
        },
    },
    /**
     * Configuration for security-related settings.
     */
    security: {
        /**
         * The secret used for internal service communication.
         */
        internalServiceSecret: process.env.INTERNAL_SERVICE_SECRET || "",
        /**
         * The secret used for external service communication.
         */
        externalServiceSecret: process.env.EXTERNAL_SERVICE_SECRET || "",
        /**
         * The secret used for frontend service communication.
         */
        frontendServiceSecret: process.env.FRONTEND_SERVICE_SECRET || "",
        /**
         * JWT Configuration
         */
        jwt: {
            /**
             * The secret used for JSON Web Token (JWT) generation and verification.
             */
            secret: process.env.JWT_SECRET,
            /**
             * The algorithm used for JSON Web Token (JWT) generation and verification.
             */
            algorithm: process.env.JWT_ALGO,
            /**
             * The expiration for JSON Web Token (JWT).
             */
            tokenExpiration: process.env.JWT_EXPIRES_IN || "1d",
            /**
             * The expiration for JSON Web Token (JWT) refresh.
             */
            refreshTokenExpiration: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
        },
    },
    /**
     * Configuration for logging.
     */
    activityLog: {
        /**
         * The secret key for logging.
         */
        secretKey: process.env.LUP_LOG_SECRET || "",
        /**
         * The URL for logging.
         */
        url: `${process.env.INTERNAL_GATEWAY_URL ||
            `http://localhost:${services_config_1.SERVICE_PORTS.DEFAULT}/`}activity/api/logs`,
    },
    /**
     * Configuration for HTTP.
     */
    http: {
        /**
         * The body size limit for HTTP.
         */
        bodySizeLimit: process.env.SYSTEM_HTTP_BODY_SIZE_LIMIT || "10MB",
        services: {
            /**
             * @description Configuration for services with '/api/v2' path.
             */
            api: serviceApiUrls,
            hosts: serviceHosts,
        },
        /**
         * Configuration for the API.
         */
        api: {
            /**
             * The prefix for the API.
             */
            prefix: SERVICES_API_PREFIX,
        },
        /**
         * SDK Configuration
         */
        sdk: {
            baseURL: process.env.SDK_BASE_URL || "http://localhost:6000",
            appId: process.env.SDK_APP_ID || "",
            appSecret: process.env.SDK_APP_SECRET || "",
            debug: [true, 1, "1", "true"].includes(process.env.SDK_DEBUG || "false"),
        },
        upload: {
            /**
             * The maximum file size for uploads.
             * Default is 16MB.
             */
            maxFileSize: parseInt(process.env.SYSTEM_HTTP_MAX_FILE_SIZE || "16777216") ||
                16777216,
        },
    },
    /**
     * Configuration for settings.
     */
    settings: {
        preferences: {
            /**
             * The default language for the application.
             */
            defaultLanguage: (process.env.DEFAULT_LANGUAGE ||
                "en"),
        },
        /**
         * Configuration for tracking.
         */
        tracking: {
            /**
             * The suffix length for tracking.
             */
            suffixLength: parseInt(process.env.SYSTEM_TRACKING_SUFFIX_LENGTH || "6") || 6,
        },
        /**
         * Configuration for items listing.
         */
        listing: {
            /**
             * The default count for items listing.
             */
            defaultCount: parseInt(process.env.SYSTEM_LISTING_DEFAULT_COUNT || "24") || 24,
        },
    },
    /**
     * Configuration for the current service.
     */
    currentService: {
        /**
         * The name of the current service.
         */
        name: SERVICE_NAME,
        /**
         * The port of the current service.
         */
        port: parseInt(process.env.PORT || "3000", 10),
        /**
         * The database for the current service.
         */
        db: (0, db_config_1.default)(),
    },
    cacheManager: {
        redis: {
            /**
             * The URL for the Redis cache manager.
             */
            url: process.env.CACHE_MANAGER_REDIS_URL || "redis://localhost:6379",
            /**
             * The port for the Redis cache manager.
             */
            port: parseInt(process.env.CACHE_MANAGER_REDIS_PORT || "6379", 10),
            /**
             *
             */
            user: process.env.CACHE_MANAGER_REDIS_USER || null,
            /**
             * The password for the Redis cache manager.
             */
            password: process.env.CACHE_MANAGER_REDIS_PASSWORD || null,
        },
        keyPrefix: process.env.CACHE_MANAGER_KEY_PREFIX || "LUP_V2:",
        /**
         * @description All values in seconds
         */
        cacheDuration: cache_config_1.default,
        getDuration(key) {
            let result = cache_config_1.default.dev || date_constants_1.SECONDS_IN_A_MINUTE;
            if (process.env.NODE_ENV !== "production")
                return result;
            let obj = cache_config_1.default;
            for (const k of key.split(".")) {
                obj = obj[k] && typeof obj[k] === "object" ? obj[k] : obj;
            }
            result = typeof obj === "number" ? obj : result;
            return result;
        },
    },
    /**
     * Configuration for integrations.
     */
    integration: {
        /**
         * Configuration for Yalidine integration.
         */
        yalidine: {
            /**
             * Whether the Yalidine integration is active or not.
             */
            active: process.env.INTEGRATION_YALIDINE_IS_ACTIVE === "true" ||
                process.env.INTEGRATION_YALIDINE_IS_ACTIVE === "1",
            /**
             * Configuration for the Yalidine API.
             */
            api: {
                /**
                 * The URL for the Yalidine API.
                 */
                url: process.env.INTEGRATION_YALIDINE_API_URL ||
                    "https://api.yalidine.app",
            },
            /**
             * Configuration for Yalidine webhooks.
             */
            webhooks: {
                /**
                 * The secret for Yalidine webhooks.
                 */
                secret: process.env.INTEGRATION_YALIDINE_WEBHOOKS_SECRET ||
                    "axzcDHKReVCmXj2kqtMpTQ1hbgOy40PWu3Z9ofsYLGEdl7w5AiBUFn8IrvJS6N",
            },
            /**
             * Configuration for Yalidine parcels.
             */
            parcels: {
                /**
                 * Whether to wait for new parcels to be synchronized or not.
                 */
                waitForNewParcelsToBeSynchronized: process.env
                    .INTEGRATION_YALIDINE_PARCELS_WAIT_FOR_NEW_PARCELS_TO_BE_SYNCHRONIZED ===
                    "true" ||
                    process.env
                        .INTEGRATION_YALIDINE_PARCELS_WAIT_FOR_NEW_PARCELS_TO_BE_SYNCHRONIZED ===
                        "1",
                /**
                 * Whether to delete failed sync parcels or not.
                 */
                deleteFailedSyncParcels: process.env
                    .INTEGRATION_YALIDINE_PARCELS_DELETE_FAILED_SYNC_PARCELS ===
                    "true" ||
                    process.env
                        .INTEGRATION_YALIDINE_PARCELS_DELETE_FAILED_SYNC_PARCELS === "1",
            },
        },
    },
    /**
     * Google API keys
     */
    google: {
        mapsApiKey: process.env.GOOGLE_MAPS_API_KEY || "",
        oauth2: {
            clientId: process.env.GOOGLE_OAUTH2_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET || "",
        },
    },
    /**
     * Mapbox integration
     */
    mapbox: {
        token: process.env.MAPBOX_TOKEN || "",
    },
};
//# sourceMappingURL=index.js.map