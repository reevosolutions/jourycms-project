"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXCEPTION_NAMES = void 0;
const http_constants_1 = require("./http.constants");
exports.EXCEPTION_NAMES = {
    // System: 500
    'SYSTEM_ERROR': http_constants_1.HttpStatusCode.INTERNAL_SERVER_ERROR,
    // Database: 500
    'DATABASE_ERROR': http_constants_1.HttpStatusCode.INTERNAL_SERVER_ERROR,
    // Authentication: 401
    'UNAUTHORIZED': http_constants_1.HttpStatusCode.UNAUTHORIZED,
    // Forbidden: 403
    'FORBIDDEN': http_constants_1.HttpStatusCode.FORBIDDEN,
    // Validation: 400
    'VALIDATION_ERROR': http_constants_1.HttpStatusCode.BAD_REQUEST,
    // Not Found: 404
    'NOT_FOUND': http_constants_1.HttpStatusCode.NOT_FOUND,
    // Conflict: 409
    'CONFLICT': http_constants_1.HttpStatusCode.CONFLICT,
    // External Service: 500
    'EXTERNAL_SERVICE_ERROR': http_constants_1.HttpStatusCode.INTERNAL_SERVER_ERROR,
    // Custom Exceptions: 500
    'MY_CUSTOM_EXCEPTION': http_constants_1.HttpStatusCode.INTERNAL_SERVER_ERROR,
    // Unknown: 500
    'UNKNOWN_ERROR': http_constants_1.HttpStatusCode.INTERNAL_SERVER_ERROR,
    // No Content: 204
    'NO_CONTENT': http_constants_1.HttpStatusCode.NO_CONTENT,
    // Bad Request: 400
    'BAD_REQUEST': http_constants_1.HttpStatusCode.BAD_REQUEST,
    // Method Not Allowed: 405
    'METHOD_NOT_ALLOWED': http_constants_1.HttpStatusCode.METHOD_NOT_ALLOWED,
    // Precondition Failed
    'PRECONDITION_FAILED': http_constants_1.HttpStatusCode.PRECONDITION_FAILED,
    // Payload Too Large
    'PAYLOAD_TOO_LARGE': http_constants_1.HttpStatusCode.PAYLOAD_TOO_LARGE,
    // Unsupported Media Type: 415
    'UNSUPPORTED_MEDIA_TYPE': http_constants_1.HttpStatusCode.UNSUPPORTED_MEDIA_TYPE,
    // Unprocessable Entity: 422
    'UNPROCESSABLE_ENTITY': http_constants_1.HttpStatusCode.UNPROCESSABLE_ENTITY,
    // Rate Limit: 429
    'RATE_LIMIT_EXCEEDED': http_constants_1.HttpStatusCode.TOO_MANY_REQUESTS,
    // Too Many Requests: 429
    'TOO_MANY_REQUESTS': http_constants_1.HttpStatusCode.TOO_MANY_REQUESTS,
};
//# sourceMappingURL=exceptions.constants.js.map