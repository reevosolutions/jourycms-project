/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-03 00:17:36
 */

import mongoose from 'mongoose';
import { Inject, Service } from 'typedi';
import { defaults } from '../../../utilities/helpers/utils.helpers';

import BaseService from '../../../common/base.service';
import config from '../../../config';
import events from '../../../config/events.config';
import { ITEM_SHORTCUTS } from '../../../constants/tracking_id.constants';
import { EventDispatcher } from '../../../decorators/eventDispatcher.decorator';
import exceptions from '../../../exceptions';
import { createBooleanFilter, createDateRangeFilter, createStringFilter } from '../../../utilities/data/db/query.utilities';
import { getUserSnapshot } from '../../../utilities/entities/snapshots.utilities';
import ObjectUpdatedProperties from '../../../utilities/objects/update-calculator.class';
import { fixFiltersObject } from '../../../utilities/requests/index';
import userCan from '../../../utilities/security/user-can';
import { createTrackingId } from '../../../utilities/system/tracking-id.utilities';
import { mapDocumentToExposed } from '../../../common/mappers/general.mappers';
import TranslationProjectSanitizers from '../sanitizers/translation.project.sanitizers';
import TranslationProjectValidators from '../validators/translation.project.validators';
import { TranslationProjectSchemaFields } from '../models/translation.project.model';

import EntityAlias = Levelup.CMS.V1.Content.Translation.Entity.Project;
import ApiAlias = Levelup.CMS.V1.Content.Translation.Api.Projects;
import DocumentAlias = Levelup.CMS.V1.Content.Translation.Model.ProjectDocument;
import EventPayloadsAlias = Levelup.CMS.V1.Events.Payloads.Content.Translation.Project;
type DocumentProperties = Levelup.CMS.V1.Utils.DocumentProperties<EntityAlias>;


/**
 * @description 
 */
@Service()
export default class TranslationProjectsService extends BaseService {

  protected readonly ENTITY = 'translationProject' as const;

