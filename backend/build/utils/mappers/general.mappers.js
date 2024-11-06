"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDocumentToExposed = void 0;
exports.hasLocationProperty = hasLocationProperty;
exports.transformLocationArrayToGeoJSON = transformLocationArrayToGeoJSON;
exports.transformLocationGeoJSONToArray = transformLocationGeoJSONToArray;
const utils_helpers_1 = require("../../utilities/helpers/utils.helpers");
const logging_1 = __importDefault(require("../../utilities/logging"));
const logger = (0, logging_1.default)("MAPPER", "general");
function hasLocationProperty(doc) {
    return (doc &&
        doc.location &&
        doc.location.type === "Point" &&
        Array.isArray(doc.location.coordinates) &&
        doc.location.coordinates.length === 2);
}
function transformLocationArrayToGeoJSON(coordinates) {
    return {
        type: "Point",
        coordinates,
    };
}
function transformLocationGeoJSONToArray(location) {
    return location instanceof Array ? location : location.coordinates;
}
const mapDocumentToExposed = (doc, opt = {
    omitTags: false,
    omitAuthMeta: false,
    omitUpdates: true,
}) => {
    opt = (0, utils_helpers_1.defaults)(opt, {
        omitTags: false,
        omitAuthMeta: false,
        omitUpdates: true,
    });
    // logger.debug('mapDocumentToExposed.opt', opt);
    const result = Object.assign({}, (doc["toObject"] ? doc.toObject() : doc));
    Reflect.deleteProperty(result, "search_meta_fuzzy");
    Reflect.deleteProperty(result, "__v");
    if (opt.omitAuthMeta)
        Reflect.deleteProperty(result, "auth_meta");
    if (opt.omitTags)
        Reflect.deleteProperty(result, "tags");
    if (opt.omitUpdates)
        Reflect.deleteProperty(result, "updates");
    Object.keys(result).forEach((key) => {
        if ((key.includes("password") || key.includes("salt")) &&
            typeof result[key] === "string") {
            Reflect.deleteProperty(result, key);
        }
    });
    if (hasLocationProperty(doc)) {
        result.location = doc.location.coordinates;
    }
    return result;
};
exports.mapDocumentToExposed = mapDocumentToExposed;
exports.default = {
    mapDocumentToExposed: exports.mapDocumentToExposed,
};
//# sourceMappingURL=general.mappers.js.map