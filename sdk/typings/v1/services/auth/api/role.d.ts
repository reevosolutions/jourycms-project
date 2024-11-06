declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Auth {
        export namespace Api {
          export namespace Roles {
            /**
             * --------------------------------------------------------------------------
             *                            Create
             * --------------------------------------------------------------------------
             * @link
             * @fires RolesService.Create
             * @param {Levelup.V2.Auth.Api.Roles.Create.Request} query
             * @returns {Levelup.V2.Auth.Api.Roles.Create.Response}
             * @method POST
             *
             */
            export namespace Create {
              export type Request =
                Levelup.V2.Utils.Api.Request.BuildCreateRequest<Entity.Role>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.Role>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            Update
             * --------------------------------------------------------------------------
             * @link
             * @fires RolesService.Update
             * @param {Levelup.V2.Auth.Api.Roles.Update.Request} query
             * @returns {Levelup.V2.Auth.Api.Roles.Update.Response}
             * @method PUT
             *
             */
            export namespace Update {
              export type Request =
                Levelup.V2.Utils.Api.Request.BuildUpdateRequest<Entity.Role>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.Role>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            Delete
             * --------------------------------------------------------------------------
             * @link
             * @fires RolesService.Delete
             * @param {Levelup.V2.Auth.Api.Roles.Delete.Request} query
             * @returns {Levelup.V2.Auth.Api.Roles.Delete.Response}
             * @method DELETE
             *
             */
            export namespace Delete {
              export type Request = Levelup.V2.Utils.Api.Request.Build<
                Record<string, unknown>
              >;
              export type Response = Utils.Api.Response.DefaultDeleteResponse;
            }

            /**
             * --------------------------------------------------------------------------
             *                            Get
             * --------------------------------------------------------------------------
             * @link
             * @fires RolesService.Get
             * @param {Levelup.V2.Auth.Api.Roles.GetOne.Request} query
             * @returns {Levelup.V2.Auth.Api.Roles.GetOne.Response}
             * @method GET
             *
             */
            export namespace GetOne {
              export type GetRoleApScope = "";

              export type Request = Levelup.V2.Utils.Api.Request.Build<never>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.Role>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            List
             * --------------------------------------------------------------------------
             * @link
             * @fires RolesService.List
             * @param {Levelup.V2.Auth.Api.Roles.List.Request} query
             * @returns {Levelup.V2.Auth.Api.Roles.List.Response}
             * @method GET
             *
             */
            export namespace List {
              export type Scope = "";

              export type Request =
                Levelup.V2.Utils.Api.Request.BuildSearchablePagedSortableFilterableProjectable<Entity.Role>;
              export type Response =
                Utils.Api.Response.BuildListResponse<Entity.Role>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            AggregateUserCount
             * --------------------------------------------------------------------------
             * @link
             * @fires RolesService.AggregateUserCount
             * @param {Levelup.V2.Auth.Api.Roles.AggregateUserCount.Request} query
             * @returns {Levelup.V2.Auth.Api.Roles.AggregateUserCount.Response}
             * @method Get
             *
             */
            export namespace AggregateUserCount {
              export type Request = Levelup.V2.Utils.Api.Request.Build<
                Record<string, unknown>
              >;
              export type Response = Utils.Api.Response.DefaultResponse & {
                data?: {
                  [role: string]: number;
                };
              };
            }

            /**
             * --------------------------------------------------------------------------
             *                            MergeRoles
             * --------------------------------------------------------------------------
             * @method PUT
             * @link /roles/merge/:source_id/:destination_id
             * @fires RolesService.mergeRoles
             * @param {Levelup.V2.Auth.Api.Roles.MergeRoles.Request} query
             * @returns {Levelup.V2.Auth.Api.Roles.MergeRoles.Response}
             *
             */
            export namespace MergeRoles {
              export type Request = Levelup.V2.Utils.Api.Request.Build<never>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.Role>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            ChangePermissions
             * --------------------------------------------------------------------------
             * @method PUT
             * @link /api/v2/roles/:id/change-permissions
             * @fires RolesService.changePermissions
             * @param {Levelup.V2.Auth.Api.Roles.ChangePermissions.Request} query
             * @returns {Levelup.V2.Auth.Api.Roles.ChangePermissions.Response}
             *
             */
            export namespace ChangePermissions {
              export type Request =
                Levelup.V2.Utils.Api.Request.BuildUpdateRequest<{
                  role_id?: Utils.Common.ID;
                  permissions: Utils.Common.ID[];
                }>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.Role>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            ListUserPermissions
             * --------------------------------------------------------------------------
             * @method GET
             * @link /api/v2/roles/:id/permissions
             * @fires RolesService.listRolePermissions
             * @param {Levelup.V2.Auth.Api.Roles.ListRolePermissions.Request} query
             * @returns {Levelup.V2.Auth.Api.Roles.ListRolePermissions.Response}
             *
             */
            export namespace ListRolePermissions {
              export type Request = Levelup.V2.Utils.Api.Request.Build<
                Record<string, unknown>
              >;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<{
                  /**
                   * List of permission names
                   */
                  permissions: {
                    _id: Utils.Common.ID;
                    group: Utils.Common.ID;
                    name: string;
                  }[];
                  role: Entity.Role;
                }>;
            }
          }
        }
      }
    }
  }
}
