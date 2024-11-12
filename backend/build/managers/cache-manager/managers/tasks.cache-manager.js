import config from '../../../config';
import initLogger from '../../../utilities/logging';
import Container from "typedi";
import CacheManager from "..";
export default class TasksCacheManager {
    constructor() {
        this.CACHE_KEY = 'frozenTasks';
        this.EXPIRATION = 3600 * 48;
        this.cache = Container.get(CacheManager);
        this.logger = initLogger('COMPONENT', `${this.constructor.name}`);
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
                service: options.serviceName || config.currentService.name,
                taskId,
                frozen: true
            }));
            setTimeout(async () => {
                this.unfreeze(options.serviceName || config.currentService.name, taskId);
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
//# sourceMappingURL=tasks.cache-manager.js.map