import { Document, Model as MongooseModel } from 'mongoose';

/**
 * @description global here is very important because we have imported from another module
 */
declare global {
  /**
   * @description project
   */
  namespace Levelup {
    /**
     * @description V2
     * @since 29-01-2024 16:36:19
     */
    namespace V2 {

      /**
       * @description Service Storage
       */
      namespace Storage {
        /**
         * @description Service Model
         */
        export namespace Model {

          export type UploadedFileDocument = Entity.UploadedFile & Document;
          export type UploadedFile = MongooseModel<UploadedFileDocument>;

        }
      }

    }
  }
}