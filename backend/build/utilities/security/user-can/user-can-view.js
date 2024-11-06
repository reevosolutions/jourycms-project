"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCanViewObject = void 0;
const logging_1 = __importDefault(require("../../logging"));
const logger = (0, logging_1.default)("UTILITY", "SECURITY");
const userCanViewObject = (entity, doc, authData) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    if ((authData === null || authData === void 0 ? void 0 : authData.isServiceRequest) && (authData === null || authData === void 0 ? void 0 : authData.isServiceRequest())) {
        logger.info("Service request detected, allowing access to view object");
        return true;
    }
    logger.info("User is not a service request, checking if user is a company admin", authData === null || authData === void 0 ? void 0 : authData.isServiceRequest);
    if (entity === 'store') {
        if (((_b = (_a = authData === null || authData === void 0 ? void 0 : authData.current) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.role_group) === 'sellers') {
            logger.info("User is a seller, checking if user can view object");
            if ((_f = (_e = (_d = (_c = authData === null || authData === void 0 ? void 0 : authData.current) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.attributes) === null || _e === void 0 ? void 0 : _e.seller) === null || _f === void 0 ? void 0 : _f.stores.includes(doc._id)) {
                logger.info("User can view object");
                return true;
            }
            logger.warn("User cannot view object");
            return false;
        }
    }
    if (entity === 'product' ||
        entity === 'parcel' ||
        entity === 'order' ||
        entity === 'outbound' ||
        entity === 'inbound') {
        if (((_h = (_g = authData === null || authData === void 0 ? void 0 : authData.current) === null || _g === void 0 ? void 0 : _g.user) === null || _h === void 0 ? void 0 : _h.role_group) === 'sellers') {
            logger.info("User is a seller, checking if user can view object");
            if (((_j = doc.attributes) === null || _j === void 0 ? void 0 : _j.store) && ((_o = (_m = (_l = (_k = authData === null || authData === void 0 ? void 0 : authData.current) === null || _k === void 0 ? void 0 : _k.user) === null || _l === void 0 ? void 0 : _l.attributes) === null || _m === void 0 ? void 0 : _m.seller) === null || _o === void 0 ? void 0 : _o.stores.includes((_p = doc.attributes) === null || _p === void 0 ? void 0 : _p.store))) {
                logger.info("User can view object");
                return true;
            }
            logger.warn("User cannot view object");
            return false;
        }
    }
    /**
     * Handle the case where the user is a company admin
     */
    return true;
};
exports.userCanViewObject = userCanViewObject;
//# sourceMappingURL=user-can-view.js.map