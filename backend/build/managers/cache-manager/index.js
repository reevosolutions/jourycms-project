"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const redis_1 = require("redis");
const typedi_1 = require("typedi");
const exceptions_1 = require("../../utilities/exceptions");
const logging_1 = __importDefault(require("../../utilities/logging"));
const heavy_computing_cache_manager_1 = __importDefault(require("./managers/heavy-computing.cache-manager"));
const actions_cache_manager_1 = __importDefault(require("./managers/actions.cache-manager"));
const tasks_cache_manager_1 = __importDefault(require("./managers/tasks.cache-manager"));
const fcm_tokens_cache_manager_1 = __importDefault(require("./managers/fcm-tokens.cache-manager"));
const config_1 = __importDefault(require("../../config"));
const utils_helpers_1 = require("../../utilities/helpers/utils.helpers");
const users_cache_manager_1 = __importDefault(require("./entity-managers/auth/users.cache-manager"));
const roles_cache_manager_1 = __importDefault(require("./entity-managers/auth/roles.cache-manager"));
const permission_groups_cache_manager_1 = __importDefault(require("./entity-managers/auth/permission-groups.cache-manager"));
const api_keys_cache_manager_1 = __importDefault(require("./entity-managers/auth/api-keys.cache-manager"));
const permissions_cache_manager_1 = __importDefault(require("./entity-managers/auth/permissions.cache-manager"));
const apps_cache_manager_1 = __importDefault(require("./entity-managers/system/apps.cache-manager"));
const sdk_1 = require("../../utilities/data/sdk");
const exceptions_2 = __importDefault(require("../../exceptions"));
let CacheManager = class CacheManager {
    constructor() {
        this.logger = (0, logging_1.default)("COMPONENT", `${this.constructor.name}`);
        this.getClient();
    }
    async getClient() {
        if (this.client)
            return this.client;
        this.client = (0, redis_1.createClient)({
            url: config_1.default.cacheManager.redis.url,
        });
        this.client.on("error", (err) => {
            this.logger.error(this.getClient.name, "Redis Client Error", err);
        });
        await this.client.connect();
        this.logger.success(this.getClient.name, "Redis client connected successfully");
        return this.client;
    }
    _entityRelatedToCompany(entity) {
        const notRelated = [
            "app",
        ];
        return !notRelated.includes(entity);
    }
    generateEntityKey(entity, company) {
        if (this._entityRelatedToCompany(entity) && company)
            return `${config_1.default.cacheManager.keyPrefix || "LUP_V2:"}${company}:${entity}`;
        else
            return `${config_1.default.cacheManager.keyPrefix || "LUP_V2:"}noCompany:${entity}`;
    }
    generateForeignKey(id, company) {
        if (company)
            return `${config_1.default.cacheManager.keyPrefix || "LUP_V2:FOREIGN:"}${company}:${id}`;
        else
            return `${config_1.default.cacheManager.keyPrefix || "LUP_V2:FOREIGN:"}noCompany:${id}`;
    }
    async getCollectionEntries(key) {
        try {
            const client = await this.getClient();
            let entries = (await client.hGetAll(key));
            if (entries && Object.keys(entries).length) {
                entries = Object.entries(entries).reduce((prev, [k, entry]) => {
                    return Object.assign(Object.assign({}, prev), { [k]: JSON.parse(entry) });
                }, {});
            }
            return entries;
        }
        catch (error) {
            this.logger.error(this.getCollectionEntries.name, error);
            throw error;
        }
    }
    async setForeign(key, id, value, config) {
        try {
            const client = await this.getClient();
            await client.hSet(this.generateForeignKey(key, config.company || null), id.toString(), JSON.stringify({
                last_updated: new Date(),
                value,
            }));
        }
        catch (error) {
            this.logger.error(this.setForeign.name, error);
            throw error;
        }
    }
    async getForeign(key, id, config = {
        expiration: 3600 * 24,
        company: null,
    }) {
        try {
            /**
             * Apply defaults on config
             */
            config = (0, utils_helpers_1.defaults)(config, {
                expiration: 3600 * 24,
                company: null,
            });
            if (!id)
                return null;
            const client = await this.getClient();
            const obj = await client.hGet(this.generateForeignKey(key, config.company), id.toString());
            if (!obj) {
                return null;
            }
            const parsed = JSON.parse(obj);
            if (!this.isExpired(parsed.last_updated, config.expiration)) {
                return parsed.value;
            }
            else
                this.logger.warn(this.get.name, key, "EXPIRED", id);
            return null;
        }
        catch (error) {
            this.logger.error(this.setForeign.name, error);
            throw error;
        }
    }
    async unsetForeign(key, id, company) {
        try {
            const client = await this.getClient();
            await client.hDel(this.generateForeignKey(key, company), id);
        }
        catch (error) {
            this.logger.error(this.unsetForeign.name, error);
            throw error;
        }
    }
    /**
     *
     * @param {Date} date
     * @param {number} expiration in seconds
     */
    isExpired(last_updated, expiration) {
        return !(0, moment_1.default)(last_updated).isAfter((0, moment_1.default)().subtract(expiration, "seconds"));
    }
    generateLogItemName(method) {
        return `${this.constructor.name}:${method.name}`;
    }
    async loadObjectByIdFormDB(entity, id) {
        try {
            let data;
            let result;
            const sdk = (0, sdk_1.initJouryCMSSdk)();
            switch (entity) {
                // auth
                case "user":
                    data = await sdk.auth.users.getById(id);
                    result = data === null || data === void 0 ? void 0 : data.data;
                    break;
                case "apiKey":
                    data = await sdk.auth.apiKeys.getById(id);
                    result = data === null || data === void 0 ? void 0 : data.data;
                    break;
                case "role":
                    data = await sdk.auth.roles.getById(id);
                    result = data === null || data === void 0 ? void 0 : data.data;
                    break;
                case "permission":
                    data = await sdk.auth.permissions.getById(id);
                    result = data === null || data === void 0 ? void 0 : data.data;
                    break;
                default:
                    throw new exceptions_2.default.InternalServerError(`Data loading not handled for this entity: ${entity}`);
                    break;
            }
            this.logger.value(this.loadObjectByIdFormDB.name, entity, id, !!result);
            if (!result)
                this.logger.trace.warn(this.loadObjectByIdFormDB.name, entity, id, "NOT FOUND");
            return result;
        }
        catch (error) {
            this.logger.save.error({
                name: this.generateLogItemName(this.loadObjectByIdFormDB),
                payload: {
                    entity,
                    id,
                    error: (0, exceptions_1.errorToObject)(error),
                },
            });
            return;
        }
    }
    async loadListFromDB(entity, query, company) {
        try {
            let data;
            let result = [];
            query = Object.assign(Object.assign({}, (query || {})), { filters: Object.assign({}, ((query === null || query === void 0 ? void 0 : query.filters) || {})) });
            if (company && this._entityRelatedToCompany(entity))
                query.filters.company = company;
            const sdk = (0, sdk_1.initJouryCMSSdk)();
            switch (entity) {
                // auth
                case "user":
                    data = await sdk.auth.users.list(query);
                    result = data === null || data === void 0 ? void 0 : data.data;
                    break;
                case "role":
                    data = await sdk.auth.roles.list(query);
                    result = data === null || data === void 0 ? void 0 : data.data;
                    break;
                case "apiKey":
                    data = await sdk.auth.apiKeys.list(query);
                    result = data === null || data === void 0 ? void 0 : data.data;
                    break;
                case "permission":
                    data = await sdk.auth.permissions.list(query);
                    result = data === null || data === void 0 ? void 0 : data.data;
                    break;
                default:
                    throw new exceptions_2.default.InternalServerError(`Data loading not handled for this entity: ${entity}`);
                    break;
            }
            return result;
        }
        catch (error) {
            this.logger.error(this.generateLogItemName(this.loadListFromDB), {
                entity,
                query,
                error: (0, exceptions_1.errorToObject)(error),
            });
            this.logger.save.error({
                name: this.generateLogItemName(this.loadListFromDB),
                payload: {
                    entity,
                    query,
                    error: (0, exceptions_1.errorToObject)(error),
                },
            });
            return;
        }
    }
    /* -------------------------------------------------------------------------- */
    /*                            START COMMON METHODS                            */
    /* -------------------------------------------------------------------------- */
    async set(entity, id, value, company = null, config = {
        customKey: null,
    }) {
        try {
            /**
             * Apply defaults on config
             */
            config = (0, utils_helpers_1.defaults)(config, {
                customKey: null,
            });
            const customKey = config.customKey ? config.customKey : entity;
            const now = new Date();
            const client = await this.getClient();
            await client.hSet(this.generateEntityKey(customKey, company), id.toString(), JSON.stringify({
                value,
                last_updated: now,
            }));
            if (!company && value.company) {
                await this.set(entity, id, value, value.company);
            }
        }
        catch (error) {
            this.logger.save.error({
                name: this.generateLogItemName(this.set),
                payload: {
                    entity,
                    id,
                    value,
                },
            });
            throw error;
        }
    }
    async get(entity, id, config = {
        expiration: 3600 * 24,
        force_load_from_db: true,
        company: null,
        customKey: null,
    }) {
        try {
            /**
             * Apply defaults on config
             */
            config = (0, utils_helpers_1.defaults)(config, {
                expiration: 3600 * 24,
                force_load_from_db: true,
                company: null,
                customKey: null,
            });
            const customKey = config.customKey ? config.customKey : entity;
            if (!id)
                return null;
            const client = await this.getClient();
            const val = await client.hGet(this.generateEntityKey(customKey, config.company), id.toString());
            let oldDoc;
            if (val) {
                oldDoc = JSON.parse(val);
            }
            if (oldDoc) {
                if (!this.isExpired(oldDoc.last_updated, config.expiration)) {
                    return oldDoc.value;
                }
                else
                    this.logger.warn(entity, "EXPIRED", id);
            }
            else
                this.logger.warn(entity, "NOT FOUND", id);
            if (!config.force_load_from_db)
                return null;
            const db_object = await this.loadObjectByIdFormDB(entity, id);
            if (db_object) {
                await this.set(customKey, id, db_object, config.company);
            }
            return db_object;
        }
        catch (error) {
            this.logger.save.error({
                name: this.generateLogItemName(this.get),
                payload: {
                    entity,
                    id,
                    error: (0, exceptions_1.errorToObject)(error),
                },
            });
            return null;
        }
    }
    async getMany(entity, ids, config = {
        expiration: 3600 * 24,
        force_load_from_db: true,
        company: null,
    }) {
        try {
            if (!(ids === null || ids === void 0 ? void 0 : ids.length))
                return [];
            /**
             * Apply defaults on config
             */
            config = (0, utils_helpers_1.defaults)(config, {
                expiration: 3600 * 24,
                force_load_from_db: true,
                company: null,
            });
            return ids.reduce(async (previousPromise, currentItem) => {
                const accumulator = await previousPromise;
                const result = await this.get(entity, currentItem === null || currentItem === void 0 ? void 0 : currentItem.toString(), config);
                return [...accumulator, result];
            }, Promise.resolve([]));
        }
        catch (error) {
            this.logger.save.error({
                name: this.generateLogItemName(this.get),
                payload: {
                    entity,
                    ids,
                    config,
                    error: (0, exceptions_1.errorToObject)(error),
                },
            });
            return [];
        }
    }
    async unset(entity, id, company = null) {
        try {
            const client = await this.getClient();
            await client.hDel(this.generateEntityKey(entity, company), id.toString());
        }
        catch (error) {
            this.logger.save.error({
                name: this.generateLogItemName(this.unset),
                payload: {
                    entity,
                    id,
                    error: (0, exceptions_1.errorToObject)(error),
                },
            });
            throw error;
        }
    }
    async unsetAll(entity, company = null) {
        try {
            const client = await this.getClient();
            await client.del(this.generateEntityKey(entity, company));
        }
        catch (error) {
            this.logger.save.error({
                name: this.generateLogItemName(this.unsetAll),
                payload: {
                    entity,
                    error: (0, exceptions_1.errorToObject)(error),
                },
            });
            throw error;
        }
    }
    async list(entity, config = {
        query: {},
        force_load_from_db: true,
        filter: () => true,
        company: null,
        customKey: null,
    }) {
        var _a, _b;
        try {
            /**
             * Apply defaults on config
             */
            config = (0, utils_helpers_1.defaults)(config, {
                query: {},
                force_load_from_db: true,
                filter: () => true,
                company: null,
                customKey: null,
            });
            const customKey = config.customKey ? config.customKey : entity;
            let result = [];
            const client = await this.getClient();
            const valuesObject = await client.hGetAll(this.generateEntityKey(customKey, config.company || ((_b = (_a = config.query) === null || _a === void 0 ? void 0 : _a.filters) === null || _b === void 0 ? void 0 : _b.company)));
            if (valuesObject) {
                for (let idx = 0; idx < Object.values(valuesObject).length; idx++) {
                    const val = Object.values(valuesObject)[idx];
                    let oldDoc;
                    if (val) {
                        oldDoc = JSON.parse(val);
                    }
                    if (oldDoc) {
                        result.push(oldDoc.value);
                    }
                }
            }
            result = result.filter(config.filter);
            if (!result.length && config.force_load_from_db) {
                const loadedData = await this.loadListFromDB(entity, config.query, config.company);
                for (let idx = 0; idx < (loadedData === null || loadedData === void 0 ? void 0 : loadedData.length) || 0; idx++) {
                    const item = loadedData[idx];
                    await this.set(entity, item["_id"], item, config.company);
                }
                return (loadedData || []).filter(config.filter);
            }
            else
                return result;
        }
        catch (error) {
            this.logger.error(error.message, error);
        }
    }
    async getConfigValue(id, defaultValue) {
        const client = await this.getClient();
        const val = await client.hGet("configuration", id);
        if (val) {
            const value = JSON.parse(val);
            return value;
        }
        else
            return defaultValue;
    }
    async setConfigValue(id, value) {
        const client = await this.getClient();
        await client.hSet("configuration", id, JSON.stringify(value));
    }
    /* -------------------------------------------------------------------------- */
    /*                             END COMMON METHODS                             */
    /* -------------------------------------------------------------------------- */
    get actions() {
        return actions_cache_manager_1.default.getInstance();
    }
    get fcmTokens() {
        return fcm_tokens_cache_manager_1.default.getInstance();
    }
    get heavyComputing() {
        return heavy_computing_cache_manager_1.default.getInstance();
    }
    get tasks() {
        return tasks_cache_manager_1.default.getInstance();
    }
    /* -------------------------------------------------------------------------- */
    /*                               ENTITY MANAGERS                              */
    /* -------------------------------------------------------------------------- */
    get apiKeys() {
        return api_keys_cache_manager_1.default.getInstance();
    }
    get permissions() {
        return permissions_cache_manager_1.default.getInstance();
    }
    get permissionGroups() {
        return permission_groups_cache_manager_1.default.getInstance();
    }
    get roles() {
        return roles_cache_manager_1.default.getInstance();
    }
    get users() {
        return users_cache_manager_1.default.getInstance();
    }
    get apps() {
        return apps_cache_manager_1.default.getInstance();
    }
    async flushAll() {
        const client = await this.getClient();
        const keys = await client.sendCommand(["keys", "*"]);
        keys.forEach((key) => {
            if (key.startsWith(`${config_1.default.cacheManager.keyPrefix || "LUP_V2_"}`)) {
                this.logger.info(this.flushAll.name, key);
                client.del(key);
            }
        });
        // client.multi().keys('*' as any).exec((err: any, keys: string[]) => {
        // });
    }
};
CacheManager = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], CacheManager);
exports.default = CacheManager;
//# sourceMappingURL=index.js.map