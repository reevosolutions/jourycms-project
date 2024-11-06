"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../../../utilities/logging"));
const typedi_1 = __importDefault(require("typedi"));
const __1 = __importDefault(require(".."));
class ParcelListingRequestsCacheManager {
    constructor() {
        this.CACHE_KEY = 'parcelListingRequests';
        /**
         * in seconds
         */
        this.EXPIRATION = 60 * 5;
        this.cache = typedi_1.default.get(__1.default);
        this.logger = (0, logging_1.default)('COMPONENT', `${this.constructor.name}`);
    }
    static getInstance() {
        if (!ParcelListingRequestsCacheManager.instance) {
            ParcelListingRequestsCacheManager.instance = new ParcelListingRequestsCacheManager();
        }
        return ParcelListingRequestsCacheManager.instance;
    }
    async setParcelList(token, items) {
        try {
            const now = new Date();
            const expiration = 60 * 5;
            const client = await this.cache.getClient();
            await client.hSet(this.cache.generateForeignKey(this.CACHE_KEY), token, JSON.stringify({
                items,
                date: now,
            }));
        }
        catch (e) {
            this.logger.error(this.setParcelList.name, e);
            throw e;
        }
    }
    async loadParcelList(token) {
        try {
            const client = await this.cache.getClient();
            const value = await client.hGet(this.cache.generateForeignKey(this.CACHE_KEY), token);
            if (value) {
                client.hDel(this.cache.generateForeignKey(this.CACHE_KEY), token);
                return JSON.parse(value);
            }
            return;
        }
        catch (e) {
            this.logger.error(this.loadParcelList.name, e);
            throw e;
        }
    }
}
exports.default = ParcelListingRequestsCacheManager;
//# sourceMappingURL=parcel-listing-requests.cache-manager.js.map