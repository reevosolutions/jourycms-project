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
const typedi_1 = __importStar(require("typedi"));
const utils_helpers_1 = require("../../../utilities/helpers/utils.helpers");
const base_service_1 = __importDefault(require("../../../common/base.service"));
const config_1 = __importDefault(require("../../../config"));
const events_config_1 = __importDefault(require("../../../config/events.config"));
const eventDispatcher_decorator_1 = require("../../../decorators/eventDispatcher.decorator");
const exceptions_1 = __importDefault(require("../../../exceptions"));
const cache_manager_1 = __importDefault(require("../../../managers/cache-manager"));
const query_utilities_1 = require("../../../utilities/data/db/query.utilities");
const snapshots_utilities_1 = require("../../../utilities/entities/snapshots.utilities");
const objects_1 = require("../../../utilities/objects");
const update_calculator_class_1 = __importDefault(require("../../../utilities/objects/update-calculator.class"));
const index_1 = require("../../../utilities/requests/index");
const user_can_1 = __importDefault(require("../../../utilities/security/user-can"));
const general_mappers_1 = require("../../../utils/mappers/general.mappers");
const term_sanitizers_1 = __importDefault(require("../../../utils/sanitizers/term.sanitizers"));
const term_validators_1 = __importDefault(require("../../../utils/validators/term.validators"));
const term_model_1 = require("../models/term.model");
/**
 * @description
 */
