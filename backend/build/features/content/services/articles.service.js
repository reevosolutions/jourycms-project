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
import Container, { Inject, Service } from 'typedi';
import { defaults } from '../../../utilities/helpers/utils.helpers';
import BaseService from '../../../common/base.service';
import config from '../../../config';
import events from '../../../config/events.config';
import { ITEM_SHORTCUTS } from '../../../constants/tracking_id.constants';
import { EventDispatcher } from '../../../decorators/eventDispatcher.decorator';
import exceptions from '../../../exceptions';
import CacheManager from '../../../managers/cache-manager';
import { createBooleanFilter, createDateRangeFilter, createStringFilter } from '../../../utilities/data/db/query.utilities';
import { getUserSnapshot } from '../../../utilities/entities/snapshots.utilities';
import ObjectUpdatedProperties from '../../../utilities/objects/update-calculator.class';
import { fixFiltersObject } from '../../../utilities/requests/index';
import userCan from '../../../utilities/security/user-can';
import { createTrackingId } from '../../../utilities/system/tracking-id.utilities';
import { mapDocumentToExposed } from '../../../common/mappers/general.mappers';
import ArticleSanitizers from '../sanitizers/article.sanitizers';
import ArticleValidators from '../validators/article.validators';
import { ArticleSchemaFields } from '../models/article.model';
import { slugify } from '../../../utilities/strings/slugify.utilities';
import { uniq } from 'lodash';
import { isObjectIdValid } from '../../../utilities/helpers/mogodb.helpers';
/**
 * @description
 */
