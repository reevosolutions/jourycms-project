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
exports.ObjectUpdatedPropertyObject = exports.ObjectUpdatedProperties = exports.unflattenObjectArray = exports.extractPartialObject = exports.flattenObject = exports.flattenObjectKeys = exports.transformObjectToString = void 0;
exports.deletePropertyRecursively = deletePropertyRecursively;
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 24-02-2024 20:47:22
 */
const moment_1 = __importDefault(require("moment"));
const update_calculator_class_1 = __importStar(require("./update-calculator.class"));
exports.ObjectUpdatedProperties = update_calculator_class_1.default;
Object.defineProperty(exports, "ObjectUpdatedPropertyObject", { enumerable: true, get: function () { return update_calculator_class_1.ObjectUpdatedPropertyObject; } });
const lodash_1 = require("lodash");
const transformObjectToString = (obj) => {
    if (obj === undefined) {
        return 'undefined';
    }
    if (obj === null) {
        return 'null';
    }
    else if (typeof obj === 'string') {
        return obj;
    }
    else if (Array.isArray(obj)) {
        return obj.map(v => (0, exports.transformObjectToString)(v)).join(', ');
    }
    else if (typeof obj === 'object') {
        if (Object.prototype.hasOwnProperty.call(obj, 'start') && Object.prototype.hasOwnProperty.call(obj, 'end')) {
            return `${(0, moment_1.default)(obj.start).format('DD-MM-YYYY')} - ${(0, moment_1.default)(obj.end).format('DD-MM-YYYY')}`;
        }
        else {
            return (0, exports.transformObjectToString)(Object.keys(obj).map(k => `${k}: ${(0, exports.transformObjectToString)(obj[k])}`));
        }
    }
    return obj;
};
exports.transformObjectToString = transformObjectToString;
/**
 * @since 11-12-2023 15:41:03
 */
const flattenObjectKeys = (obj, prefix = '') => Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k]) {
        if (obj[k] instanceof Array)
            for (let idx = 0; idx < obj[k].length; idx++) {
                if (typeof obj[k][idx] === 'object' && obj[k][idx])
                    acc.push(...(0, exports.flattenObjectKeys)(obj[k][idx], pre + k));
            }
        else
            acc.push(...(0, exports.flattenObjectKeys)(obj[k], pre + k));
    }
    else {
        if (!(0, lodash_1.isNumber)(k))
            acc.push(pre + k);
    }
    return acc;
}, []);
exports.flattenObjectKeys = flattenObjectKeys;
/**
 * @since 11-12-2023 15:41:10
 */
const flattenObject = (obj, prefix = '') => Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object' && obj[k])
        Object.assign(acc, (0, exports.flattenObject)(obj[k], pre + k));
    else
        acc[pre + k] = obj[k];
    return acc;
}, {});
exports.flattenObject = flattenObject;
const extractPartialObject = (obj, properties) => {
    const subObject = {};
    properties.forEach(property => {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            subObject[property] = obj[property];
        }
    });
    return subObject;
};
exports.extractPartialObject = extractPartialObject;
function deletePropertyRecursively(obj, property) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (key === property) {
                delete obj[key];
            }
            else if (typeof obj[key] === "object" && obj[key] !== null) {
                deletePropertyRecursively(obj[key], property);
            }
        }
    }
}
/**
 * Update : added
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 18-07-2024 21:24:07
 */
const unflattenObjectArray = (items) => {
    const itemMap = new Map();
    // Initialize each item with a children array and map them by _id
    items.forEach((item) => {
        item.children = [];
        itemMap.set(item._id, Object.assign(Object.assign({}, item), { children: [] }));
    });
    // Link children to their parent, and find root items
    const roots = [];
    items.forEach((item) => {
        if (item.parent) {
            const parentItem = itemMap.get(item.parent);
            parentItem === null || parentItem === void 0 ? void 0 : parentItem.children.push(itemMap.get(item._id));
        }
        else {
            roots.push(itemMap.get(item._id));
        }
    });
    return roots;
};
exports.unflattenObjectArray = unflattenObjectArray;
//# sourceMappingURL=index.js.map