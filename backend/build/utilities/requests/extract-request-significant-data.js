"use strict";
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 28-02-2024 17:16:53
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractRequestSignificantData = void 0;
const extractRequestSignificantData = (req) => {
    const result = {
        method: req.method,
        url: req.url,
        path: req.path,
        queryParameters: req.query,
        headers: req.headers,
        body: req.body,
        cookies: req.cookies,
        ipAddress: req.ip,
        userAgent: req.get('user-agent') || '',
    };
    return result;
};
exports.extractRequestSignificantData = extractRequestSignificantData;
//# sourceMappingURL=extract-request-significant-data.js.map