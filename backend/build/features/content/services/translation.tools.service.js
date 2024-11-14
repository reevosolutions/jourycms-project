"use strict";
/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-03 00:17:36
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const fs = __importStar(require("fs"));
const google_translate_api_x_1 = require("google-translate-api-x");
const https_proxy_agent_1 = require("https-proxy-agent");
const lodash_1 = require("lodash");
const path = __importStar(require("path"));
const typedi_1 = __importStar(require("typedi"));
const base_service_1 = __importDefault(require("../../../common/base.service"));
const localization_constants_1 = require("../../../constants/localization.constants");
const eventDispatcher_decorator_1 = require("../../../decorators/eventDispatcher.decorator");
const exceptions_1 = __importDefault(require("../../../exceptions"));
const cache_manager_1 = __importDefault(require("../../../managers/cache-manager"));
const chunks_utilities_1 = require("../../../utilities/data/db/chunks.utilities");
const output_utilities_1 = require("../../../utilities/logging/output.utilities");
const timer_utilities_1 = require("../../../utilities/system/timer.utilities");
const translation_items_service_1 = __importDefault(require("./translation.items.service"));
const translation_namespaces_service_1 = __importDefault(require("./translation.namespaces.service"));
const translation_projects_service_1 = __importDefault(require("./translation.projects.service"));
const crypto_1 = __importDefault(require("crypto"));
/**
 * @description
 */
let TranslationToolsService = class TranslationToolsService extends base_service_1.default {
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
            let hash = crypto_1.default.createHash('md5').update(key).digest('hex');
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
            let hash = crypto_1.default.createHash('md5').update(key).digest('hex');
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
        const projectsService = typedi_1.default.get(translation_projects_service_1.default);
        const translationNamespacesService = typedi_1.default.get(translation_namespaces_service_1.default);
        const translationItemsService = typedi_1.default.get(translation_items_service_1.default);
        const cache = typedi_1.default.get(cache_manager_1.default);
        try {
            const apps = await cache.apps.list();
            let { namespace, project, languages, default_language, key } = data;
            if (!namespace)
                throw new exceptions_1.default.BadRequestException('Namespace is required');
            if (!project)
                throw new exceptions_1.default.BadRequestException('Project is required');
            if (!languages)
                throw new exceptions_1.default.BadRequestException('Languages is required');
            if (!default_language)
                throw new exceptions_1.default.BadRequestException('Default language is required');
            if (!key)
                throw new exceptions_1.default.BadRequestException('Key is required');
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
                        languages: (0, lodash_1.uniq)([default_language, ...languages])
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
            const hash = crypto_1.default.createHash('md5').update(key).digest('hex');
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
            const translationItemsService = typedi_1.default.get(translation_items_service_1.default);
            const proxiesData = fs.readFileSync(path.join(__dirname, '../../assets/proxies.txt'), 'utf8');
            const proxies = (0, lodash_1.uniqBy)(proxiesData
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
            await (0, chunks_utilities_1.applyOnDocumentChunks)({
                query: this.translationItemModel.find({ is_deleted: false }),
                onItem: async (item, index, page, progress) => {
                    item = item.toObject();
                    const proxy_url = pickProxyURL();
                    try {
                        if (!proxy_url)
                            throw new exceptions_1.default.LevelupException('No proxy available');
                        const LANGUAGES = ['en', 'ar', 'fr'];
                        for (const LANG of localization_constants_1.SUPPORTED_LANGUAGES) {
                            // this.logger.event('handling item', ` ${LANG} `.bgBlue, item.key);
                            const translation = item.translations.find(tr => tr.language === LANG);
                            if ((translation === null || translation === void 0 ? void 0 : translation.is_approved) || (translation === null || translation === void 0 ? void 0 : translation.is_auto_translated)) {
                                this.logger.success((0, output_utilities_1.generateProgressBar)(progress), `${index} of ${totalCount}`, {
                                    key: item.key,
                                    [LANG]: translation.translation,
                                    approved: translation.is_approved,
                                    auto_translated: translation.is_auto_translated
                                });
                            }
                            else {
                                let result;
                                try {
                                    result = await (0, google_translate_api_x_1.translate)(item.namespace === 'system' || (item.key.includes('_') && !item.key.includes(' '))
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
                                        result = await (0, google_translate_api_x_1.translate)(item.namespace === 'system' || (item.key.includes('_') && !item.key.includes(' '))
                                            ? item.key.replaceAll('_', ' ')
                                            : item.key, {
                                            from: 'en',
                                            to: LANG,
                                            forceFrom: true,
                                            forceTo: true,
                                            requestOptions: {
                                                agent: new https_proxy_agent_1.HttpsProxyAgent(proxy_url)
                                            }
                                        });
                                    }
                                    catch (error) {
                                        this.logger.error(error.message, error);
                                    }
                                }
                                if (result) {
                                    this.logger.tree((0, output_utilities_1.generateProgressBar)(progress), `${index} of ${totalCount}`, item._id.toString(), {
                                        language: LANG,
                                        key: item.key,
                                        old_translation: (translation === null || translation === void 0 ? void 0 : translation.translation) || '',
                                        api_translation: (result === null || result === void 0 ? void 0 : result.text) ? result === null || result === void 0 ? void 0 : result.text : (result === null || result === void 0 ? void 0 : result.raw) || result
                                    });
                                    await (0, timer_utilities_1.sleep)(faker_1.faker.number.int({ min: 10, max: 6000 }));
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
                throw new exceptions_1.default.ItemNotFoundException('Project not found');
            const ns = await this.translationNamespaceModel.findOne({ project: pr._id, name: namespace });
            if (!pr)
                throw new exceptions_1.default.ItemNotFoundException('Namespace not found');
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
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('articleTypeModel')),
    __param(1, (0, typedi_1.Inject)('articleModel')),
    __param(2, (0, typedi_1.Inject)('commentModel')),
    __param(3, (0, typedi_1.Inject)('reviewModel')),
    __param(4, (0, typedi_1.Inject)('termModel')),
    __param(5, (0, typedi_1.Inject)('taxonomyModel')),
    __param(6, (0, typedi_1.Inject)('translationItemModel')),
    __param(7, (0, typedi_1.Inject)('translationNamespaceModel')),
    __param(8, (0, typedi_1.Inject)('translationProjectModel')),
    __param(9, (0, eventDispatcher_decorator_1.EventDispatcher)()),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], TranslationToolsService);
exports.default = TranslationToolsService;
//# sourceMappingURL=translation.tools.service.js.map