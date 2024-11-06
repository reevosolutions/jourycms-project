import { Request } from "express";

declare global {
  namespace Levelup {
    namespace CMS {
      namespace V1 {
        namespace Security {
          export type AuthData = {
            /**
             * @description the properties parsed from the request
             */
            current?: {
              token?: string;
              app?: Levelup.V2.System.Entity.App | null;
              user?: Levelup.V2.Users.Entity.User | null;
              api_key?: Levelup.V2.Auth.Entity.ExposedApiKey | null;
              service?: {
                name: string;
                is_external: boolean;
              };
            };
            /**
             * @description the properties collected from the current item
             */
            attributed?: {
              user: Utils.Entity.Snapshots.Auth.User | null;
            };

            req?: () => Request;
            isServiceRequest?: () => boolean;
          } | null;
        }
      }
    }
  }
}
