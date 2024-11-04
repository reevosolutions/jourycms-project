'igdnore file';

import { Service, Container } from 'typedi';
import config from '../config';
import { THandledEventByCurrentService } from '../config/amqp.subscribers.config';
import { AmqpEventHandler, AmqpEventHandlerReturnType, DetectEventExecutionResult, DetectEventPayload, EventNames, GenericAmqpEventService } from '../utils/interfaces';
import BaseService from './base.service';

/**
 * FIXME: Shared by watcher
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26 July 2000
 * @since 29-04-2024 08:47:05
*/


/**
 * @description You can not inject typedi dependencies here because it's loaded before registering them
 */
@Service()
export default class AmqpEventService extends BaseService implements GenericAmqpEventService<THandledEventByCurrentService> {

  public constructor() {
    super();
  }

  public async ON_AMQP_TEST<TEvent extends 'ON_AMQP_TEST'>(event: TEvent, payload: DetectEventPayload<TEvent>): Promise<AmqpEventHandlerReturnType<TEvent>> {
    const service = config.currentService.name;
    const result: DetectEventExecutionResult<TEvent> = {
      event,
      finishedAt: new Date(),
      service
    };
    return {
      fulfilled: true,
      result
    }
  };



}



