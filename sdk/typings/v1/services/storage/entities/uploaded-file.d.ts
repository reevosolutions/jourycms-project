declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Storage {
        export namespace Entity {
          export interface IUploadedFileAttributes {
          }

          export interface IUploadedFileSnapshots {
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
}