let ArticlesService = class ArticlesService extends BaseService {
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
        this.ENTITY = 'article';
    }
    /**
    * @description Generates the snapshots object for the entity.
    */
    async _generateSnapshotsObject(new_data, old_data, authData) {
        try {
            const cache = Container.get(CacheManager);
            const result = {
                created_by: undefined
            };
            /**
             * Return the result
             */
            return result;
        }
        catch (error) {
            this.logError(this._generateSnapshotsObject, error);
            throw error;
        }
    }
    /**
     * @description Create search meta
     * @param {Partial<EntityAlias>} data
     * @param {Partial<EntityAlias>} old used on update
     * @returns {string}
     */
    _createSearchMeta(data, old) {
        /**
         * Define the search meta object
         */
        const search_meta = {
        /**
         * TODO: Add more fields to the search meta
         */
        // ...
        };
        /**
         * Add old values if not provided in the new data
        */
        if (old) {
            /**
             * TODO: Add more fields to the search meta
             */
            // ...
        }
        this.logExecutionResult(this._createSearchMeta, { data, old }, null, { search_meta });
        /**
         * Return the search meta
         */
        return Object.values(search_meta).filter(s => !!s).join(' ').replaceAll('  ', ' ').trim();
    }
    async _generateSlug(title, slug) {
        const scenario = this.initScenario(this.logger, this._generateSlug, { title, slug });
        try {
            let value = slug || slugify(title);
            let retries = 0;
            let exists = true;
            while (exists) {
                const res = await this.articleModel.exists({ slug: value });
                exists = !!res;
                if (exists) {
                    retries++;
                    value = slugify(title) + '-' + retries;
                }
            }
            scenario.set({
                slug: value,
                retries
            });
            scenario.end();
            return value;
        }
        catch (error) {
            scenario.error(error);
            throw error;
        }
    }
    /**
     * @description Apply filters based on the auth data
     */
    _applyAuthDataBasedFilters({ query, q, totalQ, opt, authData }) {
        try {
            /**
             * TODO: Apply filters based on the auth data
             */
            return { q, totalQ };
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * @description Apply filters on list queries
     */
    async _applyFilters({ query, q, totalQ, opt, authData }) {
        var _a;
        let { search, filters, load_deleted } = query;
        let filter;
        /**
         * @description Handle search
         */
        if (search) {
            q = q.where(({ $text: { $search: search } }));
            totalQ = totalQ.where(({ $text: { $search: search } }));
        }
        /**
         * @description fixing filters object
         */
        filters = fixFiltersObject(filters);
        /**
         * @description Inject attributes in the filters
         */
        if (!load_deleted && !opt.load_deleted && !('is_deleted' in filters))
            filters.is_deleted = false;
        if ((_a = authData === null || authData === void 0 ? void 0 : authData.current) === null || _a === void 0 ? void 0 : _a.app)
            (filters).app = authData === null || authData === void 0 ? void 0 : authData.current.app._id;
        // -- attributed:app
        if (ArticleSchemaFields['app']) {
            filter = createStringFilter(q, totalQ, filters['app'], 'app');
            q = filter.q;
            totalQ = filter.totalQ;
        }
        // -- attributed:company
        filter = createStringFilter(q, totalQ, filters.company, 'company');
        q = filter.q;
        totalQ = filter.totalQ;
        // -- attributed:store
        filter = createStringFilter(q, totalQ, filters.store, 'attributes.store');
        q = filter.q;
        totalQ = filter.totalQ;
        // -- is_deleted
        filter = createBooleanFilter(q, totalQ, filters.is_deleted, 'is_deleted');
        q = filter.q;
        totalQ = filter.totalQ;
        // -- created_at
        filter = createDateRangeFilter(q, totalQ, filters.created_at, 'created_at');
        q = filter.q;
        totalQ = filter.totalQ;
        // -- updated_at
        filter = createDateRangeFilter(q, totalQ, filters.updated_at, 'updated_at');
        q = filter.q;
        totalQ = filter.totalQ;
        // -- _id
        filter = createStringFilter(q, totalQ, filters._id, '_id');
        q = filter.q;
        totalQ = filter.totalQ;
        // -- created_by
        if (ArticleSchemaFields['created_by']) {
            filter = createDateRangeFilter(q, totalQ, filters['created_by'], 'created_by');
            q = filter.q;
            totalQ = filter.totalQ;
        }
        // -- slug
        filter = createStringFilter(q, totalQ, filters.slug, 'slug');
        q = filter.q;
        totalQ = filter.totalQ;
        // -- article_type
        if (filters.article_type) {
            let article_type;
            if (!isObjectIdValid(filters.article_type)) {
                const { _id } = await this.articleTypeModel.exists({ slug: filters.article_type });
                article_type = _id;
            }
            else
                article_type = filters.article_type;
            filter = createStringFilter(q, totalQ, article_type, 'article_type');
            q = filter.q;
            totalQ = filter.totalQ;
        }
        // -- name
        if (ArticleSchemaFields['name']) {
            filter = createStringFilter(q, totalQ, filters['name'], 'name');
            q = filter.q;
            totalQ = filter.totalQ;
        }
        return this._applyAuthDataBasedFilters({ query, q, totalQ, opt, authData });
    }
    /**
     * @description List
     */
    async list(query, authData, opt = {
        load_deleted: false,
        dont_lean: false
    }) {
        var _a, _b, _c, _d;
        try {
            /**
             * Fill options argument with the defaults
             */
            opt = defaults(opt, {
                load_deleted: false,
                dont_lean: false,
            });
            /**
             * Define the execution scenario object
             */
            const scenario = {};
            let { count, page, sort, sort_by } = query;
            count = isNaN(count) ? undefined : parseInt(count.toString());
            page = isNaN(page) ? 1 : parseInt(page.toString());
            let q = this.articleModel.find();
            let totalQ = this.articleModel.where();
            /**
             * Apply filters
             */
            const filter = await this._applyFilters({ q, totalQ, query, authData, opt });
            q = filter.q;
            totalQ = filter.totalQ;
            const limit = (count === undefined || count === null) ? ((_d = (_c = (_b = (_a = authData === null || authData === void 0 ? void 0 : authData.current) === null || _a === void 0 ? void 0 : _a.app) === null || _b === void 0 ? void 0 : _b.settings) === null || _c === void 0 ? void 0 : _c.listing) === null || _d === void 0 ? void 0 : _d.default_count) || config.settings.listing.defaultCount : count;
            const { skip, take } = this.getPaginationOptions(limit, page);
            const sortOptions = this.getSortOptions(sort, sort_by);
            if (take)
                q = q.limit(take);
            if (skip)
                q = q.skip(skip);
            q = q.sort(sortOptions);
            q = this.getSelectFields(q, query.fields);
            if (!opt.dont_lean)
                q = q.lean();
            /**
             * @description Add query to execution scenario
             */
            scenario.request_filter = fixFiltersObject(query.filters);
            scenario.listing_query = {
                model: q.model.modelName,
                query: q.getQuery(),
                options: q.getOptions(),
            };
            /**
             * @description execute the query
             */
            const items = await q
                .allowDiskUse(true) // Enable disk usage for large sorting operations
                .exec();
            const total = await totalQ.countDocuments();
            const pages = limit === -1 ? 1 : Math.ceil(total / limit);
            scenario.skip = skip;
            scenario.take = take;
            scenario.found = items === null || items === void 0 ? void 0 : items.length;
            scenario.total = total;
            const result = {
                data: items.map(doc => mapDocumentToExposed(doc)),
                pagination: {
                    total,
                    pages,
                }
            };
            result.edge = await this._buildResponseEdge(result.data);
            /**
             * Log execution result before returning the result
             */
            this.logExecutionResult(this.list, result, authData, scenario);
            return result;
        }
        catch (error) {
            this.logError(this.list, error);
            throw error;
        }
    }
    async _buildResponseEdge(data) {
        const scenario = this.initScenario(this.logger, this._buildResponseEdge);
        try {
            const types = await this.articleTypeModel.find({
                is_deleted: false
            }).lean().exec();
            const result = {
                users: {},
                article_types: {},
                linked_articles: {},
            };
            this.logger.tree('types', types);
            const linked_articles = {};
            const articleIds = [];
            for (const item of data) {
                const type = types.find(t => { var _a; return t._id.toString() === ((_a = item.article_type) === null || _a === void 0 ? void 0 : _a.toString()); }) || null;
                this.logger.tree('type', item.article_type, type === null || type === void 0 ? void 0 : type.slug, type === null || type === void 0 ? void 0 : type.custom_meta_fields);
                if (item.article_type)
                    result.article_types[item.article_type] = type;
                if (Object.keys(item.meta_fields || {}).length && type) {
                    for (const field of type.custom_meta_fields) {
                        if (field.field_type === 'article_object' && item.meta_fields[field.field_key]) {
                            articleIds.push(item.meta_fields[field.field_key]);
                        }
                    }
                }
            }
            scenario.set({ articleIds });
            if (articleIds.length) {
                const articles = await this.articleModel.find({
                    _id: { $in: uniq(articleIds) }
                }).lean().exec();
                this.logger.value('linked_articles', articles.length);
                for (const article of articles) {
                    linked_articles[article._id] = Object.assign(Object.assign({}, article), { body: undefined, body_unformatted: undefined, body_structured: undefined, attributes: undefined, snapshots: undefined, insights: undefined });
                }
            }
            result.linked_articles = linked_articles;
            scenario.end();
            return result;
        }
        catch (error) {
            scenario.error(error);
            throw error;
        }
    }
    /**
    * @description GetOne
    */
    async getById(id, authData, opt = { load_deleted: false, dont_lean: false, ignore_not_found_error: false, bypass_authorization: false }) {
        try {
            /**
             * Fill options argument with the defaults
             */
            opt = defaults(opt, {
                load_deleted: false,
                dont_lean: false,
                ignore_not_found_error: false,
            });
            /**
             * Define the execution scenario object
             */
            const scenario = {};
            const q = this.articleModel.findById(id);
            /**
             * @description Lean the query else if needed to not do so
             */
            if (!opt.dont_lean)
                q.lean();
            const doc = await q.exec();
            if (!doc)
                throw new exceptions.ItemNotFoundException('Object not found');
            /**
             * Check if the document is deleted and the user does not want to load deleted documents
             */
            if (doc.is_deleted && !opt.load_deleted)
                throw new exceptions.ItemNotFoundException('Object deleted');
            /**
            * Check if the user can view the object
            */
            if (!opt.bypass_authorization && !userCan.viewObject(this.ENTITY, doc, authData))
                throw new exceptions.UnauthorizedException('You are not allowed to view this object');
            const result = {
                data: mapDocumentToExposed(doc)
            };
            result.edge = await this._buildResponseEdge([result.data]);
            /**
             * Log execution result before returning the result
             */
            this.logExecutionResult(this.getById, result, authData, scenario);
            return result;
        }
        catch (error) {
            if (opt.ignore_not_found_error && error instanceof exceptions.ItemNotFoundException)
                return { data: undefined };
            this.logError(this.getById, error);
            throw error;
        }
    }
    /**
    * @description getBySlug
    */
    async getBySlug(slug, authData, opt = { load_deleted: false, dont_lean: false, ignore_not_found_error: false, bypass_authorization: false }) {
        try {
            /**
             * Fill options argument with the defaults
             */
            opt = defaults(opt, {
                load_deleted: false,
                dont_lean: false,
                ignore_not_found_error: false,
            });
            /**
             * Define the execution scenario object
             */
            const scenario = {};
            const q = this.articleModel.findOne({ slug });
            /**
             * @description Lean the query else if needed to not do so
             */
            if (!opt.dont_lean)
                q.lean();
            const doc = await q.exec();
            if (!doc)
                throw new exceptions.ItemNotFoundException('Object not found');
            /**
             * Check if the document is deleted and the user does not want to load deleted documents
             */
            if (doc.is_deleted && !opt.load_deleted)
                throw new exceptions.ItemNotFoundException('Object deleted');
            /**
            * Check if the user can view the object
            */
            if (!opt.bypass_authorization && !userCan.viewObject(this.ENTITY, doc, authData))
                throw new exceptions.UnauthorizedException('You are not allowed to view this object');
            const result = {
                data: mapDocumentToExposed(doc)
            };
            result.edge = await this._buildResponseEdge([result.data]);
            /**
             * Log execution result before returning the result
             */
            this.logExecutionResult(this.getById, result, authData, scenario);
            return result;
        }
        catch (error) {
            if (opt.ignore_not_found_error && error instanceof exceptions.ItemNotFoundException)
                return { data: undefined };
            this.logError(this.getById, error);
            throw error;
        }
    }
    /**
     * @description Create
     */
    async create({ data }, authData, opt) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        try {
            /**
             * Define the execution scenario object
             */
            const scenario = {};
            /**
             * await sanitize data here
             */
            data = await ArticleSanitizers.sanitizeCreateBody(data, authData);
            /**
             * Validate data here
             */
            const { error } = ArticleValidators.validateCreateBody(data);
            if (error)
                throw error;
            let {} = data;
            /**
             * Auto-fill system data
             */
            data.app = ((_b = (_a = authData === null || authData === void 0 ? void 0 : authData.current) === null || _a === void 0 ? void 0 : _a.app) === null || _b === void 0 ? void 0 : _b._id)
                ? (_d = (_c = authData === null || authData === void 0 ? void 0 : authData.current) === null || _c === void 0 ? void 0 : _c.app) === null || _d === void 0 ? void 0 : _d._id
                : (opt === null || opt === void 0 ? void 0 : opt.bypass_authorization) || (((_f = (_e = authData.current) === null || _e === void 0 ? void 0 : _e.service) === null || _f === void 0 ? void 0 : _f.name) && !((_h = (_g = authData.current) === null || _g === void 0 ? void 0 : _g.service) === null || _h === void 0 ? void 0 : _h.is_external))
                    ? data.app
                    : undefined;
            /**
             * Check if the user can create the object
             */
            if (((_k = (_j = authData === null || authData === void 0 ? void 0 : authData.current) === null || _j === void 0 ? void 0 : _j.app) === null || _k === void 0 ? void 0 : _k._id) && ((_m = (_l = authData === null || authData === void 0 ? void 0 : authData.current) === null || _l === void 0 ? void 0 : _l.app) === null || _m === void 0 ? void 0 : _m._id) !== data.app)
                throw new exceptions.UnauthorizedException('You are not allowed to create this object on this app');
            if (!userCan.createObject(this.ENTITY, data, authData))
                throw new exceptions.UnauthorizedException('You are not allowed to create this object');
            /**
             * Create data object
             */
            const docObject = Object.assign(Object.assign({}, data), { slug: await this._generateSlug(data.title, data.slug) });
            /**
             * Create tracking ID
             */
            if (ArticleSchemaFields['tracking_id'] && Object.keys(ITEM_SHORTCUTS).includes('Article')) {
                const entity = 'Article';
                docObject['tracking_id'] = await createTrackingId(this.ENTITY, this.articleModel);
            }
            /**
             * Create search meta
             */
            if (ArticleSchemaFields['search_meta']) {
                docObject['search_meta'] = this._createSearchMeta(docObject, null);
            }
            docObject.snapshots = await this._generateSnapshotsObject(docObject, null, authData);
            /**
             * Create the object on DB
             */
            const doc = await this.articleModel.create(docObject);
            if (!doc)
                throw new exceptions.InternalServerError('Failed to create the object');
            this.eventDispatcher.dispatch(events.content.article.created, { data: doc });
            const result = {
                data: mapDocumentToExposed(doc)
            };
            /**
             * Log execution result before returning the result
             */
            this.logExecutionResult(this.create, result, authData, scenario);
            return result;
        }
        catch (error) {
            this.logError(this.create, error);
            throw error;
        }
    }
    /**
    * @description Update
    */
    async update(id, { data }, authData) {
        var _a, _b;
        try {
            /**
             * Define the execution scenario object
             */
            const scenario = {};
            /**
             * await sanitize data here
             */
            data = await ArticleSanitizers.sanitizeUpdateBody(data, authData);
            /**
             * Validate data here
             */
            const { error } = ArticleValidators.validateUpdateBody(data);
            if (error)
                throw error;
            /**
             * Extract the required in block variables from the data object
             */
            const {} = data;
            /**
             * load old object and check if it exists
             */
            const old = await this.articleModel.findById(id);
            if (!old)
                throw new exceptions.ItemNotFoundException('Object not found');
            if (old.is_deleted)
                throw new exceptions.UnauthorizedException('Object is deleted');
            if (!userCan.updateObject(this.ENTITY, old, authData))
                throw new exceptions.UnauthorizedException('You are not allowed to update this object');
            /**
             * detect changes
             */
            const updates = new ObjectUpdatedProperties(old.toObject(), data, true);
            scenario.updates = updates.asArray;
            const updateObject = {
                updated_by_system: !((_a = authData === null || authData === void 0 ? void 0 : authData.current) === null || _a === void 0 ? void 0 : _a.user),
                updated_by: getUserSnapshot((_b = authData === null || authData === void 0 ? void 0 : authData.current) === null || _b === void 0 ? void 0 : _b.user),
                date: new Date(),
                action: 'updated',
                updates: updates.asArray
            };
            /**
             * Create data object
             */
            const docObject = Object.assign({}, data);
            /**
             * Create search meta
             */
            if (ArticleSchemaFields['search_meta']) {
                docObject['search_meta'] = this._createSearchMeta(docObject, old);
            }
            docObject.snapshots = await this._generateSnapshotsObject(docObject, old, authData);
            /**
             * Update the object on DB
             */
            const doc = await this.articleModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, docObject), { $addToSet: {
                    updates: updateObject
                } }), { new: true });
            if (!doc)
                throw new exceptions.ItemNotFoundException('Object not found');
            /**
             * Handle the updated effects on the same service
             */
            // ...
            /**
             * Dispatch the updated event
             */
            this.eventDispatcher.dispatch(events.content.article.updated, { data: doc });
            const result = {
                data: mapDocumentToExposed(doc)
            };
            /**
             * Log execution result before returning the result
             */
            this.logExecutionResult(this.update, result, authData, scenario);
            /**
             * Return the result
             */
            return result;
        }
        catch (error) {
            this.logError(this.update, error);
            throw error;
        }
    }
    /**
    * @description Delete
    */
    async delete(id, authData) {
        var _a, _b;
        try {
            /**
             * Define the execution scenario object
             */
            const scenario = {};
            const updateObject = {
                updated_by_system: !((_a = authData === null || authData === void 0 ? void 0 : authData.current) === null || _a === void 0 ? void 0 : _a.user),
                updated_by: getUserSnapshot((_b = authData === null || authData === void 0 ? void 0 : authData.current) === null || _b === void 0 ? void 0 : _b.user),
                date: new Date(),
                action: 'deleted',
                updates: []
            };
            const old = await this.articleModel.findById(id);
            if (!old)
                throw new exceptions.ItemNotFoundException('Object not found');
            if (old.is_deleted)
                throw new exceptions.UnauthorizedException('Object already deleted');
            if (!userCan.deleteObject(this.ENTITY, old, authData))
                throw new exceptions.UnauthorizedException('You are not allowed to delete this object');
            const doc = await this.articleModel.findByIdAndUpdate(id, {
                is_deleted: true,
                deleted_at: new Date(),
                $addToSet: {
                    updates: updateObject
                }
            }, { new: true });
            this.eventDispatcher.dispatch(events.content.article.deleted, { data: doc });
            const result = {
                data: {
                    deleted: true
                }
            };
            /**
             * Log execution result before returning the result
             */
            this.logExecutionResult(this.delete, result, authData, scenario);
            return result;
        }
        catch (error) {
            this.logError(this.delete, error);
            throw error;
        }
    }
    /**
    * @description Restore
    */
    async restore(id, authData) {
        var _a, _b;
        try {
            /**
             * Define the execution scenario object
             */
            const scenario = {};
            const updateObject = {
                updated_by_system: !((_a = authData === null || authData === void 0 ? void 0 : authData.current) === null || _a === void 0 ? void 0 : _a.user),
                updated_by: getUserSnapshot((_b = authData === null || authData === void 0 ? void 0 : authData.current) === null || _b === void 0 ? void 0 : _b.user),
                date: new Date(),
                action: 'restored',
                updates: []
            };
            const old = await this.articleModel.findById(id);
            if (!old)
                throw new exceptions.ItemNotFoundException('Object not found');
            if (!old.is_deleted)
                throw new exceptions.UnauthorizedException('Object already exists');
            if (!userCan.restoreObject(this.ENTITY, old, authData))
                throw new exceptions.UnauthorizedException('You are not allowed to restore this object');
            const doc = await this.articleModel.findByIdAndUpdate(id, {
                is_deleted: false,
                deleted_at: null,
                $addToSet: {
                    updates: updateObject
                }
            }, { new: true });
            if (!doc)
                throw new exceptions.ItemNotFoundException('Object not found');
            this.eventDispatcher.dispatch(events.content.article.restored, { data: doc });
            const result = {
                data: {
                    restored: true
                }
            };
            /**
             * Log execution result before returning the result
             */
            this.logExecutionResult(this.restore, result, authData, scenario);
            return result;
        }
        catch (error) {
            this.logError(this.restore, error);
            throw error;
        }
    }
};
ArticlesService = __decorate([
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
], ArticlesService);
export default ArticlesService;
//# sourceMappingURL=articles.service.js.map