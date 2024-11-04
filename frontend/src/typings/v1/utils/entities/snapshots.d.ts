declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Utils {
        namespace Entity {
          /* ------------------------ COMMON GENERAL INTERFACES ----------------------- */
          namespace Snapshots {
            /* ------------------------- COMMON AUTH INTERFACES ------------------------- */
            namespace Auth {
              interface User {
                _id: string | null;
                tracking_id: string | null;
                first_name: string | null;
                family_name: string | null;
                phones: string[];
                photo: Common.FileAttribute;
                role: string;
              }
            }

            /* ----------------------- COMMON CUSTOMERS INTERFACES ---------------------- */
            namespace Customers {
              interface Customer {
                _id: string | null;
                tracking_id: string | null;
                first_name: string;
                family_name: string;
                phones: string[];
                address: Locations.Address | null;
                has_work_address: boolean;
                work_address?: Locations.Address | null;
              }
            }

            /* ----------------------- COMMON LOCATIONS INTERFACES ---------------------- */
            export namespace Locations {
              interface Address {
                country_id: string;
                country_code: string;
                country_name: string;
                state_id: string;
                state_code: string;
                state_name: string;
                state_zone?: number;
                city_id: string;
                city_code: string;
                city_name: string;
                city_zone?: number;
                street_address?: string;
              }
              interface City {
                _id: string;
                code: string;
                name: string;
                country_id: string;
                state_id: string;
                country_code: string;
                state_code: string;
                country_name: string;
                state_name: string;
              }
              interface State {
                _id: string;
                code: string;
                name: string;
                country_id: string;
                country_code: string;
                country_name: string;
              }
              interface Country {
                _id: string;
                code: string;
                name: string;
              }
            }

            /* ----------------------- COMMON INVENTORY INTERFACES ---------------------- */
            namespace Inventory {}
            /* ----------------------- COMMON PRODUCTS INTERFACES ---------------------- */
            namespace Products {
              interface ProductCategory {
                _id?: string | null;
                tracking_id?: string | null;
                name: string;
              }

              interface FullVariant {
                product_id: string | null;
                variant_id: string | null;
                product_tracking_id: string | null;
                variant_tracking_id: string | null;
                name: string;
                image: Common.FileAttribute;
                properties: {
                  option: string; // color..
                  property: string; // red..
                }[];
              }

              export interface EmbeddedVariant {
                tracking_id: string;
                name: string; // red-xl, blue-l
                properties: {
                  property: string; // color..
                  value: string | number; // red..
                }[];
              }

              interface Product {
                _id?: string | null;
                tracking_id?: string | null;
                name: string;
                unit_price: number;
                quantity: number;
                variant?: EmbeddedVariant | null;
                image?: Common.FileAttribute | null;
              }
            }

            /* ----------------------- COMMON ORDERS INTERFACES ---------------------- */
            namespace Orders {}

            /* ----------------------- COMMON ACCOUNTS INTERFACES -------------------- */
            namespace Accounts {
              interface Company {
                _id: string | null;
                tracking_id: string | null;
                name: string | null;
                logo: Common.FileAttribute;
                logo_square: Common.FileAttribute;
              }
              interface Store {
                _id: string | null;
                tracking_id: string | null;
                account_type: Levelup.V2.Accounts.Entity.TStoreType;
                name: string;
                logo: Common.FileAttribute;
                support_phones: string[];
                address: Locations.Address;
              }
            }

            /* ----------------------- COMMON LOGISTICS INTERFACES ------------------- */
            namespace Logistics {
              interface Office {
                _id: string | null;
                tracking_id: string | null;
                code: string | null;
                name: string | null;
                phones: string[];
                is_agency: boolean;
                is_hub: boolean;
                address: Locations.Address;
              }
              interface RegionalManagement {
                _id: string | null;
                tracking_id: string | null;
                code: string | null;
                name: string | null;
                phones: string[];
                address: Locations.Address;
              }
              interface Warehouse {
                _id: string | null;
                tracking_id: string | null;
                code: string | null;
                name: string | null;
                phones: string[];
                address: Locations.Address;
              }

              interface Vehicle {
                _id: string | null;
                tracking_id: string | null;
                code: string | null;
                name: string | null;
              }
              interface VehicleType {
                _id: string | null;
                tracking_id: string | null;
                code: string | null;
                name: string | null;
              }
            }

            /* ----------------------- COMMON SHIPPING INTERFACES ----------------------- */
            namespace Shipping {
              interface Sac {
                _id: string | null;
                tracking_id: string | null;
              }
            }
          }
        }
      }
    }
  }
}
