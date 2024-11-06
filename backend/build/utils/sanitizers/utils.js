"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeObjectStrings = void 0;
const sanitizeObjectStrings = (body) => {
    const keys = Object.keys(body || {});
    keys.forEach(key => {
        if (typeof body[key] === 'string') {
            body[key] = body[key].trim();
        }
        if (typeof body[key] === 'object' && typeof body['push'] === "undefined") {
            body[key] = (0, exports.sanitizeObjectStrings)(body[key]);
        }
    });
    return body;
};
exports.sanitizeObjectStrings = sanitizeObjectStrings;
//# sourceMappingURL=utils.js.map