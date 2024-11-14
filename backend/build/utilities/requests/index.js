"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.respond = respond;
exports.fixFiltersObject = fixFiltersObject;
exports.requestHasParam = requestHasParam;
function respond(res, data, status = 200) {
    res.status(status).json(data);
}
function fixFiltersObject(filters) {
    if (!filters)
        return {};
    if (typeof filters === "string") {
        try {
            return JSON.parse(filters);
        }
        catch (e) {
            return {};
        }
    }
    return filters;
}
function requestHasParam(payload, param) {
    if (!payload)
        return false;
    return (Object.keys(payload).includes(param) &&
        payload[param] !== undefined &&
        payload[param] !== null &&
        (!Array.isArray(payload[param]) || payload[param].length > 0));
}
//# sourceMappingURL=index.js.map