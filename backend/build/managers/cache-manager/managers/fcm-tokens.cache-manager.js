import initLogger from '../../../utilities/logging';
import Container from "typedi";
import CacheManager from "..";
export default class FCMTokensCacheManager {
    constructor() {
        this.CACHE_KEY = 'fcmTokens';
        this.EXPIRATION = 3600 * 48;
        this.cache = Container.get(CacheManager);
        this.logger = initLogger('COMPONENT', `${this.constructor.name}`);
    }
    static getInstance() {
        if (!FCMTokensCacheManager.instance) {
            FCMTokensCacheManager.instance = new FCMTokensCacheManager();
        }
        return FCMTokensCacheManager.instance;
    }
    /**
     * @generator Levelup
     * @author dr. Salmi <reevosolutions@gmail.com>
     * @since 25-02-2024 17:06:22
     */
    async set(tokenObject) {
        try {
            const now = new Date();
            const client = await this.cache.getClient();
            this.logger.event(this.set.name, `UPDATING ITEM ${tokenObject.fcm_token}`);
            await client.hSet(this.cache.generateForeignKey(this.CACHE_KEY), tokenObject.fcm_token, JSON.stringify(Object.assign(Object.assign({}, tokenObject), { last_updated: now })));
        }
        catch (e) {
            this.logger.error(this.set.name, e);
            throw e;
        }
    }
    /**
     * @generator Levelup
     * @since 25-02-2024 17:06:22
     */
    async get(token) {
        try {
            if (!token)
                return null;
            const client = await this.cache.getClient();
            const val = await client.hGet(this.cache.generateForeignKey(this.CACHE_KEY), token);
            let oldDoc;
            if (val) {
                oldDoc = JSON.parse(val);
            }
            if (oldDoc) {
                if (this.cache.isExpired(oldDoc.last_updated, this.EXPIRATION)) {
                    this.logger.warn(this.get.name, 'EXPIRED', token);
                }
                return oldDoc.value;
            }
            else
                this.logger.warn(this.get.name, 'NOT FOUND', token);
            return null;
        }
        catch (e) {
            this.logger.error(this.get.name, e);
            throw e;
        }
    }
    /**
     * @generator Levelup
     * @since 25-02-2024 17:06:22
     */
    async unset(token) {
        try {
            const client = await this.cache.getClient();
            this.logger.event(this.unset.name, `DELETING ITEM ${token}`);
            await client.hDel(this.cache.generateForeignKey(this.CACHE_KEY), token);
        }
        catch (e) {
            this.logger.error(this.unset.name, e);
            throw e;
        }
    }
    /**
     * @generator Levelup
     * @since 25-02-2024 17:06:22
     */
    async list() {
        try {
            const client = await this.cache.getClient();
            const val = await client.hGetAll(this.cache.generateForeignKey(this.CACHE_KEY));
            const FCMTokens = [];
            if (val && Object.values(val).length) {
                Object.values(val).forEach(value => {
                    const v = JSON.parse(value);
                    FCMTokens.push(v.FCMToken);
                });
            }
            if (FCMTokens.length) {
                this.logger.success(this.list.name, 'FCMToken items found on redis');
                return FCMTokens;
            }
            else {
                this.logger.warn(this.list.name, 'FCMToken items not found on DB or not filled');
            }
        }
        catch (e) {
            this.logger.error(this.list.name, e);
            throw e;
        }
    }
}
//# sourceMappingURL=fcm-tokens.cache-manager.js.map