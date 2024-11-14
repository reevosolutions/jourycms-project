"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCanViewObject = void 0;
const logging_1 = __importDefault(require("../../logging"));
const logger = (0, logging_1.default)("UTILITY", "SECURITY");
const userCanViewObject = (entity, doc, authData) => {
    if ((authData === null || authData === void 0 ? void 0 : authData.isServiceRequest) && (authData === null || authData === void 0 ? void 0 : authData.isServiceRequest())) {
        logger.info("Service request detected, allowing access to view object");
        return true;
    }
    logger.info("User is not a service request, checking if user is a company admin", authData === null || authData === void 0 ? void 0 : authData.isServiceRequest);
    /**
     * Handle the case where the user is a company admin
     */
    return true;
};
exports.userCanViewObject = userCanViewObject;
//# sourceMappingURL=user-can-view.js.map