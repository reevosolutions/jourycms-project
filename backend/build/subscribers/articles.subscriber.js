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
const logger = initLogger("SUBSCRIBER", "Article");
let ArticleSubscriber = class ArticleSubscriber {
    /**
     * @method onArticleCreated
     * @alias ON_ARTICLE_CREATE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Article.created} payload
     */
    async onArticleCreated({ data }) {
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
                logger.event(events.content.article.created, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config.environement === 'development') {
                logger.error(`${events.content.article.created}:ERROR`, error);
            }
            logger.save.error({
                name: events.content.article.created,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: errorToObject(error),
                }
            });
        }
    }
    /**
     * @method onArticleUpdated
     * @alias ON_ARTICLE_UPDATE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Article.updated} payload
     */
    async onArticleUpdated({ data }) {
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
                logger.event(events.content.article.updated, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config.environement === 'development') {
                logger.error(`${events.content.article.updated}:ERROR`, error);
            }
            logger.save.error({
                name: events.content.article.updated,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: errorToObject(error),
                }
            });
        }
    }
    /**
     * @method onArticleDeleted
     * @alias ON_ARTICLE_DELETE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Article.deleted} payload
     */
    async onArticleDeleted({ data }) {
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
                logger.event(events.content.article.deleted, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config.environement === 'development') {
                logger.error(`${events.content.article.deleted}:ERROR`, error);
            }
            logger.save.error({
                name: events.content.article.deleted,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: errorToObject(error),
                }
            });
        }
    }
    /**
     * @method onArticleRestored
     * @alias ON_ARTICLE_RESTORE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Article.restored} payload
     */
    async onArticleRestored({ data }) {
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
                logger.event(events.content.article.restored, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config.environement === 'development') {
                logger.error(`${events.content.article.restored}:ERROR`, error);
            }
            logger.save.error({
                name: events.content.article.restored,
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
    On(events.content.article.created),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleSubscriber.prototype, "onArticleCreated", null);
__decorate([
    On(events.content.article.updated),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleSubscriber.prototype, "onArticleUpdated", null);
__decorate([
    On(events.content.article.deleted),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleSubscriber.prototype, "onArticleDeleted", null);
__decorate([
    On(events.content.article.restored),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleSubscriber.prototype, "onArticleRestored", null);
ArticleSubscriber = __decorate([
    EventSubscriber()
], ArticleSubscriber);
export default ArticleSubscriber;
//# sourceMappingURL=articles.subscriber.js.map