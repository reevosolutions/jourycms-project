declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Auth {
        export namespace Api {
          export namespace PermissionGroups {
            /**
             * --------------------------------------------------------------------------
             *                            Create
             * --------------------------------------------------------------------------
             * @link
             * @fires PermissionGroupsService.Create
             * @param {Levelup.V2.Auth.Api.PermissionGroups.Create.Request} query
             * @returns {Levelup.V2.Auth.Api.PermissionGroups.Create.Response}
             * @method POST
             *
             */
            export namespace Create {
              export type Request =
                Levelup.V2.Utils.Api.Request.BuildCreateRequest<Entity.PermissionGroup>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.PermissionGroup>;
            }
            /**
             * --------------------------------------------------------------------------
             *                            Update
             * --------------------------------------------------------------------------
             * @link
             * @fires PermissionGroupsService.Update
             * @param {Levelup.V2.Auth.Api.PermissionGroups.Update.Request} query
             * @returns {Levelup.V2.Auth.Api.PermissionGroups.Update.Response}
             * @method PUT
             *
             */
            export namespace Update {
              export type Request =
                Levelup.V2.Utils.Api.Request.BuildUpdateRequest<Entity.PermissionGroup>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.PermissionGroup>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            Delete
             * --------------------------------------------------------------------------
             * @link
             * @fires PermissionGroupsService.Delete
             * @param {Levelup.V2.Auth.Api.PermissionGroups.Delete.Request} query
             * @returns {Levelup.V2.Auth.Api.PermissionGroups.Delete.Response}
             * @method DELETE
             *
             */
            export namespace Delete {
              export type Response = Utils.Api.Response.DefaultDeleteResponse;
            }

            /**
             * --------------------------------------------------------------------------
             *                            Get
             * --------------------------------------------------------------------------
             * @link
             * @fires PermissionGroupsService.Get
             * @param {Levelup.V2.Auth.Api.PermissionGroups.GetOne.Request} query
             * @returns {Levelup.V2.Auth.Api.PermissionGroups.GetOne.Response}
             * @method GET
             *
             */
            export namespace GetOne {
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.PermissionGroup>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            List
             * --------------------------------------------------------------------------
             * @link
             * @fires PermissionGroupsService.List
             * @param {Levelup.V2.Auth.Api.PermissionGroups.List.Request} query
             * @returns {Levelup.V2.Auth.Api.PermissionGroups.List.Response}
             * @method GET
             *
             */
            export namespace List {
              export type Request =
                Levelup.V2.Utils.Api.Request.BuildSearchablePagedSortableFilterableProjectable<Entity.PermissionGroup>;
              export type Response =
                Utils.Api.Response.BuildListResponse<Entity.PermissionGroup>;
            }
          }
        }
      }
    }
  }
}
