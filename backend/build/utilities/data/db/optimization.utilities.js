"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackUsedFieldsDBMiddleware = void 0;
const lodash_1 = require("lodash");
const typedi_1 = __importDefault(require("typedi"));
const cache_manager_1 = __importDefault(require("../../../managers/cache-manager"));
const logging_1 = __importStar(require("../../logging"));
const logger = (0, logging_1.default)(logging_1.LoggerContext.UTILITY, "trackUsedFields");
const trackUsedFieldsDBMiddleware = function (
// eslint-disable-next-line @typescript-eslint/ban-types
next) {
    try {
        const result = {
            filter: this.getFilter() || {},
            sort: this.getOptions().sort || { updated_at: -1 },
            model: this.model.modelName,
            date: new Date(),
            key: "",
            fields: {},
        };
        const fields = Object.entries(Object.assign(Object.assign({}, result.filter), result.sort)).reduce((prev, [key, value]) => {
            if (key === "$or") {
                const keys = (0, lodash_1.flatten)(value.map((o) => Object.keys(o))).reduce((prev, curr) => (Object.assign(Object.assign({}, prev), { [curr]: 1 })), {});
                return Object.assign(Object.assign({}, prev), keys);
            }
            else {
                return Object.assign(Object.assign({}, prev), { [key]: value === -1 ? -1 : 1 });
            }
        }, {});
        result.fields = fields;
        const key = Object.entries(fields)
            .reduce((prev, [key, value]) => [...prev, `${key}_${value}`], [])
            .sort()
            .join("_");
        result.key = key;
        const CACHE_KEY = `dbCollectionsPerformance:${result.model}`;
        const CACHE_ID = key;
        const cache = typedi_1.default.get(cache_manager_1.default);
        cache
            .getForeign(CACHE_KEY, CACHE_ID)
            .then((value) => {
            if (!value || typeof value === "number") {
                value = {
                    count: 0,
                    data: result,
                };
            }
            value.count++;
            logger.event(`${result.model} used index: ${key.cyan} for times: `, value.count);
            cache.setForeign(CACHE_KEY, CACHE_ID, value, {});
        })
            .catch((error) => {
            logger.error(error.message, error);
        });
    }
    catch (error) {
        logger.error(error.message, error);
    }
    next();
};
exports.trackUsedFieldsDBMiddleware = trackUsedFieldsDBMiddleware;
//# sourceMappingURL=optimization.utilities.js.map