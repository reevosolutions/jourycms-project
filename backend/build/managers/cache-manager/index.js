var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import moment from "moment";
import { createClient } from "redis";
import { Service } from "typedi";
import { errorToObject } from "../../utilities/exceptions";
import initLogger from "../../utilities/logging";
import HeavyComputingCacheManager from "./managers/heavy-computing.cache-manager";
import ActionsCacheManager from "./managers/actions.cache-manager";
import TasksCacheManager from "./managers/tasks.cache-manager";
import FCMTokensCacheManager from "./managers/fcm-tokens.cache-manager";
import config from "../../config";
import { defaults } from "../../utilities/helpers/utils.helpers";
import UsersCacheManager from "./entity-managers/auth/users.cache-manager";
import RolesCacheManager from "./entity-managers/auth/roles.cache-manager";
import PermissionGroupsCacheManager from "./entity-managers/auth/permission-groups.cache-manager";
import ApiKeysCacheManager from "./entity-managers/auth/api-keys.cache-manager";
import PermissionsCacheManager from "./entity-managers/auth/permissions.cache-manager";
import AppsCacheManager from "./entity-managers/system/apps.cache-manager";
import { initJouryCMSSdk } from "../../utilities/data/sdk";
import exceptions from "../../exceptions";
let CacheManager = class CacheManager {
    constructor() {
        this.logger = initLogger("COMPONENT", `${this.constructor.name}`);
        this.getClient();
    }
    async getClient() {
        if (this.client)
            return this.client;
        this.client = createClient({
            url: config.cacheManager.redis.url,
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
            return `${config.cacheManager.keyPrefix || "LUP_V2:"}${company}:${entity}`;
        else
            return `${config.cacheManager.keyPrefix || "LUP_V2:"}noCompany:${entity}`;
    }
    generateForeignKey(id, company) {
        if (company)
            return `${config.cacheManager.keyPrefix || "LUP_V2:FOREIGN:"}${company}:${id}`;
        else
            return `${config.cacheManager.keyPrefix || "LUP_V2:FOREIGN:"}noCompany:${id}`;
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
            config = defaults(config, {
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
        return !moment(last_updated).isAfter(moment().subtract(expiration, "seconds"));
    }
    generateLogItemName(method) {
        return `${this.constructor.name}:${method.name}`;
    }
    async loadObjectByIdFormDB(entity, id) {
        try {
            let data;
            let result;
            const sdk = initJouryCMSSdk();
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
                    throw new exceptions.InternalServerError(`Data loading not handled for this entity: ${entity}`);
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
                    error: errorToObject(error),
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
            const sdk = initJouryCMSSdk();
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
                    throw new exceptions.InternalServerError(`Data loading not handled for this entity: ${entity}`);
                    break;
            }
            return result;
        }
        catch (error) {
            this.logger.error(this.generateLogItemName(this.loadListFromDB), {
                entity,
                query,
                error: errorToObject(error),
            });
            this.logger.save.error({
                name: this.generateLogItemName(this.loadListFromDB),
                payload: {
                    entity,
                    query,
                    error: errorToObject(error),
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
            config = defaults(config, {
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
            config = defaults(config, {
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
                    error: errorToObject(error),
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
            config = defaults(config, {
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
                    error: errorToObject(error),
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
                    error: errorToObject(error),
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
                    error: errorToObject(error),
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
            config = defaults(config, {
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
        return ActionsCacheManager.getInstance();
    }
    get fcmTokens() {
        return FCMTokensCacheManager.getInstance();
    }
    get heavyComputing() {
        return HeavyComputingCacheManager.getInstance();
    }
    get tasks() {
        return TasksCacheManager.getInstance();
    }
    /* -------------------------------------------------------------------------- */
    /*                               ENTITY MANAGERS                              */
    /* -------------------------------------------------------------------------- */
    get apiKeys() {
        return ApiKeysCacheManager.getInstance();
    }
    get permissions() {
        return PermissionsCacheManager.getInstance();
    }
    get permissionGroups() {
        return PermissionGroupsCacheManager.getInstance();
    }
    get roles() {
        return RolesCacheManager.getInstance();
    }
    get users() {
        return UsersCacheManager.getInstance();
    }
    get apps() {
        return AppsCacheManager.getInstance();
    }
    async flushAll() {
        const client = await this.getClient();
        const keys = await client.sendCommand(["keys", "*"]);
        keys.forEach((key) => {
            if (key.startsWith(`${config.cacheManager.keyPrefix || "LUP_V2_"}`)) {
                this.logger.info(this.flushAll.name, key);
                client.del(key);
            }
        });
        // client.multi().keys('*' as any).exec((err: any, keys: string[]) => {
        // });
    }
};
CacheManager = __decorate([
    Service(),
    __metadata("design:paramtypes", [])
], CacheManager);
export default CacheManager;
//# sourceMappingURL=index.js.map