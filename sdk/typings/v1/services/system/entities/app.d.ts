declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace System {

        export namespace Entity {
          /**
           * Represents the settings for an app.
           */
          export interface IAppSettings {
            /**
             * The listing configuration.
             */
            listing?: {
              /**
               * The default listing count.
               * - better value of table list is 25
               * - better value of grid list is 24
               */
              default_count: number;
            };
            /**
             * The locales configuration.
             */
            locales?: {
              /**
               * The default language for the app.
               */
              default_language: Levelup.V2.ContentManagement.Entity.TranslationManager.TLanguageCode;
              /**
               * The supported languages for the app.
               */
              supported_languages: Levelup.V2.ContentManagement.Entity.TranslationManager.TLanguageCode[];
            };
            /**
             * The locations configuration.
             */
            locations?: {
              /**
               * The default country for the app.
               * null if not related to a specific country.
               */
              default_country: string | null;
              /**
               * The supported countries for the app.
               */
              supported_countries: string[];
              /**
               * The default currency for the app.
               * null if not related to a specific currency.
               */
              default_currency: string | null;
              /**
               * The supported currencies for the app.
               */
              supported_currencies: string[];
            };
          }

          export interface IAppAttributes {
            is_suspended?: boolean;
          }

          export interface IAppInsights {
            company_count?: number;
            store_count?: number;
            user_count?: number;
          }

          export interface App extends Utils.Entity.General.IHasSearchMeta {
            _id: Utils.Common.ID;
            created_at?: Date;
            updated_at?: Date;
            is_deleted?: boolean;
            deleted_at?: Date;
            created_by: Utils.Common.ID;
            owner: Utils.Common.ID;
            name: string;
            description: string;
            logo: Utils.Common.FileAttribute;

            enabled_services: TService[];
            //
            settings: IAppSettings;
            attributes: IAppAttributes;
            insights: IAppInsights;
            //
            token: string;
            encryptedKey: string;
            salt: string;
          }
        }
      }
    }
  }
}

