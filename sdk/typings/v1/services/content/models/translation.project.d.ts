import { Document, Model as MongooseModel } from "mongoose";

/**
 * @description global here is very important because we have imported from another module
 */
declare global {
  declare module Levelup {
    namespace CMS {
      namespace V1 {
        namespace Content {
          namespace Translation {
            export namespace Model {
              export type ProjectDocument = Entity.Project & Document;
              export type Project = MongooseModel<ProjectDocument>;
            }
          }
        }
      }
    }
  }
}
