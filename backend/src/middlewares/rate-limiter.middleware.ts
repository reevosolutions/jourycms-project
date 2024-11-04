import { Options, rateLimit } from 'express-rate-limit';
import RedisStore, { RedisReply } from 'rate-limit-redis';
import { createClient } from 'redis';

const client = createClient()
// Then connect to the Redis server
client.connect().then(() => {
}).catch((err) => {
  console.error(err)
});


/**
 * @description Rate limiter middleware
 * @param {Options} options 
 * @returns {NextFunction} The next function to be called
 */
const rateLimiter = (options: Partial<Options>) => rateLimit({
  ...options,
  validate: {trustProxy: false},
  store: new RedisStore({
    sendCommand: (...args: string[]) => client.sendCommand(args) as Promise<RedisReply>,
  }),
})



export default rateLimiter;
