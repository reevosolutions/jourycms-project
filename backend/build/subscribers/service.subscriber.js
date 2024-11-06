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
const event_dispatch_1 = require("event-dispatch");
const mongoose_1 = __importDefault(require("mongoose"));
const events_config_1 = __importDefault(require("../config/events.config"));
const index_1 = __importDefault(require("../utilities/logging/index"));
const permissions_utilities_1 = require("./../utilities/system/permissions.utilities");
const config_1 = __importDefault(require("../config"));
const typedi_1 = __importDefault(require("typedi"));
const builder_service_1 = __importDefault(require("../features/content/services/builder.service"));
const logger = (0, index_1.default)('SUBSCRIBER', 'service');
let ServiceSubscriber = class ServiceSubscriber {
    async onServiceLoadSucceeded() {
        try {
            logger.success('Service started successfully');
            await (0, permissions_utilities_1.loadServicePermissions)();
            const contentBuilderService = typedi_1.default.get(builder_service_1.default);
            await contentBuilderService.run();
            if (config_1.default.environement === 'development') {
                /**
                 * Here you can add any logic to run after the service has started in development
                 * e.g. start seeding the database, tests, etc.
                 */
            }
            else {
                /**
                 * Here you can add any logic to run after the service has started in production
                 * e.g. start seeding the database, start a cron job, etc.
                 */
            }
        }
        catch (error) {
            logger.error(`${events_config_1.default.service.serviceLoadSucceeded}:ERROR`, error);
        }
    }
    async onDbConnect(connection) {
        try {
            logger.success(events_config_1.default.service.dbConnect, connection.host);
        }
        catch (error) {
            logger.error(`${events_config_1.default.service.dbConnect}:ERROR`, error);
        }
    }
    async onDbDisconnect(connection) {
        try {
            logger.error('disconnected', connection.host);
        }
        catch (error) {
            logger.error(`${events_config_1.default.service.dbDisconnect}:ERROR`, error);
        }
    }
};
__decorate([
    (0, event_dispatch_1.On)(events_config_1.default.service.serviceLoadSucceeded),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServiceSubscriber.prototype, "onServiceLoadSucceeded", null);
__decorate([
    (0, event_dispatch_1.On)(events_config_1.default.service.dbConnect),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.default.Connection]),
    __metadata("design:returntype", Promise)
], ServiceSubscriber.prototype, "onDbConnect", null);
__decorate([
    (0, event_dispatch_1.On)(events_config_1.default.service.dbDisconnect),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.default.Connection]),
    __metadata("design:returntype", Promise)
], ServiceSubscriber.prototype, "onDbDisconnect", null);
ServiceSubscriber = __decorate([
    (0, event_dispatch_1.EventSubscriber)()
], ServiceSubscriber);
exports.default = ServiceSubscriber;
//# sourceMappingURL=service.subscriber.js.map