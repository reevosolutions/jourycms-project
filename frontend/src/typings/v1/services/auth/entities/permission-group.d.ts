declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Auth {
        export namespace Entity {
          export interface PermissionGroup
            extends Utils.Entity.General.ICreatable,
              Utils.Entity.General.IHasSearchMeta {
            _id: Utils.Common.ID;
            is_system: boolean;
            service: string | null;
            name: string;
            description: string;
            permissions: Utils.Common.ID[];
          }
        }
      }
    }
  }
}
