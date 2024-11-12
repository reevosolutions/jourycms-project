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
const logger = initLogger("SUBSCRIBER", "ArticleType");
let ArticleTypeSubscriber = class ArticleTypeSubscriber {
    /**
     * @method onArticleTypeCreated
     * @alias ON_ARTICLE_TYPE_CREATE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.ArticleType.created} payload
     */
    async onArticleTypeCreated({ data }) {
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
                logger.event(events.content.articleType.created, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config.environement === 'development') {
                logger.error(`${events.content.articleType.created}:ERROR`, error);
            }
            logger.save.error({
                name: events.content.articleType.created,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: errorToObject(error),
                }
            });
        }
    }
    /**
     * @method onArticleTypeUpdated
     * @alias ON_ARTICLE_TYPE_UPDATE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.ArticleType.updated} payload
     */
    async onArticleTypeUpdated({ data }) {
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
                logger.event(events.content.articleType.updated, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config.environement === 'development') {
                logger.error(`${events.content.articleType.updated}:ERROR`, error);
            }
            logger.save.error({
                name: events.content.articleType.updated,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: errorToObject(error),
                }
            });
        }
    }
    /**
     * @method onArticleTypeDeleted
     * @alias ON_ARTICLE_TYPE_DELETE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.ArticleType.deleted} payload
     */
    async onArticleTypeDeleted({ data }) {
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
                logger.event(events.content.articleType.deleted, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config.environement === 'development') {
                logger.error(`${events.content.articleType.deleted}:ERROR`, error);
            }
            logger.save.error({
                name: events.content.articleType.deleted,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: errorToObject(error),
                }
            });
        }
    }
    /**
     * @method onArticleTypeRestored
     * @alias ON_ARTICLE_TYPE_RESTORE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.ArticleType.restored} payload
     */
    async onArticleTypeRestored({ data }) {
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
                logger.event(events.content.articleType.restored, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config.environement === 'development') {
                logger.error(`${events.content.articleType.restored}:ERROR`, error);
            }
            logger.save.error({
                name: events.content.articleType.restored,
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
    On(events.content.articleType.created),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleTypeSubscriber.prototype, "onArticleTypeCreated", null);
__decorate([
    On(events.content.articleType.updated),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleTypeSubscriber.prototype, "onArticleTypeUpdated", null);
__decorate([
    On(events.content.articleType.deleted),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleTypeSubscriber.prototype, "onArticleTypeDeleted", null);
__decorate([
    On(events.content.articleType.restored),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleTypeSubscriber.prototype, "onArticleTypeRestored", null);
ArticleTypeSubscriber = __decorate([
    EventSubscriber()
], ArticleTypeSubscriber);
export default ArticleTypeSubscriber;
//# sourceMappingURL=article-types.subscriber.js.map