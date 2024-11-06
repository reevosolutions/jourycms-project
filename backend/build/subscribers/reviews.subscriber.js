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
const logger = (0, logging_1.default)("SUBSCRIBER", "Review");
let ReviewSubscriber = class ReviewSubscriber {
    /**
     * @method onReviewCreated
     * @alias ON_REVIEW_CREATE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Review.created} payload
     */
    async onReviewCreated({ data }) {
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
                logger.event(events_config_1.default.content.review.created, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config_1.default.environement === 'development') {
                logger.error(`${events_config_1.default.content.review.created}:ERROR`, error);
            }
            logger.save.error({
                name: events_config_1.default.content.review.created,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: (0, exceptions_1.errorToObject)(error),
                }
            });
        }
    }
    /**
     * @method onReviewUpdated
     * @alias ON_REVIEW_UPDATE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Review.updated} payload
     */
    async onReviewUpdated({ data }) {
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
                logger.event(events_config_1.default.content.review.updated, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config_1.default.environement === 'development') {
                logger.error(`${events_config_1.default.content.review.updated}:ERROR`, error);
            }
            logger.save.error({
                name: events_config_1.default.content.review.updated,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: (0, exceptions_1.errorToObject)(error),
                }
            });
        }
    }
    /**
     * @method onReviewDeleted
     * @alias ON_REVIEW_DELETE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Review.deleted} payload
     */
    async onReviewDeleted({ data }) {
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
                logger.event(events_config_1.default.content.review.deleted, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config_1.default.environement === 'development') {
                logger.error(`${events_config_1.default.content.review.deleted}:ERROR`, error);
            }
            logger.save.error({
                name: events_config_1.default.content.review.deleted,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: (0, exceptions_1.errorToObject)(error),
                }
            });
        }
    }
    /**
     * @method onReviewRestored
     * @alias ON_REVIEW_RESTORE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Review.restored} payload
     */
    async onReviewRestored({ data }) {
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
                logger.event(events_config_1.default.content.review.restored, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config_1.default.environement === 'development') {
                logger.error(`${events_config_1.default.content.review.restored}:ERROR`, error);
            }
            logger.save.error({
                name: events_config_1.default.content.review.restored,
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
    (0, event_dispatch_1.On)(events_config_1.default.content.review.created),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewSubscriber.prototype, "onReviewCreated", null);
__decorate([
    (0, event_dispatch_1.On)(events_config_1.default.content.review.updated),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewSubscriber.prototype, "onReviewUpdated", null);
__decorate([
    (0, event_dispatch_1.On)(events_config_1.default.content.review.deleted),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewSubscriber.prototype, "onReviewDeleted", null);
__decorate([
    (0, event_dispatch_1.On)(events_config_1.default.content.review.restored),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewSubscriber.prototype, "onReviewRestored", null);
ReviewSubscriber = __decorate([
    (0, event_dispatch_1.EventSubscriber)()
], ReviewSubscriber);
exports.default = ReviewSubscriber;
//# sourceMappingURL=reviews.subscriber.js.map