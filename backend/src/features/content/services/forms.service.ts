/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-03 00:17:36
 */

import mongoose from "mongoose";
import Container, { Inject, Service } from "typedi";
import { defaults } from "../../../utilities/helpers/utils.helpers";

import BaseService from "../../../common/base.service";
import config from "../../../config";
import events from "../../../config/events.config";
import { ITEM_SHORTCUTS } from "../../../constants/tracking_id.constants";
import { EventDispatcher } from "../../../decorators/eventDispatcher.decorator";
import exceptions from "../../../exceptions";
import CacheManager from "../../../managers/cache-manager";
import {
  createBooleanFilter,
  createDateRangeFilter,
  createStringFilter,
} from "../../../utilities/data/db/query.utilities";
import { getUserSnapshot } from "../../../utilities/entities/snapshots.utilities";
import ObjectUpdatedProperties from "../../../utilities/objects/update-calculator.class";
import { fixFiltersObject } from "../../../utilities/requests/index";
import userCan from "../../../utilities/security/user-can";
import { createTrackingId } from "../../../utilities/system/tracking-id.utilities";
import { mapDocumentToExposed } from "../../../common/mappers/general.mappers";
import FormSanitizers from "../sanitizers/form.sanitizers";
import FormValidators from "../validators/form.validators";
import { FormSchemaFields } from "../models/form.model";
import { slugify } from "../../../utilities/strings/slugify.utilities";
import { uniq } from "lodash";
import { isObjectIdValid } from "../../../utilities/helpers/mogodb.helpers";
import UsersService from "../../auth/services/users.service";

import EntityAlias = Levelup.CMS.V1.Content.Entity.Form;
import ApiAlias = Levelup.CMS.V1.Content.Api.Forms;
import DocumentAlias = Levelup.CMS.V1.Content.Model.FormDocument;
import EventPayloadsAlias = Levelup.CMS.V1.Events.Payloads.Content.Form;
type DocumentProperties = Levelup.CMS.V1.Utils.DocumentProperties<EntityAlias>;

/**
 * @description
 */
@Service()
export default class FormsService extends BaseService {
  protected ENTITY = "form" as const;

