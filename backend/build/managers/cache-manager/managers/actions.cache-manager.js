import Container from "typedi";
import CacheManager from "..";
import config from "../../../config";
import initLogger from "../../../utilities/logging";
export default class ActionsCacheManager {
    constructor() {
        this.CACHE_KEY = "blockedActions";
        this.EXPIRATION = 3600 * 48;
        this.cache = Container.get(CacheManager);
        this.logger = initLogger("COMPONENT", `${this.constructor.name}`);
    }
    static getInstance() {
        if (!ActionsCacheManager.instance) {
            ActionsCacheManager.instance = new ActionsCacheManager();
        }
        return ActionsCacheManager.instance;
    }
    async block(actionId, options = {
        maxFreezeTime: 1000 * 60 * 30,
    }) {
        try {
            const client = await this.cache.getClient();
            await client.hSet(this.cache.generateForeignKey(this.CACHE_KEY), actionId, JSON.stringify({
                service: options.serviceName || config.currentService.name,
                actionId,
                blocked: true,
            }));
            setTimeout(async () => {
                this.unblock(options.serviceName || config.currentService.name, actionId);
            }, options.maxFreezeTime);
        }
        catch (e) {
            this.logger.error(this.block.name, e);
            throw e;
        }
    }
    async unblock(serviceName, actionId) {
        try {
            const client = await this.cache.getClient();
            await client.hSet(this.cache.generateForeignKey(this.CACHE_KEY), actionId, JSON.stringify({
                service: serviceName,
                actionId,
                blocked: false,
            }));
        }
        catch (e) {
            this.logger.error(this.unblock.name, e);
        }
    }
    async isBlocked(serviceName, actionId) {
        try {
            const client = await this.cache.getClient();
            const value = (await client.hGet(this.cache.generateForeignKey(this.CACHE_KEY), actionId)) || `{service: "${serviceName}", blocked: false}`;
            const object = JSON.parse(value) || {
                service: serviceName,
                actionId,
                blocked: false,
            };
            this.logger.value(this.isBlocked.name, { value, object });
            if (object.service === serviceName && object.blocked) {
                return true;
            }
            return false;
        }
        catch (e) {
            this.logger.error(this.isBlocked.name, e);
            return false;
        }
    }
    async unblockAllServiceActions(serviceName) {
        try {
            const client = await this.cache.getClient();
            const val = await client.hGetAll(this.cache.generateForeignKey(this.CACHE_KEY));
            if (val) {
                Object.keys(val).forEach(async (key) => {
                    const value = JSON.parse(val[key]);
                    if (value.service === serviceName) {
                        await client.hSet(this.cache.generateForeignKey(this.CACHE_KEY), key, JSON.stringify({
                            service: serviceName,
                            actionId: value.actionId,
                            blocked: false,
                        }));
                    }
                });
            }
        }
        catch (e) {
            this.logger.error(this.unblockAllServiceActions.name, e);
            throw e;
        }
    }
    async unblockAllActionsForAllServices() {
        try {
            const client = await this.cache.getClient();
            const val = await client.hGetAll(this.cache.generateForeignKey(this.CACHE_KEY));
            if (val) {
                Object.keys(val).forEach(async (key) => {
                    const value = JSON.parse(val[key]);
                    await client.hSet(this.cache.generateForeignKey(this.CACHE_KEY), key, JSON.stringify({
                        service: value.service,
                        actionId: value.actionId,
                        blocked: false,
                    }));
                });
            }
        }
        catch (e) {
            this.logger.error(this.unblockAllActionsForAllServices.name, e);
            throw e;
        }
    }
}
//# sourceMappingURL=actions.cache-manager.js.map