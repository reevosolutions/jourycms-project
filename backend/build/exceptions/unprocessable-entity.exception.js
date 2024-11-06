"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const levelup_exception_exception_1 = __importDefault(require("./levelup-exception.exception"));
class UnprocessableEntityException extends levelup_exception_exception_1.default {
    /**
     * UnprocessableEntityException code: 422
     */
    constructor(message = 'Bad Request', fields = {}) {
        super(message);
        this.status = 422;
        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;
        this.fields = fields;
        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = UnprocessableEntityException;
//# sourceMappingURL=unprocessable-entity.exception.js.map