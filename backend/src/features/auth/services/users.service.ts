/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-03 00:17:35
 */

import { uniq } from 'lodash';
import { MongoServerError } from 'mongodb';
import mongoose from 'mongoose';
import Container, { Inject, Service } from 'typedi';
import { mapDocumentToExposed } from '../../../common/mappers/general.mappers';
import config from '../../../config';
import events from '../../../config/events.config';
import { EventDispatcher } from '../../../decorators/eventDispatcher.decorator';
import exceptions from '../../../exceptions';
import CacheManager from '../../../managers/cache-manager';
import { createBooleanFilter, createDateRangeFilter, createStringFilter } from '../../../utilities/data/db/query.utilities';
import {
  getUserSnapshot
} from '../../../utilities/entities/snapshots.utilities';
import { defaults, getItemIdsFromOldAndNewData } from '../../../utilities/helpers/utils.helpers';
import ObjectUpdatedProperties from '../../../utilities/objects/update-calculator.class';
import { fixFiltersObject } from '../../../utilities/requests/index';
import { createTrackingId } from '../../../utilities/system/tracking-id.utilities';
import AuthManager from '../../../managers/auth-manager';
import { UserSchemaFields } from '../models/user.model';
import UserSanitizers from '../sanitizers/user.sanitizers';
import UserValidators from '../validators/user.validators';
import BaseService from '../../../common/base.service';
import CustomCacheManager from '../../../extension/managers/cache-manager/index';

import EntityAlias = Levelup.CMS.V1.Users.Entity.User;
import ApiAlias = Levelup.CMS.V1.Users.Api.Users;
import DocumentAlias = Levelup.CMS.V1.Users.Model.UserDocument;
import EventPayloadsAlias = Levelup.CMS.V1.Events.Payloads.Users.User;
type DocumentProperties = Levelup.CMS.V1.Utils.DocumentProperties<EntityAlias>;

/**
 * @description
 */
@Service()
export default class UsersService extends BaseService {
  protected ENTITY = "user" as const;

  constructor(
    @Inject("userModel") private userModel: Levelup.CMS.V1.Users.Model.User,
    @EventDispatcher() private eventDispatcher: EventDispatcher
  ) {
    super();
  }

  /**
   * @description Generates the snapshots object for the entity.
   */
  public async _generateSnapshotsObject(
    new_data: Partial<EntityAlias>,
    old_data: Partial<EntityAlias> | null,
    authData: Levelup.CMS.V1.Security.AuthData
  ): Promise<EntityAlias["snapshots"]> {
    const scenario = this.initScenario(
      this.logger,
      this._generateSnapshotsObject,
      []
    );

    try {
      const cache = Container.get(CustomCacheManager);
      const result: Levelup.CMS.V1.Utils.Complete<EntityAlias["snapshots"]> = {
        pharmacy: undefined,
        hospital: undefined,
        provider: undefined,
        laboratory: undefined,
      };

      const new_attributes: EntityAlias["attributes"] =
        new_data.attributes || {};
      const old_attributes: EntityAlias["attributes"] =
        old_data?.attributes || {};

      scenario.set({ new_attributes, old_attributes });
      scenario.set({ result });
      scenario.log();
      /**
       * Return the result
       */
      return result;
    } catch (error) {
      scenario.error(error);
      throw error;
    }
  }

  /**
   * @description Create search meta
   * @param {Partial<EntityAlias>} data
   * @param {Partial<EntityAlias>} old used on update
   * @returns {string}
   */
  _createSearchMeta(
    data: Partial<EntityAlias>,
    old?: Partial<EntityAlias>
  ): string {
    /**
     * Define the search meta object
     */
    const search_meta: { [Key in DocumentProperties]?: string } = {
      tracking_id: data.tracking_id,
      email: data.email,
      "profile.family_name": data.profile?.family_name,
      "profile.first_name": data.profile?.first_name,
      /**
       * TODO: Add more fields to the search meta
       */
      // ...
    };

    /**
     * Add old values if not provided in the new data
     */
    if (old) {
      if (typeof data.tracking_id === "undefined")
        search_meta.tracking_id = old.tracking_id || "";
      if (typeof data.email === "undefined")
        search_meta.email = old.email || "";
      if (typeof data.profile?.first_name === "undefined")
        search_meta["profile.first_name"] = old.profile?.first_name || "";
      if (typeof data.profile?.family_name === "undefined")
        search_meta["profile.family_name"] = old.profile?.family_name || "";
      /**
       * TODO: Add more fields to the search meta
       */
    }

    this.logExecutionResult(this._createSearchMeta, { data, old }, null, {
      search_meta,
    });

    /**
     * Return the search meta
     */
    return Object.values(search_meta)
      .filter((s) => !!s)
      .join(" ")
      .replaceAll("  ", " ")
      .trim();
  }

