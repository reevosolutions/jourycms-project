declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        /**
         * SubDomain Translation
         */
        export namespace Translation {
          /**
           * @description Service Entity
           */
          export namespace Entity {
            export interface Namespace
              extends Utils.Entity.General.ICreatable,
                Utils.Entity.General.IHasSearchMeta {
              _id: Utils.Common.ID;
              project: Utils.Common.ID; // Project._id
              name: string;
              description: string;
              settings: {
                can_delete_translation_items: boolean;
              };
            }
          }
        }
      }
    }
  }
}
