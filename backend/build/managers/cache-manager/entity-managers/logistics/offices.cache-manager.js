"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const __1 = __importDefault(require("../.."));
const logging_1 = __importDefault(require("../../../../utilities/logging"));
const utils_helpers_1 = require("../../../../utilities/helpers/utils.helpers");
/**
 * @description Cache manager for Offices
 */
class OfficesCacheManager {
    constructor() {
        this.EXPIRATION = 3600 * 48;
        this.ENTITY = "office";
        this.cache = typedi_1.default.get(__1.default);
        this.logger = (0, logging_1.default)("COMPONENT", `${this.constructor.name}`);
    }
    static getInstance() {
        if (!OfficesCacheManager.instance) {
            OfficesCacheManager.instance = new OfficesCacheManager();
        }
        return OfficesCacheManager.instance;
    }
    async get(id, config) {
        return this.cache.get(this.ENTITY, id, (0, utils_helpers_1.defaults)(config, {
            expiration: this.EXPIRATION,
            force_load_from_db: true,
            company: null,
        }));
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
        return this.cache.list(this.ENTITY, config);
    }
    async set(id, value, company) {
        return this.cache.set(this.ENTITY, id, value, company);
    }
    async unset(id, company) {
        return this.cache.unset(this.ENTITY, id, company);
    }
    async unsetAll(company) {
        return this.cache.unsetAll(this.ENTITY, company);
    }
}
exports.default = OfficesCacheManager;
//# sourceMappingURL=offices.cache-manager.js.map