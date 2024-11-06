"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../../../utilities/logging"));
const uuid_1 = require("uuid");
const typedi_1 = __importDefault(require("typedi"));
const __1 = __importDefault(require(".."));
class PdfPregenerationKeysCacheManager {
    constructor() {
        this.CACHE_KEY = "pdfPreGenerationTokens";
        this.EXPIRATION = 3600 * 1;
        this.cache = typedi_1.default.get(__1.default);
        this.logger = (0, logging_1.default)("COMPONENT", `${this.constructor.name}`);
    }
    static getInstance() {
        if (!PdfPregenerationKeysCacheManager.instance) {
            PdfPregenerationKeysCacheManager.instance =
                new PdfPregenerationKeysCacheManager();
        }
        return PdfPregenerationKeysCacheManager.instance;
    }
    async setToken(params) {
        try {
            const now = new Date();
            const client = await this.cache.getClient();
            const token = `${now.getTime()}${(0, uuid_1.v4)()}${(0, uuid_1.v4)()}`.replace(/-/g, "");
            this.logger.event(this.setToken.name, `UPDATING ITEM ${token}`);
            await client.hSet(this.cache.generateForeignKey(this.CACHE_KEY), token, JSON.stringify({
                params,
                last_updated: now,
            }));
            return token;
        }
        catch (e) {
            this.logger.error(this.setToken.name, e);
            throw e;
        }
    }
    async getTokenParams(token) {
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
                    this.logger.warn(this.getTokenParams.name, `TOKEN EXPIRED ${token}`);
                }
                return oldDoc.params;
            }
            else
                this.logger.warn(this.getTokenParams.name, `TOKEN NOT FOUND ${token}`);
            return null;
        }
        catch (error) {
            this.logger.error(this.getTokenParams.name, error);
            return null;
        }
    }
    async unsetToken(token) {
        const client = await this.cache.getClient();
        await client.hDel(this.CACHE_KEY, token);
    }
}
exports.default = PdfPregenerationKeysCacheManager;
//# sourceMappingURL=pdf-pregeneration-keys.cache-manager.js.map