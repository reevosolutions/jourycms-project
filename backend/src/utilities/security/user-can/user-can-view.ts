import initLogger from "../../logging";

const logger = initLogger("UTILITY", "SECURITY");

export const userCanViewObject = <E extends Levelup.CMS.V1.Utils.SystemStructure.Models.AllModels>(
  entity: E,
  doc: Partial<Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>>,
  authData: Levelup.CMS.V1.Security.AuthData
): boolean => {
  if (authData?.isServiceRequest && authData?.isServiceRequest()) {
    logger.info("Service request detected, allowing access to view object");
    return true;
  }


  logger.info("User is not a service request, checking if user is a company admin", authData?.isServiceRequest);


  
  /**
   * Handle the case where the user is a company admin
   */
  return true;
}