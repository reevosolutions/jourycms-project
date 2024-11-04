import * as amqp from "amqplib";
import { IRabbitMqConnectionFactory } from "./connectionFactory";
import { IQueueNameConfig, LOG_PREFIX, asPubSubQueueNameConfig } from "./common";
import initLogger, { LoggerService } from "../../../utilities/logging";

export interface IRabbitMqSubscriberDisposer {
  (): Promise<void>;
}

export class RabbitMqSubscriber {

  private logger: LoggerService;

  public constructor(private connectionFactory: IRabbitMqConnectionFactory) {
    this.logger = initLogger('BROKER', `${LOG_PREFIX}${this.constructor.name}`);
  }

  public async subscribe<T>(queue: string | IQueueNameConfig, action: (message: T) => Promise<any> | void): Promise<IRabbitMqSubscriberDisposer> {
    try {

      const queueConfig = asPubSubQueueNameConfig(queue);

      const connection = await this.connectionFactory.create();
      const channel = await connection.createChannel();
      this.logger.debug("got channel for queue '%s'", queueConfig.name);
      return this.setupChannel(channel, queueConfig)
        .then((queueName) => {
          this.logger.success("queue name generated for subscription queue '(%s)' is '(%s)'", queueConfig.name, queueName);
          const queConfig = { ...queueConfig, dlq: queueName }
          return this.subscribeToChannel<T>(channel, queConfig, action);
        });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private setupChannel(channel: amqp.Channel, queueConfig: IQueueNameConfig) {
    this.logger.debug("setup '%j'", queueConfig);
    return this.getChannelSetup(channel, queueConfig);
  }

  private async subscribeToChannel<T>(channel: amqp.Channel, queueConfig: IQueueNameConfig, action: (message: T) => Promise<any> | void) {
    this.logger.event("subscribing to queue '%s'", queueConfig.name);
    return channel.consume(queueConfig.dlq, (message) => {
      let msg: T;

      try {
        msg = this.getMessageObject<T>(message);
        this.logger.value("message arrived from queue '%s' (%j)", queueConfig.name, msg)
        Promise.resolve(action(msg))
          .then((executionResult) => {
            this.logger.debug("message processed from queue '%s' (%j)", queueConfig.name, msg);
            this.logger.value("execution result", queueConfig.name, executionResult);
            channel.ack(message)
          })
          .catch((err) => { throw err; });
      } catch (error) {
        this.logger.error("message processing failed from queue '%j' (%j)", queueConfig, msg, error);
        channel.nack(message, false, false);
      }

    })
      .then(opts => {
        this.logger.success("subscribed to queue '%s' (%s)", queueConfig.name, opts.consumerTag)
        return (() => {
          this.logger.event("disposing subscriber to queue '%s' (%s)", queueConfig.name, opts.consumerTag)
          channel.cancel(opts.consumerTag);
        }) as IRabbitMqSubscriberDisposer
      }).catch((error) => {
        this.logger.error("failed to subscribe to queue '%s'", queueConfig.name, error);
        throw error;
      });
  }

  protected getMessageObject<T>(message: amqp.Message) {
    return JSON.parse(message.content.toString('utf8')) as T;
  }

  protected async getChannelSetup(channel: amqp.Channel, queueConfig: IQueueNameConfig) {
    await channel.assertExchange(queueConfig.dlx, 'fanout', this.getDLSettings());
    const result = await channel.assertQueue(queueConfig.dlq, this.getQueueSettings(queueConfig.dlx));
    await channel.bindQueue(result.queue, queueConfig.dlx, '');
    return result.queue;
  }

  protected getQueueSettings(deadLetterExchange: string): amqp.Options.AssertQueue {
    return {
      deadLetterExchange,
      exclusive: true
    }
  }

  protected getDLSettings(): amqp.Options.AssertQueue {
    return {
      durable: false
    }
  }
}
