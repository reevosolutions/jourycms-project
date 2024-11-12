import { rateLimit } from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { createClient } from 'redis';
const client = createClient();
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
const rateLimiter = (options) => rateLimit(Object.assign(Object.assign({}, options), { validate: { trustProxy: false }, store: new RedisStore({
        sendCommand: (...args) => client.sendCommand(args),
    }) }));
export default rateLimiter;
//# sourceMappingURL=rate-limiter.middleware.js.map