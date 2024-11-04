import * as amqp from "amqplib";
import { IRabbitMqConnectionFactory } from "./connectionFactory";
import { IQueueNameConfig, LOG_PREFIX, asQueueNameConfig } from "./common";
import initLogger, { LoggerService } from "../../../utilities/logging";

export class RabbitMqProducer {
  private logger: LoggerService;

  public constructor(private connectionFactory: IRabbitMqConnectionFactory) {
    this.logger = initLogger('BROKER', `${LOG_PREFIX}${this.constructor.name}`);
  }

  public async publish<T>(queue: string | IQueueNameConfig, message: T): Promise<void> {
    const queueConfig = asQueueNameConfig(queue);
    const settings = this.getQueueSettings(queueConfig.dlx);

    try {

      const connection = await this.connectionFactory.create();
      const channel = await connection.createChannel();
      // this.logger.event("Publishing Message", message, queueConfig.name, settings);

      return Promise.resolve(await channel.assertQueue(queueConfig.name, settings))
        .then(() => {
          if (!channel.sendToQueue(queueConfig.name, this.getMessageBuffer(message), { persistent: true })) {
            this.logger.error("unable to send message to queue '%j' {%j}", queueConfig, message)
            return Promise.reject(new Error("Unable to send message"))
          }
          this.logger.debug("message sent to queue '%s'", queueConfig.name)
        });
    } catch (error) {
      return Promise.reject(error)
    }
  }

  protected getMessageBuffer<T>(message: T) {
    return Buffer.from(JSON.stringify(message), 'utf8');
  }

  protected getQueueSettings(deadletterExchangeName: string): amqp.Options.AssertQueue {
    return {
      durable: true,
      autoDelete: false,
      arguments: {
        'x-dead-letter-exchange': deadletterExchangeName
      }
    }
  }
}