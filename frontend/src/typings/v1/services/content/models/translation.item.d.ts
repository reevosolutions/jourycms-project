import { Document, Model as MongooseModel } from "mongoose";

/**
 * @description global here is very important because we have imported from another module
 */
declare global {
  declare module Levelup {
    namespace CMS {
      namespace V1 {
        namespace Content {
          export namespace Model {
            export type ItemDocument = Entity.Item & Document;
            export type Item = MongooseModel<ItemDocument>;
          }
        }
      }
    }
  }
}
