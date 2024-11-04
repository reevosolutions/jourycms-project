
export const userCanDeleteObject = <E extends Levelup.V2.SystemStructure.Services.Models.AllModels>(
  entity: E,
  doc: Partial<Levelup.V2.SystemStructure.EntityType<E>>,
  authData: Levelup.V2.Security.AuthData
):boolean => {
  if (authData?.current?.service) return true;

  /**
   * Handle the case where the user is a company admin
   */
  return true;
}