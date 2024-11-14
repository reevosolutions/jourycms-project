"use strict";
/**
 * @description This file is used to create event subscribers.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-06 00:40:13
 */
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
const cache_manager_1 = __importDefault(require("../managers/cache-manager"));
const typedi_1 = __importDefault(require("typedi"));
const logging_1 = __importDefault(require("../utilities/logging"));
const events_config_1 = __importDefault(require("../config/events.config"));
const config_1 = __importDefault(require("../config"));
const exceptions_1 = require("../utilities/exceptions");
const general_mappers_1 = require("../common/mappers/general.mappers");
const logger = (0, logging_1.default)("SUBSCRIBER", "Tag");
let TagSubscriber = class TagSubscriber {
    /**
     * @method onTagCreated
     * @alias ON_TAG_CREATE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Term.created} payload
     */
    async onTagCreated({ data }) {
        try {
            /**
             * Logic to run in ALL_ENVIRONMENTS
             */
            const cache = typedi_1.default.get(cache_manager_1.default);
            /**
             * Map object to exposed
             */
            data = (0, general_mappers_1.mapDocumentToExposed)(data);
            if (config_1.default.environement === 'development') {
                /**
                 * Here you can add any logic to run in DEVELOPMENT
                 */
                const identifier = data['email'] ? data['email'] : data['name'] ? data['name'] : data['tracking_id'] || data['_id'];
                logger.event(events_config_1.default.content.term.created, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config_1.default.environement === 'development') {
                logger.error(`${events_config_1.default.content.term.created}:ERROR`, error);
            }
            logger.save.error({
                name: events_config_1.default.content.term.created,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: (0, exceptions_1.errorToObject)(error),
                }
            });
        }
    }
    /**
     * @method onTagUpdated
     * @alias ON_TAG_UPDATE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Term.updated} payload
     */
    async onTagUpdated({ data }) {
        try {
            /**
             * Logic to run in ALL_ENVIRONMENTS
             */
            const cache = typedi_1.default.get(cache_manager_1.default);
            /**
             * Map object to exposed
             */
            data = (0, general_mappers_1.mapDocumentToExposed)(data);
            if (config_1.default.environement === 'development') {
                /**
                 * Here you can add any logic to run in DEVELOPMENT
                 */
                const identifier = data['email'] ? data['email'] : data['name'] ? data['name'] : data['tracking_id'] || data['_id'];
                logger.event(events_config_1.default.content.term.updated, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config_1.default.environement === 'development') {
                logger.error(`${events_config_1.default.content.term.updated}:ERROR`, error);
            }
            logger.save.error({
                name: events_config_1.default.content.term.updated,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: (0, exceptions_1.errorToObject)(error),
                }
            });
        }
    }
    /**
     * @method onTagDeleted
     * @alias ON_TAG_DELETE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Term.deleted} payload
     */
    async onTagDeleted({ data }) {
        try {
            /**
             * Logic to run in ALL_ENVIRONMENTS
             */
            const cache = typedi_1.default.get(cache_manager_1.default);
            /**
             * Map object to exposed
             */
            data = (0, general_mappers_1.mapDocumentToExposed)(data);
            if (config_1.default.environement === 'development') {
                /**
                 * Here you can add any logic to run in DEVELOPMENT
                 */
                const identifier = data['email'] ? data['email'] : data['name'] ? data['name'] : data['tracking_id'] || data['_id'];
                logger.event(events_config_1.default.content.term.deleted, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config_1.default.environement === 'development') {
                logger.error(`${events_config_1.default.content.term.deleted}:ERROR`, error);
            }
            logger.save.error({
                name: events_config_1.default.content.term.deleted,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: (0, exceptions_1.errorToObject)(error),
                }
            });
        }
    }
    /**
     * @method onTagRestored
     * @alias ON_TAG_RESTORE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Term.restored} payload
     */
    async onTagRestored({ data }) {
        try {
            /**
             * Logic to run in ALL_ENVIRONMENTS
             */
            const cache = typedi_1.default.get(cache_manager_1.default);
            /**
             * Map object to exposed
             */
            data = (0, general_mappers_1.mapDocumentToExposed)(data);
            if (config_1.default.environement === 'development') {
                /**
                 * Here you can add any logic to run in DEVELOPMENT
                 */
                const identifier = data['email'] ? data['email'] : data['name'] ? data['name'] : data['tracking_id'] || data['_id'];
                logger.event(events_config_1.default.content.term.restored, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config_1.default.environement === 'development') {
                logger.error(`${events_config_1.default.content.term.restored}:ERROR`, error);
            }
            logger.save.error({
                name: events_config_1.default.content.term.restored,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: (0, exceptions_1.errorToObject)(error),
                }
            });
        }
    }
};
__decorate([
    (0, event_dispatch_1.On)(events_config_1.default.content.term.created),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TagSubscriber.prototype, "onTagCreated", null);
__decorate([
    (0, event_dispatch_1.On)(events_config_1.default.content.term.updated),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TagSubscriber.prototype, "onTagUpdated", null);
__decorate([
    (0, event_dispatch_1.On)(events_config_1.default.content.term.deleted),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TagSubscriber.prototype, "onTagDeleted", null);
__decorate([
    (0, event_dispatch_1.On)(events_config_1.default.content.term.restored),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TagSubscriber.prototype, "onTagRestored", null);
TagSubscriber = __decorate([
    (0, event_dispatch_1.EventSubscriber)()
], TagSubscriber);
exports.default = TagSubscriber;
//# sourceMappingURL=terms.subscriber.js.map