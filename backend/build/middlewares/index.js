"use strict";
/**
 * @description This file exports all the middlewares
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 05-03-2024 06:54:22
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const attach_auth_data_middleware_1 = __importDefault(require("./attach-auth-data.middleware"));
const authenticate_service_middleware_1 = __importDefault(require("./authenticate-service.middleware"));
const handle_jwt_middleware_1 = __importDefault(require("./handle-jwt.middleware"));
const endpoint_not_found_handler_middleware_1 = __importDefault(require("./endpoint-not-found-handler.middleware"));
const error_handler_middleware_1 = __importDefault(require("./error-handler.middleware"));
const rate_limiter_middleware_1 = __importDefault(require("./rate-limiter.middleware"));
const auth_1 = __importDefault(require("./auth"));
const uploading_1 = __importDefault(require("./uploading"));
//
const secure_api_by_app_key_middleware_1 = __importDefault(require("./secure-api-by-app-key.middleware"));
const unless_from_service_middleware_1 = __importDefault(require("./unless-from-service.middleware"));
exports.default = {
    //
    AUTH: auth_1.default,
    //
    UPLOADING: uploading_1.default,
    /**
     * @description Middleware to attach auth data to the request
     */
    attachAuthData: attach_auth_data_middleware_1.default,
    /**
     * @description Middleware to authenticate service
     */
    authenticateService: authenticate_service_middleware_1.default,
    /**
     * @description Middleware to handle JWT
     */
    handleJWT: handle_jwt_middleware_1.default,
    /**
     * @description Middleware to handle 404 errors
     */
    endpointNotFoundHandler: endpoint_not_found_handler_middleware_1.default,
    /**
     * @description Middleware to handle errors
     */
    errorHandler: error_handler_middleware_1.default,
    /**
     * @description Rate limiter middleware
     */
    rateLimiter: rate_limiter_middleware_1.default,
    // ----------------------------------------
    /**
     * @description Secure Api with signature
     */
    secureApiWithAppKeyMiddleware: secure_api_by_app_key_middleware_1.default,
    /**
     * @description Attach the calling service to req.attached_entities or apply the middleware if no service is found
     */
    unlessFromService: unless_from_service_middleware_1.default,
};
//# sourceMappingURL=index.js.map