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
import { EventSubscriber, On } from 'event-dispatch';
import CacheManager from '../managers/cache-manager';
import Container from 'typedi';
import initLogger from '../utilities/logging';
import events from '../config/events.config';
import config from '../config';
import { errorToObject } from '../utilities/exceptions';
import { mapDocumentToExposed } from '../common/mappers/general.mappers';
const logger = initLogger("SUBSCRIBER", "Review");
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
            const cache = Container.get(CacheManager);
            /**
             * Map object to exposed
             */
            data = mapDocumentToExposed(data);
            if (config.environement === 'development') {
                /**
                 * Here you can add any logic to run in DEVELOPMENT
                 */
                const identifier = data['email'] ? data['email'] : data['name'] ? data['name'] : data['tracking_id'] || data['_id'];
                logger.event(events.content.review.created, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config.environement === 'development') {
                logger.error(`${events.content.review.created}:ERROR`, error);
            }
            logger.save.error({
                name: events.content.review.created,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: errorToObject(error),
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
            const cache = Container.get(CacheManager);
            /**
             * Map object to exposed
             */
            data = mapDocumentToExposed(data);
            if (config.environement === 'development') {
                /**
                 * Here you can add any logic to run in DEVELOPMENT
                 */
                const identifier = data['email'] ? data['email'] : data['name'] ? data['name'] : data['tracking_id'] || data['_id'];
                logger.event(events.content.review.updated, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config.environement === 'development') {
                logger.error(`${events.content.review.updated}:ERROR`, error);
            }
            logger.save.error({
                name: events.content.review.updated,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: errorToObject(error),
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
            const cache = Container.get(CacheManager);
            /**
             * Map object to exposed
             */
            data = mapDocumentToExposed(data);
            if (config.environement === 'development') {
                /**
                 * Here you can add any logic to run in DEVELOPMENT
                 */
                const identifier = data['email'] ? data['email'] : data['name'] ? data['name'] : data['tracking_id'] || data['_id'];
                logger.event(events.content.review.deleted, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config.environement === 'development') {
                logger.error(`${events.content.review.deleted}:ERROR`, error);
            }
            logger.save.error({
                name: events.content.review.deleted,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: errorToObject(error),
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
            const cache = Container.get(CacheManager);
            /**
             * Map object to exposed
             */
            data = mapDocumentToExposed(data);
            if (config.environement === 'development') {
                /**
                 * Here you can add any logic to run in DEVELOPMENT
                 */
                const identifier = data['email'] ? data['email'] : data['name'] ? data['name'] : data['tracking_id'] || data['_id'];
                logger.event(events.content.review.restored, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config.environement === 'development') {
                logger.error(`${events.content.review.restored}:ERROR`, error);
            }
            logger.save.error({
                name: events.content.review.restored,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: errorToObject(error),
                }
            });
        }
    }
};
__decorate([
    On(events.content.review.created),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewSubscriber.prototype, "onReviewCreated", null);
__decorate([
    On(events.content.review.updated),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewSubscriber.prototype, "onReviewUpdated", null);
__decorate([
    On(events.content.review.deleted),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewSubscriber.prototype, "onReviewDeleted", null);
__decorate([
    On(events.content.review.restored),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewSubscriber.prototype, "onReviewRestored", null);
ReviewSubscriber = __decorate([
    EventSubscriber()
], ReviewSubscriber);
export default ReviewSubscriber;
//# sourceMappingURL=reviews.subscriber.js.map