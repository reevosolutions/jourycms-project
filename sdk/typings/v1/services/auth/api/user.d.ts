declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Users {
        export namespace Api {
          export namespace Users {
            /**
             * --------------------------------------------------------------------------
             *                            Create
             * --------------------------------------------------------------------------
             * @link
             * @fires UsersService.Create
             * @param {Levelup.CMS.V1.Users.Api.Users.Create.Request} query
             * @returns {Levelup.CMS.V1.Users.Api.Users.Create.Response}
             * @method POST
             *
             */
            export namespace Create {
              export type Request =
                Levelup.CMS.V1.Utils.Api.Request.BuildCreateRequest<Entity.User>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.ExposedUser>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            Update
             * --------------------------------------------------------------------------
             * @link
             * @fires UsersService.Update
             * @param {Levelup.CMS.V1.Users.Api.Users.Update.Request} query
             * @returns {Levelup.CMS.V1.Users.Api.Users.Update.Response}
             * @method PUT
             *
             */
            export namespace Update {
              export type Request =
                Levelup.CMS.V1.Utils.Api.Request.BuildUpdateRequest<Entity.User>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.ExposedUser>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            UpdateProfile
             * --------------------------------------------------------------------------
             * @link
             * @fires UsersService.UpdateProfile
             * @param {Levelup.CMS.V1.Users.Api.Users.UpdateProfile.Request} query
             * @returns {Levelup.CMS.V1.Users.Api.Users.UpdateProfile.Response}
             * @method PUT
             * @link /profile/:id
             *
             */
            export namespace UpdateProfile {
              export type Request =
                Levelup.CMS.V1.Utils.Api.Request.BuildUpdateRequest<
                  Entity.User["profile"]
                >;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.ExposedUser>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            UpdatePreferences
             * --------------------------------------------------------------------------
             * @link
             * @fires UsersService.UpdatePreferences
             * @param {Levelup.CMS.V1.Users.Api.Users.UpdatePreferences.Request} query
             * @returns {Levelup.CMS.V1.Users.Api.Users.UpdatePreferences.Response}
             * @method PUT
             * @link /preferences/:id
             *
             */
            export namespace UpdatePreferences {
              export type Request =
                Levelup.CMS.V1.Utils.Api.Request.BuildUpdateRequest<
                  Entity.User["preferences"]
                >;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.ExposedUser>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            UpdateLoginInfo
             * --------------------------------------------------------------------------
             * @method PUT
             * @link /api/v2/users/:id/update-login-info
             * @fires UsersService.updateLoginInfo
             * @param {Levelup.CMS.V1.Users.Api.Users.UpdateLoginInfo.Request} query
             * @returns {Levelup.CMS.V1.Users.Api.Users.UpdateLoginInfo.Response}
             *
             */
            export namespace UpdateLoginInfo {
              export type Request =
                Levelup.CMS.V1.Utils.Api.Request.BuildUpdateRequest<{
                  email: string | undefined;
                  password: string;
                }>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.ExposedUser>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            UpdateSettings
             * --------------------------------------------------------------------------
             * @link
             * @fires UsersService.UpdateSettings
             * @param {Levelup.CMS.V1.Users.Api.Users.UpdateSettings.Request} query
             * @returns {Levelup.CMS.V1.Users.Api.Users.UpdateSettings.Response}
             * @method PUT
             *
             */
            export namespace UpdateSettings {
              export type Request =
                Levelup.CMS.V1.Utils.Api.Request.BuildUpdateRequest<{
                  userPreferences?: Partial<Entity.IUserPreferences>;
                  delivererSettings?: Entity.IDelivererSettings;
                }>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<{
                  userPreferences?: Partial<Entity.IUserPreferences>;
                  delivererSettings?: Entity.IDelivererSettings;
                }>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            Delete
             * --------------------------------------------------------------------------
             * @link
             * @fires UsersService.Delete
             * @param {Levelup.CMS.V1.Users.Api.Users.Delete.Request} query
             * @returns {Levelup.CMS.V1.Users.Api.Users.Delete.Response}
             * @method DELETE
             *
             */
            export namespace Delete {
              export type Request = Levelup.CMS.V1.Utils.Api.Request.Build<
                Record<string, never>
              >;
              export type Response = Utils.Api.Response.DefaultDeleteResponse;
            }

            /**
             * --------------------------------------------------------------------------
             *                            BulkDelete
             * --------------------------------------------------------------------------
             * @link
             * @fires UsersService.BulkDelete
             * @param {Levelup.CMS.V1.Users.Api.Users.BulkDelete.Request} query
             * @returns {Levelup.CMS.V1.Users.Api.Users.BulkDelete.Response}
             * @method DELETE
             *
             */
            export namespace BulkDelete {
              export type Request = Levelup.CMS.V1.Utils.Api.Request.Build<{
                items: string[];
                hard?: boolean;
              }>;
              export type Response = Utils.Api.Response.DefaultDeleteResponse;
            }

            /**
             * --------------------------------------------------------------------------
             *                            one
             * --------------------------------------------------------------------------
             * @method GET
             * @link /api/v2/users/:id
             * @fires UsersService.One
             * @param {Levelup.CMS.V1.Users.Api.Users.GetOne.Request} query
             * @returns {Levelup.CMS.V1.Users.Api.Users.GetOne.Response}
             *
             */
            export namespace GetOne {
              export type Scope = "autocomplete";

              export type Request = Levelup.CMS.V1.Utils.Api.Request.Build<
                Record<string, unknown>
              >;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.ExposedUser>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            List
             * --------------------------------------------------------------------------
             * @link
             * @fires UsersService.List
             * @param {Levelup.CMS.V1.Users.Api.Users.List.Request} query
             * @returns {Levelup.CMS.V1.Users.Api.Users.List.Response}
             * @method GET
             *
             */
            export namespace List {
              export type Scope = "";

              export type Request =
                Levelup.CMS.V1.Utils.Api.Request.BuildSearchablePagedSortableFilterableProjectable<Entity.ExposedUser> & {
                  filters?: {
                    store?: Utils.Common.ID | Utils.Common.ID[];
                    office?: Utils.Common.ID | Utils.Common.ID[];
                    country?: Utils.Common.ID | Utils.Common.ID[];
                    state?: Utils.Common.ID | Utils.Common.ID[];
                    city?: Utils.Common.ID | Utils.Common.ID[];
                  };
                };
              export type Response = Utils.Api.Response.BuildListResponse<
                Entity.ExposedUser,
                "companies" | "stores"
              >;
            }

            /**
             * --------------------------------------------------------------------------
             *                            ChangeRole
             * --------------------------------------------------------------------------
             * @method PUT
             * @link /api/v2/users/:id/change-role
             * @fires UsersService.ChangeRole
             * @param {Levelup.CMS.V1.Users.Api.Users.ChangeRole.Request} query
             * @returns {Levelup.CMS.V1.Users.Api.Users.ChangeRole.Response}
             *
             */
            export namespace ChangeRole {
              export type Request =
                Levelup.CMS.V1.Utils.Api.Request.BuildUpdateRequest<{
                  user_id?: Utils.Common.ID;
                  /**
                   * Role name or ID
                   */
                  role: string;
                }>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.ExposedUser>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            ChangePermissions
             * --------------------------------------------------------------------------
             * @method PUT
             * @link /api/v2/users/:id/change-permissions
             * @fires Service.ChangePermissions
             * @param {Levelup.CMS.V1.Users.Api.Users.ChangePermissions.Request} query
             * @returns {Levelup.CMS.V1.Users.Api.Users.ChangePermissions.Response}
             *
             */
            export namespace ChangePermissions {
              export type Request =
                Levelup.CMS.V1.Utils.Api.Request.BuildUpdateRequest<{
                  user_id?: Utils.Common.ID;
                  permissions: Utils.Common.ID[];
                }>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.ExposedUser>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            ChangeSuspendStatus
             * --------------------------------------------------------------------------
             * @method PUT
             * @link /api/v2/users/:id/change-suspend-status
             * @fires Service.ChangeSuspendStatus
             * @param {Levelup.CMS.V1.Users.Api.Users.ChangeSuspendStatus.Request} query
             * @returns {Levelup.CMS.V1.Users.Api.Users.ChangeSuspendStatus.Response}
             *
             */
            export namespace ChangeSuspendStatus {
              export type Request =
                Levelup.CMS.V1.Utils.Api.Request.BuildUpdateRequest<never>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<Entity.ExposedUser>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            SetLastManagedStore
             * --------------------------------------------------------------------------
             * @method PUT
             * @link /api/v2/users/set-last-managed-store
             * @fires Service.SetLastManagedStore
             * @param {Levelup.CMS.V1.Users.Api.Users.SetLastManagedStore.Request} query
             * @returns {Levelup.CMS.V1.Users.Api.Users.SetLastManagedStore.Response}
             *
             */
            export namespace SetLastManagedStore {
              export type Request =
                Levelup.CMS.V1.Utils.Api.Request.BuildUpdateRequest<{
                  store_id: Utils.Common.ID;
                }>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<{}>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            SetLastManagedOffice
             * --------------------------------------------------------------------------
             * @method PUT
             * @link /api/v2/users/set-last-managed-office
             * @fires Service.SetLastManagedOffice
             * @param {Levelup.CMS.V1.Users.Api.Users.SetLastManagedOffice.Request} query
             * @returns {Levelup.CMS.V1.Users.Api.Users.SetLastManagedOffice.Response}
             *
             */
            export namespace SetLastManagedOffice {
              export type Request =
                Levelup.CMS.V1.Utils.Api.Request.BuildUpdateRequest<{
                  office1_id: Utils.Common.ID;
                }>;
              export type Response =
                Utils.Api.Response.BuildSingleItemResponse<{}>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            ListUserPermissions
             * --------------------------------------------------------------------------
             * @method GET
             * @link /api/v2/users/:id/permissions
             * @fires UsersService.listUserPermissions
             * @param {Levelup.CMS.V1.Users.Api.Users.ListUserPermissions.Request} query
             * @returns {Levelup.CMS.V1.Users.Api.Users.ListUserPermissions.Response}
             *
             */
            export namespace ListUserPermissions {
              export type Request = Levelup.CMS.V1.Utils.Api.Request.Build<
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
                  user: Entity.ExposedUser;
                }>;
            }

            /**
             * --------------------------------------------------------------------------
             *                            GetInsightsHierarchySnapshotList
             * --------------------------------------------------------------------------
             * @link
             * @fires UsersService.GetInsightsHierarchySnapshotList
             * @param {Levelup.CMS.V1.Users.Api.Users.GetInsightsHierarchySnapshotList.Request}
             * @returns {Levelup.CMS.V1.Users.Api.Users.GetInsightsHierarchySnapshotList.Response}
             */
            export namespace GetInsightsHierarchySnapshotList {
              export type Request = Levelup.CMS.V1.Utils.Api.Request.Build<
                Record<string, unknown>
              >;
              type ItemDatum = {
                _id: Utils.Common.ID;
                tr: string;
                dl: boolean;
                usr: string | null;
                cr: Date;
                fst: string | null;
                fml: string | null;
                r: string;
                p: string | null;
                c?: string | null;
                sn?: string | null;
                st?: string | null;
              };
              export type Response = Utils.Api.Response.DefaultResponse & {
                data?: {
                  data?: ItemDatum[];
                  last_update?: Date;
                  found: boolean;
                  expired: boolean;
                };
              };
            }


            /**
             * --------------------------------------------------------------------------
             *                            aggregateByRoles
             * --------------------------------------------------------------------------
             * @link
             * @fires ArticlesService.aggregateByRoles
             * @param {Levelup.CMS.V1.Api.Articles.AggregateByRoles.Request} query
             * @returns {Levelup.CMS.V1.Api.Articles.AggregateByRoles.Response}
             * @method GET
             *
             */
            export namespace AggregateByRoles {
              export type Request = Utils.Api.Request.Build<{}>;
              export type Response =Utils.Api.Response.BuildListResponse<{
                  role: string;
                  count: number;
                }>;
            }


            
          }
        }
      }
    }
  }
}
