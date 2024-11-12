export function respond(res, data, status = 200) {
    res.status(status).json(data);
}
export function fixFiltersObject(filters) {
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
export function requestHasParam(payload, param) {
    if (!payload)
        return false;
    return (Object.keys(payload).includes(param) &&
        payload[param] !== undefined &&
        payload[param] !== null &&
        (!Array.isArray(payload[param]) || payload[param].length > 0));
}
//# sourceMappingURL=index.js.map