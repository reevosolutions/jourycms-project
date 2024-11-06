"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_middleware_1 = __importDefault(require("./multer.middleware"));
exports.default = {
    /**
     * Check if user is logged in
     * - If the request is identified as a service request, always pass
     * - If user is logged in pass
     * - else throw UnauthorizedException
     */
    uploadMiddleware: multer_middleware_1.default,
};
//# sourceMappingURL=index.js.map