declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Auth {
        export namespace Entity {
          export interface Role
            extends Utils.Entity.General.ICreatable,
              Utils.Entity.General.IHasSearchMeta {
            _id: Utils.Common.ID;
            is_system: boolean;
            is_company_related: boolean;
            name: string;
            description: string;
            has_all_permissions?: boolean;
            permissions?: Utils.Common.ID[];

            insights?: {
              user_count?: number;
            };
          }
        }
      }
    }
  }
}
