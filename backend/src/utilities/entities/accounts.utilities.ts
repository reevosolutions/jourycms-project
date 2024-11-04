/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 28-02-2024 02:58:06
 */


export const detectStoreType: (store: Levelup.V2.Accounts.Entity.Store) => Levelup.V2.Accounts.Entity.TStoreType = (store) => {
  const type: Levelup.V2.Accounts.Entity.TStoreType =
    store.store_type === "b2b"
      ? "b2b"
      : (store.store_type === "enterprise" || store.has_cr)
        ? "enterprise"
        : "particular";
  return type;
}

