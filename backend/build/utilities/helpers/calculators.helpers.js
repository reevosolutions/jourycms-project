"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateParcelStoreNetPayable = exports.calculateParcelNetToRecoverFromCustomer = exports.calculateDeliveryFees = exports.calculateOverWeight = exports.calculateClassicParcelReturnFees = void 0;
const typedi_1 = __importDefault(require("typedi"));
const logging_1 = __importStar(require("../logging"));
const utils_helpers_1 = require("./utils.helpers");
const settings_manager_1 = __importDefault(require("../../managers/settings-manager"));
const parcels_constants_1 = require("../../constants/parcels.constants");
const logger = (0, logging_1.default)(logging_1.LoggerContext.UTILITY, "calculators");
const calculateClassicParcelReturnFees = ({ delivery_fees, delivery_fees_payment_mode, }) => {
    const result = {
        delivery_fees: 0,
        delivery_fees_paid: true,
        return_fees: 0,
        amount_to_collect: 0,
    };
    result.delivery_fees = delivery_fees;
    result.delivery_fees_paid =
        delivery_fees_payment_mode === "prepaid" ? true : false;
    result.return_fees = result.delivery_fees * 0.5;
    result.return_fees = result.delivery_fees * 0; // update by Yassine
    result.amount_to_collect =
        result.return_fees + (result.delivery_fees_paid ? 0 : result.delivery_fees);
    return result;
};
exports.calculateClassicParcelReturnFees = calculateClassicParcelReturnFees;
const calculateOverWeight = (params) => {
    params = (0, utils_helpers_1.defaults)(params, {
        volume: { width: 0, height: 0, length: 0 },
        weight: 0,
        maxFreeWeight: 5,
        zone: 0,
        unitPrice: 50,
    });
    const volumeWeight = params.volume.width * params.volume.height * params.volume.length * 0.0002;
    const overweight = params.weight > volumeWeight
        ? params.weight - params.maxFreeWeight
        : volumeWeight - params.maxFreeWeight;
    let result = overweight > 0 ? overweight * params.unitPrice : 0;
    if (params.zone >= 4)
        result = result * 2;
    return result;
};
exports.calculateOverWeight = calculateOverWeight;
const calculateDeliveryFees = (params) => {
    try {
        const { accountSettings, starting_state_code, destination_state_code, destination_city_code, shipment_to, shipment_type, account_type, } = params;
        const settingsManager = typedi_1.default.get(settings_manager_1.default);
        const { state_zone, city_zone } = settingsManager.getDeliveryZones({
            accountSettings,
            starting_state_code,
            destination_state_code,
            destination_city_code,
        });
        switch (account_type) {
            case "classic":
                return (((state_zone === null || state_zone === void 0 ? void 0 : state_zone.pricing.classic[shipment_to]) || 0) +
                    ((city_zone === null || city_zone === void 0 ? void 0 : city_zone.pricing.classic[shipment_to]) || 0));
            case "ecommerce_enterprise":
                return (((state_zone === null || state_zone === void 0 ? void 0 : state_zone.pricing.enterprise[shipment_type][shipment_to]) || 0) +
                    ((city_zone === null || city_zone === void 0 ? void 0 : city_zone.pricing.enterprise[shipment_type][shipment_to]) || 0));
            case "ecommerce_particular":
                return (((state_zone === null || state_zone === void 0 ? void 0 : state_zone.pricing.particular[shipment_type][shipment_to]) || 0) +
                    ((city_zone === null || city_zone === void 0 ? void 0 : city_zone.pricing.particular[shipment_type][shipment_to]) || 0));
            case "b2b":
                return (((state_zone === null || state_zone === void 0 ? void 0 : state_zone.pricing.b2b[shipment_to]) || 0) +
                    ((city_zone === null || city_zone === void 0 ? void 0 : city_zone.pricing.b2b[shipment_to]) || 0));
            case "internal":
                return 0;
            default:
                break;
        }
    }
    catch (error) {
        logger.error("calculateDeliveryFees", error.message, params, error);
        return undefined;
    }
};
exports.calculateDeliveryFees = calculateDeliveryFees;
const calculateParcelNetToRecoverFromCustomer = (parcel) => {
    var _a, _b, _c, _d, _e, _f;
    if (parcel.type === "internal")
        return 0;
    if (parcel.sub_type === "acknowledgement")
        return 0;
    if (parcel.sub_type === "exchange")
        return 0;
    const is_delivery_fees_recovered_from_customer = ((_a = parcel.fees) === null || _a === void 0 ? void 0 : _a.delivery_fees_payment_mode) !== "prepaid" &&
        !((_b = parcel.fees) === null || _b === void 0 ? void 0 : _b.is_free_shipping);
    const delivery_fees_to_recover_from_customer = is_delivery_fees_recovered_from_customer
        ? ((_c = parcel.fees) === null || _c === void 0 ? void 0 : _c.delivery_fees) || 0
        : 0;
    const tax_overweight_to_recover_from_customer = ((_d = parcel.fees) === null || _d === void 0 ? void 0 : _d.overweight_fees_payment_mode) === "by_customer"
        ? (_e = parcel.fees) === null || _e === void 0 ? void 0 : _e.overweight_fees
        : 0;
    const net_to_recover = (parcel.type === "classic" ? 0 : ((_f = parcel.fees) === null || _f === void 0 ? void 0 : _f.price) || 0) +
        delivery_fees_to_recover_from_customer +
        (tax_overweight_to_recover_from_customer || 0);
    return net_to_recover;
};
exports.calculateParcelNetToRecoverFromCustomer = calculateParcelNetToRecoverFromCustomer;
/**
 * Update : Added
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 27-06-2024 13:22:32
 */
const calculateParcelStoreNetPayable = (parcel) => {
    var _a, _b, _c, _d, _e, _f;
    if (parcel.type === "internal")
        return 0;
    if (parcel.type === "classic")
        return 0;
    if (parcel.sub_type === "acknowledgement")
        return 0;
    if (parcel.sub_type === "exchange")
        return 0;
    let store_net_payable = 0;
    const tax_overweight_to_recover_from_seller = ((_a = parcel.fees) === null || _a === void 0 ? void 0 : _a.overweight_fees_payment_mode) === "by_seller"
        ? (_b = parcel.fees) === null || _b === void 0 ? void 0 : _b.overweight_fees
        : 0;
    if (parcel.last_status === "delivered") {
        /* -------------------------------- DELIVERED ------------------------------- */
        store_net_payable =
            (((_c = parcel.fees) === null || _c === void 0 ? void 0 : _c.price) || 0) -
                (((_d = parcel.fees) === null || _d === void 0 ? void 0 : _d.tax_assurance) || 0) -
                tax_overweight_to_recover_from_seller;
        if (parcel.fees.is_free_shipping &&
            parcel.fees.delivery_fees_payment_mode !== "prepaid") {
            store_net_payable = store_net_payable - ((_e = parcel.fees) === null || _e === void 0 ? void 0 : _e.delivery_fees);
        }
    }
    else if (parcels_constants_1.PARCEL_STATUSES_GROUPED.returned.includes(parcel.last_status)) {
        /* -------------------------------- RETURNED -------------------------------- */
        store_net_payable = 0 - ((_f = parcel.fees) === null || _f === void 0 ? void 0 : _f.return_fees);
    }
    else {
        /* ------------------------------- PROCESSING ------------------------------- */
        store_net_payable = 0;
    }
    /**
     * Return
     */
    return store_net_payable;
};
exports.calculateParcelStoreNetPayable = calculateParcelStoreNetPayable;
//# sourceMappingURL=calculators.helpers.js.map