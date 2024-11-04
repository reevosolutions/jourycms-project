/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 27-02-2024 21:22:10
 */

/* ------------------------- COMMON AUTH INTERFACES ------------------------- */

export const getUserSnapshot = (value?: Levelup.V2.Users.Entity.User | Levelup.V2.Users.Entity.ExposedUser | null, default_value: Levelup.V2.Utils.Entity.Snapshots.Auth.User | null = null): Levelup.V2.Utils.Entity.Snapshots.Auth.User | null => {
  if (!value) return default_value ?? null;
  const result: Levelup.V2.Utils.Entity.Snapshots.Auth.User = {
    role: value.role,
    role_group: value.role_group,
    _id: value._id,
    tracking_id: value.tracking_id,
    first_name: value.profile?.first_name || '',
    family_name: value.profile.family_name || '',
    phones: value.profile.phones,
    photo: value.profile.photo
  }
  return result;
}

/* ----------------------- COMMON CUSTOMERS INTERFACES ---------------------- */
export const getCustomerSnapshot = (value?: Levelup.V2.Customers.Entity.Customer | null, default_value: Levelup.V2.Utils.Entity.Snapshots.Customers.Customer | null = null): Levelup.V2.Utils.Entity.Snapshots.Customers.Customer | null => {
  if (!value) return default_value ?? null;
  const result: Levelup.V2.Utils.Entity.Snapshots.Customers.Customer = {
    _id: value._id,
    tracking_id: value.tracking_id,
    first_name: value.profile.first_name || '',
    family_name: value.profile.family_name || '',
    phones: value.profile.phones,
    address: value.profile.address,
    has_work_address: value.profile.has_work_address,
    work_address: value.profile.work_address,
  }
  return result;
}

/* ----------------------- COMMON ACCOUNTS INTERFACES -------------------- */
export const getCompanySnapshot = (value?: Levelup.V2.Accounts.Entity.Company | null, default_value: Levelup.V2.Utils.Entity.Snapshots.Accounts.Company | null = null): Levelup.V2.Utils.Entity.Snapshots.Accounts.Company | null => {
  if (!value) return default_value ?? null;
  const result: Levelup.V2.Utils.Entity.Snapshots.Accounts.Company = {
    _id: value._id,
    tracking_id: value.tracking_id,
    name: value.name || '',
    logo: value.logo,
    logo_square: value.logo_square,
  }
  return result;
}

export const getStoreSnapshot = (value?: Levelup.V2.Accounts.Entity.Store | null, default_value: Levelup.V2.Utils.Entity.Snapshots.Accounts.Store | null = null): Levelup.V2.Utils.Entity.Snapshots.Accounts.Store | null => {
  if (!value) return default_value ?? null;
  const result: Levelup.V2.Utils.Entity.Snapshots.Accounts.Store = {
    _id: value._id,
    tracking_id: value.tracking_id,
    name: value.name || '',
    logo: value.logo,
    account_type: value.store_type,
    support_phones: value.support_phones,
    address: value.address
  }
  return result;
}

/* ----------------------- COMMON LOCATIONS INTERFACES ---------------------- */
export const getStateSnapshot = (
  address: Levelup.V2.Utils.Entity.Snapshots.Locations.Address | null | undefined
) => {
  if (!address) return null;
  const snapshot: Levelup.V2.Utils.Entity.Snapshots.Locations.State = {
    _id: address.state_id,
    code: address.state_code,
    name: address.state_name,
    country_id: address.country_id,
    country_code: address.country_code,
    country_name: address.country_name,
  };
  return snapshot;
};



/* ----------------------- COMMON LOGISTICS INTERFACES ------------------- */

