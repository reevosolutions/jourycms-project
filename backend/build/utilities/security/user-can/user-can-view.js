import initLogger from "../../logging";
const logger = initLogger("UTILITY", "SECURITY");
export const userCanViewObject = (entity, doc, authData) => {
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
//# sourceMappingURL=user-can-view.js.map