  constructor(
    @Inject('articleTypeModel') private articleTypeModel: Levelup.CMS.V1.Content.Model.ArticleType,
		@Inject('articleModel') private articleModel: Levelup.CMS.V1.Content.Model.Article,
		@Inject('commentModel') private commentModel: Levelup.CMS.V1.Content.Model.Comment,
		@Inject('reviewModel') private reviewModel: Levelup.CMS.V1.Content.Model.Review,
		@Inject('termModel') private termModel: Levelup.CMS.V1.Content.Model.Term,
		@Inject('taxonomyModel') private taxonomyModel: Levelup.CMS.V1.Content.Model.Taxonomy,
		@Inject('translationItemModel') private translationItemModel: Levelup.CMS.V1.Content.Translation.Model.Item,
		@Inject('translationNamespaceModel') private translationNamespaceModel: Levelup.CMS.V1.Content.Translation.Model.Namespace,
		@Inject('translationProjectModel') private translationProjectModel: Levelup.CMS.V1.Content.Translation.Model.Project,
    @EventDispatcher() private eventDispatcher: EventDispatcher,
  ) {
    super();
  }

  

  
  /**
   * @description Create search meta
   * @param {Partial<EntityAlias>} data
   * @param {Partial<EntityAlias>} old used on update
   * @returns {string}
   */
  _createSearchMeta(data: Partial<EntityAlias>, old?: Partial<EntityAlias>): string {
    /**
     * Define the search meta object
     */
    const search_meta: { [Key in DocumentProperties]?: string } = {
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
      if (typeof data.name === "undefined") search_meta.name = old.name || '';
			if (typeof data.description === "undefined") search_meta.description = old.description || ''
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



  /**
   * @description Apply filters based on the auth data
   */
  _applyAuthDataBasedFilters({ query, q, totalQ, opt, authData }: {
    q: mongoose.QueryWithFuzzySearch<EntityAlias>,
    totalQ: mongoose.QueryWithFuzzySearch<EntityAlias>,
    query: ApiAlias.List.Request,
    authData: Levelup.CMS.V1.Security.AuthData,
    opt: { load_deleted?: boolean; dont_lean?: boolean; }
  }): {
    q: mongoose.QueryWithFuzzySearch<EntityAlias>,
    totalQ: mongoose.QueryWithFuzzySearch<EntityAlias>,
  } {
    try {
      /**
       * TODO: Apply filters based on the auth data
       */
      return { q, totalQ };

    } catch (error) {
      throw error;
    }
  }

  /**
   * @description Apply filters on list queries
   */
  _applyFilters({ query, q, totalQ, opt, authData }: {
    q: mongoose.QueryWithFuzzySearch<EntityAlias>,
    totalQ: mongoose.QueryWithFuzzySearch<EntityAlias>,
    query: ApiAlias.List.Request,
    authData: Levelup.CMS.V1.Security.AuthData,
    opt: { load_deleted?: boolean; dont_lean?: boolean; }
  }): {
    q: mongoose.QueryWithFuzzySearch<EntityAlias>,
    totalQ: mongoose.QueryWithFuzzySearch<EntityAlias>,
  } {
    let { search, filters, load_deleted } = query;
    let filter: {
      q: typeof q;
      totalQ: typeof totalQ;
    };

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
    filters = fixFiltersObject(filters);

    /**
     * @description Inject attributes in the filters
     */
    if (!load_deleted && !opt.load_deleted && !('is_deleted' in filters)) filters.is_deleted = false;
    if (authData?.current?.app) filters.app = authData?.current.app._id;

    // -- attributed:app
    if (TranslationProjectSchemaFields['app']) {
      filter = createStringFilter<DocumentProperties>(q, totalQ, filters['app'], 'app' as any);
      q = filter.q;
      totalQ = filter.totalQ;
    }

    // -- attributed:company
    filter = createStringFilter<DocumentProperties>(q, totalQ, filters.company, 'company');
    q = filter.q;
    totalQ = filter.totalQ;

    // -- attributed:store
    filter = createStringFilter<DocumentProperties>(q, totalQ, (filters as any).store, 'attributes.store' as any);
    q = filter.q;
    totalQ = filter.totalQ;

    // -- is_deleted
    filter = createBooleanFilter<DocumentProperties>(q, totalQ, filters.is_deleted, 'is_deleted');
    q = filter.q;
    totalQ = filter.totalQ;

    // -- created_at
    filter = createDateRangeFilter<DocumentProperties>(q, totalQ, filters.created_at, 'created_at');
    q = filter.q;
    totalQ = filter.totalQ;

    // -- updated_at
    filter = createDateRangeFilter<DocumentProperties>(q, totalQ, filters.updated_at, 'updated_at');
    q = filter.q;
    totalQ = filter.totalQ;

    // -- _id
    filter = createStringFilter<DocumentProperties>(q, totalQ, filters._id, '_id');
    q = filter.q;
    totalQ = filter.totalQ;

    // -- name
    filter = createStringFilter<DocumentProperties>(q, totalQ, filters.name, 'name');
    q = filter.q;
    totalQ = filter.totalQ;

    return this._applyAuthDataBasedFilters({ query, q, totalQ, opt, authData });
  }

  /**
   * @description List
   */
  public async list(
    query: ApiAlias.List.Request,
    authData: Levelup.CMS.V1.Security.AuthData,
    opt: {
      load_deleted?: boolean;
      dont_lean?: boolean;
      predefined_query?: mongoose.QueryWithFuzzySearch<EntityAlias>;
    } = {
      load_deleted: false,
      dont_lean: false
    }
  ): Promise<ApiAlias.List.Response> {
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
      const scenario: {
        [Key: string]: any
      } = {}

      let { count, page, sort, sort_by } = query;
      count = isNaN(count as unknown as number) ? undefined : parseInt(count.toString());
      page = isNaN(page as unknown as number) ? 1 : parseInt(page.toString());


      let q: mongoose.QueryWithFuzzySearch<EntityAlias> = this.translationProjectModel.find();
      let totalQ: mongoose.QueryWithFuzzySearch<EntityAlias> = this.translationProjectModel.where();


      /**
       * Apply filters
       */
      const filter = this._applyFilters({ q, totalQ, query, authData, opt });
      q = filter.q;
      totalQ = filter.totalQ;

      
      const limit = (count === undefined || count === null) ? authData?.current?.app?.settings?.listing?.default_count || config.settings.listing.defaultCount : count;
      const { skip, take } = this.getPaginationOptions(limit, page);
      const sortOptions = this.getSortOptions(sort, sort_by);
      if (take) q = q.limit(take);
      if (skip) q = q.skip(skip);
      q = q.sort(sortOptions);
      q = this.getSelectFields(q, query.fields);
      if (!opt.dont_lean) q = q.lean() as any;


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
     scenario.found = items?.length;
     scenario.total = total;

      const result = {
        data: items.map(doc=>mapDocumentToExposed(doc)),
        pagination: {
          total,
          pages,
        }
      }

      /**
       * Log execution result before returning the result
       */
      this.logExecutionResult(this.list, result, authData, scenario);

      return result;
    } catch (error) {
      this.logError(this.list, error);
      throw error;
    }
  }


  /**
  * @description GetOne
  */
  public async getById(
    id: string,
    authData: Levelup.CMS.V1.Security.AuthData,
    opt: { load_deleted?: boolean; dont_lean?: boolean; ignore_not_found_error?: boolean, bypass_authorization?: boolean } = { load_deleted: false, dont_lean: false, ignore_not_found_error: false, bypass_authorization: false }
  ): Promise<ApiAlias.GetOne.Response> {
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
      const scenario: {
        [Key: string]: any
      } = {}

      const q = this.translationProjectModel.findById(id);
      /**
       * @description Lean the query else if needed to not do so
       */
      if (!opt.dont_lean) q.lean();


      const doc = await q.exec();


      if (!doc) throw new exceptions.ItemNotFoundException('Object not found');

      /**
       * Check if the document is deleted and the user does not want to load deleted documents
       */
      if (doc.is_deleted && !opt.load_deleted) throw new exceptions.ItemNotFoundException('Object deleted');

       /**
       * Check if the user can view the object
       */
      if (!opt.bypass_authorization && !userCan.viewObject(this.ENTITY, doc, authData)) throw new exceptions.UnauthorizedException('You are not allowed to view this object');

      const result = {
        data: mapDocumentToExposed(doc)
      };

      /**
       * Log execution result before returning the result
       */
      this.logExecutionResult(this.getById, result, authData, scenario);

      return result;
    } catch (error) {
      if (opt.ignore_not_found_error && error instanceof exceptions.ItemNotFoundException) return { data: undefined };
      this.logError(this.getById, error);
      throw error;
    }
  }

  
  
  

