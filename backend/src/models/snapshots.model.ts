/**
 * @description This file is used to build mongoose model
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 07-03-2024 23:23:09
 */

import { Schema } from "mongoose";

type DeepStrictSchemaDefinition<T = undefined> =
  Levelup.V2.Utils.Mongodb.DeepStrictSchemaDefinition<T>;

/* -------------------------------------------------------------------------- */
/*                                   COMMON                                   */
/* -------------------------------------------------------------------------- */
export const _FileAttributeSchemaFields: DeepStrictSchemaDefinition<
  Levelup.V2.Utils.Common.FileAttribute & { _id: false }
> = {
  id: { type: String, default: null },
  url: { type: String, default: null },
  _id: false, // Disable _id for this subdocument
};

export const _AddressSchemaFields: DeepStrictSchemaDefinition<Levelup.V2.Utils.Entity.Snapshots.Locations.Address> =
  {
    country_id: { type: String, default: null },
    country_code: { type: String },
    country_name: { type: String },
    state_id: { type: String, default: null },
    state_code: { type: String },
    state_name: { type: String },
    state_zone: { type: Number },
    city_id: { type: String, default: null },
    city_code: { type: String },
    city_name: { type: String },
    city_zone: { type: Number },
    street_address: { type: String },
  };

export const _AccountLegalInfoSchemaFields: DeepStrictSchemaDefinition<Levelup.V2.Accounts.Entity.AccountLegalInfo> =
  {
    cr_id: { type: String, default: null },
    cr_file: {
      type: _FileAttributeSchemaFields,
      default: null,
      _id: false, // Disable _id for this subdocument
    },
    nif_id: { type: String, default: null },
    nis_id: { type: String, default: null },
    ai_id: { type: String, default: null },
  };

export const _LocationSchemaFields = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

export const _ParcelFeesSchemaFields: Levelup.V2.Utils.Mongodb.StrictSchemaDefinition<Levelup.V2.Payment.Entity.IParcelFees> =
  {
    price: { type: Number, default: 0 },
    declared_value: { type: Number, default: 0 },
    is_free_shipping: { type: Boolean, default: false },
    delivery_fees_payment_mode: { type: String, default: null },
    delivery_discount: { type: Number, default: 0 },
    delivery_fees_before_discount: { type: Number, default: 0 },
    delivery_fees: { type: Number, default: 0 },
    overweight_fees: { type: Number, default: 0 },
    overweight_fees_payment_mode: { type: String, default: null },
    return_fees: { type: Number, default: 0 },
    is_parcel_assured: { type: Boolean, default: false },
    tax_assurance_percent: { type: Number, default: 0 },
    tax_assurance: { type: Number, default: 0 },
    tax_cod_percent: { type: Number, default: 0 },
    tax_cod: { type: Number, default: 0 },
    applied_offers: [{ type: String, default: null }],
    store_has_custom_pricing: { type: Boolean, default: false },
    has_payment: { type: Boolean, default: false },
    payment_status: { type: String, default: null },
    deposit_tracking_id: { type: String, default: null },
    collect_tracking_id: { type: String, default: null },
    encasement_tracking_id: { type: String, default: null },
    store_payment_tracking_id: { type: String, default: null },
    additional_services: {
      pickup: {
        payment_mode: { type: String, default: null },
        apply: { type: Boolean, default: false },
        r: { type: Number, default: 0 },
        d: { type: Number, default: 0 },
      },
      callcenter: {
        payment_mode: { type: String, default: null },
        apply: { type: Boolean, default: false },
        r: { type: Number, default: 0 },
        d: { type: Number, default: 0 },
      },
      warehouse: {
        payment_mode: { type: String, default: null },
        apply: { type: Boolean, default: false },
        r: { type: Number, default: 0 },
        d: { type: Number, default: 0 },
      },
    },
    net_taxable: { type: Number, default: 0 },
    net_without_delivery: { type: Number, default: 0 },
    net_to_recover_from_customer: { type: Number, default: 0 },
    deliverer_due: { type: Number, default: 0 },
    deliverer_paid: { type: Boolean, default: false },
    store_net_payable: { type: Number, default: 0 },
  };

