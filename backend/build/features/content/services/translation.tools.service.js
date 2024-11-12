/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-03 00:17:36
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { faker } from '@faker-js/faker';
import * as fs from 'fs';
import { translate } from 'google-translate-api-x';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { uniq, uniqBy } from 'lodash';
import * as path from 'path';
import Container, { Inject, Service } from 'typedi';
import BaseService from '../../../common/base.service';
import { SUPPORTED_LANGUAGES } from '../../../constants/localization.constants';
import { EventDispatcher } from '../../../decorators/eventDispatcher.decorator';
import exceptions from '../../../exceptions';
import CacheManager from '../../../managers/cache-manager';
import { applyOnDocumentChunks } from '../../../utilities/data/db/chunks.utilities';
import { generateProgressBar } from '../../../utilities/logging/output.utilities';
import { sleep } from '../../../utilities/system/timer.utilities';
import TranslationItemsService from './translation.items.service';
import TranslationNamespacesService from './translation.namespaces.service';
import TranslationProjectsService from './translation.projects.service';
import crypto from "crypto";
/**
 * @description
 */
let TranslationToolsService = class TranslationToolsService extends BaseService {
    constructor(articleTypeModel, articleModel, commentModel, reviewModel, termModel, taxonomyModel, translationItemModel, translationNamespaceModel, translationProjectModel, eventDispatcher) {
        super();
        this.articleTypeModel = articleTypeModel;
        this.articleModel = articleModel;
        this.commentModel = commentModel;
        this.reviewModel = reviewModel;
        this.termModel = termModel;
        this.taxonomyModel = taxonomyModel;
        this.translationItemModel = translationItemModel;
        this.translationNamespaceModel = translationNamespaceModel;
        this.translationProjectModel = translationProjectModel;
        this.eventDispatcher = eventDispatcher;
        this.ENTITY = 'translationProject';
        this._CACHE = {
            projects: {}
        };
        this._CACHE = {
            projects: {}
        };
    }
    async loadProject(name) {
        var _a, _b;
        try {
            // load from cache
            let result = (_a = this._CACHE.projects[name]) === null || _a === void 0 ? void 0 : _a.project;
            if (result)
                return result;
            // load from DB
            this.logger.warn('Loading project from DB');
            result = (_b = (await this.translationProjectModel.findOne({ name }))) === null || _b === void 0 ? void 0 : _b.toObject();
            if (result)
                await this.saveProjectToCache(result);
            return result || null;
        }
        catch (error) {
            return null;
        }
    }
    async saveProjectToCache(project) {
        try {
            this._CACHE.projects[project.name] = {
                project,
                namespaces: {}
            };
        }
        catch (error) { }
    }
    async loadNamespace(project, name) {
        var _a, _b, _c;
        try {
            // load from cache
            let result = (_b = (_a = this._CACHE.projects[project.name]) === null || _a === void 0 ? void 0 : _a.namespaces[name]) === null || _b === void 0 ? void 0 : _b.namespace;
            if (result)
                return result;
            // load from DB
            this.logger.warn('Loading namespace from DB');
            result = (_c = (await this.translationNamespaceModel.findOne({ name, project: project._id }))) === null || _c === void 0 ? void 0 : _c.toObject();
            if (result)
                await this.saveNamespaceToCache(project, result);
            return result || null;
        }
        catch (error) {
            return null;
        }
    }
    async saveNamespaceToCache(project, namespace) {
        try {
            if (!this._CACHE.projects[project.name])
                this._CACHE.projects[project.name] = {
                    project,
                    namespaces: {}
                };
            this._CACHE.projects[project.name].namespaces[namespace.name] = {
                namespace: namespace,
                items: {}
            };
        }
        catch (error) {
            return null;
        }
    }
    async loadItem(project, namespace, key) {
        var _a, _b;
        try {
            let hash = crypto.createHash('md5').update(key).digest('hex');
            // load from cache
            let result = (_b = (_a = this._CACHE.projects[project.name]) === null || _a === void 0 ? void 0 : _a.namespaces[namespace.name]) === null || _b === void 0 ? void 0 : _b.items[hash];
            if (result)
                return result;
            // load from DB
            this.logger.warn('Loading item from DB');
            result = (await this.translationItemModel.findOne({ project: project._id, namespace: namespace.name, key }))
                ? true
                : false;
            if (result)
                await this.saveItemToCache(project, namespace, key);
            return result;
        }
        catch (error) {
            return false;
        }
    }
    async saveItemToCache(project, namespace, key) {
        try {
            let hash = crypto.createHash('md5').update(key).digest('hex');
            if (!this._CACHE.projects[project.name])
                this._CACHE.projects[project.name] = {
                    project,
                    namespaces: {}
                };
            if (!this._CACHE.projects[project.name].namespaces[namespace.name])
                this._CACHE.projects[project.name].namespaces[namespace.name] = {
                    namespace,
                    items: {}
                };
            this._CACHE.projects[project.name].namespaces[namespace.name].items[hash] = true;
        }
        catch (error) {
            return null;
        }
    }
    /**
     * @description insertI18MissingKey
     */
    async insertI18MissingKey({ data }, authData, opt) {
        var _a, _b, _c;
        const scenario = this.initScenario(this.logger, this.initScenario, { data }, authData);
        const projectsService = Container.get(TranslationProjectsService);
        const translationNamespacesService = Container.get(TranslationNamespacesService);
        const translationItemsService = Container.get(TranslationItemsService);
        const cache = Container.get(CacheManager);
        try {
            const apps = await cache.apps.list();
            let { namespace, project, languages, default_language, key } = data;
            if (!namespace)
                throw new exceptions.BadRequestException('Namespace is required');
            if (!project)
                throw new exceptions.BadRequestException('Project is required');
            if (!languages)
                throw new exceptions.BadRequestException('Languages is required');
            if (!default_language)
                throw new exceptions.BadRequestException('Default language is required');
            if (!key)
                throw new exceptions.BadRequestException('Key is required');
            const objects = {};
            /**
             * Check if the project exists, if not create it
             */
            objects.project = await this.loadProject(project);
            if (!objects.project) {
                this.logger.error('Project not found', project);
                const body = {
                    data: {
                        app: ((_b = (_a = authData === null || authData === void 0 ? void 0 : authData.current) === null || _a === void 0 ? void 0 : _a.app) === null || _b === void 0 ? void 0 : _b._id) || ((_c = apps[0]) === null || _c === void 0 ? void 0 : _c._id),
                        name: project,
                        default_language,
                        languages: uniq([default_language, ...languages])
                    }
                };
                const { data: newDoc } = await projectsService.create(body, authData, { bypass_authorization: true });
                objects.project = newDoc;
                await this.saveProjectToCache(newDoc);
            }
            else {
                // this.logger.debug('Project found', project);
            }
            /**
             * Check if the namespace exists, if not create it
             */
            objects.namespace = await this.loadNamespace(objects.project, namespace);
            if (!objects.namespace) {
                this.logger.error('Namespace not found', namespace);
                const body = {
                    data: {
                        app: objects.project.app,
                        project: objects.project._id,
                        name: namespace
                    }
                };
                const { data: newDoc } = await translationNamespacesService.create(body, authData, {
                    bypass_authorization: true
                });
                objects.namespace = newDoc;
                await this.saveNamespaceToCache(objects.project, newDoc);
            }
            else {
                // this.logger.debug('Namespace found', namespace);
            }
            /**
             * Check if the item exists, if not create it
             */
            let itemFound = await this.loadItem(objects.project, objects.namespace, key);
            if (!itemFound) {
                this.logger.error('Item not found', key);
                const body = {
                    data: {
                        app: objects.project.app,
                        project: objects.project._id,
                        namespace: objects.namespace.name,
                        key
                    }
                };
                const { data: newDoc } = await translationItemsService.create(body, authData, {
                    bypass_authorization: true
                });
                objects.item = newDoc;
                await this.saveItemToCache(objects.project, objects.namespace, key);
                this.logger.success(`Translation item ${key} created`);
            }
            else {
                // this.logger.debug('Item found', key);
            }
            /**
             * Log execution result before returning the result
             */
            // scenario.log();
            const hash = crypto.createHash('md5').update(key).digest('hex');
            return {
                key: `${project}.${namespace}.${key}`,
                hash: `${project}.${namespace}.${hash}`,
                isNew: !itemFound
            };
        }
        catch (error) {
            scenario.error(error);
            throw error;
        }
    }
    async translateUsingGoogleAPI(authData = {}) {
        try {
            const translationItemsService = Container.get(TranslationItemsService);
            const proxiesData = fs.readFileSync(path.join(__dirname, '../../assets/proxies.txt'), 'utf8');
            const proxies = uniqBy(proxiesData
                .split('\n')
                // .map(line => line.split('\t'))
                // .map(line => ({
                //   url: `http${line[6] === 'yes' ? 's' : ''}://${line[0]}:${line[1]}`,
                //   google: line[5] === 'yes',
                //   https: line[6] === 'yes'
                // }))
                .filter(p => p.startsWith('http')), 'url');
            this.logger.debug('PROXY', proxies);
            let invalidProxies = [];
            function pickProxyURL() {
                let proxy = null;
                if (invalidProxies.length === proxies.length)
                    invalidProxies = [];
                while ((proxy === null || invalidProxies.includes(proxy)) &&
                    proxies.length > 0 &&
                    invalidProxies.length < proxies.length) {
                    proxy = proxies[Math.floor(Math.random() * proxies.length)];
                    // this.logger.debug('PROXY', proxy);
                }
                return proxy;
            }
            // return;
            const totalCount = await this.translationItemModel.countDocuments({ is_deleted: false });
            this.logger.value('items count', totalCount);
            await applyOnDocumentChunks({
                query: this.translationItemModel.find({ is_deleted: false }),
                onItem: async (item, index, page, progress) => {
                    item = item.toObject();
                    const proxy_url = pickProxyURL();
                    try {
                        if (!proxy_url)
                            throw new exceptions.LevelupException('No proxy available');
                        const LANGUAGES = ['en', 'ar', 'fr'];
                        for (const LANG of SUPPORTED_LANGUAGES) {
                            // this.logger.event('handling item', ` ${LANG} `.bgBlue, item.key);
                            const translation = item.translations.find(tr => tr.language === LANG);
                            if ((translation === null || translation === void 0 ? void 0 : translation.is_approved) || (translation === null || translation === void 0 ? void 0 : translation.is_auto_translated)) {
                                this.logger.success(generateProgressBar(progress), `${index} of ${totalCount}`, {
                                    key: item.key,
                                    [LANG]: translation.translation,
                                    approved: translation.is_approved,
                                    auto_translated: translation.is_auto_translated
                                });
                            }
                            else {
                                let result;
                                try {
                                    result = await translate(item.namespace === 'system' || (item.key.includes('_') && !item.key.includes(' '))
                                        ? item.key.replaceAll('_', ' ')
                                        : item.key, {
                                        from: 'en',
                                        to: LANG,
                                        forceFrom: true,
                                        forceTo: true
                                        // requestOptions: {
                                        //   agent: new HttpProxyAgent(proxy_url)
                                        // }
                                    });
                                }
                                catch (error) {
                                    try {
                                        result = await translate(item.namespace === 'system' || (item.key.includes('_') && !item.key.includes(' '))
                                            ? item.key.replaceAll('_', ' ')
                                            : item.key, {
                                            from: 'en',
                                            to: LANG,
                                            forceFrom: true,
                                            forceTo: true,
                                            requestOptions: {
                                                agent: new HttpsProxyAgent(proxy_url)
                                            }
                                        });
                                    }
                                    catch (error) {
                                        this.logger.error(error.message, error);
                                    }
                                }
                                if (result) {
                                    this.logger.tree(generateProgressBar(progress), `${index} of ${totalCount}`, item._id.toString(), {
                                        language: LANG,
                                        key: item.key,
                                        old_translation: (translation === null || translation === void 0 ? void 0 : translation.translation) || '',
                                        api_translation: (result === null || result === void 0 ? void 0 : result.text) ? result === null || result === void 0 ? void 0 : result.text : (result === null || result === void 0 ? void 0 : result.raw) || result
                                    });
                                    await sleep(faker.number.int({ min: 10, max: 6000 }));
                                    await translationItemsService.update(item._id.toString(), {
                                        data: {
                                            translation_updates: {
                                                [LANG]: {
                                                    modified: true,
                                                    approvement_modified: false,
                                                    value: result.text,
                                                    approved: false
                                                }
                                            },
                                            auto_translated: true
                                        }
                                    }, authData);
                                }
                            }
                        }
                    }
                    catch (error) {
                        proxy_url && invalidProxies.push(proxy_url);
                        this.logger.error(error.message, error);
                    }
                },
                onChunk: null,
                totalCount,
                maxItems: -1,
                chunkSize: 100
            });
        }
        catch (error) { }
    }
    async loadNamespaceTranslation(project, namespace, language) {
        const scenario = this.initScenario(this.logger, this.loadNamespaceTranslation);
        try {
            const pr = await this.translationProjectModel.findOne({ name: project });
            if (!pr)
                throw new exceptions.ItemNotFoundException('Project not found');
            const ns = await this.translationNamespaceModel.findOne({ project: pr._id, name: namespace });
            if (!pr)
                throw new exceptions.ItemNotFoundException('Namespace not found');
            const items = await this.translationItemModel.find({
                project: pr._id,
                namespace: namespace,
                is_deleted: false
            });
            return items.reduce((prev, item) => {
                var _a;
                return (Object.assign(Object.assign({}, prev), { [item.key]: ((_a = item.translations.find(tr => tr.language === language)) === null || _a === void 0 ? void 0 : _a.translation) || undefined }));
            }, {});
        }
        catch (error) {
            scenario.error(error);
            throw error;
        }
    }
};
TranslationToolsService = __decorate([
    Service(),
    __param(0, Inject('articleTypeModel')),
    __param(1, Inject('articleModel')),
    __param(2, Inject('commentModel')),
    __param(3, Inject('reviewModel')),
    __param(4, Inject('termModel')),
    __param(5, Inject('taxonomyModel')),
    __param(6, Inject('translationItemModel')),
    __param(7, Inject('translationNamespaceModel')),
    __param(8, Inject('translationProjectModel')),
    __param(9, EventDispatcher()),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], TranslationToolsService);
export default TranslationToolsService;
//# sourceMappingURL=translation.tools.service.js.map