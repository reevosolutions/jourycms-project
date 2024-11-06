"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProductionDev = exports.isDevelopmentDev = exports.getItemIdsFromOldAndNewData = exports.defaults = void 0;
exports.deepMergeUnlessNull = deepMergeUnlessNull;
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26-03-2024 01:17:09
 */
const deepmerge_1 = __importDefault(require("deepmerge"));
/**
 * Merges two objects, with properties from the second object taking precedence over the first object.
 * If a property is found on both objects, the property from the first object is returned.
 * @param x - The first object to merge.
 * @param y - The second object to merge.
 * @param options - The options for merging.
 * @returns The merged object.
 */
const defaults = (x, y, options) => {
    return (0, deepmerge_1.default)(y, x || {}, {
        arrayMerge: (target, source) => source,
    });
};
exports.defaults = defaults;
/**
 * Gets the item IDs from the new and old data.
 * @param new_value - The new value.
 * @param old_value - The old value.
 * @returns The item IDs.
 */
const getItemIdsFromOldAndNewData = (new_value, old_value) => {
    if (Array.isArray(new_value) || Array.isArray(old_value)) {
        if (Array.isArray(new_value))
            return new_value;
        if (old_value)
            return old_value;
        return [];
    }
    if (typeof new_value !== "undefined")
        return new_value;
    if (typeof old_value !== "undefined")
        return old_value;
    return null;
};
exports.getItemIdsFromOldAndNewData = getItemIdsFromOldAndNewData;
/**
 * Checks if the current environment is development.
 * @returns A boolean indicating if the current environment is development.
 */
const isDevelopmentDev = () => process.env.NODE_ENV !== "production";
exports.isDevelopmentDev = isDevelopmentDev;
/**
 * Checks if the current environment is production.
 * @returns A boolean indicating if the current environment is production.
 */
const isProductionDev = () => process.env.NODE_ENV === "production";
exports.isProductionDev = isProductionDev;
/**
 * Merges two objects deeply, excluding properties with null or undefined values.
 * @param x - The first object to merge.
 * @param y - The second object to merge.
 * @returns The merged object.
 */
function deepMergeUnlessNull(x, y) {
    const result = Object.assign({}, x);
    for (const key in y) {
        if (Object.prototype.hasOwnProperty.call(y, key)) {
            if (y[key] === null || y[key] === undefined) {
                continue;
            }
            else if (typeof y[key] === "object" &&
                y[key] !== null &&
                !Array.isArray(y[key])) {
                if (typeof result[key] === "object" &&
                    result[key] !== null) {
                    result[key] = deepMergeUnlessNull(result[key], y[key]);
                }
                else {
                    result[key] = deepMergeUnlessNull({}, y[key]);
                }
            }
            else {
                result[key] = y[key];
            }
        }
    }
    return result;
}
//# sourceMappingURL=utils.helpers.js.map