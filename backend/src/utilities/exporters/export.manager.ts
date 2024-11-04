import fs from "fs";
import path from "path";
import { Inject, Service } from "typedi";
import config from "../../config";
import Exporter, {
  ExportItemsConfig,
  exportParcels,
  exportStores,
} from "./exporter";
import initLogger, { LoggerService } from "../logging";
import {
  createDateRangeFilter,
  createStringFilter,
} from "../data/db/query.utilities";
import { createTrackingId } from "../system/tracking-id.utilities";
import {
  getOfficeSnapshot,
  getStoreSnapshot,
  getUserSnapshot,
} from "../entities/snapshots.utilities";
import { errorToObject } from "../exceptions";
import BaseService from "../../services/base.service";
import { roundNumberDecimals } from "../numbers";

type EntityAlias = Levelup.V2.Shared.Export.Entity.ExportItem;

/**
 * @upgraded 30-10-2023 16:58:15
 */
@Service()
export default class ExportManager extends BaseService {
  private initialized: boolean = false;

  public constructor(
    @Inject("exportItemModel")
    private exportItemModel: Levelup.V2.Reports.Export.Model.ExportItem
  ) {
    super();
  }

  public generateExportFileName(
    doc: Levelup.V2.Reports.Export.Model.ExportItemDocument
  ): string {
    return `levelup_export_${doc.entity}_${doc._id}.xlsx`;
  }

  public async createExportItemDocument(
    {
      entity,
      requested_item_count,
      found_item_count,
      fcm_token,
      filter_labels,
    }: {
      entity: Levelup.V2.Shared.Export.Entity.TExportItemEntity;
      requested_item_count: number;
      found_item_count?: number;
      fcm_token: string | null;
      filter_labels: {
        [f: string]: {
          label: string;
          value: Levelup.V2.UI.FilterMenu.LabelType;
        };
      };
    },
    authData: Levelup.V2.Security.AuthData
  ) {
    try {
      const now = new Date();
      this.logger.silly("start items export");

      const tracking_id = await createTrackingId("export");
      const search_meta = `${tracking_id}`;

      const docObject: Omit<EntityAlias, "_id"> = {
        app: authData.current?.app?._id,
        company: authData.current?.company?._id,
        created_by: authData.current?.user?._id,
        created_by_original_user: getUserSnapshot(
          authData.current?.original_user
        ),
        tracking_id,
        search_meta,
        entity: entity as any,
        progress: 0,
        last_status_date: now,
        last_status: "initialized",
        last_status_reason: "",
        status_history: [],
        requested_item_count: requested_item_count || 0,
        found_item_count: found_item_count || 0,
        fcm_token,
        labels: filter_labels,
        attributes: {
          store: authData.current?.store?._id,
          office: authData.current?.office?._id,
        },
        snapshots: {
          created_by: getUserSnapshot(authData.current?.user),
          store: getStoreSnapshot(authData.current?.store),
          office: getOfficeSnapshot(authData.current?.office),
        },
      };
      const doc = await this.exportItemModel.create(docObject);
      if (!doc) {
        throw new Error("Export cannot be created");
      }
      return doc;
    } catch (e) {
      this.logError(this.createExportItemDocument, e);
      throw e;
    }
  }

  public async generateExcel<D extends { [Key: string]: any } = any>(
    doc: Levelup.V2.Reports.Export.Model.ExportItemDocument,
    items: D[],
    config?: ExportItemsConfig
  ): Promise<{
    doc: Levelup.V2.Reports.Export.Model.ExportItemDocument;
  }> {
    try {
      let exporter: Exporter;
      if (doc.entity === "parcels") {
        exporter = await exportParcels(items, {
          ...config,
          tLabel: (str) => str,
          tSystem: (str) => str,
        });
      } else if (doc.entity === "stores") {
        exporter = await exportStores(items, {
          ...config,
          tLabel: (str) => str,
          tSystem: (str) => str,
        });
      }

      if (Object.keys(doc.labels || {}).length > 0) {
        exporter.setLabels("filters", doc.labels);
      }

      const fileDir = path.join(__dirname, "../../../exports");
      if (!fs.existsSync(fileDir)) {
        this.logger.warn("Directory does not exist", fileDir);
        fs.mkdirSync(fileDir, { recursive: true });
      }
      const fileName = this.generateExportFileName(doc);
      const filePath = path.join(fileDir, fileName);

      const filename = path.join(filePath);
      this.logger.value(filename);

      await exporter.saveToFile(filename);
      return { doc };
    } catch (error) {
      this.logger.save.error({
        payload: {
          message: error.message,
          error: errorToObject(error),
          doc,
          stack: error.stack,
        },
        name: this.generateExcel.name.toSnakeCase(),
      });
      throw error;
    }
  }

