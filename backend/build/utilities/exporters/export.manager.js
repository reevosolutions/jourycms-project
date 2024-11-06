"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const typedi_1 = require("typedi");
const exporter_1 = require("./exporter");
const query_utilities_1 = require("../data/db/query.utilities");
const tracking_id_utilities_1 = require("../system/tracking-id.utilities");
const snapshots_utilities_1 = require("../entities/snapshots.utilities");
const exceptions_1 = require("../exceptions");
const base_service_1 = __importDefault(require("../../common/base.service"));
/**
 * @upgraded 30-10-2023 16:58:15
 */
let ExportManager = class ExportManager extends base_service_1.default {
    constructor(exportItemModel) {
        super();
        this.exportItemModel = exportItemModel;
        this.initialized = false;
    }
    generateExportFileName(doc) {
        return `levelup_export_${doc.entity}_${doc._id}.xlsx`;
    }
    async createExportItemDocument({ entity, requested_item_count, found_item_count, fcm_token, filter_labels, }, authData) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        try {
            const now = new Date();
            this.logger.silly("start items export");
            const tracking_id = await (0, tracking_id_utilities_1.createTrackingId)("export");
            const search_meta = `${tracking_id}`;
            const docObject = {
                app: (_b = (_a = authData.current) === null || _a === void 0 ? void 0 : _a.app) === null || _b === void 0 ? void 0 : _b._id,
                company: (_d = (_c = authData.current) === null || _c === void 0 ? void 0 : _c.company) === null || _d === void 0 ? void 0 : _d._id,
                created_by: (_f = (_e = authData.current) === null || _e === void 0 ? void 0 : _e.user) === null || _f === void 0 ? void 0 : _f._id,
                created_by_original_user: (0, snapshots_utilities_1.getUserSnapshot)((_g = authData.current) === null || _g === void 0 ? void 0 : _g.original_user),
                tracking_id,
                search_meta,
                entity: entity,
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
                    store: (_j = (_h = authData.current) === null || _h === void 0 ? void 0 : _h.store) === null || _j === void 0 ? void 0 : _j._id,
                    office: (_l = (_k = authData.current) === null || _k === void 0 ? void 0 : _k.office) === null || _l === void 0 ? void 0 : _l._id,
                },
                snapshots: {
                    created_by: (0, snapshots_utilities_1.getUserSnapshot)((_m = authData.current) === null || _m === void 0 ? void 0 : _m.user),
                    store: (0, snapshots_utilities_1.getStoreSnapshot)((_o = authData.current) === null || _o === void 0 ? void 0 : _o.store),
                    office: (0, snapshots_utilities_1.getOfficeSnapshot)((_p = authData.current) === null || _p === void 0 ? void 0 : _p.office),
                },
            };
            const doc = await this.exportItemModel.create(docObject);
            if (!doc) {
                throw new Error("Export cannot be created");
            }
            return doc;
        }
        catch (e) {
            this.logError(this.createExportItemDocument, e);
            throw e;
        }
    }
    async generateExcel(doc, items, config) {
        try {
            let exporter;
            if (doc.entity === "parcels") {
                exporter = await (0, exporter_1.exportParcels)(items, Object.assign(Object.assign({}, config), { tLabel: (str) => str, tSystem: (str) => str }));
            }
            else if (doc.entity === "stores") {
                exporter = await (0, exporter_1.exportStores)(items, Object.assign(Object.assign({}, config), { tLabel: (str) => str, tSystem: (str) => str }));
            }
            if (Object.keys(doc.labels || {}).length > 0) {
                exporter.setLabels("filters", doc.labels);
            }
            const fileDir = path_1.default.join(__dirname, "../../../exports");
            if (!fs_1.default.existsSync(fileDir)) {
                this.logger.warn("Directory does not exist", fileDir);
                fs_1.default.mkdirSync(fileDir, { recursive: true });
            }
            const fileName = this.generateExportFileName(doc);
            const filePath = path_1.default.join(fileDir, fileName);
            const filename = path_1.default.join(filePath);
            this.logger.value(filename);
            await exporter.saveToFile(filename);
            return { doc };
        }
        catch (error) {
            this.logger.save.error({
                payload: {
                    message: error.message,
                    error: (0, exceptions_1.errorToObject)(error),
                    doc,
                    stack: error.stack,
                },
                name: this.generateExcel.name.toSnakeCase(),
            });
            throw error;
        }
    }
    async list(params, authData) {
        var _a, _b, _c;
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
            this.logger.debug("FILTER: %o", params.filters);
            // FILTERS
            if (params.search) {
                q = q.where({ $text: { $search: params.search } });
                totalQ = totalQ.where({ $text: { $search: params.search } });
            }
            // _ID
            if (params.filters._id) {
                q = q.where({
                    _id: params.filters._id instanceof Array
                        ? { $in: params.filters._id }
                        : params.filters._id,
                });
                totalQ = totalQ.where({
                    _id: params.filters._id instanceof Array
                        ? { $in: params.filters._id }
                        : params.filters._id,
                });
            }
            // TRACKING_ID
            const tracking_filter_result = (0, query_utilities_1.createStringFilter)(q, totalQ, params.filters.tracking_id, "tracking_id");
            q = tracking_filter_result.q;
            totalQ = tracking_filter_result.totalQ;
            // LAST STATUS
            const last_status_filter_result = (0, query_utilities_1.createStringFilter)(q, totalQ, params.filters.last_status, "last_status");
            q = last_status_filter_result.q;
            totalQ = last_status_filter_result.totalQ;
            // USER
            const user_filter_result = (0, query_utilities_1.createStringFilter)(q, totalQ, params.filters.created_by, "created_by");
            q = user_filter_result.q;
            totalQ = user_filter_result.totalQ;
            // last_status_date
            const last_status_date_filter_result = (0, query_utilities_1.createDateRangeFilter)(q, totalQ, params.filters.last_status_date, "last_status_date");
            q = last_status_date_filter_result.q;
            totalQ = last_status_date_filter_result.totalQ;
            // createdAt
            const createdAt_filter_result = (0, query_utilities_1.createDateRangeFilter)(q, totalQ, params.filters.created_at, "created_at");
            q = createdAt_filter_result.q;
            totalQ = createdAt_filter_result.totalQ;
            // SORT
            const sort_by = params.sort_by || "last_status_date";
            const sort = params.sort || "desc";
            q = q.sort({ [sort_by]: sort === "asc" ? "asc" : "desc" });
            q = q.allowDiskUse(true);
            // COUNT
            const count = params.count
                ? parseInt(`${params.count}`, 10)
                : (_c = (_b = (_a = authData === null || authData === void 0 ? void 0 : authData.current) === null || _a === void 0 ? void 0 : _a.app) === null || _b === void 0 ? void 0 : _b.settings) === null || _c === void 0 ? void 0 : _c.listing.default_count;
            if (count !== -1)
                q = q.limit(count);
            // PAGINATION
            const page = params.page ? parseInt(`${params.page}`, 10) : 1;
            q = q.skip(count * (page - 1));
            //EXECUTE
            const items = await q
                .allowDiskUse(true) // Enable disk usage for large sorting operations
                .exec();
            const total = await totalQ.countDocuments();
            const pages = Math.ceil(total / count);
            this.logger.debug("List export items query: %s %s, %s", total, items.length, JSON.stringify(q.getFilter(), null, 2));
            return { data: items, pagination: { total, pages } };
        }
        catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
    async getById(id) {
        try {
            this.logger.silly("Get export item");
            const doc = await this.exportItemModel.findById(id);
            return doc;
        }
        catch (e) {
            this.logError(this.getById, e);
            throw e;
        }
    }
};
ExportManager = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("exportItemModel")),
    __metadata("design:paramtypes", [typeof (_e = typeof Levelup !== "undefined" && (_a = Levelup.V2) !== void 0 && (_b = _a.Reports) !== void 0 && (_c = _b.Export) !== void 0 && (_d = _c.Model) !== void 0 && _d.ExportItem) === "function" ? _e : Object])
], ExportManager);
exports.default = ExportManager;
//# sourceMappingURL=export.manager.js.map