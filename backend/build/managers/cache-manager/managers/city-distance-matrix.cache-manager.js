"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const __1 = __importDefault(require(".."));
const logging_1 = __importDefault(require("../../../utilities/logging"));
const date_constants_1 = require("../../../constants/date.constants");
class CityDistanceMatrixCacheManager {
    constructor() {
        this.CACHE_KEY = "distanceMatrix:city";
        this.EXPIRATION = date_constants_1.SECONDS_IN_A_WEEK;
        this.cache = typedi_1.default.get(__1.default);
        this.logger = (0, logging_1.default)("COMPONENT", `${this.constructor.name}`);
    }
    static getInstance() {
        if (!CityDistanceMatrixCacheManager.instance) {
            CityDistanceMatrixCacheManager.instance =
                new CityDistanceMatrixCacheManager();
        }
        return CityDistanceMatrixCacheManager.instance;
    }
    async set(country_code, cities, data) {
        try {
            const client = await this.cache.getClient();
            cities = cities.sort();
            await client.hSet(this.cache.generateForeignKey(`${this.CACHE_KEY}:${country_code}:${cities[0]}`), cities[1], JSON.stringify(data));
        }
        catch (e) {
            this.logger.error(this.set.name, e);
            throw e;
        }
    }
    async get(country_code, cities) {
        try {
            const client = await this.cache.getClient();
            cities = cities.sort();
            const value = (await client.hGet(this.cache.generateForeignKey(`${this.CACHE_KEY}:${country_code}:${cities[0]}`), cities[1])) || null;
            return value ? JSON.parse(value) : null;
        }
        catch (e) {
            this.logger.error(this.get.name, e);
            return null;
        }
    }
}
exports.default = CityDistanceMatrixCacheManager;
//# sourceMappingURL=city-distance-matrix.cache-manager.js.map