export const getOfficeSnapshot = (value?: Levelup.V2.Logistics.Entity.Office | null, default_value: Levelup.V2.Utils.Entity.Snapshots.Logistics.Office | null = null): Levelup.V2.Utils.Entity.Snapshots.Logistics.Office | null => {
  if (!value) return default_value ?? null;
  const result: Levelup.V2.Utils.Entity.Snapshots.Logistics.Office = {
    _id: value._id,
    tracking_id: value.tracking_id,
    code: value.code || '',
    name: value.name || '',
    phones: value.phones,
    is_agency: value.is_agency,
    is_hub: value.is_hub,
    address: value.address
  }
  return result;
}

export const getWarehouseSnapshot = (value?: Levelup.V2.Logistics.Entity.Warehouse | null, default_value: Levelup.V2.Utils.Entity.Snapshots.Logistics.Warehouse | null = null): Levelup.V2.Utils.Entity.Snapshots.Logistics.Warehouse | null => {
  if (!value) return default_value ?? null;
  const result: Levelup.V2.Utils.Entity.Snapshots.Logistics.Warehouse = {
    _id: value._id,
    tracking_id: value.tracking_id,
    code: value.code || '',
    name: value.name || '',
    phones: value.phones,
    address: value.address
  }
  return result;
}

export const getVehicleSnapshot = (value?: Levelup.V2.Logistics.Entity.Vehicle | null, default_value: Levelup.V2.Utils.Entity.Snapshots.Logistics.Vehicle | null = null): Levelup.V2.Utils.Entity.Snapshots.Logistics.Vehicle | null => {
  if (!value) return default_value ?? null;
  const result: Levelup.V2.Utils.Entity.Snapshots.Logistics.Vehicle = {
    _id: value._id,
    tracking_id: value.tracking_id,
    code: value.code || '',
    name: value.name || '',
  }
  return result;
}

export const getVehicleTypeSnapshot = (value?: Levelup.V2.Logistics.Entity.VehicleType | null, default_value: Levelup.V2.Utils.Entity.Snapshots.Logistics.VehicleType | null = null): Levelup.V2.Utils.Entity.Snapshots.Logistics.VehicleType | null => {
  if (!value) return default_value ?? null;
  const result: Levelup.V2.Utils.Entity.Snapshots.Logistics.VehicleType = {
    _id: value._id,
    tracking_id: value.tracking_id,
    code: value.code || '',
    name: value.name || '',
  }
  return result;
}

/* ----------------------- COMMON PRODUCTS INTERFACES ----------------------- */
export const getProductCategorySnapshot = (value?: Levelup.V2.Products.Entity.ProductCategory | null, default_value: Levelup.V2.Utils.Entity.Snapshots.Products.ProductCategory | null = null): Levelup.V2.Utils.Entity.Snapshots.Products.ProductCategory | null => {
  if (!value) return default_value ?? null;
  const result: Levelup.V2.Utils.Entity.Snapshots.Products.ProductCategory = {
    _id: value._id,
    tracking_id: value.tracking_id,
    name: value.name
  }
  return result;
}

export const getProductSnapshot = (
  value?: Levelup.V2.Products.Entity.Product | null,
  default_value: Levelup.V2.Utils.Entity.Snapshots.Products.Product | null = null
): Levelup.V2.Utils.Entity.Snapshots.Products.Product | null => {
  if (!value) return default_value ?? null;
  const result: Levelup.V2.Utils.Entity.Snapshots.Products.Product = {
    _id: value._id,
    tracking_id: value.tracking_id,
    name: value.name,
    unit_price: value.price,
    quantity: value.quantity,
    image: value.image ? value.image : value.gallery?.length ? value.gallery[0] : null,
  };
  return result;
};

/* ----------------------- COMMON SHIPPING INTERFACES ----------------------- */
export const getSacSnapshot = (value?: Levelup.V2.Shipping.Entity.Sac | null, default_value: Levelup.V2.Utils.Entity.Snapshots.Shipping.Sac | null = null): Levelup.V2.Utils.Entity.Snapshots.Shipping.Sac | null => {
  if (!value) return default_value ?? null;
  const result: Levelup.V2.Utils.Entity.Snapshots.Shipping.Sac = {
    _id: value._id,
    tracking_id: value.tracking_id,
  }
  return result;
}