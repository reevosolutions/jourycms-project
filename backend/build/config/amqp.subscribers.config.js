'ignored file';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handledEvents = void 0;
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26 July 2000
 * @since 29-04-2024 08:47:05
*/
const typedi_1 = require("typedi");
const amqp_events_service_1 = __importDefault(require("../services/amqp-events.service"));
const amqpEventsService = typedi_1.Container.get(amqp_events_service_1.default);
/**
 * @description List of events that should be handled by the current service
 */
exports.handledEvents = {};
/**
 * @generator Levelup
 * @description This file contains the list of services that should listen to each event.
 * the {handledEvents} array is used to generate the subscribers object and will force the {amqp-events.service.ts} to implement the handlers for each event.
 */
const subscribers = Object.keys(exports.handledEvents).reduce((acc, event) => {
    if (amqpEventsService[event]) {
        acc[event] = {
            event,
            handler: amqpEventsService[event].bind(amqpEventsService),
        };
    }
    return acc;
}, {});
exports.default = subscribers;
//# sourceMappingURL=amqp.subscribers.config.js.map