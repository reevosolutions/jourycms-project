import { Document, Model as MongooseModel } from "mongoose";

/**
 * @description global here is very important because we have imported from another module
 */
declare global {
  namespace Levelup {
    namespace CMS {
      namespace V1 {
        namespace Auth {
          /**
           * @description Service Model
           */
          export namespace Model {
            export type PermissionGroupDocument = Entity.PermissionGroup &
              Document;
            export type PermissionGroup =
              MongooseModel<PermissionGroupDocument>;
          }
        }
      }
    }
  }
}
