"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../logging"));
const exporter_1 = __importDefault(require("./exporter"));
const logger = (0, logging_1.default)('UTILITY', 'export-stores');
/**
 *
 * @param {Partial<Levelup.V2.Accounts.Entity.Store>} items
 * @description The used store properties are:
 * - '_id'
 * - 'tracking_id'
 * - 'company'
 * - 'createdAt'
 * - 'name'
 * - 'support_phones'
 * - 'address'
 * - 'assignments.seller_snapshots'
 * - 'settings.type'
 * - 'settings.is_assured'
 * - 'settings.dropping_state_shipping_fees_default'
 * - 'settings.services'
 * - 'deleted'
 * @param {ExportItemsConfig} config
 */
const exportStores = async (items, { tLabel, tSystem, companies_map }) => {
    try {
        const exporter = new exporter_1.default();
        exporter.setWorksheet(tLabel("stores"), {
            // create a sheet with red tab colour
            properties: {
                tabColor: {
                    argb: "FFC0000",
                },
            },
            // create a sheet with the first row and column frozen
            views: [{ state: "frozen", xSplit: 1, ySplit: 1 }],
            headerFooter: {
                differentFirst: true,
                firstHeader: "Test export",
                oddFooter: "Page &P of &N",
                evenFooter: "Page &P of &N",
            },
        });
        exporter.addData({
            tracking_id: {
                key: "tracking_id",
                header: tLabel("Tracking Id") || "",
                width: 20,
                style: {
                    font: { size: 12, bold: true },
                    fill: {
                        type: "pattern",
                        pattern: "lightGray",
                        bgColor: { argb: "FFEEEEEE" },
                        fgColor: { argb: "FFDDDDDD" },
                    },
                },
            },
            name: {
                key: 'name',
                header: tLabel("Name") || "",
                width: 40,
            },
            company: {
                key: 'company',
                header: tLabel("Company") || "",
                width: 40,
            },
            created_at: {
                key: "created_at",
                header: tLabel("Created at") || "",
                width: 30,
            },
            support_phones: {
                key: "support_phones",
                header: tLabel("Support phones") || "",
                width: 30,
            },
            seller_name: {
                key: "seller_name",
                header: tLabel("Owner name") || "",
                width: 30,
            },
            seller_phones: {
                key: "seller_phones",
                header: tLabel("Owner phones") || "",
                width: 30,
            },
            state: {
                key: "state",
                header: tLabel("State") || "",
                width: 20,
            },
            city: {
                key: "city",
                header: tLabel("City") || "",
                width: 20,
            },
            street_address: {
                key: "street_address",
                header: tLabel("Address") || "",
                width: 50,
            },
            store_type: {
                key: "store_type",
                header: tLabel("Type") || "",
                width: 20,
            },
            service_delivery_enabled: {
                key: "service_delivery_enabled",
                header: tLabel("Delivery active") || "",
                width: 20,
            },
            is_dropping_state_shipping_fees_custom: {
                key: "is_dropping_state_shipping_fees_custom",
                header: tLabel("Has custom delivery pricing") || "",
                width: 20,
            },
            service_callcenter_enabled: {
                key: "service_callcenter_enabled",
                header: tLabel("Confirmation active") || "",
                width: 20,
            },
            is_service_callcenter_fees_custom: {
                key: "is_service_callcenter_fees_custom",
                header: tLabel("Has custom confirmation pricing") || "",
                width: 20,
            },
            service_warehouse_enabled: {
                key: "service_warehouse_enabled",
                header: tLabel("Warehousing active") || "",
                width: 20,
            },
            is_service_warehouse_fees_custom: {
                key: "is_service_warehouse_fees_custom",
                header: tLabel("Has custom warehousing pricing") || "",
                width: 20,
            },
            is_deleted: {
                key: "is_deleted",
                header: tLabel("Deleted") || "",
                width: 20,
            },
        }, items, (store) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
            return {
                tracking_id: store.tracking_id,
                name: store.name,
                company: companies_map && companies_map[store.company] ? companies_map[store.company].name : store.company,
                created_at: new Date(`${store.created_at}`),
                support_phones: ((_a = store.support_phones) === null || _a === void 0 ? void 0 : _a.join("; ")) || "",
                state: store.address.state_name,
                city: store.address.city_name,
                street_address: store.address.street_address,
                seller_name: ((_b = store.snapshots) === null || _b === void 0 ? void 0 : _b.owner) ? `${(_c = store.snapshots) === null || _c === void 0 ? void 0 : _c.owner.family_name} ${(_d = store.snapshots) === null || _d === void 0 ? void 0 : _d.owner.first_name}` : "",
                seller_phones: ((_f = (_e = store.snapshots) === null || _e === void 0 ? void 0 : _e.owner) === null || _f === void 0 ? void 0 : _f.phones.join("; ")) || "",
                store_type: tSystem(store.store_type),
                service_delivery_enabled: ((_j = (_h = (_g = store.settings) === null || _g === void 0 ? void 0 : _g.services) === null || _h === void 0 ? void 0 : _h.delivery) === null || _j === void 0 ? void 0 : _j.is_enabled) ? tLabel("YES") : tLabel("NO"),
                is_dropping_state_shipping_fees_custom: ((_m = (_l = (_k = store.settings) === null || _k === void 0 ? void 0 : _k.services) === null || _l === void 0 ? void 0 : _l.delivery.settings) === null || _m === void 0 ? void 0 : _m.has_custom_pricing) ? tLabel("YES") : tLabel("NO"),
                service_callcenter_enabled: ((_q = (_p = (_o = store.settings) === null || _o === void 0 ? void 0 : _o.services) === null || _p === void 0 ? void 0 : _p.callcenter) === null || _q === void 0 ? void 0 : _q.is_enabled) ? tLabel("YES") : tLabel("NO"),
                is_service_callcenter_fees_custom: ((_t = (_s = (_r = store.settings) === null || _r === void 0 ? void 0 : _r.services) === null || _s === void 0 ? void 0 : _s.callcenter) === null || _t === void 0 ? void 0 : _t.is_enabled) && ((_x = (_w = (_v = (_u = store.settings) === null || _u === void 0 ? void 0 : _u.services) === null || _v === void 0 ? void 0 : _v.callcenter) === null || _w === void 0 ? void 0 : _w.settings) === null || _x === void 0 ? void 0 : _x.has_custom_pricing) ? tLabel("YES") : tLabel("NO"),
                service_warehouse_enabled: ((_0 = (_z = (_y = store.settings) === null || _y === void 0 ? void 0 : _y.services) === null || _z === void 0 ? void 0 : _z.warehouse) === null || _0 === void 0 ? void 0 : _0.is_enabled) ? tLabel("YES") : tLabel("NO"),
                is_service_warehouse_fees_custom: ((_3 = (_2 = (_1 = store.settings) === null || _1 === void 0 ? void 0 : _1.services) === null || _2 === void 0 ? void 0 : _2.warehouse) === null || _3 === void 0 ? void 0 : _3.is_enabled) && ((_7 = (_6 = (_5 = (_4 = store.settings) === null || _4 === void 0 ? void 0 : _4.services) === null || _5 === void 0 ? void 0 : _5.warehouse) === null || _6 === void 0 ? void 0 : _6.settings) === null || _7 === void 0 ? void 0 : _7.has_custom_pricing) ? tLabel("YES") : tLabel("NO"),
                is_deleted: store.is_deleted ? tLabel("YES") : tLabel("NO"),
            };
        });
        return exporter;
    }
    catch (error) {
        logger.error('export', error);
        throw error;
    }
};
exports.default = exportStores;
//# sourceMappingURL=export-stores.js.map