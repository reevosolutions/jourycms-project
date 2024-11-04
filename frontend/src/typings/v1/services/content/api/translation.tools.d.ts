declare module Levelup {
  namespace CMS {
    namespace V1 {
      namespace Content {
        export namespace Translation {
          export namespace Api {
            export namespace Tools {
              export namespace InsertI18MissingKey {
                export type Request = Utils.Api.Request.BuildCreateRequest<{
                  project: string;
                  namespace: string;
                  key: string;
                  languages: Entity.TLanguageCode[];
                  default_language: Entity.TLanguageCode;
                }>;
                export type Response =
                  Utils.Api.Response.BuildSingleItemResponse<Entity.Item>;
              }
            }
            export namespace Insights {
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
