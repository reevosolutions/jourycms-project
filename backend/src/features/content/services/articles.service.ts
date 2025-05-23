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
import ArticleSanitizers from "../sanitizers/article.sanitizers";
import ArticleValidators from "../validators/article.validators";
import { ArticleSchemaFields } from "../models/article.model";
import { slugify } from "../../../utilities/strings/slugify.utilities";
import { uniq } from "lodash";
import { isObjectIdValid } from "../../../utilities/helpers/mogodb.helpers";
import UsersService from "../../auth/services/users.service";

import EntityAlias = Levelup.CMS.V1.Content.Entity.Article;
import ApiAlias = Levelup.CMS.V1.Content.Api.Articles;
import DocumentAlias = Levelup.CMS.V1.Content.Model.ArticleDocument;
import EventPayloadsAlias = Levelup.CMS.V1.Events.Payloads.Content.Article;
type DocumentProperties = Levelup.CMS.V1.Utils.DocumentProperties<EntityAlias>;

/**
 * @description
 */
@Service()
export default class ArticlesService extends BaseService {
  protected ENTITY = "article" as const;

  constructor(
    @Inject("articleTypeModel")
    private articleTypeModel: Levelup.CMS.V1.Content.Model.ArticleType,
    @Inject("articleModel")
    private articleModel: Levelup.CMS.V1.Content.Model.Article,
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
   * @description Generates the snapshots article for the entity.
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
     * Define the search meta article
     */
    const search_meta: { [Key in DocumentProperties]?: string } = {
      /**
       * TODO: Add more fields to the search meta
       */
      // ...
      title: data.title,
    };

    /**
     * Add old values if not provided in the new data
     */
    if (old) {
      /**
       * TODO: Add more fields to the search meta
       */
      // ...
      if (typeof data.title === "undefined") search_meta.title = old.title;
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
        const res = await this.articleModel.exists({ slug: value });
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
     * @description fixing filters article
     */
    filters = fixFiltersObject(filters);

    /**
     * @description Inject attributes in the filters
     */
    if (!load_deleted && !opt.load_deleted && !("is_deleted" in filters))
      filters.is_deleted = false;
    if (authData?.current?.app) filters.app = authData?.current.app._id;

    // -- attributed:app
    if (ArticleSchemaFields["app"]) {
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

    // -- article_type
    if (filters.article_type) {
      let article_type;
      if (!isObjectIdValid(filters.article_type?.toString())) {
        const exists = await this.articleTypeModel.exists({
          slug: filters.article_type,
        });
        this.logger.value(
          "article_type not id",
          exists,
          filters.article_type,
          filters.article_type?.toString()
        );
        if (exists) article_type = exists?._id?.toString();
      } else {
        this.logger.value(
          "article_type is object id",
          filters.article_type.toString()
        );
        article_type = filters.article_type.toString();
      }
      filter = createStringFilter<DocumentProperties>(
        q,
        totalQ,
        article_type,
        "article_type" as any
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
    if (ArticleSchemaFields["name"]) {
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

  async _applyCustomFilters({
    query,
    q,
    totalQ,
  }: {
    q: mongoose.QueryWithFuzzySearch<EntityAlias>;
    totalQ: mongoose.QueryWithFuzzySearch<EntityAlias>;
    query: ApiAlias.List.Request & {
      customFilter?: { [k: string]: any };
    };
  }): Promise<{
    q: mongoose.QueryWithFuzzySearch<EntityAlias>;
    totalQ: mongoose.QueryWithFuzzySearch<EntityAlias>;
  }> {
    let { search, load_deleted } = query;
    let filter: {
      q: typeof q;
      totalQ: typeof totalQ;
    };

    type CustomFilterParams = {
      /**
       * @param article type
       */
      t: string;
      /**
       * @param agency
       */
      a?: string;
      /**
       * @param duration
       */
      d?: string;
      /**
       * @param entry_point
       */
      e?: string;
      /**
       * @param program_type
       */
      pt?: string;
      /**
       * @param trip_type
       */
      tt?: string;
      /**
       * @param distance_to_haram
       */
      dh?: string;
      /**
       * @param payment_mode
       */
      pm?: string;
      /**
       * @param month
       */
      m?: string;
      /**
       * @param ramadhan
       */
      r?: boolean;

      /**
       * @param price min
       */
      pn?: number;
      /**
       * @param price max
       */
      px?: number;

      /* --------------------------------- HOTELS --------------------------------- */
      /**
       * @param stars
       */
      st?: string;

      /* --------------------------------- MEMBERS -------------------------------- */
      /**
       * @param state
       */
      w?: string;
      /**
       * @param city
       */
      c?: string;
      /**
       * @param services
       */
      s?: string | string[];

      /**
       * @param experience min
       */
      xn?: number;
      /**
       * @param experience max
       */
      xx?: number;
      /**
       * @param sex
       */
      x?: "male" | "female" | "m" | "f";
      /**
       * @param speciaality
       */
      sp?: string | string[];

      /* --------------------------------- GLOBAL --------------------------------- */
      /**
       * @param sort
       */
      so?: string;
      /**
       * @param search text
       */
      q?: string;
      /**
       * @param page
       */
      p?: string;
    };

    let customFilters: CustomFilterParams = query.customFilter as any;

    /**
     * @description Handle search
     */
    if (customFilters.q) {
      q = q.where({ $text: { $search: customFilters.q } });
      totalQ = totalQ.where({ $text: { $search: customFilters.q } });
    }

    /**
     * @description fixing filters article
     */
    customFilters = fixFiltersObject(customFilters);

    const exprAnd: any[] = [];
    const and: any[] = [];
    /* ------------------------------ article_type ------------------------------ */
    if (customFilters.t) {
      let article_type;
      if (!isObjectIdValid(customFilters.t?.toString())) {
        const exists = await this.articleTypeModel.exists({
          slug: customFilters.t,
        });
        this.logger.value(
          "article_type not id",
          exists,
          customFilters.t,
          customFilters.t?.toString()
        );
        if (exists) article_type = exists?._id?.toString();
      } else {
        this.logger.value(
          "article_type is object id",
          customFilters.t.toString()
        );
        article_type = customFilters.t.toString();
      }
      filter = createStringFilter<DocumentProperties>(
        q,
        totalQ,
        article_type,
        "article_type" as any
      );
      q = filter.q;
      totalQ = filter.totalQ;
    }

    /* --------------------------------- agency --------------------------------- */
    if (customFilters.a) {
      filter = createStringFilter<DocumentProperties>(
        q,
        totalQ,
        customFilters.a,
        "meta_fields.agency"
      );
      q = filter.q;
      totalQ = filter.totalQ;
    }

    /* ------------------------------- duration ------------------------------- */
    if (customFilters.d && Number.parseInt(customFilters.d)) {
      exprAnd.push({
        $lte: [
          {
            $divide: [
              {
                $subtract: [
                  { $toDate: "$meta_fields.trip_end_date" },
                  { $toDate: "$meta_fields.trip_start_date" },
                ],
              },
              1000 * 60 * 60 * 24,
            ],
          }, // Convert milliseconds to days
          Number.parseInt(customFilters.d) + 1,
        ],
      });
    }

    /* ------------------------------ entry_point ------------------------------ */
    if (customFilters.e) {
      filter = createStringFilter<DocumentProperties>(
        q,
        totalQ,
        customFilters.e,
        "meta_fields.entry_point"
      );
      q = filter.q;
      totalQ = filter.totalQ;
    }

    /* ------------------------------ program_type ------------------------------ */
    if (customFilters.pt) {
      filter = createStringFilter<DocumentProperties>(
        q,
        totalQ,
        customFilters.pt,
        "meta_fields.program_type"
      );
      q = filter.q;
      totalQ = filter.totalQ;
    }

    /* ------------------------------ trip_type ------------------------------ */
    if (customFilters.tt) {
      filter = createStringFilter<DocumentProperties>(
        q,
        totalQ,
        customFilters.tt,
        "meta_fields.trip_type"
      );
      q = filter.q;
      totalQ = filter.totalQ;
    }

    /* ------------------------------ distance_to_haram ------------------------------ */
    if (customFilters.dh) {
      let [dhn, dhx]: number[] | string[] = customFilters.dh.split("-");
      if(!dhx) {
        dhn = "0";
        dhx = customFilters.dh;
      }
      dhn = Number.parseInt(dhn);
      dhx = Number.parseInt(dhx);

      and.push(
        {
          $or: [
            { "meta_fields.distance_mekkah_hotel_to_haram": dhn ? {$gte: dhn, $lte: dhx} :  { $lte: dhx } },
            { "meta_fields.distance_medina_hotel_to_haram": dhn ? { $gte: dhn, $lte: dhx } : { $lte: dhx } },
          ],
        },
      );
    }

    /* ------------------------------ payment_mode ------------------------------ */
    if (customFilters.pm) {
      filter = createStringFilter<DocumentProperties>(
        q,
        totalQ,
        customFilters.pm,
        "meta_fields.payment_mode"
      );
      q = filter.q;
      totalQ = filter.totalQ;
    }

    /* --------------------------------- month --------------------------------- */
    if (customFilters.m) {
      exprAnd.push(
        {
          $eq: [
            { $month: { $toDate: "$meta_fields.trip_start_date" } },
            Number.parseInt(customFilters.m),
          ],
        },
        {
          $gte: [
            { $year: { $toDate: "$meta_fields.trip_start_date" } },
            new Date().getFullYear(),
          ],
        }
      );
    }

    /* ------------------------------ ramadhan_trip ----------------------------- */
    if (customFilters.r) {
      filter = createBooleanFilter<DocumentProperties>(
        q,
        totalQ,
        customFilters.r,
        "meta_fields.ramadhan_trip"
      );
      q = filter.q;
      totalQ = filter.totalQ;
    }

    /* --------------------------------- price --------------------------------- */
    if (customFilters.pn || customFilters.px) {
      const [pn, px] = [
        Number.parseFloat(`${customFilters.pn}` || "0"),
        Number.parseFloat(`${customFilters.px}` || "10000000"),
      ].sort((a, b) => a - b);
      and.push({
        $or: [
          { "meta_fields.price_of_single_person_room": { $gte: pn, $lte: px } },
          { "meta_fields.price_of_two_persons_room": { $gte: pn, $lte: px } },
          { "meta_fields.price_of_three_persons_room": { $gte: pn, $lte: px } },
          { "meta_fields.price_of_four_persons_room": { $gte: pn, $lte: px } },
          { "meta_fields.price_of_five_persons_room": { $gte: pn, $lte: px } },
        ],
      });
    }

    /* -------------------------------------------------------------------------- */
    /*                                 DEPRECATED                                 */
    /* -------------------------------------------------------------------------- */
    // state
    if (customFilters.w) {
      filter = createStringFilter<DocumentProperties>(
        q,
        totalQ,
        customFilters.w,
        "meta_fields.state"
      );
      q = filter.q;
      totalQ = filter.totalQ;
    }
    // city
    if (customFilters.c) {
      filter = createStringFilter<DocumentProperties>(
        q,
        totalQ,
        customFilters.c,
        ["meta_fields.city", "meta_fields.ksa_city"],
        false,
        "or"
      );
      q = filter.q;
      totalQ = filter.totalQ;
    }

    /* -------------------------------------------------------------------------- */
    /*                                   MEMBERS                                  */
    /* -------------------------------------------------------------------------- */
    // spaciatilty
    if (customFilters.sp) {
      filter = createStringFilter<DocumentProperties>(
        q,
        totalQ,
        typeof customFilters.sp === "string"
          ? customFilters.sp.split(",").map((s) => s.trim())
          : customFilters.sp,
        "meta_fields.spaciality"
      );
      q = filter.q;
      totalQ = filter.totalQ;
    }
    // services
    if (customFilters.s) {
      filter = createStringFilter<DocumentProperties>(
        q,
        totalQ,
        typeof customFilters.s === "string"
          ? customFilters.s.split(",").map((s) => s.trim())
          : customFilters.s,
        "meta_fields.services"
      );
      q = filter.q;
      totalQ = filter.totalQ;
    }

    // experience
    if (customFilters.xn || customFilters.xx) {
      const [xn, xx] = [
        Number.parseFloat(`${customFilters.xn}` || "0"),
        Number.parseFloat(`${customFilters.xx}` || "10000000"),
      ].sort((a, b) => a - b);
      q = q.where({
        "meta_fields.experience": { $gte: xn, $lte: xx },
      });
      totalQ = totalQ.where({
        "meta_fields.experience": { $gte: xn, $lte: xx },
      });
    }


    this.logger.value("extra filters", { exprAnd, and });
    /* ---------------------------- APPLY EXPRESSIONS --------------------------- */
    if (exprAnd.length) {
      q = q.where({ $expr: { $and: exprAnd } });
      totalQ = totalQ.where({ $expr: { $and: exprAnd } });
    }

    /* --------------------------------- APPLY AND ------------------------------- */
    if (and.length) {
      q = q.where({ $and: and });
      totalQ = totalQ.where({ $and: and });
    }

    /**
     * Return
     */
    return { q, totalQ };
  }

  _applyCustomSort({
    query,
  }: {
    query: ApiAlias.List.Request & {
      customFilter?: { [k: string]: any };
    };
  }):
    | {
      sort_by: string;
      sort: "asc" | "desc";
    }
    | undefined {
    type CustomFilterParams = {
      /* --------------------------------- GLOBAL --------------------------------- */
      /**
       * @param sort
       */
      so?: "price:asc" | "price:desc" | "date:asc" | "date:desc";
      /**
       * @param search text
       */
      q?: string;
      /**
       * @param page
       */
      p?: string;
    };

    let customFilters: CustomFilterParams = query.customFilter as any;

    /**
     * @description fixing filters article
     */
    customFilters = fixFiltersObject(customFilters);

    if (!customFilters.so) return undefined;

    const sort = customFilters.so.split(":");
    const sort_by = sort[0] === "date" ? "meta_fields.trip_start_date" : sort[0] === "price" ? "meta_fields.price_of_single_person_room" : "created_at";
    const sort_order = sort[1] == "desc" ? (sort[1] as "desc") : "asc";

    return { sort_by, sort: sort_order };
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
        this.articleModel.find();
      let totalQ: mongoose.QueryWithFuzzySearch<EntityAlias> =
        this.articleModel.where();

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

      if (query.customFilter) {
        const filter = await this._applyCustomFilters({
          q,
          totalQ,
          query,
        });
        q = filter.q;
        totalQ = filter.totalQ;
      }

      const limit =
        count === undefined || count === null
          ? authData?.current?.app?.settings?.listing?.default_count ||
          config.settings.listing.defaultCount
          : count;
      const { skip, take } = this.getPaginationOptions(limit, page);

      const custom_sort = this._applyCustomSort({
        query,
      });
      const sortOptions = this.getSortOptions(
        custom_sort?.sort || sort,
        custom_sort?.sort_by || sort_by
      );
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
      this.logger.value("query:", q.getQuery());
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
      const typesArray = await this.articleTypeModel
        .find({
          is_deleted: false,
        })
        .lean()
        .exec();
      const types: ApiAlias.List.Response["edge"]["article_types"] =
        typesArray.reduce(
          (prev, curr) => ({ ...prev, [curr._id.toString()]: curr }),
          {}
        );

      const result: ApiAlias.List.Response["edge"] = {
        users: {},
        article_types: {},
        linked_articles: {},
      };
      const linked_articles: ApiAlias.List.Response["edge"]["linked_articles"] =
        {};
      const edge_users: ApiAlias.List.Response["edge"]["users"] = {};
      let articleIds: string[] = [];
      let typeIds: string[] = [];
      const userIds: string[] = [];
      for (const item of data) {
        if (item.article_type) {
          const type = types[item.article_type?.toString()] || null;
          typeIds.push(item.article_type);
          if (Object.keys(item.meta_fields || {}).length && type) {
            for (const field of type.custom_meta_fields) {
              if (
                field.field_type === "article_object" &&
                item.meta_fields[field.field_key]
              ) {
                const ids = Array.isArray(item.meta_fields[field.field_key])
                  ? item.meta_fields[field.field_key]
                  : [item.meta_fields[field.field_key]];
                articleIds = articleIds.concat(
                  item.meta_fields[field.field_key]
                );
              }
            }
          }
        }
        if (item.created_by) userIds.push(item.created_by);
      }

      // scenario.set({ articleIds, userIds });

      if (articleIds.length) {
        const articles = await this.articleModel
          .find({
            _id: { $in: uniq(articleIds) },
          })
          .lean()
          .exec();
        this.logger.value("linked_articles", articles.length);
        for (const article of articles) {
          linked_articles[article._id] = {
            ...article,
            body: undefined,
            body_unformatted: undefined,
            body_structured: undefined,
            attributes: undefined,
            snapshots: undefined,
            insights: undefined,
          } as any;
          if (article.article_type) typeIds.push(article.article_type);
        }
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
      if (typeIds.length) {
        for (const typeId of uniq(typeIds))
          if (typeId) result.article_types[typeId] = types[typeId];
      }

      result.linked_articles = linked_articles;
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
       * Define the execution scenario article
       */
      const scenario: {
        [Key: string]: any;
      } = {};

      const q = this.articleModel.findById(id);
      /**
       * @description Lean the query else if needed to not do so
       */
      if (!opt.dont_lean) q.lean();

      const doc = await q.exec();

      if (!doc) throw new exceptions.ItemNotFoundException("Article not found");

      /**
       * Check if the document is deleted and the user does not want to load deleted documents
       */
      if (doc.is_deleted && !opt.load_deleted)
        throw new exceptions.ItemNotFoundException("Article deleted");

      /**
       * Check if the user can view the article
       */
      if (
        !opt.bypass_authorization &&
        !userCan.viewObject(this.ENTITY, doc, authData)
      )
        throw new exceptions.UnauthorizedException(
          "You are not allowed to view this article"
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
       * Define the execution scenario article
       */
      const scenario: {
        [Key: string]: any;
      } = {};

      const q = this.articleModel.findOne({ slug });
      /**
       * @description Lean the query else if needed to not do so
       */
      if (!opt.dont_lean) q.lean();

      const doc = await q.exec();

      if (!doc) throw new exceptions.ItemNotFoundException("Article not found");

      /**
       * Check if the document is deleted and the user does not want to load deleted documents
       */
      if (doc.is_deleted && !opt.load_deleted)
        throw new exceptions.ItemNotFoundException("Article deleted");

      /**
       * Check if the user can view the article
       */
      if (
        !opt.bypass_authorization &&
        !userCan.viewObject(this.ENTITY, doc, authData)
      )
        throw new exceptions.UnauthorizedException(
          "You are not allowed to view this article"
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
    try {
      /**
       * Define the execution scenario article
       */
      const scenario: {
        [Key: string]: any;
      } = {};

      /**
       * await sanitize data here
       */
      data = await ArticleSanitizers.sanitizeCreateBody(data, authData);

      /**
       * Validate data here
       */
      const { error } = ArticleValidators.validateCreateBody(data);
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
       * Check if the user can create the article
       */
      if (
        authData?.current?.app?._id &&
        authData?.current?.app?._id !== data.app
      )
        throw new exceptions.UnauthorizedException(
          "You are not allowed to create this article on this app"
        );
      if (!userCan.createObject(this.ENTITY, data, authData))
        throw new exceptions.UnauthorizedException(
          "You are not allowed to create this article"
        );

      /**
       * Create data article
       */
      const docObject: Partial<EntityAlias> = {
        ...data,
        slug: await this._generateSlug(data.title, data.slug),
      };

      /**
       * Create tracking ID
       */
      if (
        ArticleSchemaFields["tracking_id"] &&
        Object.keys(ITEM_SHORTCUTS).includes("Article")
      ) {
        const entity = "Article" as const;
        docObject["tracking_id"] = await createTrackingId(
          this.ENTITY,
          this.articleModel as any
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
       * Create the article on DB
       */
      const doc = await this.articleModel.create(docObject);

      if (!doc)
        throw new exceptions.InternalServerError(
          "Failed to create the article"
        );

      this.eventDispatcher.dispatch<EventPayloadsAlias.created>(
        events.content.article.created,
        { data: doc }
      );

      const result = {
        data: mapDocumentToExposed(doc),
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
       * Define the execution scenario article
       */
      const scenario: {
        [Key: string]: any;
      } = {};

      /**
       * await sanitize data here
       */
      data = await ArticleSanitizers.sanitizeUpdateBody(data, authData);

      /**
       * Validate data here
       */
      const { error } = ArticleValidators.validateUpdateBody(data);
      if (error) throw error;

      /**
       * Extract the required in block variables from the data article
       */
      const { } = data;

      /**
       * load old article and check if it exists
       */
      const old = await this.articleModel.findById(id);
      if (!old) throw new exceptions.ItemNotFoundException("Article not found");
      if (old.is_deleted)
        throw new exceptions.UnauthorizedException("Article is deleted");
      if (!userCan.updateObject(this.ENTITY, old, authData))
        throw new exceptions.UnauthorizedException(
          "You are not allowed to update this article"
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
       * Create data article
       */
      const docObject: Partial<EntityAlias> = {
        ...data,
      };

      /**
       * Create search meta
       */
      if (ArticleSchemaFields["search_meta"]) {
        docObject["search_meta"] = this._createSearchMeta(docObject, old);
      }

      docObject.snapshots = await this._generateSnapshotsObject(
        docObject,
        old,
        authData
      );

      /**
       * Update the article on DB
       */
      const doc = await this.articleModel.findByIdAndUpdate(
        id,
        {
          ...docObject,
          $addToSet: {
            updates: updateObject,
          },
        },
        { new: true }
      );

      if (!doc) throw new exceptions.ItemNotFoundException("Article not found");

      /**
       * Handle the updated effects on the same service
       */
      // ...

      /**
       * Dispatch the updated event
       */
      this.eventDispatcher.dispatch<EventPayloadsAlias.updated>(
        events.content.article.updated,
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
       * Define the execution scenario article
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

      const old = await this.articleModel.findById(id);
      if (!old) throw new exceptions.ItemNotFoundException("Article not found");
      if (old.is_deleted)
        throw new exceptions.UnauthorizedException("Article already deleted");
      if (!userCan.deleteObject(this.ENTITY, old, authData))
        throw new exceptions.UnauthorizedException(
          "You are not allowed to delete this article"
        );

      const doc = await this.articleModel.findByIdAndUpdate(
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
        events.content.article.deleted,
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
       * Define the execution scenario article
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

      const old = await this.articleModel.findById(id);
      if (!old) throw new exceptions.ItemNotFoundException("Article not found");
      if (!old.is_deleted)
        throw new exceptions.UnauthorizedException("Article already exists");
      if (!userCan.restoreObject(this.ENTITY, old, authData))
        throw new exceptions.UnauthorizedException(
          "You are not allowed to restore this article"
        );

      const doc = await this.articleModel.findByIdAndUpdate(
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

      if (!doc) throw new exceptions.ItemNotFoundException("Article not found");

      this.eventDispatcher.dispatch<EventPayloadsAlias.deleted>(
        events.content.article.restored,
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

  public async aggregateByTypes() {
    const scenario = this.initScenario(this.logger, this.aggregateByTypes);
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
            _id: "$article_type",
            count: {
              $sum: 1,
            },
          },
        },
        {
          $project: {
            article_type: "$_id",
            count: 1,
            _id: 0,
          },
        },
      ];

      const data: {
        article_type: string;
        count: number;
      }[] = await this.articleModel.aggregate(aggregateQuery);

      const result: {
        data: typeof data;
        edge: ApiAlias.List.Response["edge"];
      } = {
        data,
        edge: {
          users: {},
          article_types: {},
          linked_articles: {},
        },
      };

      const typesArray = await this.articleTypeModel
        .find({
          is_deleted: false,
        })
        .lean()
        .exec();
      result.edge.article_types = typesArray.reduce(
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
