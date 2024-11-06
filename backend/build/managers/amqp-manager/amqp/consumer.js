"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMqConsumer = void 0;
const common_1 = require("./common");
const logging_1 = __importDefault(require("../../../utilities/logging"));
const murmurhash_js_1 = require("murmurhash-js");
const timer_utilities_1 = require("../../../utilities/system/timer.utilities");
class RabbitMqConsumer {
    constructor(connectionFactory) {
        this.connectionFactory = connectionFactory;
        this._failedMessages = {};
        this.logger = (0, logging_1.default)('BROKER', `${common_1.LOG_PREFIX}${this.constructor.name}`);
    }
    async subscribe(queue, action) {
        try {
            const queueConfig = (0, common_1.asQueueNameConfig)(queue);
            const connection = await this.connectionFactory.create();
            const channel = await connection.createChannel();
            this.logger.success("got channel for queue '%s'", queueConfig.name);
            await this.setupChannel(channel, queueConfig);
            const disposer = await this.subscribeToChannel(channel, queueConfig, action);
            return disposer;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    setupChannel(channel, queueConfig) {
        // this.logger.debug("setup '%j'", queueConfig);
        return Promise.all(this.getChannelSetup(channel, queueConfig));
    }
    async subscribeToChannel(channel, queueConfig, action) {
        this.logger.event("subscribing to queue '%s'", queueConfig.name);
        return channel.consume(queueConfig.name, (message) => {
            let payload;
            try {
                payload = this.getMessageObject(message);
                // this.logger.value("message arrived from queue '%s' (%j)", queueConfig.name, payload);
                Promise.resolve(action(payload))
                    .then((executionResult) => {
                    // this.logger.debug("message processed from queue '%s' (%j)", queueConfig.name, payload);
                    // this.logger.line.value("execution result", queueConfig.name, executionResult);
                    if (executionResult.fulfilled)
                        channel.ack(message);
                    else {
                        // this.logger.error("message processing failed from queue '%j'", queueConfig, payload);
                        this.requeueMessage(channel, message);
                    }
                })
                    .catch((err) => { throw err; });
            }
            catch (error) {
                this.logger.error("message processing failed from queue '%j' (%j)", queueConfig, payload, error);
                this.requeueMessage(channel, message);
            }
        })
            .then(opts => {
            this.logger.info("subscribed to queue '%s' (%s)", queueConfig.name, opts.consumerTag);
            return (() => {
                this.logger.event("disposing subscriber to queue '%s' (%s)", queueConfig.name, opts.consumerTag);
                channel.cancel(opts.consumerTag);
            });
        }).catch((error) => {
            this.logger.error("failed to subscribe to queue '%s'", queueConfig.name, error);
            throw error; // rethrow
        });
    }
    async requeueMessage(channel, message) {
        const key = (0, murmurhash_js_1.murmur3)(message, 1);
        if (!this._failedMessages[key]) {
            this._failedMessages[key] = 1;
        }
        this._failedMessages[key]++;
        if (this._failedMessages[key] >= 4) {
            this.logger.error("message requeued too many times", key);
            channel.nack(message, false, false);
            delete this._failedMessages[key];
            return;
        }
        const retryDelay = (2 ** this._failedMessages[key]) * 1000;
        await (0, timer_utilities_1.delay)(retryDelay);
        this.logger.warn(`requeueing message key: ${key}, trial:`, this._failedMessages[key]);
        channel.nack(message, false, true);
    }
    getMessageObject(message) {
        return JSON.parse(message.content.toString('utf8'));
    }
    getChannelSetup(channel, queueConfig) {
        return [
            channel.assertQueue(queueConfig.name, this.getQueueSettings(queueConfig.dlx)),
            channel.assertQueue(queueConfig.dlq, this.getDLSettings()),
            channel.assertExchange(queueConfig.dlx, 'fanout', this.getDLSettings()),
            channel.bindQueue(queueConfig.dlq, queueConfig.dlx, '*')
        ];
    }
    getQueueSettings(deadletterExchangeName) {
        const settings = this.getDLSettings();
        settings.arguments = {
            'x-dead-letter-exchange': deadletterExchangeName
        };
        return settings;
    }
    getDLSettings() {
        return {
            durable: true,
            autoDelete: false
        };
    }
}
exports.RabbitMqConsumer = RabbitMqConsumer;
//# sourceMappingURL=consumer.js.map