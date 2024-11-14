"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const levelup_exception_exception_1 = __importDefault(require("./levelup-exception.exception"));
class ValueAlreadyExistsException extends levelup_exception_exception_1.default {
    constructor(message, fields) {
        super(message);
        this.status = http_status_codes_1.StatusCodes.CONFLICT;
        this.is_mongoose = false;
        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;
        this.fields = fields;
        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ValueAlreadyExistsException;
//# sourceMappingURL=value-already-exists.exception.js.map