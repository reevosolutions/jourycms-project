'ignored file';
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26 July 2000
 * @since 29-04-2024 08:47:05
*/


import { Container } from "typedi";
import AmqpEventsService from '../services/amqp-events.service';
import { amqpEventListeningServices, TEventListeningServices, CURRENT_SERVICE_NAME } from "./events.config";
import { AmqpEventSubscribers } from './../utils/interfaces';



export type THandledEventByCurrentService = {
  [K in keyof TEventListeningServices]: typeof CURRENT_SERVICE_NAME extends TEventListeningServices[K][number] ? K : never
}[keyof TEventListeningServices];


const amqpEventsService = Container.get(AmqpEventsService);

/**
 * @description List of events that should be handled by the current service
 */
export const handledEvents: { [E in THandledEventByCurrentService]: E extends never ? never : true } = {
};

/**
 * @generator Levelup
 * @description This file contains the list of services that should listen to each event.
 * the {handledEvents} array is used to generate the subscribers object and will force the {amqp-events.service.ts} to implement the handlers for each event.
 */
const subscribers: AmqpEventSubscribers<THandledEventByCurrentService> = Object.keys(handledEvents).reduce((acc, event) => {
  if (amqpEventsService[event]){
    acc[event] = {
      event,
      handler: amqpEventsService[event].bind(amqpEventsService),
    } as any;
  }
  return acc;
}, {} as AmqpEventSubscribers<THandledEventByCurrentService>);


export default subscribers;