  constructor(
    @Inject("formModel")
    private formModel: Levelup.CMS.V1.Content.Model.Form,
    @Inject("commentModel")
    private commentModel: Levelup.CMS.V1.Content.Model.Comment,
    @Inject("reviewModel")
    private reviewModel: Levelup.CMS.V1.Content.Model.Review,
    @Inject("termModel") private termModel: Levelup.CMS.V1.Content.Model.Term,
    @Inject("taxonomyModel")
    private taxonomyModel: Levelup.CMS.V1.Content.Model.Taxonomy,
    @Inject("translationItemModel")
    private translationItemModel: Levelup.CMS.V1.Content.Translation.Model.Item,
    @Inject("translationNamespaceModel")
    private translationNamespaceModel: Levelup.CMS.V1.Content.Translation.Model.Namespace,
    @Inject("translationProjectModel")
    private translationProjectModel: Levelup.CMS.V1.Content.Translation.Model.Project,
    @EventDispatcher() private eventDispatcher: EventDispatcher
  ) {
    super();
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
     * Define the search meta form
     */
    const search_meta: { [Key in DocumentProperties]?: string } = {
      /**
       * TODO: Add more fields to the search meta
       */
      // ...
      name: data.name,
    };

    /**
     * Add old values if not provided in the new data
     */
    if (old) {
      /**
       * TODO: Add more fields to the search meta
       */
      // ...
      if (typeof data.name === "undefined") search_meta.name = old.name;
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

  async _generateSlug(title: string, slug?: string | null): Promise<string> {
    const scenario = this.initScenario(this.logger, this._generateSlug, {
      title,
      slug,
    });
    try {
      let value = slug || slugify(title);
      let retries = 0;
      let exists = true;
      while (exists) {
        const res = await this.formModel.exists({ slug: value });
        exists = !!res;
        if (exists) {
          retries++;
          value = slugify(title) + "-" + retries;
        }
      }
      scenario.set({
        slug: value,
        retries,
      });
      scenario.end();
      return value;
    } catch (error) {
      scenario.error(error);
      throw error;
    }
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
  async _applyFilters({
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
  }): Promise<{
    q: mongoose.QueryWithFuzzySearch<EntityAlias>;
    totalQ: mongoose.QueryWithFuzzySearch<EntityAlias>;
  }> {
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
     * @description fixing filters form
     */
    filters = fixFiltersObject(filters);

    /**
     * @description Inject attributes in the filters
     */
    if (!load_deleted && !opt.load_deleted && !("is_deleted" in filters))
      filters.is_deleted = false;
    if (authData?.current?.app) filters.app = authData?.current.app._id;

    // -- attributed:app
    if (FormSchemaFields["app"]) {
      filter = createStringFilter<DocumentProperties>(
        q,
        totalQ,
        filters["app"],
        "app" as any
      );
      q = filter.q;
      totalQ = filter.totalQ;
    }

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
    filter = createStringFilter<DocumentProperties>(
      q,
      totalQ,
      filters.created_by,
      "created_by"
    );
    q = filter.q;
    totalQ = filter.totalQ;

    // slug
    filter = createStringFilter<DocumentProperties>(
      q,
      totalQ,
      filters.slug,
      "slug" as any
    );
    q = filter.q;
    totalQ = filter.totalQ;

    for (const key of Object.keys(filters)) {
      if (key.startsWith("meta_fields.")) {
        if (typeof filters[key] === "string") {
          filter = createStringFilter<DocumentProperties>(
            q,
            totalQ,
            filters[key],
            key as any
          );
          q = filter.q;
          totalQ = filter.totalQ;
        }
        if (typeof filters[key] === "boolean") {
          filter = createBooleanFilter<DocumentProperties>(
            q,
            totalQ,
            filters[key],
            key as any
          );
          q = filter.q;
          totalQ = filter.totalQ;
        }

        /**
         * TODO: finish this part
         */
      }
    }

    // -- name
    if (FormSchemaFields["name"]) {
      filter = createStringFilter<DocumentProperties>(
        q,
        totalQ,
        filters["name"],
        "name" as any
      );
      q = filter.q;
      totalQ = filter.totalQ;
    }

    return this._applyAuthDataBasedFilters({ query, q, totalQ, opt, authData });
  }

  /**
   * @description List
   */
  public async list(
    query: ApiAlias.List.Request & {
      customFilter?: { [k: string]: any };
    },
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
    const scenario = this.initScenario(this.logger, this.list);
    try {
      /**
       * Fill options argument with the defaults
       */
      opt = defaults(opt, {
        load_deleted: false,
        dont_lean: false,
      });

      let { count, page, sort, sort_by } = query;
      count = isNaN(count as unknown as number)
        ? undefined
        : parseInt(count.toString());
      page = isNaN(page as unknown as number) ? 1 : parseInt(page.toString());

      let q: mongoose.QueryWithFuzzySearch<EntityAlias> = this.formModel.find();
      let totalQ: mongoose.QueryWithFuzzySearch<EntityAlias> =
        this.formModel.where();

      /**
       * Apply filters
       */
      const filter = await this._applyFilters({
        q,
        totalQ,
        query,
        authData,
        opt,
      });
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
      scenario.set("request_filter", fixFiltersObject(query));
      scenario.set("listing_query", {
        model: q.model.modelName,
        query: q.getQuery(),
        options: q.getOptions(),
      });

      /**
       * @description execute the query
       */
      const items = await q
        .allowDiskUse(true) // Enable disk usage for large sorting operations
        .exec();

      const total = await totalQ.countDocuments();
      const pages = limit === -1 ? 1 : Math.ceil(total / limit);

      scenario.set({
        skip,
        take,
        found: items?.length,
        total,
      });

      const result: ApiAlias.List.Response = {
        data: items.map((doc) => mapDocumentToExposed(doc)),
        pagination: {
          total,
          pages,
        },
      };

      result.edge = await this._buildResponseEdge(result.data);

      /**
       * Log execution result before returning the result
       */
      scenario.end();

      return result;
    } catch (error) {
      scenario.error(error);
      throw error;
    }
  }

  private async _buildResponseEdge(
    data: EntityAlias[]
  ): Promise<ApiAlias.List.Response["edge"]> {
    const scenario = this.initScenario(this.logger, this._buildResponseEdge);
    try {
      const usersService = Container.get(UsersService);
      const typesArray = await this.formModel
        .find({
          is_deleted: false,
        })
        .lean()
        .exec();

      const result: ApiAlias.List.Response["edge"] = {
        users: {},
      };
      const edge_users: ApiAlias.List.Response["edge"]["users"] = {};
      const userIds: string[] = [];
      for (const item of data) {
        if (item.created_by) userIds.push(item.created_by);
      }

      // scenario.set({ formIds, userIds });

      if (userIds.length) {
        const { data: users } = await usersService.list(
          {
            count: userIds.length,
            filters: {
              _id: userIds,
            },
            fields: ["_id", "tracking_id", "role", "profile"],
          },
          {
            current: {
              service: {
                name: "content",
                is_external: false,
              },
            },
          }
        );
        this.logger.value("users", users.length);
        for (const user of users) {
          edge_users[user._id] = getUserSnapshot(user);
        }
      }

      result.users = edge_users;

      // scenario.end();
      return result;
    } catch (error) {
      scenario.error(error);
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
       * Define the execution scenario form
       */
      const scenario: {
        [Key: string]: any;
      } = {};

      const q = this.formModel.findById(id);
      /**
       * @description Lean the query else if needed to not do so
       */
      if (!opt.dont_lean) q.lean();

      const doc = await q.exec();

      if (!doc) throw new exceptions.ItemNotFoundException("Form not found");

      /**
       * Check if the document is deleted and the user does not want to load deleted documents
       */
      if (doc.is_deleted && !opt.load_deleted)
        throw new exceptions.ItemNotFoundException("Form deleted");

      /**
       * Check if the user can view the form
       */
      if (
        !opt.bypass_authorization &&
        !userCan.viewObject(this.ENTITY, doc, authData)
      )
        throw new exceptions.UnauthorizedException(
          "You are not allowed to view this form"
        );

      const result: ApiAlias.GetOne.Response = {
        data: mapDocumentToExposed(doc),
      };
      result.edge = await this._buildResponseEdge([result.data]);

      /**
       * Log execution result before returning the result
       */
      this.logExecutionResult(this.getById, result, authData, scenario);

      return result;
    } catch (error) {
      if (
        opt.ignore_not_found_error &&
        error instanceof exceptions.ItemNotFoundException
      )
        return { data: undefined };
      this.logError(this.getById, error);
      throw error;
    }
  }

  /**
   * @description getBySlug
   */
  public async getBySlug(
    slug: string,
    authData: Levelup.CMS.V1.Security.AuthData,
    opt: {
      load_deleted?: boolean;
      dont_lean?: boolean;
      ignore_not_found_error?: boolean;
      bypass_authorization?: boolean;
      create_if_not_found?: boolean;
    } = {
      load_deleted: false,
      dont_lean: false,
      ignore_not_found_error: false,
      bypass_authorization: false,
      create_if_not_found: false,
    }
  ): Promise<ApiAlias.GetOne.Response> {
    const scenario = this.initScenario(this.logger, this.getBySlug, {
      slug,
    });
    try {
      /**
       * Fill options argument with the defaults
       */
      opt = defaults(opt, {
        load_deleted: false,
        dont_lean: false,
        ignore_not_found_error: false,
        create_if_not_found: false,
      });


      const q = this.formModel.findOne({ slug });
      /**
       * @description Lean the query else if needed to not do so
       */
      if (!opt.dont_lean) q.lean();

      const doc = await q.exec();

      if (!doc && !opt.create_if_not_found)
        throw new exceptions.ItemNotFoundException("Form not found");

      /**
       * Check if the document is deleted and the user does not want to load deleted documents
       */
      if (doc?.is_deleted && !opt.load_deleted && !opt.create_if_not_found)
        throw new exceptions.ItemNotFoundException("Form deleted");

      if (
        (!doc && opt.create_if_not_found) ||
        (doc?.is_deleted && !opt.load_deleted && opt.create_if_not_found)
      ) {
        /**
         * Create not found or deleted form object
         */
        const payload: ApiAlias.Create.Request = {
          data: {
            slug: slug,
            name: slug.replaceAll("-", " ").capitalizeFirstLetter(),
          },
        };

        const { data } = await this.create(payload, authData);
        if (data?._id) return { data };
        else throw new exceptions.InternalServerError("Could not create form");
      }

      /**
       * Check if the user can view the form
       */
      if (
        !opt.bypass_authorization &&
        !userCan.viewObject(this.ENTITY, doc, authData)
      )
        throw new exceptions.UnauthorizedException(
          "You are not allowed to view this form"
        );

      const result: ApiAlias.GetOne.Response = {
        data: mapDocumentToExposed(doc),
      };
      result.edge = await this._buildResponseEdge([result.data]);

      /**
       * Log execution result before returning the result
       */
      scenario.end();

      return result;
    } catch (error) {
      if (
        opt.ignore_not_found_error &&
        error instanceof exceptions.ItemNotFoundException
      )
        return { data: undefined };
      scenario.error(error);
      throw error;
    }
  }

  /**
   * @description Create
   */
  public async create(
    { data }: ApiAlias.Create.Request,
    authData?: Levelup.CMS.V1.Security.AuthData | null,
    opt?: {
      bypass_authorization?: boolean;
    }
  ): Promise<ApiAlias.Create.Response> {
    const scenario = this.initScenario(this.logger, this.getBySlug, {
      data,
    });
    
    try {
      /**
       * Define the execution scenario form
       */
      
      /**
       * await sanitize data here
       */
      data = await FormSanitizers.sanitizeCreateBody(data, authData);

      /**
       * Validate data here
       */
      const { error } = FormValidators.validateCreateBody(data);
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

      /**
       * Check if the user can create the form
       */
      if (
        authData?.current?.app?._id &&
        authData?.current?.app?._id !== data.app
      )
        throw new exceptions.UnauthorizedException(
          "You are not allowed to create this form on this app"
        );
      if (!userCan.createObject(this.ENTITY, data, authData))
        throw new exceptions.UnauthorizedException(
          "You are not allowed to create this form"
        );

      /**
       * Create data form
       */
      const docObject: Partial<EntityAlias> = {
        ...data,
        slug: await this._generateSlug(data.name, data.slug),
      };

      /**
       * Create tracking ID
       */
      if (
        FormSchemaFields["tracking_id"] &&
        Object.keys(ITEM_SHORTCUTS).includes("Form")
      ) {
        const entity = "Form" as const;
        docObject["tracking_id"] = await createTrackingId(
          this.ENTITY,
          this.formModel as any
        );
      }

      /**
       * Create search meta
       */
      docObject.search_meta = this._createSearchMeta(docObject, null);

      /**
       * Create the form on DB
       */
      const doc = await this.formModel.create(docObject);

      if (!doc)
        throw new exceptions.InternalServerError("Failed to create the form");

      this.eventDispatcher.dispatch<EventPayloadsAlias.created>(
        events.content.form.created,
        { data: doc }
      );

      const result = {
        data: mapDocumentToExposed(doc),
      };

      /**
       * Log execution result before returning the result
       */
      scenario.end();
      
      return result;
    } catch (error) {
      scenario.error(error);
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
       * Define the execution scenario form
       */
      const scenario: {
        [Key: string]: any;
      } = {};

      /**
       * await sanitize data here
       */
      data = await FormSanitizers.sanitizeUpdateBody(data, authData);

      /**
       * Validate data here
       */
      const { error } = FormValidators.validateUpdateBody(data);
      if (error) throw error;

      /**
       * Extract the required in block variables from the data form
       */
      const {} = data;

      /**
       * load old form and check if it exists
       */
      const old = await this.formModel.findById(id);
      if (!old) throw new exceptions.ItemNotFoundException("Form not found");
      if (old.is_deleted)
        throw new exceptions.UnauthorizedException("Form is deleted");
      if (!userCan.updateObject(this.ENTITY, old, authData))
        throw new exceptions.UnauthorizedException(
          "You are not allowed to update this form"
        );

      /**
       * detect changes
       */
      const updates = new ObjectUpdatedProperties(old.toObject(), data, true);
      scenario.updates = updates.asArray;

      const updateObject: Levelup.CMS.V1.Utils.Entity.General.IItemUpdate = {
        updated_by_system: !authData?.current?.user,
        updated_by: getUserSnapshot(authData?.current?.user),
        date: new Date(),
        action: "updated",
        updates: updates.asArray,
      };

      /**
       * Create data form
       */
      const docObject: Partial<EntityAlias> = {
        ...data,
      };

      /**
       * Create search meta
       */
      if (FormSchemaFields["search_meta"]) {
        docObject["search_meta"] = this._createSearchMeta(docObject, old);
      }

      /**
       * Update the form on DB
       */
      const doc = await this.formModel.findByIdAndUpdate(
        id,
        {
          ...docObject,
          $addToSet: {
            updates: updateObject,
          },
        },
        { new: true }
      );

      if (!doc) throw new exceptions.ItemNotFoundException("Form not found");

      /**
       * Handle the updated effects on the same service
       */
      // ...

      /**
       * Dispatch the updated event
       */
      this.eventDispatcher.dispatch<EventPayloadsAlias.updated>(
        events.content.form.updated,
        { data: doc }
      );

      const result = {
        data: mapDocumentToExposed(doc),
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
       * Define the execution scenario form
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

      const old = await this.formModel.findById(id);
      if (!old) throw new exceptions.ItemNotFoundException("Form not found");
      if (old.is_deleted)
        throw new exceptions.UnauthorizedException("Form already deleted");
      if (!userCan.deleteObject(this.ENTITY, old, authData))
        throw new exceptions.UnauthorizedException(
          "You are not allowed to delete this form"
        );

      const doc = await this.formModel.findByIdAndUpdate(
        id,
        {
          is_deleted: true,
          deleted_at: new Date(),
          $addToSet: {
            updates: updateObject,
          },
        },
        { new: true }
      );

      this.eventDispatcher.dispatch<EventPayloadsAlias.deleted>(
        events.content.form.deleted,
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
       * Define the execution scenario form
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

      const old = await this.formModel.findById(id);
      if (!old) throw new exceptions.ItemNotFoundException("Form not found");
      if (!old.is_deleted)
        throw new exceptions.UnauthorizedException("Form already exists");
      if (!userCan.restoreObject(this.ENTITY, old, authData))
        throw new exceptions.UnauthorizedException(
          "You are not allowed to restore this form"
        );

      const doc = await this.formModel.findByIdAndUpdate(
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

      if (!doc) throw new exceptions.ItemNotFoundException("Form not found");

      this.eventDispatcher.dispatch<EventPayloadsAlias.deleted>(
        events.content.form.restored,
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
}
