
export const userCanDeleteObject = <E extends Levelup.CMS.V1.Utils.SystemStructure.Models.AllModels>(
  entity: E,
  doc: Partial<Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>>,
  authData: Levelup.CMS.V1.Security.AuthData
):boolean => {
  if (authData?.current?.service) return true;

  /**
   * Handle the case where the user is a company admin
   */
  return true;
}