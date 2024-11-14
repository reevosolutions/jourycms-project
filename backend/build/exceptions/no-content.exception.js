"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const levelup_exception_exception_1 = __importDefault(require("./levelup-exception.exception"));
/**
 * @since 21-10-2023 11:38:33
 * @description This exception is used when the request is valid but the server has nothing to send back.
 * - it's used when an event is received and the service has nothing to do with it
 */
class NoContentException extends levelup_exception_exception_1.default {
    constructor(message) {
        super(message);
        this.status = 204;
        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;
        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = NoContentException;
//# sourceMappingURL=no-content.exception.js.map