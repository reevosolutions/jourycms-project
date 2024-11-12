var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { EventSubscriber, On } from 'event-dispatch';
import mongoose from 'mongoose';
import events from '../config/events.config';
import initLogger from '../utilities/logging/index';
import { loadServicePermissions } from './../utilities/system/permissions.utilities';
import config from '../config';
import Container from 'typedi';
import ContentBuilderService from '../features/content/services/builder.service';
const logger = initLogger('SUBSCRIBER', 'service');
let ServiceSubscriber = class ServiceSubscriber {
    async onServiceLoadSucceeded() {
        try {
            logger.success('Service started successfully');
            await loadServicePermissions();
            const contentBuilderService = Container.get(ContentBuilderService);
            await contentBuilderService.run();
            if (config.environement === 'development') {
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
            logger.error(`${events.service.serviceLoadSucceeded}:ERROR`, error);
        }
    }
    async onDbConnect(connection) {
        try {
            logger.success(events.service.dbConnect, connection.host);
        }
        catch (error) {
            logger.error(`${events.service.dbConnect}:ERROR`, error);
        }
    }
    async onDbDisconnect(connection) {
        try {
            logger.error('disconnected', connection.host);
        }
        catch (error) {
            logger.error(`${events.service.dbDisconnect}:ERROR`, error);
        }
    }
};
__decorate([
    On(events.service.serviceLoadSucceeded),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServiceSubscriber.prototype, "onServiceLoadSucceeded", null);
__decorate([
    On(events.service.dbConnect),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose.Connection]),
    __metadata("design:returntype", Promise)
], ServiceSubscriber.prototype, "onDbConnect", null);
__decorate([
    On(events.service.dbDisconnect),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose.Connection]),
    __metadata("design:returntype", Promise)
], ServiceSubscriber.prototype, "onDbDisconnect", null);
ServiceSubscriber = __decorate([
    EventSubscriber()
], ServiceSubscriber);
export default ServiceSubscriber;
//# sourceMappingURL=service.subscriber.js.map