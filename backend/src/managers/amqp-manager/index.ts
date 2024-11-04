/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26 July 2000 👑
 * @since 30-04-2024 00:38:44
*/
import { Service, Container } from 'typedi';
import { IRabbitMqConnectionConfig, RabbitMqConnectionFactory, RabbitMqConsumer, RabbitMqProducer } from "./amqp";
import config from '../../config';
import { amqpEventListeningServices, amqpSubscribers } from '../../config/events.config';
import { AmqpEventHandlerReturnType, AmqpEventSubscriber, DetectEventExecutionResult, DetectEventPayload, EventNames } from '../../utils/interfaces';
import BaseService from '../../services/base.service';



@Service()
export default class AmqpManager extends BaseService {

  private _initialized: boolean = false;
  private config: IRabbitMqConnectionConfig;
  private connectionFactory: RabbitMqConnectionFactory;
  private producer: RabbitMqProducer;
  private consumer: RabbitMqConsumer;

  public constructor() {
    super();
    this._init();
  }

  private async _init(): Promise<boolean> {
    try {
      if (this._initialized)
        return true;


      // config amqp
      this.config = {
        host: config.amqplib.host,
        port: config.amqplib.port,
        username: config.amqplib.user,
        password: config.amqplib.password,
      };

      // init amqp
      this.connectionFactory = new RabbitMqConnectionFactory(this.config);
      this.producer = new RabbitMqProducer(this.connectionFactory);
      this.consumer = new RabbitMqConsumer(this.connectionFactory);

      // init event subscribers
      await this._initEventSubscribers();

      this._initialized = true;
      return true;
    } catch (error) {
      this.logger.line.error('AMQP: init error', error);
    }
  }

  private async _initEventSubscribers(): Promise<void> {
    try {
      for (let idx = 0; idx < Object.keys(amqpSubscribers).length; idx++) {
        const eventName = Object.keys(amqpSubscribers)[idx];
        const subscriber: AmqpEventSubscriber<EventNames> = amqpSubscribers[eventName];

        const currentServiceQueueName = this._buildServiceQueueName(config.currentService.name, subscriber.event);
        // this.logger.info("initEventSubscribers: subscriber: ", subscriber);
        this.consumer.subscribe(currentServiceQueueName, async (payload: DetectEventPayload<EventNames>) => {
          // message received
          // this.logger.line.debug("Message received", payload);
          try {
            const result: AmqpEventHandlerReturnType<EventNames, boolean> = await subscriber.handler(subscriber.event, payload);
            if (result.fulfilled) this._handleSuccessHandlerResult(result.result);
            else this._handleErrorHandlerResult(result.error);
            // message handled
            return { fulfilled: result.fulfilled };
          } catch (error) {
            this._handleErrorHandlerResult(error);
            return { fulfilled: false };
          }
        }).then(disposer => {
          // this.logger.info("Consumer subscription can be disposed here", disposer);
          // disposer().then(() => { this.logger.info("Consumer subscription disposed"); });
        }).catch(err => {
          // failed to create consumer subscription!
          this.logger.line.error("Failed to create consumer subscription", err);
        });

      }
    } catch (error) {
      this.logger.line.error('initEventSubscribers error', error);
    }
  }

  /**
   * 
   * @param event 
   * @param payload 
   * @returns it was boolean >> void
   */
  public async publishEvent<E extends EventNames>(event: E, payload: DetectEventPayload<E>): Promise<void[]> {
    try {
      if (amqpEventListeningServices[event] === undefined || amqpEventListeningServices[event].length === 0) {
        this.logger.warn(`AMQP:publishEvent: No service is listening to the event ${event}`);
        return;
      }

      const promises = amqpEventListeningServices[event].map(service => {
        return this.producer.publish<DetectEventPayload<E>>(this._buildServiceQueueName(service, event), payload);
      });


      const result = await Promise.all(promises);
      return result;
    } catch (error) {
      this.logger.error('AMQP:publishEvent error', error);
    }
  }

  private _buildServiceQueueName(service: string, event: string) {
    return `${service}.${event}`;
  }

  private _handleSuccessHandlerResult(result: DetectEventExecutionResult<EventNames>) {
    this.logger.line.success("Handler successed with result", result);
  }

  private _handleErrorHandlerResult(error: Error) {
    this.logger.line.error("Handler failed with error", error);
  }


}



