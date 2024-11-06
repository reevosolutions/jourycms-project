"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const __1 = __importDefault(require(".."));
const time_utilities_1 = require("../../../utilities/date/time.utilities");
const logging_1 = __importDefault(require("../../../utilities/logging"));
const moment_1 = __importDefault(require("moment"));
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 25-02-2024 18:02:08
 */
class HeavyComputingCacheManager {
    constructor() {
        this.CACHE_KEY = "heavyComputing";
        this.cache = typedi_1.default.get(__1.default);
        this.logger = (0, logging_1.default)("COMPONENT", `${this.constructor.name}`);
    }
    static getInstance() {
        if (!HeavyComputingCacheManager.instance) {
            HeavyComputingCacheManager.instance = new HeavyComputingCacheManager();
        }
        return HeavyComputingCacheManager.instance;
    }
    /**
     *
     * @param {string} name
     * @param {number} expiration  in seconds
     * @param generator Function that returns a promise
     * @returns {data?: any,last_updated?: Date,found: boolean,expired: boolean,}
     */
    async get(name, expiration = 7200, generator, force_regenerate) {
        try {
            if (!name)
                return null;
            const now = new Date();
            const client = await this.cache.getClient();
            const val = await client.hGet(this.cache.generateForeignKey(this.CACHE_KEY), name);
            let oldDoc;
            if (val) {
                oldDoc = JSON.parse(val);
            }
            if (oldDoc) {
                const expired = this.cache.isExpired(oldDoc.last_updated, expiration);
                const next_update = expired || force_regenerate
                    ? now
                    : (0, moment_1.default)(oldDoc.last_updated).add(expiration, "seconds").toDate();
                if (expired || force_regenerate) {
                    const timer = this.logger.timer;
                    generator()
                        .then((value) => {
                        this.logger.success(`Updated expired or force regenerated heavy computing result successful in:`, `${timer.timeString}s`, name.cyan);
                        this.set(name, value);
                    })
                        .catch((e) => {
                        this.logger.success(`Updating expired or force regenerated heavy computing result failed in:`, `${timer.timeString}s`, name.cyan, e.message, e);
                        this.logger.error(this.get.name, name, e);
                    });
                    this.logger.warn(expired
                        ? "Heavy computing result expired"
                        : "Forcing regenerate result", name, {
                        last_updated: oldDoc.last_updated,
                        expiration_in: `${(0, time_utilities_1.millisecondsToTimeString)(expiration * 1000)}`,
                    });
                }
                return Object.assign(Object.assign({}, oldDoc), { found: true, expired, next_update });
            }
            else {
                const timer = this.logger.timer;
                generator()
                    .then((value) => {
                    this.logger.success(`Updated not found heavy computing result successful in:`, `${timer.timeString}s`, name.cyan);
                    this.set(name, value);
                })
                    .catch((e) => {
                    this.logger.error(this.get.name, name, e);
                    this.logger.error(`Updating not found heavy computing result failed in:`, `${timer.timeString}s`, name.cyan, e.message, e);
                });
                this.logger.error("Heavy computing result not found", name);
            }
            return { found: false, expired: false, next_update: now };
        }
        catch (e) {
            this.logger.error(this.get.name, name, e);
            throw e;
        }
    }
    async set(name, data) {
        try {
            const now = new Date();
            const client = await this.cache.getClient();
            this.logger.event("Updating heavy computing result store", name);
            await client.hSet(this.cache.generateForeignKey(this.CACHE_KEY), name, JSON.stringify({
                value: data,
                last_updated: now,
            }));
        }
        catch (e) {
            this.logger.error(this.set.name, name, e);
            throw e;
        }
    }
    async unset(name) {
        try {
            const now = new Date();
            const client = await this.cache.getClient();
            this.logger.event(this.unset.name, name);
            await client.hDel(this.cache.generateForeignKey(this.CACHE_KEY), name);
        }
        catch (e) {
            this.logger.error(this.unset.name, name, e);
            throw e;
        }
    }
}
exports.default = HeavyComputingCacheManager;
//# sourceMappingURL=heavy-computing.cache-manager.js.map