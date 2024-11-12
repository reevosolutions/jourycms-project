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
const logger = initLogger("SUBSCRIBER", "Comment");
let CommentSubscriber = class CommentSubscriber {
    /**
     * @method onCommentCreated
     * @alias ON_COMMENT_CREATE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Comment.created} payload
     */
    async onCommentCreated({ data }) {
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
                logger.event(events.content.comment.created, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config.environement === 'development') {
                logger.error(`${events.content.comment.created}:ERROR`, error);
            }
            logger.save.error({
                name: events.content.comment.created,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: errorToObject(error),
                }
            });
        }
    }
    /**
     * @method onCommentUpdated
     * @alias ON_COMMENT_UPDATE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Comment.updated} payload
     */
    async onCommentUpdated({ data }) {
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
                logger.event(events.content.comment.updated, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config.environement === 'development') {
                logger.error(`${events.content.comment.updated}:ERROR`, error);
            }
            logger.save.error({
                name: events.content.comment.updated,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: errorToObject(error),
                }
            });
        }
    }
    /**
     * @method onCommentDeleted
     * @alias ON_COMMENT_DELETE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Comment.deleted} payload
     */
    async onCommentDeleted({ data }) {
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
                logger.event(events.content.comment.deleted, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config.environement === 'development') {
                logger.error(`${events.content.comment.deleted}:ERROR`, error);
            }
            logger.save.error({
                name: events.content.comment.deleted,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: errorToObject(error),
                }
            });
        }
    }
    /**
     * @method onCommentRestored
     * @alias ON_COMMENT_RESTORE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Comment.restored} payload
     */
    async onCommentRestored({ data }) {
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
                logger.event(events.content.comment.restored, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config.environement === 'development') {
                logger.error(`${events.content.comment.restored}:ERROR`, error);
            }
            logger.save.error({
                name: events.content.comment.restored,
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
    On(events.content.comment.created),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentSubscriber.prototype, "onCommentCreated", null);
__decorate([
    On(events.content.comment.updated),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentSubscriber.prototype, "onCommentUpdated", null);
__decorate([
    On(events.content.comment.deleted),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentSubscriber.prototype, "onCommentDeleted", null);
__decorate([
    On(events.content.comment.restored),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommentSubscriber.prototype, "onCommentRestored", null);
CommentSubscriber = __decorate([
    EventSubscriber()
], CommentSubscriber);
export default CommentSubscriber;
//# sourceMappingURL=comments.subscriber.js.map