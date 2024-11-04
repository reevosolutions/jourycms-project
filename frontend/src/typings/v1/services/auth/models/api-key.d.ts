import { Document, Model as MongooseModel } from "mongoose";

declare global {
  namespace Levelup {
    namespace CMS {
      namespace V1 {
        namespace Auth {
          /**
           * @description service models
           */
          namespace Model {
            export type ApiKeyDocument = Entity.ApiKey & Document;
            export type ApiKey = MongooseModel<ApiKeyDocument>;
          }
        }
      }
    }
  }
}