  /**
   * @description Apply filters based on the auth data
   */
  _applyAuthDataBasedFilters({
    query,
    q,
    totalQ,
    opt,
    authData,
  }: {
    q: mongoose.QueryWithFuzzySearch<EntityAlias>;
    totalQ: mongoose.QueryWithFuzzySearch<EntityAlias>;
    query: ApiAlias.List.Request;
    authData: Levelup.CMS.V1.Security.AuthData;
    opt: { load_deleted?: boolean; dont_lean?: boolean };
  }): {
    q: mongoose.QueryWithFuzzySearch<EntityAlias>;
    totalQ: mongoose.QueryWithFuzzySearch<EntityAlias>;
  } {
    return { q, totalQ };
  }

  /**
   * @description Apply filters on list queries
   */
  _applyFilters({
    query,
    q,
    totalQ,
    opt,
    authData,
  }: {
    q: mongoose.QueryWithFuzzySearch<EntityAlias>;
    totalQ: mongoose.QueryWithFuzzySearch<EntityAlias>;
    query: ApiAlias.List.Request;
    authData: Levelup.CMS.V1.Security.AuthData;
    opt: { load_deleted?: boolean; dont_lean?: boolean };
  }): {
    q: mongoose.QueryWithFuzzySearch<EntityAlias>;
    totalQ: mongoose.QueryWithFuzzySearch<EntityAlias>;
  } {
    const { search, load_deleted } = query;
    let { filters } = query;
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
    if (!load_deleted && !opt.load_deleted && !("is_deleted" in filters))
      filters.is_deleted = false;
    if (authData?.current?.app) filters.app = authData?.current.app._id;

    // -- attributed:app
    if (UserSchemaFields["app"]) {
      filter = createStringFilter<DocumentProperties>(
        q,
        totalQ,
        filters["app"],
        "app" as any
      );
      q = filter.q;
      totalQ = filter.totalQ;
    }

    // -- attributed:company
    filter = createStringFilter<DocumentProperties>(
      q,
      totalQ,
      filters.company,
      "company" as any
    );
    q = filter.q;
    totalQ = filter.totalQ;
    // if (filters.company) {
    //   filter = createCompoundFilter<DocumentProperties>(q, totalQ, 'or', [
    //     ['string', filters.company, 'company'],
    //     ['string', 'master', 'role_group']
    //   ]);
    //   q = filter.q;
    //   totalQ = filter.totalQ;
    // }

    // -- attributed:hospital

    // -- is_deleted
    filter = createBooleanFilter<DocumentProperties>(
      q,
      totalQ,
      filters.is_deleted,
      "is_deleted"
    );
    q = filter.q;
    totalQ = filter.totalQ;

    // -- created_at
    filter = createDateRangeFilter<DocumentProperties>(
      q,
      totalQ,
      filters.created_at,
      "created_at"
    );
    q = filter.q;
    totalQ = filter.totalQ;

    // -- updated_at
    filter = createDateRangeFilter<DocumentProperties>(
      q,
      totalQ,
      filters.updated_at,
      "updated_at"
    );
    q = filter.q;
    totalQ = filter.totalQ;

    // -- _id
    filter = createStringFilter<DocumentProperties>(
      q,
      totalQ,
      filters._id,
      "_id"
    );
    q = filter.q;
    totalQ = filter.totalQ;

    // -- created_by
    filter = createDateRangeFilter<DocumentProperties>(
      q,
      totalQ,
      filters.created_by,
      "created_by"
    );
    q = filter.q;
    totalQ = filter.totalQ;

    // -- tracking_id
    filter = createStringFilter<DocumentProperties>(
      q,
      totalQ,
      filters.tracking_id,
      "tracking_id"
    );
    q = filter.q;
    totalQ = filter.totalQ;

    // -- email
    filter = createStringFilter<DocumentProperties>(
      q,
      totalQ,
      filters.email,
      "email"
    );
    q = filter.q;
    totalQ = filter.totalQ;

    // -- role
    filter = createStringFilter<DocumentProperties>(
      q,
      totalQ,
      filters.role,
      "role"
    );
    q = filter.q;
    totalQ = filter.totalQ;
    filter = createStringFilter<DocumentProperties>(
      q,
      totalQ,
      filters.not?.role,
      "role",
      true
    );
    q = filter.q;
    totalQ = filter.totalQ;

    // -- role_group

    this.logger.value("filters", filters);
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
      dont_lean: false,
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
        [Key: string]: any;
      } = {};

