"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../../../utilities/logging"));
const typedi_1 = __importDefault(require("typedi"));
const __1 = __importDefault(require(".."));
class PricingCacheManager {
    constructor() {
        this.CACHE_KEY = 'PARCEL_LISTING_REQUESTS';
        this.SPC_STATE_BASED_ZONING_KEY = "SPC_STATE_BASED_ZONING";
        this.SPC_CITY_BASED_ZONING_KEY = "SPC_CITY_BASED_ZONING";
        this.SPC_STATE_ZONES_KEY = "SPC_STATE_ZONES";
        this.SPC_CITY_ZONES_KEY = "SPC_CITY_ZONES";
        /**
         * in seconds
         */
        this.EXPIRATION = 60 * 5;
        this.cache = typedi_1.default.get(__1.default);
        this.logger = (0, logging_1.default)('COMPONENT', `${this.constructor.name}`);
    }
    static getInstance() {
        if (!PricingCacheManager.instance) {
            PricingCacheManager.instance = new PricingCacheManager();
        }
        return PricingCacheManager.instance;
    }
    /* -------------------------------------------------------------------------- */
    /*                                 STATE ZONES                                */
    /* -------------------------------------------------------------------------- */
    async setStateZone(id, value) {
        try {
            const KEY = this.cache.generateForeignKey(this.SPC_STATE_ZONES_KEY);
            const client = await this.cache.getClient();
            this.logger.event(this.setStateZone.name, KEY, id);
            await client.hSet(KEY, id.toString(), JSON.stringify(value));
        }
        catch (e) {
            this.logger.error(this.setStateZone.name, e);
            throw e;
        }
    }
    async setStateBasedZoning(id, value) {
        try {
            const KEY = this.cache.generateForeignKey(this.SPC_STATE_BASED_ZONING_KEY);
            const client = await this.cache.getClient();
            this.logger.event(this.setStateBasedZoning.name, KEY, id);
            await client.hSet(KEY, id.toString(), JSON.stringify(value));
        }
        catch (e) {
            this.logger.error(this.setStateBasedZoning.name, e);
            throw e;
        }
    }
    async listStateBasedZoning(company_id) {
        try {
            const KEY = this.cache.generateForeignKey(this.SPC_STATE_BASED_ZONING_KEY);
            const client = await this.cache.getClient();
            const val = await client.hGetAll(KEY);
            const items = [];
            if (val) {
                Object.values(val).forEach(value => {
                    const v = JSON.parse(value);
                    items.push(v);
                });
            }
            return items.filter(item => item.company === company_id);
        }
        catch (e) {
            this.logger.error(this.listStateBasedZoning.name, e);
            throw e;
        }
    }
    async listStateZones(company_id) {
        try {
            const KEY = this.cache.generateForeignKey(this.SPC_STATE_ZONES_KEY);
            const client = await this.cache.getClient();
            const val = await client.hGetAll(KEY);
            const items = [];
            if (val) {
                Object.values(val).forEach(value => {
                    const v = JSON.parse(value);
                    items.push(v);
                });
            }
            return items.filter(item => item.company === company_id);
        }
        catch (e) {
            this.logger.error(this.listStateZones.name, e);
            throw e;
        }
    }
    /* -------------------------------------------------------------------------- */
    /*                                 CITY ZONES                                 */
    /* -------------------------------------------------------------------------- */
    async setCityZone(id, value) {
        try {
            const KEY = this.cache.generateForeignKey(this.SPC_CITY_ZONES_KEY);
            const client = await this.cache.getClient();
            this.logger.event(this.setStateZone.name, KEY, id);
            await client.hSet(KEY, id.toString(), JSON.stringify(value));
        }
        catch (e) {
            this.logger.error(this.setCityZone.name, e);
            throw e;
        }
    }
    async setCityBasedZoning(id, value) {
        try {
            const KEY = this.cache.generateForeignKey(this.SPC_CITY_BASED_ZONING_KEY);
            const client = await this.cache.getClient();
            this.logger.event(this.setCityBasedZoning.name, KEY, id);
            await client.hSet(KEY, id.toString(), JSON.stringify(value));
        }
        catch (e) {
            this.logger.error(this.setCityBasedZoning.name, e);
            throw e;
        }
    }
    async listCityBasedZoning(company_id) {
        try {
            const KEY = this.cache.generateForeignKey(this.SPC_CITY_BASED_ZONING_KEY);
            const client = await this.cache.getClient();
            const val = await client.hGetAll(KEY);
            const items = [];
            if (val) {
                Object.values(val).forEach(value => {
                    const v = JSON.parse(value);
                    items.push(v);
                });
            }
            return items.filter(item => item.company === company_id);
        }
        catch (e) {
            this.logger.error(this.listCityBasedZoning.name, e);
            throw e;
        }
    }
    async listCityZones(company_id) {
        try {
            const KEY = this.cache.generateForeignKey(this.SPC_CITY_ZONES_KEY);
            const client = await this.cache.getClient();
            const val = await client.hGetAll(KEY);
            const items = [];
            if (val) {
                Object.values(val).forEach(value => {
                    const v = JSON.parse(value);
                    items.push(v);
                });
            }
            return items.filter(item => item.company === company_id);
        }
        catch (e) {
            this.logger.error(this.listCityZones.name, e);
            throw e;
        }
    }
}
exports.default = PricingCacheManager;
//# sourceMappingURL=pricing.cache-manager.js.map