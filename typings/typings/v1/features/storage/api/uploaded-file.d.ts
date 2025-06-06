declare module Levelup {

  namespace V2 {
    /**
     * @description Service Storage
     */
    namespace Storage {
      /**
       * @description Service Api
       */
      export namespace Api {
        /**
         * --------------------------------------------------------------------------
         *                            Upload
         * --------------------------------------------------------------------------
         * @link
         * @fires UploadedFilesService.Upload
         * @param {Levelup.V2.Storage.Api.Upload.Request} query
         * @returns {Levelup.V2.Storage.Api.Upload.Response}
         * @method POST
         *
         */
        export namespace Upload {
          export type Request = FormData;
          export type Response = Utils.Api.Response.BuildSingleItemResponse<{
            files: Entity.UploadedFile[];
          }>;
        }
        /**
         * --------------------------------------------------------------------------
         *                            LoadRemote
         * --------------------------------------------------------------------------
         * @link
         * @fires UploadedFilesService.LoadRemote
         * @param {Levelup.V2.Storage.Api.LoadRemote.Request} query
         * @returns {Levelup.V2.Storage.Api.LoadRemote.Response}
         * @method POST
         *
         */
        export namespace LoadRemote {
          export type Request = Utils.Api.Request.BuildCreateRequest<{
            url: string;
          }>;
          export type Response =
            Utils.Api.Response.BuildSingleItemResponse<Entity.UploadedFile>;
        }

        export namespace UploadedFiles {
          /**
           * --------------------------------------------------------------------------
           *                            Create
           * --------------------------------------------------------------------------
           * @link
           * @fires UploadedFilesService.Create
           * @param {Levelup.V2.Storage.Api.UploadedFiles.Create.Request} query
           * @returns {Levelup.V2.Storage.Api.UploadedFiles.Create.Response}
           * @method POST
           *
           */
          export namespace Create {
            export type Request =
              Utils.Api.Request.BuildCreateRequest<Entity.UploadedFile>;
            export type Response =
              Utils.Api.Response.BuildSingleItemResponse<Entity.UploadedFile>;
          }

          /**
           * --------------------------------------------------------------------------
           *                            Update
           * --------------------------------------------------------------------------
           * @link
           * @fires UploadedFilesService.Update
           * @param {Levelup.V2.Storage.Api.UploadedFiles.Update.Request} query
           * @returns {Levelup.V2.Storage.Api.UploadedFiles.Update.Response}
           * @method PUT
           *
           */
          export namespace Update {
            export type Request =
              Utils.Api.Request.BuildUpdateRequest<Entity.UploadedFile>;
            export type Response =
              Utils.Api.Response.BuildSingleItemResponse<Entity.UploadedFile>;
          }

          /**
           * --------------------------------------------------------------------------
           *                            Delete
           * --------------------------------------------------------------------------
           * @link
           * @fires UploadedFilesService.Delete
           * @param {Levelup.V2.Storage.Api.UploadedFiles.Delete.Request} query
           * @returns {Levelup.V2.Storage.Api.UploadedFiles.Delete.Response}
           * @method DELETE
           *
           */
          export namespace Delete {
            export type Response = Utils.Api.Response.DefaultDeleteResponse;
          }

          /**
           * --------------------------------------------------------------------------
           *                            BulkDelete
           * --------------------------------------------------------------------------
           * @link
           * @fires UploadedFilesService.BulkDelete
           * @param {Levelup.V2.Storage.Api.UploadedFiles.BulkDelete.Request} query
           * @returns {Levelup.V2.Storage.Api.UploadedFiles.BulkDelete.Response}
           * @method DELETE
           *
           */
          export namespace BulkDelete {
            export type Request = Utils.Api.Request.Build<{
              data: {
                id?: string[];
                tracking_id?: string[];
              };
            }>;
            export type Response = Utils.Api.Response.DefaultDeleteResponse;
          }

          /**
           * --------------------------------------------------------------------------
           *                            GetOne
           * --------------------------------------------------------------------------
           * @link
           * @fires UploadedFilesService.GetOne
           * @param {Levelup.V2.Storage.Api.UploadedFiles.GetOne.Request} query
           * @returns {Levelup.V2.Storage.Api.UploadedFiles.GetOne.Response}
           * @method GET
           *
           */
          export namespace GetOne {
            type Scope = "";
            export type Request = Utils.Api.Request.Build<
              Record<string, unknown>
            >;
            export type Response =
              Utils.Api.Response.BuildSingleItemResponse<Entity.UploadedFile>;
          }

          /**
           * --------------------------------------------------------------------------
           *                            List
           * --------------------------------------------------------------------------
           * @link
           * @fires UploadedFilesService.List
           * @param {Levelup.V2.Storage.Api.UploadedFiles.List.Request} query
           * @returns {Levelup.V2.Storage.Api.UploadedFiles.List.Response}
           * @method GET
           *
           */
          export namespace List {
            type Scope = "listing" | "ids" | "trackings";

            export type Request =
              Utils.Api.Request.BuildSearchablePagedSortableFilterableProjectable<Entity.UploadedFile> & {
                scope?: Scope;
                filters?: {
                  /**
                   * Here will be the custom filters
                   */
                };
              };
            export type Response =
              Utils.Api.Response.BuildListResponse<Entity.UploadedFile>;
          }
        }
      }
    }
  }
}
