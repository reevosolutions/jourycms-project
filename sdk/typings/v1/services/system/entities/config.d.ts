declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace System {

        export namespace Entity {
          /**
           * Represents the settings for an app.
           */
          export interface WebsiteConfig {
            name?: string;
            description?: string;
            version?: string;
            contact_phones?: string[];
            contact_email?: string;
            contact_whatsapp?: string;
            social_links?: {
              network: Utils.Common.SocialNetworks;
              url: string;
            }[];
            address?: string;
            months?: {
              [month: number]: string
            };
            states?: {
              code: string;
              name: string;
            }[];
            cities?: {
              state_code: string;
              code: string;
              name: string;
            }[];
          }
        }
      }
    }
  }
}

