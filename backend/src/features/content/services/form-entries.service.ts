/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-03 00:17:36
 */

import nodemailer from "nodemailer";
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
import FormEntrySanitizers from "../sanitizers/form-entry.sanitizers";
import FormEntryValidators from "../validators/form-entry.validators";
import { FormEntrySchemaFields } from "../models/form-entry.model";
import { slugify } from "../../../utilities/strings/slugify.utilities";
import { uniq } from "lodash";
import { isObjectIdValid } from "../../../utilities/helpers/mogodb.helpers";
import UsersService from "../../auth/services/users.service";
import ExportManager from '../../../managers/export-manager/index';

import EntityAlias = Levelup.CMS.V1.Content.Entity.FormEntry;
import ApiAlias = Levelup.CMS.V1.Content.Api.FormEntries;
import DocumentAlias = Levelup.CMS.V1.Content.Model.FormEntryDocument;
import EventPayloadsAlias = Levelup.CMS.V1.Events.Payloads.Content.FormEntry;
type DocumentProperties = Levelup.CMS.V1.Utils.DocumentProperties<EntityAlias>;

/**
 * @description
 */
@Service()
export default class FormEntriesService extends BaseService {
  protected ENTITY = "formEntry" as const;

  constructor(
    @Inject("formModel")
    private formModel: Levelup.CMS.V1.Content.Model.Form,
    @Inject("formEntryModel")
    private formEntryModel: Levelup.CMS.V1.Content.Model.FormEntry,
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
   * @description Generates the snapshots formEntry for the entity.
   */
  public async _generateSnapshotsObject(
    new_data: Partial<EntityAlias>,
    old_data: Partial<EntityAlias> | null,
    authData: Levelup.CMS.V1.Security.AuthData
  ): Promise<EntityAlias["snapshots"]> {
    try {
      const cache = Container.get(CacheManager);
      const result: Levelup.CMS.V1.Utils.Complete<EntityAlias["snapshots"]> = {
        created_by: undefined,
      };

      /**
       * Return the result
       */
      return result;
    } catch (error) {
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
  _createSearchMeta(
    data: Partial<EntityAlias>,
    old?: Partial<EntityAlias>
  ): string {
    /**
     * Define the search meta formEntry
     */
    const search_meta: { [Key in DocumentProperties]?: string } = {
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
        const res = await this.formEntryModel.exists({ slug: value });
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
     * @description fixing filters formEntry
     */
    filters = fixFiltersObject(filters);

    /**
     * @description Inject attributes in the filters
     */
    if (!load_deleted && !opt.load_deleted && !("is_deleted" in filters))
      filters.is_deleted = false;
    if (authData?.current?.app) filters.app = authData?.current.app._id;

    // -- attributed:app
    if (FormEntrySchemaFields["app"]) {
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

    // -- is_handled
    filter = createBooleanFilter<DocumentProperties>(
      q,
      totalQ,
      filters.is_handled,
      "is_handled"
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

    // -- form
    if (filters.form) {
      let form;
      if (!isObjectIdValid(filters.form?.toString())) {
        const exists = await this.formModel.exists({
          slug: filters.form,
        });
        this.logger.value(
          "form not id",
          exists,
          filters.form,
          filters.form?.toString()
        );
        if (exists) form = exists?._id?.toString();
      } else {
        this.logger.value("form is object id", filters.form.toString());
        form = filters.form.toString();
      }
      filter = createStringFilter<DocumentProperties>(
        q,
        totalQ,
        form,
        "form" as any
      );
      q = filter.q;
      totalQ = filter.totalQ;
    }

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
    if (FormEntrySchemaFields["name"]) {
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

      let q: mongoose.QueryWithFuzzySearch<EntityAlias> =
        this.formEntryModel.find();
      let totalQ: mongoose.QueryWithFuzzySearch<EntityAlias> =
        this.formEntryModel.where();

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

  /**
   * @description Export
   */
  public async export(
    query: ApiAlias.Export.Request & {
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
  ): Promise<ApiAlias.Export.Response> {
    const scenario = this.initScenario(this.logger, this.export);
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

      let q: mongoose.QueryWithFuzzySearch<EntityAlias> =
        this.formEntryModel.find();
      let totalQ: mongoose.QueryWithFuzzySearch<EntityAlias> =
        this.formEntryModel.where();

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

      const limit = count === undefined || count === null ? -1 : count;
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
      let items = await q
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

      items = items.map((doc) => mapDocumentToExposed(doc));
      const result: ApiAlias.Export.Response = {
        data: {
          id: "",
          url: "",
          count: items.length,
        },
      };
      result.edge = await this._buildResponseEdge(items);

      result.data!.id = await this.generateExportFile(
        items,
        result.edge
      );

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
  async generateExportFile(
    items: DocumentAlias[],
    edge: {
      users: { [ID: string]: Levelup.CMS.V1.Utils.Entity.Snapshots.Auth.User };
      forms: { [ID: string]: Levelup.CMS.V1.Content.Entity.Form };
    }
  ) {
    const scenario = this.initScenario(this.logger, this.generateExportFile);
    try {

      /**
       * @description Generate the export file
       */
      const exportManager = Container.get(ExportManager);
      const result = await exportManager.generateExcel(
        "formEntry",
        items,
        edge,
      );

      scenario.set({ result });


      /**
       * @description Log execution result before returning the result
       */
      scenario.end();

      return result.id;

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
      const formsArray = await this.formModel
        .find({
          is_deleted: false,
        })
        .lean()
        .exec();
      const forms: ApiAlias.List.Response["edge"]["forms"] = formsArray.reduce(
        (prev, curr) => ({ ...prev, [curr._id.toString()]: curr }),
        {}
      );

      const result: ApiAlias.List.Response["edge"] = {
        users: {},
        forms: {},
      };
      const edge_users: ApiAlias.List.Response["edge"]["users"] = {};
      let formIds: string[] = [];
      const userIds: string[] = [];
      for (const item of data) {
        if (item.form) {
          formIds.push(item.form);
        }
        if (item.created_by) userIds.push(item.created_by);
      }

      // scenario.set({ formIds, userIds });

      if (formIds.length) {
        const formEntrys = await this.formEntryModel
          .find({
            _id: { $in: uniq(formIds) },
          })
          .lean()
          .exec();
      }
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
      if (formIds.length) {
        for (const formId of uniq(formIds))
          if (formId) result.forms[formId] = forms[formId];
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
       * Define the execution scenario formEntry
       */
      const scenario: {
        [Key: string]: any;
      } = {};

      const q = this.formEntryModel.findById(id);
      /**
       * @description Lean the query else if needed to not do so
       */
      if (!opt.dont_lean) q.lean();

      const doc = await q.exec();

      if (!doc)
        throw new exceptions.ItemNotFoundException("FormEntry not found");

      /**
       * Check if the document is deleted and the user does not want to load deleted documents
       */
      if (doc.is_deleted && !opt.load_deleted)
        throw new exceptions.ItemNotFoundException("FormEntry deleted");

      /**
       * Check if the user can view the formEntry
       */
      if (
        !opt.bypass_authorization &&
        !userCan.viewObject(this.ENTITY, doc, authData)
      )
        throw new exceptions.UnauthorizedException(
          "You are not allowed to view this formEntry"
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
       * Define the execution scenario formEntry
       */
      const scenario: {
        [Key: string]: any;
      } = {};

      const q = this.formEntryModel.findOne({ slug });
      /**
       * @description Lean the query else if needed to not do so
       */
      if (!opt.dont_lean) q.lean();

      const doc = await q.exec();

      if (!doc)
        throw new exceptions.ItemNotFoundException("FormEntry not found");

      /**
       * Check if the document is deleted and the user does not want to load deleted documents
       */
      if (doc.is_deleted && !opt.load_deleted)
        throw new exceptions.ItemNotFoundException("FormEntry deleted");

      /**
       * Check if the user can view the formEntry
       */
      if (
        !opt.bypass_authorization &&
        !userCan.viewObject(this.ENTITY, doc, authData)
      )
        throw new exceptions.UnauthorizedException(
          "You are not allowed to view this formEntry"
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
   * @description Create
   */
  public async create(
    { data }: ApiAlias.Create.Request,
    authData: Levelup.CMS.V1.Security.AuthData,
    opt?: {
      bypass_authorization?: boolean;
    }
  ): Promise<ApiAlias.Create.Response> {
    const scenario = this.initScenario(this.logger, this.create, { data });
    try {

      /**
       * await sanitize data here
       */
      data = await FormEntrySanitizers.sanitizeCreateBody(data, authData);

      /**
       * Validate data here
       */
      const { error } = FormEntryValidators.validateCreateBody(data);
      if (error) throw error;

      let { } = data;

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
       * Check if the user can create the formEntry
       */
      if (
        authData?.current?.app?._id &&
        authData?.current?.app?._id !== data.app
      )
        throw new exceptions.UnauthorizedException(
          "You are not allowed to create this formEntry on this app"
        );
      if (!userCan.createObject(this.ENTITY, data, authData))
        throw new exceptions.UnauthorizedException(
          "You are not allowed to create this formEntry"
        );

      /**
       * Create data formEntry
       */
      const docObject: Partial<EntityAlias> = {
        ...data,
      };

      /**
       * Create tracking ID
       */
      if (
        FormEntrySchemaFields["tracking_id"] &&
        Object.keys(ITEM_SHORTCUTS).includes("FormEntry")
      ) {
        const entity = "FormEntry" as const;
        docObject["tracking_id"] = await createTrackingId(
          this.ENTITY,
          this.formEntryModel as any
        );
      }

      /**
       * Create search meta
       */
      docObject.search_meta = this._createSearchMeta(docObject, null);

      docObject.snapshots = await this._generateSnapshotsObject(
        docObject,
        null,
        authData
      );

      /**
       * Create the formEntry on DB
       */
      const doc = await this.formEntryModel.create(docObject);

      if (!doc)
        throw new exceptions.InternalServerError(
          "Failed to create the formEntry"
        );

      this.eventDispatcher.dispatch<EventPayloadsAlias.created>(
        events.content.formEntry.created,
        { data: doc }
      );

      const result = {
        data: mapDocumentToExposed(doc),
      };

      /**
       * Log execution result before returning the result
       */
      scenario.log();

      const sendEmailResult = await this.sendEmailNotification(docObject.form_slug, docObject.data);

      return result;
    } catch (error) {
      scenario.error(error);
      throw error;
    }
  }
  public async sendEmailNotification(slug: string, data: { [Key: string]: any; }) {
    const scenario = this.initScenario(
      this.logger,
      this.sendEmailNotification,
      { slug, data }
    );
    try {
      /**
       * @description Send email notification
       */
      if (slug === 'inscription') {
        const sender = "contact@miqate.com";
        const password = generateStrongPassword(12)
        const to = data?.email;
        const subject = 'تأكيد تسجيل الوكالة';
        const message = `
         <p>مرحبًا،</p>
          <p>شكرًا لتسجيلك في موقع miqate.com. يرجى استخدام معلومات الدخول التالية لتسجيل الدخول:</p>
          <p>البريد الإلكتروني: <strong>${data?.email}</strong></p>
          <p>كلمة المرور: <strong>${password}</strong></p>
          <p>إذا لم تقم بالتسجيل، يرجى تجاهل هذه الرسالة.</p>
        `;
        const html = `
          <p>مرحبًا،</p>
          <p>شكرًا لتسجيلك في موقع miqate.com. يرجى استخدام معلومات الدخول التالية لتسجيل الدخول:</p>
          <p>البريد الإلكتروني: <strong>${data?.email}</strong></p>
          <p>كلمة المرور: <strong>${password}</strong></p>
          <p>إذا لم تقم بالتسجيل، يرجى تجاهل هذه الرسالة.</p>
        `;

        if (!to || !subject || !message) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing required fields" }),
          };
        }

        // Configure Nodemailer with Zoho SMTP
        const transporter = nodemailer.createTransport({
          host: "smtp.zoho.com",
          port: 465, // Use 587 for TLS
          secure: true, // SSL
          auth: {
            user: process.env.ZOHO_EMAIL, // Your Zoho email
            pass: process.env.ZOHO_APP_PASSWORD, // Zoho App Password
          },
        });

        // Email options
        const mailOptions = {
          from: `"Miqate.com" <${process.env.ZOHO_EMAIL}>`,
          to,
          cc: "contact@miqate.com",
          subject,
          text: message,
          html
        };

        // Send email
        const sendResult = await transporter.sendMail(mailOptions);
        scenario.set({
          to,
          subject,
          message,
          sendResult,
        });
      }
      scenario.log();
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
       * Define the execution scenario formEntry
       */
      const scenario: {
        [Key: string]: any;
      } = {};

      /**
       * await sanitize data here
       */
      data = await FormEntrySanitizers.sanitizeUpdateBody(data, authData);

      /**
       * Validate data here
       */
      const { error } = FormEntryValidators.validateUpdateBody(data);
      if (error) throw error;

      /**
       * Extract the required in block variables from the data formEntry
       */
      const { } = data;

      /**
       * load old formEntry and check if it exists
       */
      const old = await this.formEntryModel.findById(id);
      if (!old)
        throw new exceptions.ItemNotFoundException("FormEntry not found");
      if (old.is_deleted)
        throw new exceptions.UnauthorizedException("FormEntry is deleted");
      if (!userCan.updateObject(this.ENTITY, old, authData))
        throw new exceptions.UnauthorizedException(
          "You are not allowed to update this formEntry"
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
       * Create data formEntry
       */
      const docObject: Partial<EntityAlias> = {
        ...data,
      };

      /**
       * Create search meta
       */
      if (FormEntrySchemaFields["search_meta"]) {
        docObject["search_meta"] = this._createSearchMeta(docObject, old);
      }

      docObject.snapshots = await this._generateSnapshotsObject(
        docObject,
        old,
        authData
      );

      /**
       * Update the formEntry on DB
       */
      const doc = await this.formEntryModel.findByIdAndUpdate(
        id,
        {
          ...docObject,
          $addToSet: {
            updates: updateObject,
          },
        },
        { new: true }
      );

      if (!doc)
        throw new exceptions.ItemNotFoundException("FormEntry not found");

      /**
       * Handle the updated effects on the same service
       */
      // ...

      /**
       * Dispatch the updated event
       */
      this.eventDispatcher.dispatch<EventPayloadsAlias.updated>(
        events.content.formEntry.updated,
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
       * Define the execution scenario formEntry
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

      const old = await this.formEntryModel.findById(id);
      if (!old)
        throw new exceptions.ItemNotFoundException("FormEntry not found");
      if (old.is_deleted)
        throw new exceptions.UnauthorizedException("FormEntry already deleted");
      if (!userCan.deleteObject(this.ENTITY, old, authData))
        throw new exceptions.UnauthorizedException(
          "You are not allowed to delete this formEntry"
        );

      const doc = await this.formEntryModel.findByIdAndUpdate(
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
        events.content.formEntry.deleted,
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
       * Define the execution scenario formEntry
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

      const old = await this.formEntryModel.findById(id);
      if (!old)
        throw new exceptions.ItemNotFoundException("FormEntry not found");
      if (!old.is_deleted)
        throw new exceptions.UnauthorizedException("FormEntry already exists");
      if (!userCan.restoreObject(this.ENTITY, old, authData))
        throw new exceptions.UnauthorizedException(
          "You are not allowed to restore this formEntry"
        );

      const doc = await this.formEntryModel.findByIdAndUpdate(
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

      if (!doc)
        throw new exceptions.ItemNotFoundException("FormEntry not found");

      this.eventDispatcher.dispatch<EventPayloadsAlias.deleted>(
        events.content.formEntry.restored,
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

  public async aggregateByForms() {
    const scenario = this.initScenario(this.logger, this.aggregateByForms);
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
            _id: "$form",
            count: {
              $sum: 1,
            },
          },
        },
        {
          $project: {
            form: "$_id",
            count: 1,
            _id: 0,
          },
        },
      ];

      const data: {
        form: string;
        count: number;
      }[] = await this.formEntryModel.aggregate(aggregateQuery);

      const result: {
        data: typeof data;
        edge: ApiAlias.List.Response["edge"];
      } = {
        data,
        edge: {
          users: {},
          forms: {},
        },
      };

      const formsArray = await this.formModel
        .find({
          is_deleted: false,
        })
        .lean()
        .exec();
      result.edge.forms = formsArray.reduce(
        (prev, curr) => ({ ...prev, [curr._id.toString()]: curr }),
        {}
      );

      scenario.set({ data }).end();

      return result;
    } catch (error) {
      scenario.error(error);
      throw error;
    }
  }
}


function generateStrongPassword(length: number = 12): string {
  // Ensure at least one of each required character type
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const allChars = uppercase + lowercase + numbers;

  let password = [
    uppercase[Math.floor(Math.random() * uppercase.length)],
    lowercase[Math.floor(Math.random() * lowercase.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
  ];

  // Fill the rest of the password length
  for (let i = 3; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password.push(allChars[randomIndex]);
  }

  // Shuffle the password array
  for (let i = password.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join('');
}