let TermsService = class TermsService extends base_service_1.default {
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
        this.ENTITY = 'term';
    }
    /**
     * @description Generates the snapshots object for the entity.
     */
    async _generateSnapshotsObject(new_data, old_data, authData) {
        try {
            const cache = typedi_1.default.get(cache_manager_1.default);
            const result = {
                created_by: undefined,
                taxonomy: {
                    _id: '',
                    slug: '',
                    name: '',
                    is_hierarchical: false,
                    is_multi: false
                }
            };
            const taxonomy = await this.taxonomyModel.findById((0, utils_helpers_1.getItemIdsFromOldAndNewData)(new_data.taxonomy, old_data === null || old_data === void 0 ? void 0 : old_data.taxonomy));
            this.logger.debug(this._generateSnapshotsObject.name, new_data.taxonomy, old_data === null || old_data === void 0 ? void 0 : old_data.taxonomy, taxonomy === null || taxonomy === void 0 ? void 0 : taxonomy.name);
            if (taxonomy) {
                result.taxonomy = (0, objects_1.extractPartialObject)(taxonomy.toObject(), [
                    '_id',
                    'slug',
                    'name',
                    'is_hierarchical',
                    'is_multi'
                ]);
                this.logger.debug('tax', result.taxonomy);
            }
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
            name: data.name,
            description: data.description
            /**
             * TODO: Add more fields to the search meta
             */
            // ...
        };
        /**
         * Add old values if not provided in the new data
         */
        if (old) {
            if (typeof data.name === 'undefined')
                search_meta.name = old.name || '';
            if (typeof data.description === 'undefined')
                search_meta.description = old.description || '';
            /**
             * TODO: Add more fields to the search meta
             */
            // ...
        }
        this.logExecutionResult(this._createSearchMeta, { data, old }, null, { search_meta });
        /**
         * Return the search meta
         */
        return Object.values(search_meta)
            .filter(s => !!s)
            .join(' ')
            .replaceAll('  ', ' ')
            .trim();
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
    _applyFilters({ query, q, totalQ, opt, authData }) {
        var _a;
        let { search, filters, load_deleted } = query;
        let filter;
        /**
         * @description Handle search
         */
        if (search) {
            q = q.where({ $text: { $search: search } });
            totalQ = totalQ.where({ $text: { $search: search } });
        }
        /**
         * @description fixing filters object
         */
        filters = (0, index_1.fixFiltersObject)(filters);
        /**
         * @description Inject attributes in the filters
         */
        if (!load_deleted && !opt.load_deleted && !('is_deleted' in filters))
            filters.is_deleted = false;
        if ((_a = authData === null || authData === void 0 ? void 0 : authData.current) === null || _a === void 0 ? void 0 : _a.app)
            filters.app = authData === null || authData === void 0 ? void 0 : authData.current.app._id;
        // -- attributed:app
        if (term_model_1.TermSchemaFields['app']) {
            filter = (0, query_utilities_1.createStringFilter)(q, totalQ, filters['app'], 'app');
            q = filter.q;
            totalQ = filter.totalQ;
        }
        // -- attributed:company
        filter = (0, query_utilities_1.createStringFilter)(q, totalQ, filters.company, 'company');
        q = filter.q;
        totalQ = filter.totalQ;
        // -- attributed:store
        filter = (0, query_utilities_1.createStringFilter)(q, totalQ, filters.store, 'attributes.store');
        q = filter.q;
        totalQ = filter.totalQ;
        // -- is_deleted
        filter = (0, query_utilities_1.createBooleanFilter)(q, totalQ, filters.is_deleted, 'is_deleted');
        q = filter.q;
        totalQ = filter.totalQ;
        // -- created_at
        filter = (0, query_utilities_1.createDateRangeFilter)(q, totalQ, filters.created_at, 'created_at');
        q = filter.q;
        totalQ = filter.totalQ;
        // -- updated_at
        filter = (0, query_utilities_1.createDateRangeFilter)(q, totalQ, filters.updated_at, 'updated_at');
        q = filter.q;
        totalQ = filter.totalQ;
        // -- _id
        filter = (0, query_utilities_1.createStringFilter)(q, totalQ, filters._id, '_id');
        q = filter.q;
        totalQ = filter.totalQ;
        // -- created_by
        filter = (0, query_utilities_1.createDateRangeFilter)(q, totalQ, filters['created_by'], 'created_by');
        q = filter.q;
        totalQ = filter.totalQ;
        // -- taxonomy
        filter = (0, query_utilities_1.createStringFilter)(q, totalQ, filters.taxonomy, 'taxonomy');
        q = filter.q;
        totalQ = filter.totalQ;
        // -- name
        if (term_model_1.TermSchemaFields['name']) {
            filter = (0, query_utilities_1.createStringFilter)(q, totalQ, filters['name'], 'name');
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
            opt = (0, utils_helpers_1.defaults)(opt, {
                load_deleted: false,
                dont_lean: false
            });
            /**
             * Define the execution scenario object
             */
            const scenario = {};
            let { count, page, sort, sort_by } = query;
            count = isNaN(count) ? undefined : parseInt(count.toString());
            page = isNaN(page) ? 1 : parseInt(page.toString());
            let q = this.termModel.find();
            let totalQ = this.termModel.where();
            /**
             * Apply filters
             */
            const filter = this._applyFilters({ q, totalQ, query, authData, opt });
            q = filter.q;
            totalQ = filter.totalQ;
            const limit = count === undefined || count === null
                ? ((_d = (_c = (_b = (_a = authData === null || authData === void 0 ? void 0 : authData.current) === null || _a === void 0 ? void 0 : _a.app) === null || _b === void 0 ? void 0 : _b.settings) === null || _c === void 0 ? void 0 : _c.listing) === null || _d === void 0 ? void 0 : _d.default_count) || config_1.default.settings.listing.defaultCount
                : count;
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
            scenario.request_filter = (0, index_1.fixFiltersObject)(query.filters);
            scenario.listing_query = {
                model: q.model.modelName,
                query: q.getQuery(),
                options: q.getOptions()
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
                data: items.map(doc => (0, general_mappers_1.mapDocumentToExposed)(doc)),
                pagination: {
                    total,
                    pages
                }
            };
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
    /**
     * @description GetOne
     */
    async getById(id, authData, opt = { load_deleted: false, dont_lean: false, ignore_not_found_error: false, bypass_authorization: false }) {
        try {
            /**
             * Fill options argument with the defaults
             */
            opt = (0, utils_helpers_1.defaults)(opt, {
                load_deleted: false,
                dont_lean: false,
                ignore_not_found_error: false
            });
            /**
             * Define the execution scenario object
             */
            const scenario = {};
            const q = this.termModel.findById(id);
            /**
             * @description Lean the query else if needed to not do so
             */
            if (!opt.dont_lean)
                q.lean();
            const doc = await q.exec();
            if (!doc)
                throw new exceptions_1.default.ItemNotFoundException('Object not found');
            /**
             * Check if the document is deleted and the user does not want to load deleted documents
             */
            if (doc.is_deleted && !opt.load_deleted)
                throw new exceptions_1.default.ItemNotFoundException('Object deleted');
            /**
             * Check if the user can view the object
             */
            if (!opt.bypass_authorization && !user_can_1.default.viewObject(this.ENTITY, doc, authData))
                throw new exceptions_1.default.UnauthorizedException('You are not allowed to view this object');
            const result = {
                data: (0, general_mappers_1.mapDocumentToExposed)(doc)
            };
            /**
             * Log execution result before returning the result
             */
            this.logExecutionResult(this.getById, result, authData, scenario);
            return result;
        }
        catch (error) {
            if (opt.ignore_not_found_error && error instanceof exceptions_1.default.ItemNotFoundException)
                return { data: undefined };
            this.logError(this.getById, error);
            throw error;
        }
    }
    /**
     * @description GetByName
     */
    async getByName(name, authData, opt = { load_deleted: false, dont_lean: false, ignore_not_found_error: false, bypass_authorization: false }) {
        try {
            /**
             * Fill options argument with the defaults
             */
            opt = (0, utils_helpers_1.defaults)(opt, {
                load_deleted: false,
                dont_lean: false,
                ignore_not_found_error: false
            });
            /**
             * Define the execution scenario object
             */
            const scenario = {};
            const q = this.termModel.findOne({ name });
            /**
             * @description Lean the query else if needed to not do so
             */
            if (!opt.dont_lean)
                q.lean();
            const doc = await q.exec();
            if (!doc)
                throw new exceptions_1.default.ItemNotFoundException('Object not found');
            /**
             * Check if the document is deleted and the user does not want to load deleted documents
             */
            if (doc.is_deleted && !opt.load_deleted)
                throw new exceptions_1.default.ItemNotFoundException('Object deleted');
            /**
             * Check if the user can view the object
             */
            if (!opt.bypass_authorization && !user_can_1.default.viewObject(this.ENTITY, doc, authData))
                throw new exceptions_1.default.UnauthorizedException('You are not allowed to view this object');
            const result = {
                data: (0, general_mappers_1.mapDocumentToExposed)(doc)
            };
            /**
             * Log execution result before returning the result
             */
            this.logExecutionResult(this.getByName, result, authData, scenario);
            return result;
        }
        catch (error) {
            if (opt.ignore_not_found_error && error instanceof exceptions_1.default.ItemNotFoundException)
                return { data: undefined };
            this.logError(this.getByName, error);
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
            data = await term_sanitizers_1.default.sanitizeCreateBody(data, authData);
            /**
             * Validate data here
             */
            const { error } = term_validators_1.default.validateCreateBody(data);
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
                throw new exceptions_1.default.UnauthorizedException('You are not allowed to create this object on this app');
            if (!user_can_1.default.createObject(this.ENTITY, data, authData))
                throw new exceptions_1.default.UnauthorizedException('You are not allowed to create this object');
            /**
             * Create data object
             */
            const docObject = Object.assign({}, data);
            /**
             * Create tracking ID
             */
            /**
             * Create search meta
             */
            docObject.snapshots = await this._generateSnapshotsObject(docObject, null, authData);
            docObject.search_meta = this._createSearchMeta(docObject, null);
            /**
             * Create the object on DB
             */
            const doc = await this.termModel.create(docObject);
            if (!doc)
                throw new exceptions_1.default.InternalServerError('Failed to create the object');
            this.eventDispatcher.dispatch(events_config_1.default.content.term.created, { data: doc });
            const result = {
                data: (0, general_mappers_1.mapDocumentToExposed)(doc)
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
            data = await term_sanitizers_1.default.sanitizeUpdateBody(data, authData);
            /**
             * Validate data here
             */
            const { error } = term_validators_1.default.validateUpdateBody(data);
            if (error)
                throw error;
            /**
             * Extract the required in block variables from the data object
             */
            const {} = data;
            /**
             * load old object and check if it exists
             */
            const old = await this.termModel.findById(id);
            if (!old)
                throw new exceptions_1.default.ItemNotFoundException('Object not found');
            if (old.is_deleted)
                throw new exceptions_1.default.UnauthorizedException('Object is deleted');
            if (!user_can_1.default.updateObject(this.ENTITY, old, authData))
                throw new exceptions_1.default.UnauthorizedException('You are not allowed to update this object');
            /**
             * detect changes
             */
            const updates = new update_calculator_class_1.default(old.toObject(), data, true);
            scenario.updates = updates.asArray;
            const updateObject = {
                updated_by_system: !((_a = authData === null || authData === void 0 ? void 0 : authData.current) === null || _a === void 0 ? void 0 : _a.user),
                updated_by: (0, snapshots_utilities_1.getUserSnapshot)((_b = authData === null || authData === void 0 ? void 0 : authData.current) === null || _b === void 0 ? void 0 : _b.user),
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
            if (term_model_1.TermSchemaFields['search_meta']) {
                docObject['search_meta'] = this._createSearchMeta(docObject, old);
            }
            docObject.snapshots = await this._generateSnapshotsObject(docObject, old, authData);
            /**
             * Update the object on DB
             */
            const doc = await this.termModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, docObject), { $addToSet: {
                    updates: updateObject
                } }), { new: true });
            if (!doc)
                throw new exceptions_1.default.ItemNotFoundException('Object not found');
            /**
             * Handle the updated effects on the same service
             */
            // ...
            /**
             * Dispatch the updated event
             */
            this.eventDispatcher.dispatch(events_config_1.default.content.term.updated, { data: doc });
            const result = {
                data: (0, general_mappers_1.mapDocumentToExposed)(doc)
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
                updated_by: (0, snapshots_utilities_1.getUserSnapshot)((_b = authData === null || authData === void 0 ? void 0 : authData.current) === null || _b === void 0 ? void 0 : _b.user),
                date: new Date(),
                action: 'deleted',
                updates: []
            };
            const old = await this.termModel.findById(id);
            if (!old)
                throw new exceptions_1.default.ItemNotFoundException('Object not found');
            if (old.is_deleted)
                throw new exceptions_1.default.UnauthorizedException('Object already deleted');
            if (!user_can_1.default.deleteObject(this.ENTITY, old, authData))
                throw new exceptions_1.default.UnauthorizedException('You are not allowed to delete this object');
            const doc = await this.termModel.findByIdAndUpdate(id, {
                is_deleted: true,
                deleted_at: new Date(),
                $addToSet: {
                    updates: updateObject
                }
            }, { new: true });
            this.eventDispatcher.dispatch(events_config_1.default.content.term.deleted, { data: doc });
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
                updated_by: (0, snapshots_utilities_1.getUserSnapshot)((_b = authData === null || authData === void 0 ? void 0 : authData.current) === null || _b === void 0 ? void 0 : _b.user),
                date: new Date(),
                action: 'restored',
                updates: []
            };
            const old = await this.termModel.findById(id);
            if (!old)
                throw new exceptions_1.default.ItemNotFoundException('Object not found');
            if (!old.is_deleted)
                throw new exceptions_1.default.UnauthorizedException('Object already exists');
            if (!user_can_1.default.restoreObject(this.ENTITY, old, authData))
                throw new exceptions_1.default.UnauthorizedException('You are not allowed to restore this object');
            const doc = await this.termModel.findByIdAndUpdate(id, {
                is_deleted: false,
                deleted_at: null,
                $addToSet: {
                    updates: updateObject
                }
            }, { new: true });
            if (!doc)
                throw new exceptions_1.default.ItemNotFoundException('Object not found');
            this.eventDispatcher.dispatch(events_config_1.default.content.term.restored, { data: doc });
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
TermsService = __decorate([
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
], TermsService);
exports.default = TermsService;
//# sourceMappingURL=terms.service.js.map