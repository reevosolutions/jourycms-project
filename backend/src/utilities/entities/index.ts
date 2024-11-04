/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 24-02-2024 20:47:22
 */

export const extractParcelAccountTypeFromStoreType = (
  storeType: Levelup.V2.Accounts.Entity.TStoreType
): Levelup.V2.Shipping.Entity.TParcelOwnerAccountType => {
  switch (storeType) {
    case "b2b":
      return "b2b";
    case "enterprise":
      return "ecommerce_enterprise";
    case "particular":
      return "ecommerce_particular";
  }
};
export const extractParcelTypeFromStoreType = (
  storeType: Levelup.V2.Accounts.Entity.TStoreType
): Levelup.V2.Shipping.Entity.TParcelType => {
  switch (storeType) {
    case "b2b":
      return "b2b";
    case "enterprise":
    case "particular":
      return "ecommerce";
  }
};

export const isEntityObject = (obj: any): obj is { _id: string } => {
  return obj && typeof obj === "object" && obj._id;
};
