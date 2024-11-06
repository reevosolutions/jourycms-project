"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = require("express-rate-limit");
const rate_limit_redis_1 = __importDefault(require("rate-limit-redis"));
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
// Then connect to the Redis server
client.connect().then(() => {
}).catch((err) => {
    console.error(err);
});
/**
 * @description Rate limiter middleware
 * @param {Options} options
 * @returns {NextFunction} The next function to be called
 */
const rateLimiter = (options) => (0, express_rate_limit_1.rateLimit)(Object.assign(Object.assign({}, options), { validate: { trustProxy: false }, store: new rate_limit_redis_1.default({
        sendCommand: (...args) => client.sendCommand(args),
    }) }));
exports.default = rateLimiter;
//# sourceMappingURL=rate-limiter.middleware.js.map