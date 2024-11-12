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
const logger = initLogger("SUBSCRIBER", "Namespace");
let TranslationNamespaceSubscriber = class TranslationNamespaceSubscriber {
    /**
     * @method onTranslationNamespaceCreated
     * @alias ON_TRANSLATION_NAMESPACE_CREATE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Translation.Namespace.created} payload
     */
    async onTranslationNamespaceCreated({ data }) {
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
                logger.event(events.content.translation.namespace.created, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config.environement === 'development') {
                logger.error(`${events.content.translation.namespace.created}:ERROR`, error);
            }
            logger.save.error({
                name: events.content.translation.namespace.created,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: errorToObject(error),
                }
            });
        }
    }
    /**
     * @method onTranslationNamespaceUpdated
     * @alias ON_TRANSLATION_NAMESPACE_UPDATE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Translation.Namespace.updated} payload
     */
    async onTranslationNamespaceUpdated({ data }) {
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
                logger.event(events.content.translation.namespace.updated, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config.environement === 'development') {
                logger.error(`${events.content.translation.namespace.updated}:ERROR`, error);
            }
            logger.save.error({
                name: events.content.translation.namespace.updated,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: errorToObject(error),
                }
            });
        }
    }
    /**
     * @method onTranslationNamespaceDeleted
     * @alias ON_TRANSLATION_NAMESPACE_DELETE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Translation.Namespace.deleted} payload
     */
    async onTranslationNamespaceDeleted({ data }) {
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
                logger.event(events.content.translation.namespace.deleted, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config.environement === 'development') {
                logger.error(`${events.content.translation.namespace.deleted}:ERROR`, error);
            }
            logger.save.error({
                name: events.content.translation.namespace.deleted,
                payload: {
                    related_to: data['tracking_id'] || data['_id'],
                    data,
                    error: errorToObject(error),
                }
            });
        }
    }
    /**
     * @method onTranslationNamespaceRestored
     * @alias ON_TRANSLATION_NAMESPACE_RESTORE
     * @param {Levelup.CMS.V1.Events.Payloads.Content.Translation.Namespace.restored} payload
     */
    async onTranslationNamespaceRestored({ data }) {
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
                logger.event(events.content.translation.namespace.restored, identifier);
            }
            else {
                /**
                 * Here you can add any logic to run in PRODUCTION
                */
            }
        }
        catch (error) {
            if (config.environement === 'development') {
                logger.error(`${events.content.translation.namespace.restored}:ERROR`, error);
            }
            logger.save.error({
                name: events.content.translation.namespace.restored,
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
    On(events.content.translation.namespace.created),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TranslationNamespaceSubscriber.prototype, "onTranslationNamespaceCreated", null);
__decorate([
    On(events.content.translation.namespace.updated),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TranslationNamespaceSubscriber.prototype, "onTranslationNamespaceUpdated", null);
__decorate([
    On(events.content.translation.namespace.deleted),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TranslationNamespaceSubscriber.prototype, "onTranslationNamespaceDeleted", null);
__decorate([
    On(events.content.translation.namespace.restored),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TranslationNamespaceSubscriber.prototype, "onTranslationNamespaceRestored", null);
TranslationNamespaceSubscriber = __decorate([
    EventSubscriber()
], TranslationNamespaceSubscriber);
export default TranslationNamespaceSubscriber;
//# sourceMappingURL=translation.namespaces.subscriber.js.map