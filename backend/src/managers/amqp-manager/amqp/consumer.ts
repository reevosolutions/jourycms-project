import * as amqp from "amqplib";
import { IRabbitMqConnectionFactory } from "./connectionFactory";
import { IQueueNameConfig, LOG_PREFIX, asQueueNameConfig } from "./common";
import initLogger, { LoggerService } from "../../../utilities/logging";
import { murmur3 } from "murmurhash-js";
import { delay } from "../../../utilities/system/timer.utilities";



export interface IRabbitMqConsumerDisposer {
  (): Promise<void>;
}

export class RabbitMqConsumer {

  private logger: LoggerService;
  private _failedMessages: { [K: string]: number } = {};


  public constructor(private connectionFactory: IRabbitMqConnectionFactory) {
    this.logger = initLogger('BROKER', `${LOG_PREFIX}${this.constructor.name}`);

  }

  public async subscribe<PayloadType>(queue: string | IQueueNameConfig, action: (payload: PayloadType) => Promise<{
    fulfilled: boolean;
  }>): Promise<IRabbitMqConsumerDisposer> {

    try {
      
      const queueConfig = asQueueNameConfig(queue);
      
      const connection = await this.connectionFactory.create();
      const channel = await connection.createChannel();
      
      this.logger.success("got channel for queue '%s'", queueConfig.name);
      
      await this.setupChannel(channel, queueConfig);
      const disposer = await this.subscribeToChannel<PayloadType>(channel, queueConfig, action);
      return disposer;
      
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private setupChannel(channel: amqp.Channel, queueConfig: IQueueNameConfig) {
    // this.logger.debug("setup '%j'", queueConfig);
    return Promise.all(this.getChannelSetup(channel, queueConfig));
  }

  private async subscribeToChannel<PayloadType>(channel: amqp.Channel, queueConfig: IQueueNameConfig, action: (payload: PayloadType) => Promise<{
    fulfilled: boolean;
  }>) {
    this.logger.event("subscribing to queue '%s'", queueConfig.name);
    return channel.consume(queueConfig.name, (message: amqp.Message) => {
      let payload: PayloadType;
      try {
        payload = this.getMessageObject<PayloadType>(message);
        // this.logger.value("message arrived from queue '%s' (%j)", queueConfig.name, payload);
        Promise.resolve(action(payload))
          .then((executionResult) => {
            // this.logger.debug("message processed from queue '%s' (%j)", queueConfig.name, payload);
            // this.logger.line.value("execution result", queueConfig.name, executionResult);
            if (executionResult.fulfilled) channel.ack(message);
            else {
              // this.logger.error("message processing failed from queue '%j'", queueConfig, payload);
              this.requeueMessage(channel, message);
            }
          })
          .catch((err) => { throw err; });
      } catch (error) {
        this.logger.error("message processing failed from queue '%j' (%j)", queueConfig, payload, error);
        this.requeueMessage(channel, message);
      }

    })
      .then(opts => {
        this.logger.info("subscribed to queue '%s' (%s)", queueConfig.name, opts.consumerTag)
        return (() => {
          this.logger.event("disposing subscriber to queue '%s' (%s)", queueConfig.name, opts.consumerTag)
          channel.cancel(opts.consumerTag);
        }) as IRabbitMqConsumerDisposer
      }).catch((error) => {
        this.logger.error("failed to subscribe to queue '%s'", queueConfig.name, error);
        throw error;  // rethrow
      });
  }

  protected async requeueMessage(channel: amqp.Channel, message: amqp.Message) {
    const key = murmur3(message, 1);
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
    await delay(retryDelay);
    this.logger.warn(`requeueing message key: ${key}, trial:`, this._failedMessages[key]);
    channel.nack(message, false, true);
  }

  protected getMessageObject<PayloadType>(message: amqp.Message) {
    return JSON.parse(message.content.toString('utf8')) as PayloadType;
  }

  protected getChannelSetup(channel: amqp.Channel, queueConfig: IQueueNameConfig) {
    return [
      channel.assertQueue(queueConfig.name, this.getQueueSettings(queueConfig.dlx)),
      channel.assertQueue(queueConfig.dlq, this.getDLSettings()),
      channel.assertExchange(queueConfig.dlx, 'fanout', this.getDLSettings()),
      channel.bindQueue(queueConfig.dlq, queueConfig.dlx, '*')
    ]
  }

  protected getQueueSettings(deadletterExchangeName: string): amqp.Options.AssertQueue {
    const settings = this.getDLSettings();
    settings.arguments = {
      'x-dead-letter-exchange': deadletterExchangeName
    }
    return settings;
  }

  protected getDLSettings(): amqp.Options.AssertQueue {
    return {
      durable: true,
      autoDelete: false
    }
  }
}