/* -------------------------------------------------------------------------- */
/*                                  SNAPSHOTS                                 */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- auth ---------------------------------- */
export const _UserSnapshotSchemaFields: DeepStrictSchemaDefinition<Levelup.V2.Utils.Entity.Snapshots.Auth.User> =
  {
    _id: { type: String, default: null },
    tracking_id: { type: String, default: null },
    first_name: { type: String, default: "" },
    family_name: { type: String, default: "" },
    phones: { type: [String], default: [] },
    photo: {
      type: _FileAttributeSchemaFields,
      default: null,
      _id: false, // Disable _id for this subdocument
    },
    role: { type: String, default: "" },
    role_group: String,
  };

/* -------------------------------- customers ------------------------------- */
export const _CustomerSnapshotSchemaFields: DeepStrictSchemaDefinition<Levelup.V2.Utils.Entity.Snapshots.Customers.Customer> =
  {
    _id: { type: String, default: null },
    tracking_id: { type: String, default: null },
    first_name: { type: String, default: "" },
    family_name: { type: String, default: "" },
    phones: { type: [String], default: [] },
    address: {
      type: _AddressSchemaFields,
      default: null,
      _id: false, // Disable _id for this subdocument
    },
    has_work_address: { type: Boolean, default: false },
    work_address: {
      type: _AddressSchemaFields,
      default: null,
      _id: false, // Disable _id for this subdocument
    },
  };

/* -------------------------------- inventory ------------------------------- */

/* -------------------------------- products -------------------------------- */
export const _ProductCategorySnapshotSchemaFields: DeepStrictSchemaDefinition<Levelup.V2.Utils.Entity.Snapshots.Products.ProductCategory> =
  {
    _id: { type: String, default: null },
    tracking_id: { type: String, default: null },
    name: { type: String, default: null },
  };

export const _FullVariantSnapshotSchemaFields: DeepStrictSchemaDefinition<Levelup.V2.Utils.Entity.Snapshots.Products.FullVariant> =
  {
    name: { type: String, default: null },
    product_id: { type: String, default: null },
    variant_id: { type: String, default: null },
    product_tracking_id: { type: String, default: null },
    variant_tracking_id: { type: String, default: null },
    image: {
      type: _FileAttributeSchemaFields,
      default: null,
      _id: false, // Disable _id for this subdocument
    },
    properties: [
      {
        type: {
          option: { type: String, default: null },
          property: { type: String, default: null },
        },
        default: null,
      },
    ],
  };

export const _EmbeddedVariantSnapshotSchemaFields: DeepStrictSchemaDefinition<Levelup.V2.Utils.Entity.Snapshots.Products.EmbeddedVariant> =
  {
    tracking_id: { type: String, default: null },
    name: { type: String, default: null },
    properties: [
      {
        type: {
          option: { type: String, default: null },
          property: { type: String, default: null },
        },
        default: null,
      },
    ],
  };

export const _ProductSnapshotSchemaFields: DeepStrictSchemaDefinition<Levelup.V2.Utils.Entity.Snapshots.Products.Product> =
  {
    _id: { type: String, default: null },
    tracking_id: { type: String, default: null },
    name: { type: String, default: null },
    quantity: { type: Number, default: 1 },
    unit_price: { type: Number, default: 0 },
    variant: {
      type: _EmbeddedVariantSnapshotSchemaFields,
      default: null,
      _id: false, // Disable _id for this subdocument
    },
    image: {
      type: _FileAttributeSchemaFields,
      default: null,
      _id: false, // Disable _id for this subdocument
    },
  };

/* -------------------------------- accounts -------------------------------- */
export const _CompanySnapshotSchemaFields: DeepStrictSchemaDefinition<Levelup.V2.Utils.Entity.Snapshots.Accounts.Company> =
  {
    _id: { type: String, default: null },
    tracking_id: { type: String, default: null },
    name: { type: String, default: null },
    logo: {
      type: _FileAttributeSchemaFields,
      default: null,
      _id: false, // Disable _id for this subdocument
    },
    logo_square: {
      type: _FileAttributeSchemaFields,
      default: null,
      _id: false, // Disable _id for this subdocument
    },
  };

