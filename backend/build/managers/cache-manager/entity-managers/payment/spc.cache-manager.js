"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const __1 = __importDefault(require("../.."));
const logging_1 = __importDefault(require("../../../../utilities/logging"));
/**
 * @description Cache manager for Offices
 */
class SpcCacheManager {
    constructor() {
        this.EXPIRATION = 3600 * 48;
        this.CITY_ZONE_ENTITY = "spcCityZone";
        this.STATE_ZONE_ENTITY = "spcStateZone";
        this.CITY_BASED_ZONING_ENTITY = "spcCityBasedZoning";
        this.STATE_BASED_ZONING_ENTITY = "spcStateBasedZoning";
        this.cache = typedi_1.default.get(__1.default);
        this.logger = (0, logging_1.default)("COMPONENT", `${this.constructor.name}`);
    }
    static getInstance() {
        if (!SpcCacheManager.instance) {
            SpcCacheManager.instance = new SpcCacheManager();
        }
        return SpcCacheManager.instance;
    }
    /* -------------------------------- City Zone ------------------------------- */
    async getCityZone(zone, company) {
        return this.cache.get(`${this.CITY_ZONE_ENTITY}`, zone.toString(), {
            expiration: this.EXPIRATION,
            force_load_from_db: true,
            company: company,
        });
    }
    async getManyCityZones(zones, config = {
        expiration: 3600 * 24,
        force_load_from_db: true,
        company: null,
    }) {
        return this.cache.getMany(this.CITY_ZONE_ENTITY, zones.map((z) => z.toString()), config);
    }
    async listCityZones(config = {
        query: {},
        force_load_from_db: true,
        company: null,
    }) {
        return this.cache.list(this.CITY_ZONE_ENTITY, config);
    }
    async setCityZone(zone, value, company) {
        return this.cache.set(this.CITY_ZONE_ENTITY, zone.toString(), value, company);
    }
    async unsetCityZone(zone, company) {
        return this.cache.unset(this.CITY_ZONE_ENTITY, zone.toString(), company);
    }
    async unsetAllCityZones(company) {
        return this.cache.unsetAll(this.CITY_ZONE_ENTITY, company);
    }
    /* -------------------------------- State Zone ------------------------------- */
    async getStateZone(zone, company) {
        return this.cache.get(`${this.STATE_ZONE_ENTITY}`, zone.toString(), {
            expiration: this.EXPIRATION,
            force_load_from_db: true,
            company: company,
        });
    }
    async getManyStateZones(zones, config = {
        expiration: 3600 * 24,
        force_load_from_db: true,
        company: null,
    }) {
        return this.cache.getMany(this.STATE_ZONE_ENTITY, zones.map((z) => z.toString()), config);
    }
    async listStateZones(config = {
        query: {},
        force_load_from_db: true,
        company: null,
    }) {
        return this.cache.list(this.STATE_ZONE_ENTITY, config);
    }
    async setStateZone(zone, value, company) {
        return this.cache.set(this.STATE_ZONE_ENTITY, zone.toString(), value, company);
    }
    async unsetStateZone(zone, company) {
        return this.cache.unset(this.STATE_ZONE_ENTITY, zone.toString(), company);
    }
    async unsetAllStateZones(company) {
        return this.cache.unsetAll(this.STATE_ZONE_ENTITY, company);
    }
    /* --------------------------- state based pricing -------------------------- */
    async getStateBasedZoning(code, company) {
        return this.cache.get(this.STATE_BASED_ZONING_ENTITY, code.toString(), {
            expiration: this.EXPIRATION,
            force_load_from_db: true,
            company: company,
        });
    }
    async getManyStateBasedZonings(codes, config = {
        expiration: 3600 * 24,
        force_load_from_db: true,
        company: null,
    }) {
        return this.cache.getMany(this.STATE_BASED_ZONING_ENTITY, codes, config);
    }
    async listStateBasedZonings(config = {
        query: {},
        force_load_from_db: true,
        company: null,
    }) {
        return this.cache.list(this.STATE_BASED_ZONING_ENTITY, config);
    }
    async setStateBasedZoning(value) {
        return this.cache.set(this.STATE_BASED_ZONING_ENTITY, value.state_code, value, value.company);
    }
    async unsetStateBasedZoning(code, company) {
        return this.cache.unset(this.STATE_BASED_ZONING_ENTITY, code, company);
    }
    async unsetAllStateBasedZonings(company) {
        return this.cache.unsetAll(this.STATE_BASED_ZONING_ENTITY, company);
    }
    /* --------------------------- city based pricing -------------------------- */
    async getCityBasedZoning(state_code, company) {
        return this.cache.get(this.CITY_BASED_ZONING_ENTITY, state_code.toString(), {
            expiration: this.EXPIRATION,
            force_load_from_db: true,
            company: company,
        });
    }
    async getManyCityBasedZonings(state_codes, config = {
        expiration: 3600 * 24,
        force_load_from_db: true,
        company: null,
    }) {
        return this.cache.getMany(this.CITY_BASED_ZONING_ENTITY, state_codes, config);
    }
    async listCityBasedZonings(config = {
        query: {},
        force_load_from_db: true,
        company: null,
    }) {
        return this.cache.list(this.CITY_BASED_ZONING_ENTITY, config);
    }
    async setCityBasedZoning(value) {
        return this.cache.set(this.CITY_BASED_ZONING_ENTITY, value.state_code, value, value.company);
    }
    async unsetCityBasedZoning(state_code, company) {
        return this.cache.unset(this.CITY_BASED_ZONING_ENTITY, state_code, company);
    }
    async unsetAllCityBasedZonings(company) {
        return this.cache.unsetAll(this.CITY_BASED_ZONING_ENTITY, company);
    }
}
exports.default = SpcCacheManager;
//# sourceMappingURL=spc.cache-manager.js.map