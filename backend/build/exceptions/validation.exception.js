"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const levelup_exception_exception_1 = __importDefault(require("./levelup-exception.exception"));
class ValidationException extends levelup_exception_exception_1.default {
    /**
     * ValidationException code: 422
     */
    constructor(message = 'Validation Exception', fields = {}) {
        super(message);
        this.status = 422;
        this.is_joi = false;
        this.is_mongoose = false;
        this.is_celebrate = false;
        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;
        if (fields instanceof joi_1.default.ValidationError) {
            this.fields = fields.details.reduce((acc, curr) => {
                acc[curr.path[0]] = {
                    value: curr.context.value,
                    message: curr.message
                };
                return acc;
            }, {});
        }
        else
            this.fields = fields;
        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ValidationException;
//# sourceMappingURL=validation.exception.js.map