export const _StoreSnapshotSchemaFields: DeepStrictSchemaDefinition<Levelup.V2.Utils.Entity.Snapshots.Accounts.Store> =
  {
    _id: { type: String, default: null },
    tracking_id: { type: String, default: null },
    account_type: { type: String, default: null },
    name: { type: String, default: null },
    logo: {
      type: _FileAttributeSchemaFields,
      default: null,
      _id: false, // Disable _id for this subdocument
    },
    support_phones: { type: [String], default: [] },
    address: {
      type: _AddressSchemaFields,
      default: null,
      _id: false, // Disable _id for this subdocument
    },
  };

export const _OfficeSnapshotSchemaFields: DeepStrictSchemaDefinition<Levelup.V2.Utils.Entity.Snapshots.Logistics.Office> =
  {
    _id: { type: String, default: null },
    tracking_id: { type: String, default: null },
    code: { type: String, default: null },
    name: { type: String, default: null },
    phones: { type: [String], default: [] },
    is_agency: { type: Boolean, default: false },
    is_hub: { type: Boolean, default: false },
    address: {
      type: _AddressSchemaFields,
      default: null,
      _id: false, // Disable _id for this subdocument
    },
  };

export const _RegionalManagementSnapshotSchemaFields: DeepStrictSchemaDefinition<Levelup.V2.Utils.Entity.Snapshots.Logistics.RegionalManagement> =
  {
    _id: { type: String, default: null },
    tracking_id: { type: String, default: null },
    code: { type: String, default: null },
    name: { type: String, default: null },
    phones: { type: [String], default: [] },
    address: {
      type: _AddressSchemaFields,
      default: null,
      _id: false, // Disable _id for this subdocument
    },
  };

export const _WarehouseSnapshotSchemaFields: DeepStrictSchemaDefinition<Levelup.V2.Utils.Entity.Snapshots.Logistics.Warehouse> =
  {
    _id: { type: String, default: null },
    tracking_id: { type: String, default: null },
    code: { type: String, default: null },
    name: { type: String, default: null },
    phones: { type: [String], default: [] },
    address: {
      type: _AddressSchemaFields,
      default: null,
      _id: false, // Disable _id for this subdocument
    },
  };

export const _VehicleSnapshotSchemaFields: DeepStrictSchemaDefinition<Levelup.V2.Utils.Entity.Snapshots.Logistics.Vehicle> =
  {
    _id: { type: String, default: null },
    tracking_id: { type: String, default: null },
    code: { type: String, default: null },
    name: { type: String, default: null },
  };

export const _VehicleTypeSnapshotSchemaFields: DeepStrictSchemaDefinition<Levelup.V2.Utils.Entity.Snapshots.Logistics.VehicleType> =
  {
    _id: { type: String, default: null },
    tracking_id: { type: String, default: null },
    code: { type: String, default: null },
    name: { type: String, default: null },
  };

/* -------------------------------- shipping -------------------------------- */
export const _SacSnapshotSchemaFields: DeepStrictSchemaDefinition<Levelup.V2.Utils.Entity.Snapshots.Shipping.Sac> =
  {
    _id: { type: String, default: null },
    tracking_id: { type: String, default: null },
  };

export const _ItemTagsSchemaFields = {
  type: Schema.Types.Mixed as any,
  index: true,
  default: {},
  _id: false as const, // Disable _id for this subdocument
};

export const _ItemUpdateSchemaFields: {
  type: DeepStrictSchemaDefinition<Levelup.V2.Utils.Entity.General.IItemUpdate>;
  default?: Levelup.V2.Utils.Entity.General.IItemUpdate | undefined;
  required?: boolean;
  unique?: boolean;
  index?: boolean;
  ref?: string;
  _id?: false;
} = {
  type: {
    date: { type: Date as any, default: Date.now },
    updated_by_system: { type: Boolean, default: false },
    updated_by: {
      type: _UserSnapshotSchemaFields,
      default: null,
    },
    office: {
      type: _OfficeSnapshotSchemaFields,
      default: null,
    },
    store: {
      type: _StoreSnapshotSchemaFields,
      default: null,
    },
    action: { type: String },
    updates: [
      {
        type: {
          field: { type: String },
          old_value: { type: Schema.Types.Mixed },
          new_value: { type: Schema.Types.Mixed },
        },
        _id: false, // Disable _id for this subdocument
      },
    ],
  },
  _id: false, // Disable _id for this subdocument
};
