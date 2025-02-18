declare namespace Levelup {

  namespace V2 {
    /**
     * @description Service Storage
     */
    namespace Storage {
     
      export namespace Entity {
        export interface IUploadedFileAttributes {
          store?: Utils.Common.ID;
        }

        export interface IUploadedFileSnapshots {
          store?: Utils.Entity.Snapshots.Accounts.Store;
        }

        export interface UploadedFile
          extends Utils.Entity.General.ICreatable,
            Utils.Entity.General.IHasSearchMeta {
          _id: Utils.Common.ID;
          field_name: string;

          original_name: string;
          remote_url?: string;
          /**
           * The base file name with extension
           */
          file_name: string;
          /**
           * The relative path to the file
           */
          file_path: string;
          /**
           * The relative path to the file directory
           */
          destination: string;
          /**
           * File size in bytes
           */
          size: number;

          caption: string;
          encoding: string;
          mimetype: string;
          attributes: IUploadedFileAttributes;
          snapshots: IUploadedFileSnapshots;
        }
      }
    }
  }
}
