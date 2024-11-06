"use strict";
/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-03 00:17:36
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("../features/content/api/index"));
// guaranteed to get dependencies
exports.default = () => {
    const app = (0, express_1.Router)();
    /**
     * Always inject the export controller.
     */
    (0, index_1.default)(app);
    return app;
};
//# sourceMappingURL=index.js.map