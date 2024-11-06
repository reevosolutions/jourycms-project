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
exports.createTrackingId = exports.isTrackingId = void 0;
const config_1 = __importDefault(require("../../config"));
const tracking_id_constants_1 = require("../../constants/tracking_id.constants");
const logging_1 = __importDefault(require("../logging"));
const suffixLength = config_1.default.settings.tracking.suffixLength;
const logger = (0, logging_1.default)("UTILITY", "TRACKING_ID");
async function getNanoid() {
    const { customAlphabet } = await Promise.resolve().then(() => __importStar(require('nanoid')));
    const alphabet = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nanoid = customAlphabet(alphabet, suffixLength);
    const oneLetterNanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 1);
    const otherCharactersNanoid = customAlphabet(alphabet, suffixLength - 1);
    return { nanoid, oneLetterNanoid, otherCharactersNanoid };
}
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 27-02-2024 21:13:56
 */
const createTrackingId = async (entity, model = null, custom_prefix = null, parent_tracking_id = null) => {
    const { nanoid, oneLetterNanoid, otherCharactersNanoid } = await getNanoid();
    let idUsed = true;
    let id = "", itemsFound;
    while (idUsed) {
        const tracking_part = (0, exports.isTrackingId)(parent_tracking_id)
            ? parent_tracking_id.split("-")[1]
            : null;
        id = `${custom_prefix ? custom_prefix : tracking_id_constants_1.ITEM_SHORTCUTS[entity]}-${tracking_part
            ? tracking_part
            : `${oneLetterNanoid()}${otherCharactersNanoid()}`}`;
        logger.value("Trying to use tracking_id with params", {
            entity,
            id,
            custom_prefix,
            parent_tracking_id,
        });
        switch (entity) {
            default:
                itemsFound = model
                    ? await model.countDocuments({ tracking_id: id })
                    : false;
                break;
        }
        if (!itemsFound) {
            idUsed = false;
        }
    }
    return id;
};
exports.createTrackingId = createTrackingId;
const isTrackingId = (str) => {
    if (!(str === null || str === void 0 ? void 0 : str.length))
        return false;
    str = str.trim().toUpperCase();
    if (str.match(/^([A-Z]{3}-[A-Z0-9]{6,10})$/g))
        return str;
    if (str.startsWith("INB-"))
        return str;
    if (str.startsWith("OTB-"))
        return str;
    return false;
};
exports.isTrackingId = isTrackingId;
//# sourceMappingURL=tracking-id.utilities.js.map