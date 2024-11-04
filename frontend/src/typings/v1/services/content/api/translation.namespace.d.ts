declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        export namespace Translation {
          /**
           * @description Service Entity
           */
          export namespace Api {
            export namespace Namespaces {
              /**
               * --------------------------------------------------------------------------
               *                            Create
               * --------------------------------------------------------------------------
               * @link
               * @fires NamespacesService.Create
               * @param {Levelup.CMS.V1.Translation.Api.Namespaces.Create.Request} query
               * @returns {Levelup.CMS.V1.Translation.Api.Namespaces.Create.Response}
               * @method POST
               *
               */
              export namespace Create {
                export type Request =
                  Utils.Api.Request.BuildCreateRequest<Entity.Namespace>;
                export type Response =
                  Utils.Api.Response.BuildSingleItemResponse<Entity.Namespace>;
              }

              /**
               * --------------------------------------------------------------------------
               *                            Update
               * --------------------------------------------------------------------------
               * @link
               * @fires NamespacesService.Update
               * @param {Levelup.CMS.V1.Translation.Api.Namespaces.Update.Request} query
               * @returns {Levelup.CMS.V1.Translation.Api.Namespaces.Update.Response}
               * @method PUT
               *
               */
              export namespace Update {
                export type Request =
                  Utils.Api.Request.BuildUpdateRequest<Entity.Namespace>;
                export type Response =
                  Utils.Api.Response.BuildSingleItemResponse<Entity.Namespace>;
              }

              /**
               * --------------------------------------------------------------------------
               *                            Delete
               * --------------------------------------------------------------------------
               * @link
               * @fires NamespacesService.Delete
               * @param {Levelup.CMS.V1.Translation.Api.Namespaces.Delete.Request} query
               * @returns {Levelup.CMS.V1.Translation.Api.Namespaces.Delete.Response}
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
               * @fires NamespacesService.BulkDelete
               * @param {Levelup.CMS.V1.Translation.Api.Namespaces.BulkDelete.Request} query
               * @returns {Levelup.CMS.V1.Translation.Api.Namespaces.BulkDelete.Response}
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
               * @fires NamespacesService.GetOne
               * @param {Levelup.CMS.V1.Translation.Api.Namespaces.GetOne.Request} query
               * @returns {Levelup.CMS.V1.Translation.Api.Namespaces.GetOne.Response}
               * @method GET
               *
               */
              export namespace GetOne {
                type Scope = "";
                export type Request = Utils.Api.Request.Build<
                  Record<string, unknown>
                >;
                export type Response =
                  Utils.Api.Response.BuildSingleItemResponse<Entity.Namespace>;
              }

              /**
               * --------------------------------------------------------------------------
               *                            List
               * --------------------------------------------------------------------------
               * @link
               * @fires NamespacesService.List
               * @param {Levelup.CMS.V1.Translation.Api.Namespaces.List.Request} query
               * @returns {Levelup.CMS.V1.Translation.Api.Namespaces.List.Response}
               * @method GET
               *
               */
              export namespace List {
                type Scope = "listing" | "ids" | "trackings";

                export type Request =
                  Utils.Api.Request.BuildSearchablePagedSortableFilterableProjectable<Entity.Namespace> & {
                    scope?: Scope;
                    filters?: {
                      /**
                       * Here will be the custom filters
                       */
                    };
                  };
                export type Response =
                  Utils.Api.Response.BuildListResponse<Entity.Namespace>;
              }
            }
          }
        }
      }
    }
  }
}
