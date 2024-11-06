"use strict";
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 28-02-2024 02:58:06
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectStoreType = void 0;
const detectStoreType = (store) => {
    const type = store.store_type === "b2b"
        ? "b2b"
        : (store.store_type === "enterprise" || store.has_cr)
            ? "enterprise"
            : "particular";
    return type;
};
exports.detectStoreType = detectStoreType;
//# sourceMappingURL=accounts.utilities.js.map