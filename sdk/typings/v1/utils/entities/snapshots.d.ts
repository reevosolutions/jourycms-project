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

            /* ----------------------- COMMON LOCATIONS INTERFACES ---------------------- */
            export namespace Locations {
              interface Address {
                country_code: string;
                country_name: string;
                state_code: string;
                state_name: string;
                city_code: string;
                city_name: string;
                street_address?: string;
              }
              interface City {
                code: string;
                name: string;
                country_code: string;
                state_code: string;
                country_name: string;
                state_name: string;
              }
              interface State {
                code: string;
                name: string;
                country_code: string;
                country_name: string;
              }
              interface Country {
                code: string;
                name: string;
              }
            }


          }
        }
      }
    }
  }
}
