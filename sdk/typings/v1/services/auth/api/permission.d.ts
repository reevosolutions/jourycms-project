declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Auth {
        export namespace Api {
          export namespace Permissions {
            /**
             * --------------------------------------------------------------------------
             *                            Create
             * --------------------------------------------------------------------------
             * @link
             * @fires RolesService.Create
             * @param {Levelup.CMS.V1.Auth.Api.Permissions.Create.Request} query
             * @returns {Levelup.CMS.V1.Auth.Api.Permissions.Create.Response}
             * @method POST
             *
             */
            export namespace Create {
              export type Request =
                Levelup.CMS.V1.Utils.Api.Request.BuildCreateRequest<Entity.Permission>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.Permission>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            Update
             * --------------------------------------------------------------------------
             * @link
             * @fires PermissionService.Update
             * @param {Levelup.CMS.V1.Auth.Api.Permissions.Update.Request} query
             * @returns {Levelup.CMS.V1.Auth.Api.Permissions.Update.Response}
             * @method PUT
             *
             */
            export namespace Update {
              export type Request =
                Levelup.CMS.V1.Utils.Api.Request.BuildUpdateRequest<Entity.Permission>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.Permission>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            Delete
             * --------------------------------------------------------------------------
             * @link
             * @fires PermissionService.Delete
             * @param {Levelup.CMS.V1.Auth.Api.Permissions.Delete.Request} query
             * @returns {Levelup.CMS.V1.Auth.Api.Permissions.Delete.Response}
             * @method DELETE
             *
             */
            export namespace Delete {
              export type Response = Utils.Api.Response.DefaultDeleteResponse;
            }

            /**
             * --------------------------------------------------------------------------
             *                            One
             * --------------------------------------------------------------------------
             * @link
             * @fires PermissionService.One
             * @param {Levelup.CMS.V1.Auth.Api.Permissions.GetOne.Request} query
             * @returns {Levelup.CMS.V1.Auth.Api.Permissions.GetOne.Response}
             * @method GET
             *
             */
            export namespace GetOne {
              export type Scope = "";

              export type Request = Levelup.CMS.V1.Utils.Api.Request.Build<never>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.Permission>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            List
             * --------------------------------------------------------------------------
             * @link
             * @fires PermissionService.List
             * @param {Levelup.CMS.V1.Auth.Api.Permissions.List.Request} query
             * @returns {Levelup.CMS.V1.Auth.Api.Permissions.List.Response}
             * @method GET
             *
             */
            export namespace List {
              export type Scope = "";

              export type Request =
                Levelup.CMS.V1.Utils.Api.Request.BuildSearchablePagedSortableFilterableProjectable<Entity.Permission>;
              export type Response =
                Utils.Api.Response.BuildListResponse<Entity.Permission>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            AssignPermissionToUser
             * --------------------------------------------------------------------------
             * @link
             * @fires PermissionService.AssignPermissionToUser
             * @param {Levelup.CMS.V1.Auth.Api.Permissions.AssignPermissionToUser.Request} query
             * @returns {Levelup.CMS.V1.Auth.Api.Permissions.AssignPermissionToUser.Response}
             * @method POST
             *
             */
            export namespace AssignPermissionToUser {
              export type Request = Levelup.CMS.V1.Utils.Api.Request.Build<{
                permissions: {
                  group: string;
                  permissions: string[];
                }[];
                roles: {
                  role: string;
                  permissions: string[];
                }[];
              }>;
              export type Response = Utils.Api.Response.DefaultResponse & {
                permissions?: Entity.Permission[];
              };
            }
          }
        }
      }
    }
  }
}
