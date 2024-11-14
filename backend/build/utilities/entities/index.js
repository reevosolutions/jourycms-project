"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEntityObject = void 0;
const isEntityObject = (obj) => {
    return obj && typeof obj === "object" && obj._id;
};
exports.isEntityObject = isEntityObject;
//# sourceMappingURL=index.js.map