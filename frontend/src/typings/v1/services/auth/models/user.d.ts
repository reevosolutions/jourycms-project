import { Document, Model as MongooseModel } from "mongoose";

/**
 * @description global here is very important because we have imported from another module
 */
declare global {
  namespace Levelup {
    namespace CMS {
      namespace V1 {
        namespace Users {
          /**
           * @description Service Model
           */
          export namespace Model {
            export type UserDocument = Entity.User & Document;
            export type User = MongooseModel<UserDocument>;
          }
        }
      }
    }
  }
}
