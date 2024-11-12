import Container from 'typedi';
import CacheManager from '../..';
import initLogger from '../../../../utilities/logging';
import { defaults } from '../../../../utilities/helpers/utils.helpers';
/**
 * @description Cache manager for ApiKeys
 */
export default class ApiKeysCacheManager {
    constructor() {
        this.EXPIRATION = 3600 * 48;
        this.ENTITY = "apiKey";
        this.cache = Container.get(CacheManager);
        this.logger = initLogger("COMPONENT", `${this.constructor.name}`);
    }
    static getInstance() {
        if (!ApiKeysCacheManager.instance) {
            ApiKeysCacheManager.instance = new ApiKeysCacheManager();
        }
        return ApiKeysCacheManager.instance;
    }
    async get(id, config) {
        return this.cache.get(this.ENTITY, id, defaults(config, {
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
//# sourceMappingURL=api-keys.cache-manager.js.map