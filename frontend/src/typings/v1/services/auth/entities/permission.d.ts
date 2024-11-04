declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Auth {
        export namespace Entity {
          export interface Permission
            extends Utils.Entity.General.ICreatable,
              Utils.Entity.General.IHasSearchMeta {
            _id: Utils.Common.ID;
            is_system: boolean;
            service: string | null;
            group: Utils.Common.ID | null | PermissionGroup;
            name: string;
            description: string;
            roles: Utils.Common.ID[];
            insights?: {
              user_count?: number;
            };
          }
        }
      }
    }
  }
}
