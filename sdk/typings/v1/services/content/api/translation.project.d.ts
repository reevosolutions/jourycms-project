declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        export namespace Translation {
          /**
           * @description Service Entity
           */
          export namespace Api {
            export namespace Projects {
              /**
               * --------------------------------------------------------------------------
               *                            Create
               * --------------------------------------------------------------------------
               * @link
               * @fires ProjectsService.Create
               * @param {Levelup.CMS.V1.Translation.Api.Projects.Create.Request} query
               * @returns {Levelup.CMS.V1.Translation.Api.Projects.Create.Response}
               * @method POST
               *
               */
              export namespace Create {
                export type Request =
                  Utils.Api.Request.BuildCreateRequest<Entity.Project>;
                export type Response =
                  Utils.Api.Response.BuildSingleItemResponse<Entity.Project>;
              }

              /**
               * --------------------------------------------------------------------------
               *                            Update
               * --------------------------------------------------------------------------
               * @link
               * @fires ProjectsService.Update
               * @param {Levelup.CMS.V1.Translation.Api.Projects.Update.Request} query
               * @returns {Levelup.CMS.V1.Translation.Api.Projects.Update.Response}
               * @method PUT
               *
               */
              export namespace Update {
                export type Request =
                  Utils.Api.Request.BuildUpdateRequest<Entity.Project>;
                export type Response =
                  Utils.Api.Response.BuildSingleItemResponse<Entity.Project>;
              }

              /**
               * --------------------------------------------------------------------------
               *                            Delete
               * --------------------------------------------------------------------------
               * @link
               * @fires ProjectsService.Delete
               * @param {Levelup.CMS.V1.Translation.Api.Projects.Delete.Request} query
               * @returns {Levelup.CMS.V1.Translation.Api.Projects.Delete.Response}
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
               * @fires ProjectsService.BulkDelete
               * @param {Levelup.CMS.V1.Translation.Api.Projects.BulkDelete.Request} query
               * @returns {Levelup.CMS.V1.Translation.Api.Projects.BulkDelete.Response}
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
               * @fires ProjectsService.GetOne
               * @param {Levelup.CMS.V1.Translation.Api.Projects.GetOne.Request} query
               * @returns {Levelup.CMS.V1.Translation.Api.Projects.GetOne.Response}
               * @method GET
               *
               */
              export namespace GetOne {
                type Scope = "";
                export type Request = Utils.Api.Request.Build<
                  Record<string, unknown>
                >;
                export type Response =
                  Utils.Api.Response.BuildSingleItemResponse<Entity.Project>;
              }

              /**
               * --------------------------------------------------------------------------
               *                            List
               * --------------------------------------------------------------------------
               * @link
               * @fires ProjectsService.List
               * @param {Levelup.CMS.V1.Translation.Api.Projects.List.Request} query
               * @returns {Levelup.CMS.V1.Translation.Api.Projects.List.Response}
               * @method GET
               *
               */
              export namespace List {
                type Scope = "listing" | "ids" | "trackings";

                export type Request =
                  Utils.Api.Request.BuildSearchablePagedSortableFilterableProjectable<Entity.Project> & {
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
                  Utils.Api.Response.BuildListResponse<Entity.Project>;
              }

              export namespace GetTranslationProgress {
                export type Request = Utils.Api.Request.Build<
                  Partial<{
                    project: string;
                  }>
                >;
                export type Response =
                  Utils.Api.Response.BuildSingleItemResponse<{
                    total: number;
                    translated: number;
                    approved: number;

                    languages: {
                      [language: Entity.TLanguageCode]: {
                        translated: number;
                      };
                    };

                    namespaces: {
                      [namespace: string]: {
                        total: number;
                        translated: number;
                        approved: number;
                      };
                    };

                    by_date: {
                      [day: string]: {
                        translated: number;
                        approved: number;
                      };
                    };

                    users: {
                      [user: string]: {
                        total: number;
                        translated: number;
                        approved: number;
                      };
                    };

                    users_activity: {
                      [user: string]: {
                        day: string;
                        updates: number;
                      }[];
                    };

                    meta_data: {
                      users: {
                        [user: string]: Utils.Entity.Snapshots.Auth.User;
                      };
                      namespaces: {
                        [namespace: string]: string;
                      };
                    };
                  }>;
              }
            }
          }
        }
      }
    }
  }
}
