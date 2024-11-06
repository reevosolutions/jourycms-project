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
const general_mappers_1 = require("../utils/mappers/general.mappers");
const logger = (0, logging_1.default)("SUBSCRIBER", "Project");
let TranslationProjectSubscriber = class TranslationProjectSubscriber {
    /**
     * @method onTranslationProjectCreated
     * @alias ON_TRANSLATION_PROJECT_CREATE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Translation.Project.created} payload
     */
    async onTranslationProjectCreated({ data }) {
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
                logger.event(events_config_1.default.content.translation.project.created, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config_1.default.environement === 'development') {
                logger.error(`${events_config_1.default.content.translation.project.created}:ERROR`, error);
            }
            logger.save.error({
                name: events_config_1.default.content.translation.project.created,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: (0, exceptions_1.errorToObject)(error),
                }
            });
        }
    }
    /**
     * @method onTranslationProjectUpdated
     * @alias ON_TRANSLATION_PROJECT_UPDATE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Translation.Project.updated} payload
     */
    async onTranslationProjectUpdated({ data }) {
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
                logger.event(events_config_1.default.content.translation.project.updated, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config_1.default.environement === 'development') {
                logger.error(`${events_config_1.default.content.translation.project.updated}:ERROR`, error);
            }
            logger.save.error({
                name: events_config_1.default.content.translation.project.updated,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: (0, exceptions_1.errorToObject)(error),
                }
            });
        }
    }
    /**
     * @method onTranslationProjectDeleted
     * @alias ON_TRANSLATION_PROJECT_DELETE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Translation.Project.deleted} payload
     */
    async onTranslationProjectDeleted({ data }) {
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
                logger.event(events_config_1.default.content.translation.project.deleted, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config_1.default.environement === 'development') {
                logger.error(`${events_config_1.default.content.translation.project.deleted}:ERROR`, error);
            }
            logger.save.error({
                name: events_config_1.default.content.translation.project.deleted,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: (0, exceptions_1.errorToObject)(error),
                }
            });
        }
    }
    /**
     * @method onTranslationProjectRestored
     * @alias ON_TRANSLATION_PROJECT_RESTORE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Translation.Project.restored} payload
     */
    async onTranslationProjectRestored({ data }) {
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
                logger.event(events_config_1.default.content.translation.project.restored, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config_1.default.environement === 'development') {
                logger.error(`${events_config_1.default.content.translation.project.restored}:ERROR`, error);
            }
            logger.save.error({
                name: events_config_1.default.content.translation.project.restored,
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
    (0, event_dispatch_1.On)(events_config_1.default.content.translation.project.created),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TranslationProjectSubscriber.prototype, "onTranslationProjectCreated", null);
__decorate([
    (0, event_dispatch_1.On)(events_config_1.default.content.translation.project.updated),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TranslationProjectSubscriber.prototype, "onTranslationProjectUpdated", null);
__decorate([
    (0, event_dispatch_1.On)(events_config_1.default.content.translation.project.deleted),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TranslationProjectSubscriber.prototype, "onTranslationProjectDeleted", null);
__decorate([
    (0, event_dispatch_1.On)(events_config_1.default.content.translation.project.restored),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TranslationProjectSubscriber.prototype, "onTranslationProjectRestored", null);
TranslationProjectSubscriber = __decorate([
    (0, event_dispatch_1.EventSubscriber)()
], TranslationProjectSubscriber);
exports.default = TranslationProjectSubscriber;
//# sourceMappingURL=translation.projects.subscriber.js.map