      const { sort, sort_by } = query;
      let { count, page } = query;
      count = isNaN(count as unknown as number)
        ? undefined
        : parseInt(count.toString());
      page = isNaN(page as unknown as number) ? 1 : parseInt(page.toString());

      let q: mongoose.QueryWithFuzzySearch<EntityAlias> = this.userModel.find();
      let totalQ: mongoose.QueryWithFuzzySearch<EntityAlias> =
        this.userModel.where();

      /**
       * Apply filters
       */
      const filter = this._applyFilters({ q, totalQ, query, authData, opt });
      q = filter.q;
      totalQ = filter.totalQ;

      const limit =
        count === undefined || count === null
          ? authData?.current?.app?.settings?.listing?.default_count ||
            config.settings.listing.defaultCount
          : count;
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
      scenario.query = query;
      scenario.request_filter = fixFiltersObject(query.filters);
      scenario.listing_query = {
        model: q.model.modelName,
        query: q.getQuery(),
        options: q.getOptions(),
      };
      // this.logger.value('listing query', JSON.stringify(q.getQuery(), null, 2));

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

      const edge = await this._buildResponseEdge(items);
      const result: ApiAlias.List.Response = {
        data: items.map((doc) => mapDocumentToExposed(doc)),
        pagination: {
          total,
          pages,
        },
        edge,
      };

      /**
       * Log execution result before returning the result
       */
      // this.logExecutionResult(this.list, result, authData, scenario);

