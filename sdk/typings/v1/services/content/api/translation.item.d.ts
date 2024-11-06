declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        export namespace Translation {
          /**
           * @description Service Entity
           */
          export namespace Api {
            export namespace Items {
              /* -------------------------------------------------------------------------- */
              /*                             InsertI18MissingKey                            */
              /* -------------------------------------------------------------------------- */
              export namespace InsertI18MissingKey {
                export type Request = Utils.Api.Request.Build<
                  Partial<{
                    project: string;
                    namespace: string;
                    key: string;
                    languages: Entity.TLanguageCode[];
                    default_language: Entity.TLanguageCode;
                  }>
                >;
                export type Response =
                  Utils.Api.Response.BuildSingleItemResponse<Entity.Item>;
              }

              /* -------------------------------------------------------------------------- */
              /*                            GetTranslationObject                            */
              /* -------------------------------------------------------------------------- */
              export namespace GetTranslationObject {
                export type Request = Utils.Api.Request.Build<
                  Partial<{
                    project_name: string;
                    namespace_name: string;
                    approved_only: boolean;
                    language: Entity.TLanguageCode;
                  }>
                >;
                export type Response =
                  Utils.Api.Response.BuildSingleItemResponse<{
                    [key: string]: string;
                  }>;
              }

              /**
               * --------------------------------------------------------------------------
               *                            Create
               * --------------------------------------------------------------------------
               * @link
               * @fires ItemsService.Create
               * @param {Levelup.CMS.V1.Translation.Api.Items.Create.Request} query
               * @returns {Levelup.CMS.V1.Translation.Api.Items.Create.Response}
               * @method POST
               *
               */
              export namespace Create {
                export type Request = Utils.Api.Request.BuildCreateRequest<
                  Entity.Item & {
                    translation_updates: {
                      [Lang in Entity.TLanguageCode]?: {
                        modified: boolean;
                        approvement_modified: boolean;
                        value: string;
                        approved: boolean | null;
                      };
                    };
                    comments: string;
                  }
                >;
                export type Response =
                  Utils.Api.Response.BuildSingleItemResponse<Entity.Item>;
              }

              /**
               * --------------------------------------------------------------------------
               *                            Update
               * --------------------------------------------------------------------------
               * @link
               * @fires ItemsService.Update
               * @param {Levelup.CMS.V1.Translation.Api.Items.Update.Request} query
               * @returns {Levelup.CMS.V1.Translation.Api.Items.Update.Response}
               * @method PUT
               *
               */
              export namespace Update {
                export type Request = Utils.Api.Request.BuildUpdateRequest<
                  Entity.Item & {
                    translation_updates: {
                      [Lang in Entity.TLanguageCode]?: {
                        modified: boolean;
                        approvement_modified: boolean;
                        value: string;
                        approved: boolean | null;
                      };
                    };
                    auto_translated: boolean;
                    comments: string;
                  }
                >;
                export type Response =
                  Utils.Api.Response.BuildSingleItemResponse<Entity.Item>;
              }

              /**
               * --------------------------------------------------------------------------
               *                            Delete
               * --------------------------------------------------------------------------
               * @link
               * @fires ItemsService.Delete
               * @param {Levelup.CMS.V1.Translation.Api.Items.Delete.Request} query
               * @returns {Levelup.CMS.V1.Translation.Api.Items.Delete.Response}
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
               * @fires ItemsService.BulkDelete
               * @param {Levelup.CMS.V1.Translation.Api.Items.BulkDelete.Request} query
               * @returns {Levelup.CMS.V1.Translation.Api.Items.BulkDelete.Response}
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
               * @fires ItemsService.GetOne
               * @param {Levelup.CMS.V1.Translation.Api.Items.GetOne.Request} query
               * @returns {Levelup.CMS.V1.Translation.Api.Items.GetOne.Response}
               * @method GET
               *
               */
              export namespace GetOne {
                type Scope = "";
                export type Request = Utils.Api.Request.Build<
                  Record<string, unknown>
                >;
                export type Response =
                  Utils.Api.Response.BuildSingleItemResponse<Entity.Item>;
              }

              /**
               * --------------------------------------------------------------------------
               *                            List
               * --------------------------------------------------------------------------
               * @link
               * @fires ItemsService.List
               * @param {Levelup.CMS.V1.Translation.Api.Items.List.Request} query
               * @returns {Levelup.CMS.V1.Translation.Api.Items.List.Response}
               * @method GET
               *
               */
              export namespace List {
                type Scope = "listing" | "ids" | "trackings";

                export type Request =
                  Utils.Api.Request.BuildSearchablePagedSortableFilterableProjectable<Entity.Item> & {
                    updated_by?: string;
                    created_by?: string;
                    scope?: Scope;
                    filters?: {
                      /**
                       * Here will be the custom filters
                       */
                    };
                  };
                export type Response =
                  Utils.Api.Response.BuildListResponse<Entity.Item>;
              }
            }
          }
        }
      }
    }
  }
}
