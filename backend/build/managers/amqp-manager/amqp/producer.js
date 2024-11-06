"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMqProducer = void 0;
const common_1 = require("./common");
const logging_1 = __importDefault(require("../../../utilities/logging"));
class RabbitMqProducer {
    constructor(connectionFactory) {
        this.connectionFactory = connectionFactory;
        this.logger = (0, logging_1.default)('BROKER', `${common_1.LOG_PREFIX}${this.constructor.name}`);
    }
    async publish(queue, message) {
        const queueConfig = (0, common_1.asQueueNameConfig)(queue);
        const settings = this.getQueueSettings(queueConfig.dlx);
        try {
            const connection = await this.connectionFactory.create();
            const channel = await connection.createChannel();
            // this.logger.event("Publishing Message", message, queueConfig.name, settings);
            return Promise.resolve(await channel.assertQueue(queueConfig.name, settings))
                .then(() => {
                if (!channel.sendToQueue(queueConfig.name, this.getMessageBuffer(message), { persistent: true })) {
                    this.logger.error("unable to send message to queue '%j' {%j}", queueConfig, message);
                    return Promise.reject(new Error("Unable to send message"));
                }
                this.logger.debug("message sent to queue '%s'", queueConfig.name);
            });
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    getMessageBuffer(message) {
        return Buffer.from(JSON.stringify(message), 'utf8');
    }
    getQueueSettings(deadletterExchangeName) {
        return {
            durable: true,
            autoDelete: false,
            arguments: {
                'x-dead-letter-exchange': deadletterExchangeName
            }
        };
    }
}
exports.RabbitMqProducer = RabbitMqProducer;
//# sourceMappingURL=producer.js.map