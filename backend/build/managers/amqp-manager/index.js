"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26 July 2000 👑
 * @since 30-04-2024 00:38:44
*/
const typedi_1 = require("typedi");
const amqp_1 = require("./amqp");
const config_1 = __importDefault(require("../../config"));
const events_config_1 = require("../../config/events.config");
const base_service_1 = __importDefault(require("../../common/base.service"));
let AmqpManager = class AmqpManager extends base_service_1.default {
    constructor() {
        super();
        this._initialized = false;
        this._init();
    }
    async _init() {
        try {
            if (this._initialized)
                return true;
            // config amqp
            this.config = {
                host: config_1.default.amqplib.host,
                port: config_1.default.amqplib.port,
                username: config_1.default.amqplib.user,
                password: config_1.default.amqplib.password,
            };
            // init amqp
            this.connectionFactory = new amqp_1.RabbitMqConnectionFactory(this.config);
            this.producer = new amqp_1.RabbitMqProducer(this.connectionFactory);
            this.consumer = new amqp_1.RabbitMqConsumer(this.connectionFactory);
            // init event subscribers
            await this._initEventSubscribers();
            this._initialized = true;
            return true;
        }
        catch (error) {
            this.logger.line.error('AMQP: init error', error);
        }
    }
    async _initEventSubscribers() {
        try {
            for (let idx = 0; idx < Object.keys(events_config_1.amqpSubscribers).length; idx++) {
                const eventName = Object.keys(events_config_1.amqpSubscribers)[idx];
                const subscriber = events_config_1.amqpSubscribers[eventName];
                const currentServiceQueueName = this._buildServiceQueueName(config_1.default.currentService.name, subscriber.event);
                // this.logger.info("initEventSubscribers: subscriber: ", subscriber);
                this.consumer.subscribe(currentServiceQueueName, async (payload) => {
                    // message received
                    // this.logger.line.debug("Message received", payload);
                    try {
                        const result = await subscriber.handler(subscriber.event, payload);
                        if (result.fulfilled)
                            this._handleSuccessHandlerResult(result.result);
                        else
                            this._handleErrorHandlerResult(result.error);
                        // message handled
                        return { fulfilled: result.fulfilled };
                    }
                    catch (error) {
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
        }
        catch (error) {
            this.logger.line.error('initEventSubscribers error', error);
        }
    }
    /**
     *
     * @param event
     * @param payload
     * @returns it was boolean >> void
     */
    async publishEvent(event, payload) {
        try {
            if (events_config_1.amqpEventListeningServices[event] === undefined || events_config_1.amqpEventListeningServices[event].length === 0) {
                this.logger.warn(`AMQP:publishEvent: No service is listening to the event ${event}`);
                return;
            }
            const promises = events_config_1.amqpEventListeningServices[event].map(service => {
                return this.producer.publish(this._buildServiceQueueName(service, event), payload);
            });
            const result = await Promise.all(promises);
            return result;
        }
        catch (error) {
            this.logger.error('AMQP:publishEvent error', error);
        }
    }
    _buildServiceQueueName(service, event) {
        return `${service}.${event}`;
    }
    _handleSuccessHandlerResult(result) {
        this.logger.line.success("Handler successed with result", result);
    }
    _handleErrorHandlerResult(error) {
        this.logger.line.error("Handler failed with error", error);
    }
};
AmqpManager = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], AmqpManager);
exports.default = AmqpManager;
//# sourceMappingURL=index.js.map