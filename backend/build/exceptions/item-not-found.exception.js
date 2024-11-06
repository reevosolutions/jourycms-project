"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const levelup_exception_exception_1 = __importDefault(require("./levelup-exception.exception"));
class ItemNotFound extends levelup_exception_exception_1.default {
    constructor(message = "Item Not Found") {
        super(message);
        this.status = 404;
        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name;
        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ItemNotFound;
//# sourceMappingURL=item-not-found.exception.js.map