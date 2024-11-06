import { Document, Model as MongooseModel } from 'mongoose';

/**
 * @description global here is very important because we have imported from another module
 */
declare global {
  namespace Levelup {
    namespace CMS {
      namespace V1 {
        namespace System {
          export namespace Model {
            export type AppDocument = Entity.App & Document;
            export type App = MongooseModel<AppDocument>;
          }
        }
      }
    }
  }
}