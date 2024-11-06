'igdnore file';
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
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../../config"));
const base_service_1 = __importDefault(require("../../../common/base.service"));
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
let AmqpEventService = class AmqpEventService extends base_service_1.default {
    constructor() {
        super();
    }
    async ON_AMQP_TEST(event, payload) {
        const service = config_1.default.currentService.name;
        const result = {
            event,
            finishedAt: new Date(),
            service
        };
        return {
            fulfilled: true,
            result
        };
    }
    ;
};
AmqpEventService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], AmqpEventService);
exports.default = AmqpEventService;
//# sourceMappingURL=amqp-events.service.js.map