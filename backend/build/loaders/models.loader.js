"use strict";
/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-03-09 05:33:01
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import the service-specific models
const models_loader_1 = __importDefault(require("../features/auth/loaders/models.loader"));
const models_loader_2 = __importDefault(require("../features/content/loaders/models.loader"));
const models_loader_3 = __importDefault(require("../features/storage/loaders/models.loader"));
/**
 * Load the service models.
 *
 * @returns A dictionary of service models.
 */
const getServiceModels = () => {
    return Object.assign(Object.assign(Object.assign({}, (0, models_loader_1.default)()), (0, models_loader_2.default)()), (0, models_loader_3.default)());
};
exports.default = getServiceModels;
//# sourceMappingURL=models.loader.js.map