"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../config"));
const logging_1 = __importDefault(require("../../../utilities/logging"));
const typedi_1 = __importDefault(require("typedi"));
const __1 = __importDefault(require(".."));
class TasksCacheManager {
    constructor() {
        this.CACHE_KEY = 'frozenTasks';
        this.EXPIRATION = 3600 * 48;
        this.cache = typedi_1.default.get(__1.default);
        this.logger = (0, logging_1.default)('COMPONENT', `${this.constructor.name}`);
    }
    static getInstance() {
        if (!TasksCacheManager.instance) {
            TasksCacheManager.instance = new TasksCacheManager();
        }
        return TasksCacheManager.instance;
    }
    async freeze(taskId, options = {
        maxFreezeTime: 1000 * 60 * 30,
    }) {
        try {
            const client = await this.cache.getClient();
            await client.hSet(this.cache.generateForeignKey(this.CACHE_KEY), taskId, JSON.stringify({
                service: options.serviceName || config_1.default.currentService.name,
                taskId,
                frozen: true
            }));
            setTimeout(async () => {
                this.unfreeze(options.serviceName || config_1.default.currentService.name, taskId);
            }, options.maxFreezeTime);
        }
        catch (e) {
            this.logger.error(this.freeze.name, e);
            throw e;
        }
    }
    async unfreeze(serviceName, taskId) {
        try {
            const client = await this.cache.getClient();
            await client.hSet(this.cache.generateForeignKey(this.CACHE_KEY), taskId, JSON.stringify({
                service: serviceName,
                taskId,
                frozen: false
            }));
        }
        catch (e) {
            this.logger.error(this.unfreeze.name, e);
        }
    }
    async isFrozen(serviceName, taskId) {
        try {
            const client = await this.cache.getClient();
            const value = await client.hGet(this.cache.generateForeignKey(this.CACHE_KEY), taskId) || `{service: "${serviceName}", frozen: false}`;
            const object = JSON.parse(value) || {
                service: serviceName,
                taskId,
                frozen: false
            };
            this.logger.value(this.isFrozen.name, { value, object });
            if (object.service === serviceName && object.frozen) {
                return true;
            }
            return false;
        }
        catch (e) {
            this.logger.error(this.isFrozen.name, e);
            return false;
        }
    }
    async unfreezeAllServiceTasks(serviceName) {
        try {
            const client = await this.cache.getClient();
            const val = await client.hGetAll(this.cache.generateForeignKey(this.CACHE_KEY));
            if (val) {
                Object.keys(val).forEach(async (key) => {
                    const value = JSON.parse(val[key]);
                    if (value.service === serviceName) {
                        await client.hSet(this.cache.generateForeignKey(this.CACHE_KEY), key, JSON.stringify({
                            service: serviceName,
                            taskId: value.taskId,
                            frozen: false
                        }));
                    }
                });
            }
        }
        catch (e) {
            this.logger.error(this.unfreezeAllServiceTasks.name, e);
            throw e;
        }
    }
}
exports.default = TasksCacheManager;
//# sourceMappingURL=tasks.cache-manager.js.map