      return result;
    } catch (error) {
      this.logError(this.list, error);
      throw error;
    }
  }
  private async _buildResponseEdge(items: EntityAlias[]) {
    try {
      const edge: ApiAlias.List.Response["edge"] = {
        stores: {},
        companies: {},
      };

      const cache = Container.get(CacheManager);
      this.logger.debug("Loading edge");

      const companies = uniq(items.map((i) => i.company).filter((i) => !!i));

      return edge;
    } catch (error) {
      this.logger.error(this._buildResponseEdge.name, error);
      this.logError(this._buildResponseEdge, error);
      throw error;
    }
  }

  /**
   * @description GetOne
   */
  public async getById(
    id: string,
    authData: Levelup.CMS.V1.Security.AuthData,
    opt: {
      load_deleted?: boolean;
      dont_lean?: boolean;
      ignore_not_found_error?: boolean;
      bypass_authorization?: boolean;
    } = {
      load_deleted: false,
      dont_lean: false,
      ignore_not_found_error: false,
      bypass_authorization: false,
    }
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
        [Key: string]: any;
      } = {};

      const q = this.userModel.findById(id);
      /**
       * @description Lean the query else if needed to not do so
       */
      if (!opt.dont_lean) q.lean();

      const doc = await q.exec();

      if (!doc)
        throw new exceptions.ItemNotFoundException(
          "No object found with this ID: " + id
        );

      /**
       * Check if the document is deleted and the user does not want to load deleted documents
       */
      if (doc.is_deleted && !opt.load_deleted)
        throw new exceptions.ItemNotFoundException("Object deleted");

      /**
       * Check if the user can view the object
       */

      const result = {
        data: mapDocumentToExposed(doc),
      };

      /**
       * Log execution result before returning the result
       */
      this.logExecutionResult(this.getById, result, authData, scenario);

      return result;
    } catch (error) {
      // if (opt.ignore_not_found_error && error instanceof exceptions.ItemNotFoundException) return { data: undefined };
      this.logError(this.getById, error);
      throw error;
    }
  }

  /**
   * @description GetByTrackingId
   */
  public async getByTrackingId(
    tracking_id: string,
    authData: Levelup.CMS.V1.Security.AuthData,
    opt: {
      load_deleted?: boolean;
      dont_lean?: boolean;
      ignore_not_found_error?: boolean;
      bypass_authorization?: boolean;
    } = {
      load_deleted: false,
      dont_lean: false,
      ignore_not_found_error: false,
      bypass_authorization: false,
    }
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
        [Key: string]: any;
      } = {};

      const q = this.userModel.findOne({ tracking_id });
      /**
       * @description Lean the query else if needed to not do so
       */
      if (!opt.dont_lean) q.lean();

      const doc = await q.exec();

      if (!doc) throw new exceptions.ItemNotFoundException("User not found");

      /**
       * Check if the document is deleted and the user does not want to load deleted documents
       */
      if (doc.is_deleted && !opt.load_deleted)
        throw new exceptions.ItemNotFoundException("Object deleted");

      /**
       * Check if the user can view the object
       */

      const result = {
        data: mapDocumentToExposed(doc),
      };

      /**
       * Log execution result before returning the result
       */
      this.logExecutionResult(this.getByTrackingId, result, authData, scenario);

      return result;
    } catch (error) {
      if (
        opt.ignore_not_found_error &&
        error instanceof exceptions.ItemNotFoundException
      )
        return { data: undefined };
      this.logError(this.getByTrackingId, error);
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
      bypass_authorization?: boolean;
    }
  ): Promise<ApiAlias.Create.Response> {
    try {
      const authManager = Container.get(AuthManager);
      /**
       * Define the execution scenario object
       */
      const scenario: {
        [Key: string]: any;
      } = {};

      /**
       * await sanitize data here
       */
      data = await UserSanitizers.sanitizeCreateBody(data, authData);

      /**
       * Validate data here
       */
      const { error } = UserValidators.validateCreateBody(data);
      if (error) throw error;

      let {} = data;

      /**
       * Auto-fill system data
       */
      data.app = authData?.current?.app?._id
        ? authData?.current?.app?._id
        : opt?.bypass_authorization ||
            (authData.current?.service?.name &&
              !authData.current?.service?.is_external)
          ? data.app
          : undefined;

      if (data.password) {
        const { salt, password } = await authManager.hashPassword(
          data.password
        );
        data.password = password;
        data.salt = salt;
      }

      /**
       * Check if the user can create the object
       */
      if (
        authData?.current?.app?._id &&
        authData?.current?.app?._id !== data.app
      )
        throw new exceptions.UnauthorizedException(
          "You are not allowed to create this object on this app"
        );

      /**
       * Create data object
       */
      const docObject: Partial<EntityAlias> = {
        ...data,
      };

      /**
       * Create tracking ID
       */
      const entity = "user" as const;
      docObject["tracking_id"] = await createTrackingId(
        this.ENTITY,
        this.userModel as any
      );

      /**
       * Create search meta
       */
      docObject["search_meta"] = this._createSearchMeta(docObject, null);

      docObject.snapshots = await this._generateSnapshotsObject(
        docObject,
        null,
        authData
      );

      /**
       * Create the object on DB
       */
      const doc = await this.userModel.create(docObject);

      if (!doc)
        throw new exceptions.InternalServerError("Failed to create the object");

      this.eventDispatcher.dispatch<EventPayloadsAlias.created>(
        events.users.user.created,
        { data: doc }
      );

      const result = {
        data: mapDocumentToExposed(doc),
        edges: {},
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
    /**
     * Define the execution scenario object
     */
    const scenario = this.initScenario(this.logger, this.update);
    try {
      /**
       * await sanitize data here
       */
      data = await UserSanitizers.sanitizeUpdateBody(data, authData);

      /**
       * Validate data here
       */
      const { error } = UserValidators.validateUpdateBody(data);
      if (error) throw error;

      /**
       * Extract the required in block variables from the data object
       */
      const {} = data;

      /**
       * load old object and check if it exists
       */
      const old = await this.userModel.findById(id);
      if (!old) throw new exceptions.ItemNotFoundException("User not found");
      if (old.is_deleted)
        throw new exceptions.UnauthorizedException("Object is deleted");

      /**
       * detect changes
       */
      const updates = new ObjectUpdatedProperties(old.toObject(), data, true);
      scenario.set("updates", updates.asArray);

      scenario.set("attributes", data?.attributes);

      const updateObject: Levelup.CMS.V1.Utils.Entity.General.IItemUpdate = {
        updated_by_system: !authData?.current?.user,
        updated_by: getUserSnapshot(authData?.current?.user),
        date: new Date(),
        action: "updated",
        updates: updates.asArray,
      };

      /**
       * Create data object
       */
      const docObject: Partial<EntityAlias> = {
        ...data,
      };

      /**
       * Ensure merging object properties to old object, not altering them
       */

      docObject.snapshots = await this._generateSnapshotsObject(
        docObject,
        old,
        authData
      );

      /**
       * Create search meta
       */

      // scenario.set('snapshots', docObject.snapshots);
      docObject.search_meta = this._createSearchMeta(docObject, old);

      const flattenUpdates = this.flattenUpdateObject(docObject);

      scenario.set("updateObject", flattenUpdates);
      /**
       * Update the object on DB
       */
      const doc = await this.userModel.findByIdAndUpdate(
        id,
        {
          $set: flattenUpdates,
          $addToSet: {
            updates: updateObject,
          },
        },
        { new: true }
      );

      if (!doc) throw new exceptions.ItemNotFoundException("User not found");

      /**
       * Handle the updated effects on the same service
       */
      // ...

      /**
       * Dispatch the updated event
       */
      this.eventDispatcher.dispatch<EventPayloadsAlias.updated>(
        events.users.user.updated,
        { data: doc }
      );

      const result = {
        data: mapDocumentToExposed(doc),
      };

      /**
       * Log execution result before returning the result
       */
      scenario.log();

      /**
       * Return the result
       */
      return result;
    } catch (error) {
      scenario.error(error);
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
        [Key: string]: any;
      } = {};

      const updateObject: Levelup.CMS.V1.Utils.Entity.General.IItemUpdate = {
        updated_by_system: !authData?.current?.user,
        updated_by: getUserSnapshot(authData?.current?.user),
        date: new Date(),
        action: "deleted",
        updates: [],
      };

      const old = await this.userModel.findById(id);
      if (!old) throw new exceptions.ItemNotFoundException("User not found");
      if (old.is_deleted)
        throw new exceptions.UnauthorizedException("Object already deleted");

      let doc: EntityAlias;
      try {
        doc = await this.userModel.findByIdAndUpdate(
          id,
          {
            is_deleted: true,
            $addToSet: {
              updates: updateObject,
            },
          },
          { new: true }
        );
      } catch (error) {
        if (error instanceof MongoServerError && error.code === 11000) {
          if (error.keyValue)
            await this.userModel.deleteOne({
              ...(error.keyValue || {}),
              is_deleted: true,
            });
          return this.delete(id, authData);
        } else throw error;
      }

      this.eventDispatcher.dispatch<EventPayloadsAlias.deleted>(
        events.users.user.deleted,
        { data: doc }
      );

      const result = {
        data: {
          deleted: true,
        },
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
        [Key: string]: any;
      } = {};

      const updateObject: Levelup.CMS.V1.Utils.Entity.General.IItemUpdate = {
        updated_by_system: !authData?.current?.user,
        updated_by: getUserSnapshot(authData?.current?.user),
        date: new Date(),
        action: "restored",
        updates: [],
      };

      const old = await this.userModel.findById(id);
      if (!old) throw new exceptions.ItemNotFoundException("User not found");
      if (!old.is_deleted)
        throw new exceptions.UnauthorizedException("Object already exists");

      const doc = await this.userModel.findByIdAndUpdate(
        id,
        {
          is_deleted: false,
          deleted_at: null,
          $addToSet: {
            updates: updateObject,
          },
        },
        { new: true }
      );

      if (!doc) throw new exceptions.ItemNotFoundException("User not found");

      this.eventDispatcher.dispatch<EventPayloadsAlias.deleted>(
        events.users.user.restored,
        { data: doc }
      );

      const result = {
        data: {
          restored: true,
        },
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

  public async aggregateByRoles() {
    const scenario = this.initScenario(this.logger, this.aggregateByRoles);
    try {
      const aggregateQuery = [
        {
          $match:
            /**
             * query: The query in MQL.
             */
            {
              is_deleted: false,
            },
        },
        {
          $group:
            /**
             * _id: The id of the group.
             * fieldN: The first field name.
             */
            {
              _id: "$role",
              count: {
                $sum: 1,
              },
            },
        },
        {
          $project: {
            role: "$_id",
            count: 1,
            _id: 0,
          },
        },
      ];

      const data: {
        role: string;
        count: number;
      }[] = await this.userModel.aggregate(aggregateQuery);

      const result: {
        data: typeof data;
      } = {
        data,
      };

      scenario.set({ data }).end();

      return result;
    } catch (error) {
      scenario.error(error);
      throw error;
    }
  }
}