  /**
  * @description GetByName
  */
  public async getByName(
    name: string,
    authData: Levelup.CMS.V1.Security.AuthData,
    opt: { load_deleted?: boolean; dont_lean?: boolean; ignore_not_found_error?: boolean, bypass_authorization?: boolean } = { load_deleted: false, dont_lean: false, ignore_not_found_error: false, bypass_authorization: false }
  ): Promise<ApiAlias.GetOne.Response> {
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
      const scenario: {
        [Key: string]: any
      } = {}

      const q = this.translationProjectModel.findOne({ name });
      /**
       * @description Lean the query else if needed to not do so
       */
      if (!opt.dont_lean) q.lean();


      const doc = await q.exec();


      if (!doc) throw new exceptions.ItemNotFoundException('Object not found');

      /**
       * Check if the document is deleted and the user does not want to load deleted documents
       */
      if (doc.is_deleted && !opt.load_deleted) throw new exceptions.ItemNotFoundException('Object deleted');

       /**
       * Check if the user can view the object
       */
      if (!opt.bypass_authorization && !userCan.viewObject(this.ENTITY, doc, authData)) throw new exceptions.UnauthorizedException('You are not allowed to view this object');

      const result = {
        data: mapDocumentToExposed(doc)
      };

      /**
       * Log execution result before returning the result
       */
      this.logExecutionResult(this.getByName, result, authData, scenario);

      return result;
    } catch (error) {
      if (opt.ignore_not_found_error && error instanceof exceptions.ItemNotFoundException) return { data: undefined };
      this.logError(this.getByName, error);
      throw error;
    }
  }
  


  /**
   * @description Create
   */
  public async create(
    { data }: ApiAlias.Create.Request,
    authData: Levelup.CMS.V1.Security.AuthData,
    opt?: {
      bypass_authorization?: boolean
    }
  ): Promise<ApiAlias.Create.Response> {
    try {
      /**
       * Define the execution scenario object
       */
      const scenario: {
        [Key: string]: any;
      } = {};

      /**
       * await sanitize data here
       */
      data = await TranslationProjectSanitizers.sanitizeCreateBody(data, authData);

      /**
       * Validate data here
       */
      const { error } = TranslationProjectValidators.validateCreateBody(data);
      if (error) throw error;

      let {} = data;

      /**
       * Auto-fill system data
       */
      data.app = authData?.current?.app?._id
        ? authData?.current?.app?._id
        : opt?.bypass_authorization || (authData.current?.service?.name && !authData.current?.service?.is_external)
          ? data.app
          : undefined;
      
      /**
       * Check if the user can create the object
       */
      if (authData?.current?.app?._id && authData?.current?.app?._id !== data.app)
        throw new exceptions.UnauthorizedException('You are not allowed to create this object on this app');
      if (!opt?.bypass_authorization && !userCan.createObject(this.ENTITY, data, authData))
        throw new exceptions.UnauthorizedException('You are not allowed to create this object');

      /**
       * Create data object
       */
      const docObject: Partial<EntityAlias> = {
        ...data
      };

      /**
       * Create tracking ID
       */
      if (TranslationProjectSchemaFields['tracking_id'] && Object.keys(ITEM_SHORTCUTS).includes(this.ENTITY)) {
        docObject['tracking_id'] = await createTrackingId(this.ENTITY, this.translationProjectModel);
      }

      /**
       * Create search meta
       */
      if (TranslationProjectSchemaFields['search_meta']) {
        docObject['search_meta'] = this._createSearchMeta(docObject, null);
      }

      /**
       * Create the object on DB
       */
      const doc = await this.translationProjectModel.create(docObject);

      if (!doc) throw new exceptions.InternalServerError('Failed to create the object');

      this.eventDispatcher.dispatch<EventPayloadsAlias.created>(events.content.translation.project.created, { data: doc });

      const result = {
        data: mapDocumentToExposed(doc)
      };

      /**
       * Log execution result before returning the result
       */
      this.logExecutionResult(this.create, result, authData, scenario);

      return result;
    } catch (error) {
      this.logError(this.create, error);
      throw error;
    }
  }

  /**
  * @description Update
  */
  public async update(
    id: string,
    { data }: ApiAlias.Update.Request,
    authData: Levelup.CMS.V1.Security.AuthData
  ): Promise<ApiAlias.Update.Response> {
    try {
      /**
       * Define the execution scenario object
       */
      const scenario: {
        [Key: string]: any;
      } = {};

      /**
       * await sanitize data here
       */
      data = await TranslationProjectSanitizers.sanitizeUpdateBody(data, authData);

      /**
       * Validate data here
       */
      const { error } = TranslationProjectValidators.validateUpdateBody(data);
      if (error) throw error;

      /**
       * Extract the required in block variables from the data object
       */
      const {} = data;

      /**
       * load old object and check if it exists
       */
      const old = await this.translationProjectModel.findById(id);
      if (!old) throw new exceptions.ItemNotFoundException('Object not found');
      if (old.is_deleted) throw new exceptions.UnauthorizedException('Object is deleted');
      if (!userCan.updateObject(this.ENTITY, old, authData))
        throw new exceptions.UnauthorizedException('You are not allowed to update this object');

      /**
       * detect changes
       */
      const updates = new ObjectUpdatedProperties(old.toObject(), data, true);
      scenario.updates = updates.asArray;

      const updateObject: Levelup.CMS.V1.Utils.Entity.General.IItemUpdate = {
        updated_by_system: !authData?.current?.user,
        updated_by: getUserSnapshot(authData?.current?.user),
        date: new Date(),
        action: 'updated',
        updates: updates.asArray
      };

      /**
       * Create data object
       */
      const docObject: Partial<EntityAlias> = {
        ...data
      };

      /**
       * Create search meta
       */
      if (TranslationProjectSchemaFields['search_meta']) {
        docObject['search_meta'] = this._createSearchMeta(docObject, old);
      }

      /**
       * Update the object on DB
       */
      const doc = await this.translationProjectModel.findByIdAndUpdate(
        id,
        {
          ...docObject,
          $addToSet: {
            updates: updateObject
          }
        },
        { new: true }
      );

      if (!doc) throw new exceptions.ItemNotFoundException('Object not found');

      /**
       * Handle the updated effects on the same service
       */
      // ...

      /**
       * Dispatch the updated event
       */
      this.eventDispatcher.dispatch<EventPayloadsAlias.updated>(events.content.translation.project.updated, { data: doc });

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
    } catch (error) {
      this.logError(this.update, error);
      throw error;
    }
  }

  /**
  * @description Delete
  */
  public async delete(
    id: string,
    authData: Levelup.CMS.V1.Security.AuthData
  ): Promise<ApiAlias.Delete.Response> {
    try {

      /**
       * Define the execution scenario object
       */
      const scenario: {
        [Key: string]: any
      } = {}

      const updateObject: Levelup.CMS.V1.Utils.Entity.General.IItemUpdate = {
        updated_by_system: !authData?.current?.user,
        updated_by: getUserSnapshot(authData?.current?.user),
        date: new Date(),
        action: 'deleted',
        updates: []
      }


      const old = await this.translationProjectModel.findById(id);
      if(!old) throw new exceptions.ItemNotFoundException('Object not found');
      if(old.is_deleted) throw new exceptions.UnauthorizedException('Object already deleted');
      if (!userCan.deleteObject(this.ENTITY, old, authData)) throw new exceptions.UnauthorizedException('You are not allowed to delete this object');

      const doc = await this.translationProjectModel.findByIdAndUpdate(id, {
        is_deleted: true, 
        deleted_at: new Date(),
        $addToSet: {
          updates: updateObject
        }
      }, { new: true });

      this.eventDispatcher.dispatch<EventPayloadsAlias.deleted>(events.content.translation.project.deleted, { data: doc });

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
    } catch (error) {
      this.logError(this.delete, error);
      throw error;
    }
  }

  /**
  * @description Restore
  */
  public async restore(
    id: string,
    authData: Levelup.CMS.V1.Security.AuthData
  ): Promise<ApiAlias.Delete.Response> {
    try {

      /**
       * Define the execution scenario object
       */
      const scenario: {
        [Key: string]: any
      } = {}

      const updateObject: Levelup.CMS.V1.Utils.Entity.General.IItemUpdate = {
        updated_by_system: !authData?.current?.user,
        updated_by: getUserSnapshot(authData?.current?.user),
        date: new Date(),
        action: 'restored',
        updates: []
      }


      const old = await this.translationProjectModel.findById(id);
      if(!old) throw new exceptions.ItemNotFoundException('Object not found');
      if(!old.is_deleted) throw new exceptions.UnauthorizedException('Object already exists');
      if (!userCan.restoreObject(this.ENTITY, old, authData)) throw new exceptions.UnauthorizedException('You are not allowed to restore this object');

      const doc = await this.translationProjectModel.findByIdAndUpdate(id, {
        is_deleted: false, 
        deleted_at: null,
        $addToSet: {
          updates: updateObject
        }
      }, { new: true });

      if (!doc) throw new exceptions.ItemNotFoundException('Object not found');

      this.eventDispatcher.dispatch<EventPayloadsAlias.deleted>(events.content.translation.project.restored, { data: doc });

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
    } catch (error) {
      this.logError(this.restore, error);
      throw error;
    }
  }



}