  public async list(
    params: Levelup.V2.Shared.Export.Api.ExportItems.List.Request,
    authData: Levelup.V2.Security.AuthData
  ): Promise<Levelup.V2.Shared.Export.Api.ExportItems.List.Response> {
    try {
      this.logger.warn("List parcels params %o", params);

      let q = this.exportItemModel.find();
      let totalQ = this.exportItemModel.where();

      // fixing filters object
      if (typeof params.filters === "string")
        params.filters = JSON.parse(params.filters);
      if (!params.filters)
        params.filters = {
          entity: "parcels",
        };

      type DocumentProperties =
        Levelup.V2.Utils.DocumentProperties<Levelup.V2.Shared.Export.Entity.ExportItem>;

      this.logger.debug("FILTER: %o", params.filters);

      // FILTERS
      if (params.search) {
        q = q.where({ $text: { $search: params.search } });
        totalQ = totalQ.where({ $text: { $search: params.search } });
      }

      // _ID
      if (params.filters._id) {
        q = q.where({
          _id:
            params.filters._id instanceof Array
              ? { $in: params.filters._id }
              : params.filters._id,
        });
        totalQ = totalQ.where({
          _id:
            params.filters._id instanceof Array
              ? { $in: params.filters._id }
              : (params.filters._id as string),
        });
      }

      // TRACKING_ID
      const tracking_filter_result = createStringFilter<
        DocumentProperties,
        typeof q,
        typeof totalQ
      >(q, totalQ, params.filters.tracking_id, "tracking_id");
      q = tracking_filter_result.q;
      totalQ = tracking_filter_result.totalQ;

      // LAST STATUS
      const last_status_filter_result = createStringFilter<
        DocumentProperties,
        typeof q,
        typeof totalQ
      >(q, totalQ, params.filters.last_status, "last_status");
      q = last_status_filter_result.q;
      totalQ = last_status_filter_result.totalQ;

      // USER
      const user_filter_result = createStringFilter<
        DocumentProperties,
        typeof q,
        typeof totalQ
      >(q, totalQ, params.filters.created_by, "created_by");
      q = user_filter_result.q;
      totalQ = user_filter_result.totalQ;

      // last_status_date
      const last_status_date_filter_result = createDateRangeFilter<
        DocumentProperties,
        typeof q,
        typeof totalQ
      >(q, totalQ, params.filters.last_status_date, "last_status_date");
      q = last_status_date_filter_result.q;
      totalQ = last_status_date_filter_result.totalQ;

      // createdAt
      const createdAt_filter_result = createDateRangeFilter<
        DocumentProperties,
        typeof q,
        typeof totalQ
      >(q, totalQ, params.filters.created_at, "created_at");
      q = createdAt_filter_result.q;
      totalQ = createdAt_filter_result.totalQ;

      // SORT
      const sort_by = params.sort_by || "last_status_date";
      const sort = params.sort || "desc";
      q = q.sort({ [sort_by]: sort === "asc" ? "asc" : "desc" });
      q = (q as any).allowDiskUse(true);

      // COUNT
      const count = params.count
        ? parseInt(`${params.count}`, 10)
        : authData?.current?.app?.settings?.listing.default_count;
      if (count !== -1) q = q.limit(count);
      // PAGINATION
      const page = params.page ? parseInt(`${params.page}`, 10) : 1;
      q = q.skip(count * (page - 1));

      //EXECUTE
      const items = await q
        .allowDiskUse(true) // Enable disk usage for large sorting operations
        .exec();
      const total = await totalQ.countDocuments();
      const pages = Math.ceil(total / count);

      this.logger.debug(
        "List export items query: %s %s, %s",
        total,
        items.length,
        JSON.stringify(q.getFilter(), null, 2)
      );

      return { data: items, pagination: { total, pages } };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async getById(
    id: string
  ): Promise<Levelup.V2.Reports.Export.Model.ExportItemDocument> {
    try {
      this.logger.silly("Get export item");
      const doc = await this.exportItemModel.findById(id);
      return doc;
    } catch (e) {
      this.logError(this.getById, e);
      throw e;
    }
  }
}
