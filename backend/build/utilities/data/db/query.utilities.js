"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAggregateDateRangeFilter = exports.createAggregateStringFilter = exports.createDateRangeFilter = exports.createBooleanFilter = exports._createStringFilter = exports.createStringFilter = void 0;
const mongodb_1 = require("mongodb");
const createStringFilter = (q, totalQ, value, field, omit, operator = "or") => {
    if (mongodb_1.ObjectId.isValid(value)) {
        value = value.toString();
    }
    if (value && typeof value === "object" && "0" in value && "1" in value) {
        value = Object.values(value);
    }
    if ((value && typeof value !== "object") ||
        (value instanceof Array && value.length) ||
        value === null) {
        if (Array.isArray(field)) {
            q = q.where({
                [omit ? "$and" : "$or"]: field.map((_field) => ({
                    [_field]: value instanceof Array
                        ? { [omit ? "$nin" : "$in"]: value }
                        : omit
                            ? { $ne: value }
                            : value,
                })),
            });
            totalQ = totalQ
                ? totalQ.where({
                    [omit || operator === "and" ? "$and" : "$or"]: field.map((_field) => ({
                        [_field]: value instanceof Array
                            ? { [omit ? "$nin" : "$in"]: value }
                            : omit
                                ? { $ne: value }
                                : value,
                    })),
                })
                : totalQ;
        }
        else {
            q = q.where({
                [field]: value instanceof Array
                    ? { [omit ? "$nin" : "$in"]: value }
                    : omit
                        ? { $ne: value }
                        : value,
            });
            totalQ = totalQ
                ? totalQ.where({
                    [field]: value instanceof Array
                        ? { [omit ? "$nin" : "$in"]: value }
                        : omit
                            ? { $ne: value }
                            : value,
                })
                : totalQ;
        }
    }
    return { q, totalQ };
};
exports.createStringFilter = createStringFilter;
/**
 * @deprecated now using multi fileds with AND OR operators
 */
const _createStringFilter = (q, totalQ, value, field, omit) => {
    if (mongodb_1.ObjectId.isValid(value)) {
        value = value.toString();
    }
    if (value && typeof value === "object" && "0" in value && "1" in value) {
        value = Object.values(value);
    }
    if ((value && typeof value !== "object") ||
        (value instanceof Array && value.length) ||
        value === null) {
        q = q.where({
            [field]: value instanceof Array
                ? { [omit ? "$nin" : "$in"]: value }
                : omit
                    ? { $ne: value }
                    : value,
        });
        totalQ = totalQ
            ? totalQ.where({
                [field]: value instanceof Array
                    ? { [omit ? "$nin" : "$in"]: value }
                    : omit
                        ? { $ne: value }
                        : value,
            })
            : totalQ;
    }
    return { q, totalQ };
};
exports._createStringFilter = _createStringFilter;
const createBooleanFilter = (q, totalQ, value, field) => {
    if (value === "true" || value === "1" || value === 1 || value === true)
        value = true;
    else if (value === "false" || value === "0" || value === 0 || value === false)
        value = false;
    else
        value = undefined;
    if (value !== undefined) {
        q = q.where({ [field]: value });
        totalQ = totalQ
            ? totalQ.where({ [field]: value })
            : totalQ;
    }
    return { q, totalQ };
};
exports.createBooleanFilter = createBooleanFilter;
const createDateRangeFilter = (q, totalQ, value, field) => {
    if (value) {
        if (typeof value === "object" &&
            value.start) {
            if (value.end) {
                q = q.where({
                    [field]: {
                        $gte: new Date(value.start),
                        $lte: new Date(value.end),
                    },
                });
                totalQ = totalQ
                    ? totalQ.where({
                        [field]: {
                            $gte: new Date(value.start),
                            $lte: new Date(value.end),
                        },
                    })
                    : totalQ;
            }
            else {
                q = q.where({
                    [field]: { $gte: new Date(value.start) },
                });
                totalQ = totalQ
                    ? totalQ.where({
                        [field]: { $gte: new Date(value.start) },
                    })
                    : totalQ;
            }
        }
        else {
            q = q.where({
                [field]: { $gte: new Date(value) },
            });
            totalQ = totalQ
                ? totalQ.where({
                    [field]: { $gte: new Date(value) },
                })
                : totalQ;
        }
    }
    return { q, totalQ };
};
exports.createDateRangeFilter = createDateRangeFilter;
const createAggregateStringFilter = (match, value, field) => {
    if (!value)
        return match;
    if (typeof value === "object" && "0" in value && "1" in value) {
        value = Object.values(value);
    }
    if ((value && typeof value === "string") ||
        (value instanceof Array && value.length > 0))
        match[field] =
            value instanceof Array ? { $in: value } : value;
    return match;
};
exports.createAggregateStringFilter = createAggregateStringFilter;
const createAggregateDateRangeFilter = (match, value, field) => {
    if (value) {
        if (typeof value === "object" &&
            value.start) {
            if (value.end)
                match[field] = {
                    $gte: new Date(value.start),
                    $lte: new Date(value.end),
                };
            else
                match[field] = { $gte: new Date(value.start) };
        }
        else
            match[field] = { $gte: new Date(value) };
    }
    return match;
};
exports.createAggregateDateRangeFilter = createAggregateDateRangeFilter;
//# sourceMappingURL=query.utilities.js.map