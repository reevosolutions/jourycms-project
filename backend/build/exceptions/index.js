"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bad_request_exception_1 = __importDefault(require("./bad-request.exception"));
const unprocessable_entity_exception_1 = __importDefault(require("./unprocessable-entity.exception"));
const invalid_password_exception_1 = __importDefault(require("./invalid-password.exception"));
const item_not_found_exception_1 = __importDefault(require("./item-not-found.exception"));
const no_items_found_exception_1 = __importDefault(require("./no-items-found.exception"));
const no_content_exception_1 = __importDefault(require("./no-content.exception"));
const unauthorized_error_exception_1 = __importDefault(require("./unauthorized-error.exception"));
const value_already_exists_exception_1 = __importDefault(require("./value-already-exists.exception"));
const levelup_exception_exception_1 = __importDefault(require("./levelup-exception.exception"));
const internal_server_error_exception_1 = __importDefault(require("./internal-server-error.exception"));
const validation_exception_1 = __importDefault(require("./validation.exception"));
const jwt_token_expired_exception_1 = __importDefault(require("./jwt-token-expired.exception"));
const exceptions = {
    /**
     * @description This exception is the base exception for all exceptions in the application
     */
    LevelupException: levelup_exception_exception_1.default,
    /**
     * code: 500
     */
    InternalServerError: internal_server_error_exception_1.default,
    /**
     * code: 400
     */
    BadRequestException: bad_request_exception_1.default,
    /**
     * code: 422
     */
    ValidationException: validation_exception_1.default,
    /**
     * code: 422
     */
    UnprocessableEntityException: unprocessable_entity_exception_1.default,
    /**
     * code: 422
     */
    InvalidPasswordException: invalid_password_exception_1.default,
    /**
     * code: 404
     */
    ItemNotFoundException: item_not_found_exception_1.default,
    /**
     * code: 404
     */
    NoItemsFoundException: no_items_found_exception_1.default,
    NotFoundException: no_items_found_exception_1.default,
    /**
     * code: 401
     */
    UnauthorizedException: unauthorized_error_exception_1.default,
    /**
     * code: 401
     */
    JWTTokenExpired: jwt_token_expired_exception_1.default,
    /**
     * code: 409
     */
    ValueAlreadyExistsException: value_already_exists_exception_1.default,
    /**
     * @description This exception is used when the request is valid but the server has nothing to send back.
     * - it's used when an event is received and the service has nothing to do with it
     * - status code: 204
     */
    NoContentException: no_content_exception_1.default,
};
exports.default = exceptions;
//# sourceMappingURL=index.js.map