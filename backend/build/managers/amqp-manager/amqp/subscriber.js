"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMqSubscriber = void 0;
const common_1 = require("./common");
const logging_1 = __importDefault(require("../../../utilities/logging"));
class RabbitMqSubscriber {
    constructor(connectionFactory) {
        this.connectionFactory = connectionFactory;
        this.logger = (0, logging_1.default)('BROKER', `${common_1.LOG_PREFIX}${this.constructor.name}`);
    }
    async subscribe(queue, action) {
        try {
            const queueConfig = (0, common_1.asPubSubQueueNameConfig)(queue);
            const connection = await this.connectionFactory.create();
            const channel = await connection.createChannel();
            this.logger.debug("got channel for queue '%s'", queueConfig.name);
            return this.setupChannel(channel, queueConfig)
                .then((queueName) => {
                this.logger.success("queue name generated for subscription queue '(%s)' is '(%s)'", queueConfig.name, queueName);
                const queConfig = Object.assign(Object.assign({}, queueConfig), { dlq: queueName });
                return this.subscribeToChannel(channel, queConfig, action);
            });
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    setupChannel(channel, queueConfig) {
        this.logger.debug("setup '%j'", queueConfig);
        return this.getChannelSetup(channel, queueConfig);
    }
    async subscribeToChannel(channel, queueConfig, action) {
        this.logger.event("subscribing to queue '%s'", queueConfig.name);
        return channel.consume(queueConfig.dlq, (message) => {
            let msg;
            try {
                msg = this.getMessageObject(message);
                this.logger.value("message arrived from queue '%s' (%j)", queueConfig.name, msg);
                Promise.resolve(action(msg))
                    .then((executionResult) => {
                    this.logger.debug("message processed from queue '%s' (%j)", queueConfig.name, msg);
                    this.logger.value("execution result", queueConfig.name, executionResult);
                    channel.ack(message);
                })
                    .catch((err) => { throw err; });
            }
            catch (error) {
                this.logger.error("message processing failed from queue '%j' (%j)", queueConfig, msg, error);
                channel.nack(message, false, false);
            }
        })
            .then(opts => {
            this.logger.success("subscribed to queue '%s' (%s)", queueConfig.name, opts.consumerTag);
            return (() => {
                this.logger.event("disposing subscriber to queue '%s' (%s)", queueConfig.name, opts.consumerTag);
                channel.cancel(opts.consumerTag);
            });
        }).catch((error) => {
            this.logger.error("failed to subscribe to queue '%s'", queueConfig.name, error);
            throw error;
        });
    }
    getMessageObject(message) {
        return JSON.parse(message.content.toString('utf8'));
    }
    async getChannelSetup(channel, queueConfig) {
        await channel.assertExchange(queueConfig.dlx, 'fanout', this.getDLSettings());
        const result = await channel.assertQueue(queueConfig.dlq, this.getQueueSettings(queueConfig.dlx));
        await channel.bindQueue(result.queue, queueConfig.dlx, '');
        return result.queue;
    }
    getQueueSettings(deadLetterExchange) {
        return {
            deadLetterExchange,
            exclusive: true
        };
    }
    getDLSettings() {
        return {
            durable: false
        };
    }
}
exports.RabbitMqSubscriber = RabbitMqSubscriber;
//# sourceMappingURL=subscriber.js.map