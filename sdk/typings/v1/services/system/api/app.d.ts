
/**
 * @description project
 */
declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace System {

        export namespace Api {

          export namespace Apps {

            /**
             * -------------------------------------------------------------------------- 
             *                            Create                           
             * -------------------------------------------------------------------------- 
             * @link
             * @fires AppsService.Create
             * @param {Levelup.V2.System.Api.Apps.Create.Request} query
             * @returns {Levelup.V2.System.Api.Apps.Create.Response}
             * @method POST
             *
             */
            export namespace Create {
              export type Request = Utils.Api.Request.BuildCreateRequest<Entity.App>;
              export type Response = Utils.Api.Response.BuildSingleItemResponse<Entity.App>;
            }


            /**
             * -------------------------------------------------------------------------- 
             *                            Update                           
             * -------------------------------------------------------------------------- 
             * @link
             * @fires AppsService.Update
             * @param {Levelup.V2.System.Api.Apps.Update.Request} query
             * @returns {Levelup.V2.System.Api.Apps.Update.Response}
             * @method PUT
             *
             */
            export namespace Update {
              export type Request = Utils.Api.Request.BuildUpdateRequest<Entity.App>;
              export type Response = Utils.Api.Response.BuildSingleItemResponse<Entity.App>;
            }

            /**
             * -------------------------------------------------------------------------- 
             *                            Delete                           
             * -------------------------------------------------------------------------- 
             * @link
             * @fires AppsService.Delete
             * @param {Levelup.V2.System.Api.Apps.Delete.Request} query
             * @returns {Levelup.V2.System.Api.Apps.Delete.Response}
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
             * @fires AppsService.BulkDelete
             * @param {Levelup.V2.System.Api.Apps.BulkDelete.Request} query
             * @returns {Levelup.V2.System.Api.Apps.BulkDelete.Response}
             * @method DELETE
             *
             */
            export namespace BulkDelete {
              export type Request = Utils.Api.Request.Build<{
                data: {
                  id?: string[];
                  tracking_id?: string[];
                }
              }>
              export type Response = Utils.Api.Response.DefaultDeleteResponse;
            }

            /**
             * -------------------------------------------------------------------------- 
             *                            GetOne                           
             * -------------------------------------------------------------------------- 
             * @link
             * @fires AppsService.GetOne
             * @param {Levelup.V2.System.Api.Apps.GetOne.Request} query
             * @returns {Levelup.V2.System.Api.Apps.GetOne.Response}
             * @method GET
             *
             */
            export namespace GetOne {
              type Scope = '';
              export type Request = Utils.Api.Request.Build<Record<string, unknown>>
              export type Response = Utils.Api.Response.BuildSingleItemResponse<Entity.App>
            }

            /**
             * -------------------------------------------------------------------------- 
             *                            List                           
             * -------------------------------------------------------------------------- 
             * @link
             * @fires AppsService.List
             * @param {Levelup.V2.System.Api.Apps.List.Request} query
             * @returns {Levelup.V2.System.Api.Apps.List.Response}
             * @method GET
             *
             */
            export namespace List {
              type Scope = 'listing' | 'ids' | 'trackings';

              export type Request = Utils.Api.Request.BuildSearchablePagedSortableFilterableProjectable<Entity.App> & {
                scope?: Scope;
                filters?: {
                  /**
                   * Here will be the custom filters
                   */
                };
              }
              export type Response = Utils.Api.Response.BuildListResponse<Entity.App>
            }
          }
        }
      }
    }
  }
}
