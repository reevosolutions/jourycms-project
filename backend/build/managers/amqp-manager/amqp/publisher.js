"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMqPublisher = void 0;
const common_1 = require("./common");
const logging_1 = __importDefault(require("../../../utilities/logging"));
class RabbitMqPublisher {
    constructor(connectionFactory) {
        this.connectionFactory = connectionFactory;
        this.logger = (0, logging_1.default)('BROKER', `${common_1.LOG_PREFIX}${this.constructor.name}`);
    }
    async publish(queue, message) {
        const queueConfig = (0, common_1.asPubSubQueueNameConfig)(queue);
        try {
            const connection = await this.connectionFactory.create();
            const channel = await connection.createChannel();
            this.logger.debug("got channel for exchange '%s'", queueConfig.dlx);
            await this.setupChannel(channel, queueConfig);
            return Promise.resolve(channel.publish(queueConfig.dlx, '', this.getMessageBuffer(message))).then(() => {
                this.logger.success("message sent to exchange '%s' (%j)", queueConfig.dlx, message);
            });
        }
        catch (error) {
            this.logger.error("unable to send message to exchange '%j' {%j}", queueConfig.dlx, message);
            return Promise.reject(new Error("Unable to send message"));
        }
    }
    setupChannel(channel, queueConfig) {
        this.logger.debug("setup '%j'", queueConfig);
        return Promise.all(this.getChannelSetup(channel, queueConfig));
    }
    getMessageBuffer(message) {
        return Buffer.from(JSON.stringify(message), 'utf8');
    }
    getChannelSetup(channel, queueConfig) {
        return [
            channel.assertExchange(queueConfig.dlx, 'fanout', this.getSettings()),
        ];
    }
    getSettings() {
        return {
            durable: false,
        };
    }
}
exports.RabbitMqPublisher = RabbitMqPublisher;
//# sourceMappingURL=publisher.js.map