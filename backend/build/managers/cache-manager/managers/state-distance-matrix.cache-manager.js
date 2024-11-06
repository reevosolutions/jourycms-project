"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const __1 = __importDefault(require(".."));
const logging_1 = __importDefault(require("../../../utilities/logging"));
const date_constants_1 = require("../../../constants/date.constants");
class StateDistanceMatrixCacheManager {
    constructor() {
        this.CACHE_KEY = "distanceMatrix:state";
        this.EXPIRATION = date_constants_1.SECONDS_IN_A_WEEK;
        this.cache = typedi_1.default.get(__1.default);
        this.logger = (0, logging_1.default)("COMPONENT", `${this.constructor.name}`);
    }
    static getInstance() {
        if (!StateDistanceMatrixCacheManager.instance) {
            StateDistanceMatrixCacheManager.instance =
                new StateDistanceMatrixCacheManager();
        }
        return StateDistanceMatrixCacheManager.instance;
    }
    async set(country_code, states, data) {
        try {
            const client = await this.cache.getClient();
            states = states.sort();
            await client.hSet(this.cache.generateForeignKey(`${this.CACHE_KEY}:${country_code}:${states[0]}`), states[1], JSON.stringify(data));
        }
        catch (e) {
            this.logger.error(this.set.name, e);
            throw e;
        }
    }
    async get(country_code, states) {
        try {
            const client = await this.cache.getClient();
            states = states.sort();
            const value = (await client.hGet(this.cache.generateForeignKey(`${this.CACHE_KEY}:${country_code}:${states[0]}`), states[1])) || null;
            return value ? JSON.parse(value) : null;
        }
        catch (e) {
            this.logger.error(this.get.name, e);
            return null;
        }
    }
}
exports.default = StateDistanceMatrixCacheManager;
//# sourceMappingURL=state-distance-matrix.cache-manager.js.map