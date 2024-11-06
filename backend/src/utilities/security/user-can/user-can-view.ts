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


  if (entity === 'store') {
    if (authData?.current?.user?.role_group === 'sellers') {
      logger.info("User is a seller, checking if user can view object");
      if (authData?.current?.user?.attributes?.seller?.stores.includes(doc._id)) {
        logger.info("User can view object");
        return true;
      }
      logger.warn("User cannot view object");
      return false;
    }
  }

  if(
    entity === 'product' ||
    entity === 'parcel' ||
    entity === 'order' ||
    entity === 'outbound' ||
    entity === 'inbound'
  ) {
    if (authData?.current?.user?.role_group === 'sellers') {

      logger.info("User is a seller, checking if user can view object");
      if (
        doc.attributes?.store && authData?.current?.user?.attributes?.seller?.stores.includes(
          doc.attributes?.store
        )
      ) {
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
}