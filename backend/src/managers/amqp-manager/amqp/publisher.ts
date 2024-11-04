import * as amqp from "amqplib";
import { IRabbitMqConnectionFactory } from "./connectionFactory";
import { IQueueNameConfig, LOG_PREFIX, asPubSubQueueNameConfig } from "./common";
import initLogger, { LoggerService } from "../../../utilities/logging";

export class RabbitMqPublisher {
  private logger: LoggerService;

  public constructor(private connectionFactory: IRabbitMqConnectionFactory) {
    this.logger = initLogger('BROKER', `${LOG_PREFIX}${this.constructor.name}`);

  }

  public async publish<T>(queue: string | IQueueNameConfig, message: T): Promise<void> {
    const queueConfig = asPubSubQueueNameConfig(queue);

    try {
      const connection = await this.connectionFactory.create();
      const channel = await connection.createChannel();
      this.logger.debug("got channel for exchange '%s'", queueConfig.dlx);
      await this.setupChannel(channel, queueConfig);
      return Promise.resolve(channel.publish(queueConfig.dlx, '', this.getMessageBuffer(message))).then(() => {
        this.logger.success("message sent to exchange '%s' (%j)", queueConfig.dlx, message)
      });

    } catch (error) {
      this.logger.error("unable to send message to exchange '%j' {%j}", queueConfig.dlx, message)
      return Promise.reject(new Error("Unable to send message"))
    }

  }

  private setupChannel(channel: amqp.Channel, queueConfig: IQueueNameConfig) {
    this.logger.debug("setup '%j'", queueConfig);
    return Promise.all(this.getChannelSetup(channel, queueConfig));
  }

  protected getMessageBuffer<T>(message: T) {
    return Buffer.from(JSON.stringify(message), 'utf8');
  }

  protected getChannelSetup(channel: amqp.Channel, queueConfig: IQueueNameConfig) {
    return [
      channel.assertExchange(queueConfig.dlx, 'fanout', this.getSettings()),
    ]
  }

  protected getSettings(): amqp.Options.AssertQueue {
    return {
      durable: false,
    }
  }
}

