declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Auth {
        export namespace Entity {
          export type ApiKey = Utils.Entity.General.ICreatable &
            Utils.Entity.General.IHasSearchMeta & {
              _id: Utils.Common.ID;
              name: string;
              related_to: ("company" | "app" | "store")[];
              app: string | null;
              company: string | null;
              store: string | null;
              last_use: Date;
              token: string;
              encryptedKey: string;
              salt: string;
              permissions: string[];
            };

          export type ExposedApiKey = Omit<
            Entity.ApiKey,
            "salt" | "encryptedKey"
          >;
        }
      }
    }
  }
}
