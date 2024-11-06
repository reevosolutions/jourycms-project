"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const __1 = __importDefault(require("../.."));
const logging_1 = __importDefault(require("../../../../utilities/logging"));
const utils_helpers_1 = require("../../../../utilities/helpers/utils.helpers");
const moment_1 = __importDefault(require("moment"));
const date_constants_1 = require("../../../../constants/date.constants");
/**
 * @description Cache manager for Cities
 */
class CitiesCacheManager {
    constructor() {
        this.EXPIRATION = 3600 * 48;
        this.ENTITY = "city";
        this.cache = typedi_1.default.get(__1.default);
        this.logger = (0, logging_1.default)("COMPONENT", `${this.constructor.name}`);
    }
    static getInstance() {
        if (!CitiesCacheManager.instance) {
            CitiesCacheManager.instance = new CitiesCacheManager();
        }
        return CitiesCacheManager.instance;
    }
    async get(id, config) {
        return this.cache.get(this.ENTITY, id, (0, utils_helpers_1.defaults)(config, {
            expiration: this.EXPIRATION,
            force_load_from_db: true,
            company: null,
        }));
    }
    async getByCode(country_code, state_code, city_code, config) {
        return this.cache.get("city", city_code, Object.assign(Object.assign({}, (0, utils_helpers_1.defaults)(config, {
            expiration: this.EXPIRATION,
            company: null,
        })), { force_load_from_db: false, customKey: `${this.ENTITY}:${country_code}:${state_code}` }));
    }
    async getCountryCities(country_code, config) {
        return this.cache.list(this.ENTITY, {
            query: {},
            force_load_from_db: false,
            customKey: `${this.ENTITY}:${country_code}:ALL`,
        });
    }
    async getStateCities(country_code, state_code, config) {
        return this.cache.list(this.ENTITY, {
            query: {},
            force_load_from_db: false,
            customKey: `${this.ENTITY}:${country_code}:${state_code}`,
        });
    }
    async getMany(ids, config = {
        expiration: 3600 * 24,
        force_load_from_db: true,
        company: null,
    }) {
        return this.cache.getMany(this.ENTITY, ids, config);
    }
    async list(config = {
        query: {},
        force_load_from_db: true,
    }) {
        await this.revalidateCache();
        return this.cache.list(this.ENTITY, config);
    }
    async set(id, value, company) {
        await this.cache.set(this.ENTITY, value.code, value, company, {
            customKey: `${this.ENTITY}:${value.country_code}:${value.state_code}`,
        });
        await this.cache.set(this.ENTITY, value.code, value, company, {
            customKey: `${this.ENTITY}:${value.country_code}:ALL`,
        });
        return this.cache.set(this.ENTITY, id, value, company);
    }
    async unset(id, company) {
        return this.cache.unset(this.ENTITY, id, company);
    }
    async unsetAll(company) {
        return this.cache.unsetAll(this.ENTITY, company);
    }
    async revalidateCache() {
        const citiesLastUpdatedAt = await this.cache.getConfigValue("CITIES_LAST_UPDATED_AT", (0, moment_1.default)().subtract(20, "day").toDate());
        if (this.cache.isExpired(citiesLastUpdatedAt, date_constants_1.SECONDS_IN_AN_HOUR)) {
            const cities = await this.cache.loadListFromDB("city", {
                count: -1,
            }, null);
            for (let idx = 0; idx < cities.length; idx++) {
                const city = cities[idx];
                await this.set(city._id, city);
            }
            await this.cache.setConfigValue("CITIES_LAST_UPDATED_AT", (0, moment_1.default)().toDate());
        }
    }
}
exports.default = CitiesCacheManager;
//# sourceMappingURL=cities.cache-manager.js.map