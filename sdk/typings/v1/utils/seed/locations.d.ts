declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Utils {
        export namespace Seed {
          export interface SeedData {
            countries: Country[];
            countryFlags: { [key: string]: string };
            dzStatesShipmentFees: DzStatesShipmentFees;
            dzStates: { [key: string]: string };
            dzCities: { state: string; cities: DzCity[] }[];
          }

          export interface Country {
            id: number;
            name: string;
            alpha2: string;
            alpha3: string;
          }

          export interface DzCity {
            id: number;
            nom: string;
            wilaya_id: number;
            sac_wilaya_id: number;
            hasHub: number;
            hasdesk: number;
            deliverable: number;
            dureedeviecolis: number;
            dureedeviepaiement: number;
          }

          export interface DzStatesShipmentFees {
            home: { [key: string]: number };
            desk: { [key: string]: number };
          }
        }
      }
    }
  }
}
