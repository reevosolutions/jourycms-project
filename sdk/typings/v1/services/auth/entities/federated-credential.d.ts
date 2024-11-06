declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Auth {
        export namespace Entity {
          export interface FederatedCredential {
            created_at?: Date;
            updated_at?: Date;
            is_deleted?: boolean;
            deleted_at?: Date | null;
            _id: Utils.Common.ID;
            //
            user_id: Utils.Common.ID;
            provider: string;
            issuer: string;
            id: Utils.Common.ID;
          }
        }
      }
    }
  }
}
