declare class EventDispatcher {
  private handlers;
  remove(eventName: string): void;
  remove(eventNames: string[]): void;
  remove(callback: (data: any) => void): void;
  detach(detachFrom: any, eventName?: string): void;
  detach(detachFrom: any, eventNames?: string[]): void;
  detach(detachFrom: any, callback?: (data: any) => void): void;
  attach(attachTo: any, eventName: string, callback: (data: any) => void): void;
  attach(
    attachTo: any,
    eventNames: string[],
    callback: (data: any) => void
  ): void;
  on(eventName: string, callback: (data: any) => void): void;
  on(eventNames: string[], callback: (data: any) => void): void;
  dispatch<T = any>(eventName: string, data: T): void;
  dispatch<T = any>(eventNames: string[], data: T): void;
}

/**
 * @description project levelup
 */
declare module Levelup {
  export namespace CMS {
    export namespace V1 {
      /**
       * @description Service
       */
      export namespace Events {
        export namespace Payloads {
          
          /* -------------------------------------------------------------------------- */
          /*                                    AUTH                                    */
          /* -------------------------------------------------------------------------- */

          export namespace Users {
            export namespace User {
              export type created = {
                data: Partial<Levelup.V2.Users.Entity.ExposedUser>;
              };
              export type updated = {
                data: Partial<Levelup.V2.Users.Entity.ExposedUser>;
              };
              export type deleted = {
                data: Partial<Levelup.V2.Users.Entity.ExposedUser>;
              };
              export type restored = {
                data: Partial<Levelup.V2.Users.Entity.ExposedUser>;
              };
              export type roleChanged = {
                data: Partial<Levelup.V2.Users.Entity.ExposedUser>;
              };
              export type permissionsChanged = {
                data: Partial<Levelup.V2.Users.Entity.ExposedUser>;
              };
              export type attributeCompany = {
                data: Partial<Levelup.V2.Users.Entity.ExposedUser>;
                company: Levelup.V2.Accounts.Entity.Company;
              };
              export type attributeStore = {
                data: Partial<Levelup.V2.Users.Entity.ExposedUser>;
                store_id: Levelup.V2.Accounts.Entity.Store;
              };
              export type removeStore = {
                data: Partial<Levelup.V2.Users.Entity.ExposedUser>;
                store_id: string;
              };
              export type suspendStatusChanged = {
                suspended: boolean;
                data: Partial<Levelup.V2.Users.Entity.ExposedUser>;
              };
              export type loginInfoUpdated = {
                data: Partial<Levelup.V2.Users.Entity.ExposedUser>;
              };
            }
          }

          export namespace Auth {
            export type login = { data: Levelup.V2.Users.Entity.ExposedUser };
            export type register = { data: Levelup.V2.Users.Entity.ExposedUser };
            export type logout = { data: Levelup.V2.Users.Entity.ExposedUser };
            export type restored = { data: Levelup.V2.Users.Entity.ExposedUser };

            export namespace ApiKey {
              export type created = {
                data: Partial<Levelup.V2.Auth.Entity.ApiKey>;
              };
              export type updated = {
                data: Partial<Levelup.V2.Auth.Entity.ApiKey>;
              };
              export type deleted = {
                data: Partial<Levelup.V2.Auth.Entity.ApiKey>;
              };
              export type restored = {
                data: Partial<Levelup.V2.Auth.Entity.ApiKey>;
              };
              export type enableStatusChanged = {
                enabled: boolean;
                data: Partial<Levelup.V2.Auth.Entity.ApiKey>;
              };
            }

            export namespace Role {
              export type created = {
                data: Partial<Levelup.V2.Auth.Entity.Role>;
              };
              export type updated = {
                data: Partial<Levelup.V2.Auth.Entity.Role>;
              };
              export type deleted = {
                data: Partial<Levelup.V2.Auth.Entity.Role>;
              };
              export type restored = {
                data: Partial<Levelup.V2.Auth.Entity.Role>;
              };
              export type permissionsChanged = {
                data: Partial<Levelup.V2.Auth.Entity.Role>;
              };
              export type addUser = {
                data: Partial<Levelup.V2.Auth.Entity.Role>;
              };
            }

            export namespace Permission {
              export type created = {
                data: Partial<Levelup.V2.Auth.Entity.Permission>;
              };
              export type updated = {
                data: Partial<Levelup.V2.Auth.Entity.Permission>;
              };
              export type deleted = {
                data: Partial<Levelup.V2.Auth.Entity.Permission>;
              };
              export type restored = {
                data: Partial<Levelup.V2.Auth.Entity.Permission>;
              };
              export type addRole = {
                data: Partial<Levelup.V2.Auth.Entity.Permission>;
              };
              export type addUser = {
                data: Partial<Levelup.V2.Auth.Entity.Permission>;
              };
              export type permissionListUpdated = {
                data: Partial<Levelup.V2.Auth.Entity.Permission>[];
              };
            }
            export namespace PermissionGroup {
              export type created = {
                data: Partial<Levelup.V2.Auth.Entity.PermissionGroup>;
              };
              export type updated = {
                data: Partial<Levelup.V2.Auth.Entity.PermissionGroup>;
              };
              export type deleted = {
                data: Partial<Levelup.V2.Auth.Entity.PermissionGroup>;
              };
              export type restored = {
                data: Partial<Levelup.V2.Auth.Entity.PermissionGroup>;
              };
            }
          }

          /* -------------------------------------------------------------------------- */
          /*                                     CM                                     */
          /* -------------------------------------------------------------------------- */
          export namespace Content {
            export namespace Comment {
              export type created = {
                data: Partial<Levelup.V2.Cm.Entity.Comment>;
              };
              export type updated = {
                data: Partial<Levelup.V2.Cm.Entity.Comment>;
              };
              export type deleted = {
                data: Partial<Levelup.V2.Cm.Entity.Comment>;
              };
              export type restored = {
                data: Partial<Levelup.V2.Cm.Entity.Comment>;
              };
            }
            export namespace Review {
              export type created = {
                data: Partial<Levelup.V2.Cm.Entity.Review>;
              };
              export type updated = {
                data: Partial<Levelup.V2.Cm.Entity.Review>;
              };
              export type deleted = {
                data: Partial<Levelup.V2.Cm.Entity.Review>;
              };
              export type restored = {
                data: Partial<Levelup.V2.Cm.Entity.Review>;
              };
            }
            export namespace Article {
              export type created = {
                data: Partial<Levelup.V2.Cm.Entity.Article>;
              };
              export type updated = {
                data: Partial<Levelup.V2.Cm.Entity.Article>;
              };
              export type deleted = {
                data: Partial<Levelup.V2.Cm.Entity.Article>;
              };
              export type restored = {
                data: Partial<Levelup.V2.Cm.Entity.Article>;
              };
            }
            export namespace ArticleType {
              export type created = {
                data: Partial<Levelup.V2.Cm.Entity.ArticleType>;
              };
              export type updated = {
                data: Partial<Levelup.V2.Cm.Entity.ArticleType>;
              };
              export type deleted = {
                data: Partial<Levelup.V2.Cm.Entity.ArticleType>;
              };
              export type restored = {
                data: Partial<Levelup.V2.Cm.Entity.ArticleType>;
              };
            }
            export namespace Term {
              export type created = { data: Partial<Levelup.V2.Cm.Entity.Term> };
              export type updated = { data: Partial<Levelup.V2.Cm.Entity.Term> };
              export type deleted = { data: Partial<Levelup.V2.Cm.Entity.Term> };
              export type restored = { data: Partial<Levelup.V2.Cm.Entity.Term> };
            }
            export namespace Taxonomy {
              export type created = {
                data: Partial<Levelup.V2.Cm.Entity.Taxonomy>;
              };
              export type updated = {
                data: Partial<Levelup.V2.Cm.Entity.Taxonomy>;
              };
              export type deleted = {
                data: Partial<Levelup.V2.Cm.Entity.Taxonomy>;
              };
              export type restored = {
                data: Partial<Levelup.V2.Cm.Entity.Taxonomy>;
              };
            }
            export namespace Translation {
              export namespace Item {
                export type created = {
                  data: Partial<Levelup.V2.Cm.Translation.Entity.Item>;
                };
                export type updated = {
                  data: Partial<Levelup.V2.Cm.Translation.Entity.Item>;
                };
                export type deleted = {
                  data: Partial<Levelup.V2.Cm.Translation.Entity.Item>;
                };
                export type restored = {
                  data: Partial<Levelup.V2.Cm.Translation.Entity.Item>;
                };
              }
              export namespace Project {
                export type created = {
                  data: Partial<Levelup.V2.Cm.Translation.Entity.Project>;
                };
                export type updated = {
                  data: Partial<Levelup.V2.Cm.Translation.Entity.Project>;
                };
                export type deleted = {
                  data: Partial<Levelup.V2.Cm.Translation.Entity.Project>;
                };
                export type restored = {
                  data: Partial<Levelup.V2.Cm.Translation.Entity.Project>;
                };
              }
              export namespace Namespace {
                export type created = {
                  data: Partial<Levelup.V2.Cm.Translation.Entity.Namespace>;
                };
                export type updated = {
                  data: Partial<Levelup.V2.Cm.Translation.Entity.Namespace>;
                };
                export type deleted = {
                  data: Partial<Levelup.V2.Cm.Translation.Entity.Namespace>;
                };
                export type restored = {
                  data: Partial<Levelup.V2.Cm.Translation.Entity.Namespace>;
                };
              }
            }
          }

          /* -------------------------------------------------------------------------- */
          /*                                   STORAGE                                  */
          /* -------------------------------------------------------------------------- */
          export namespace Storage {
            export namespace UploadedFile {
              export type created = {
                data: Partial<Levelup.V2.Storage.Entity.UploadedFile>;
              };
              export type updated = {
                data: Partial<Levelup.V2.Storage.Entity.UploadedFile>;
              };
              export type deleted = {
                data: Partial<Levelup.V2.Storage.Entity.UploadedFile>;
              };
              export type restored = {
                data: Partial<Levelup.V2.Storage.Entity.UploadedFile>;
              };
            }
          }

          /* -------------------------------------------------------------------------- */
          /*                                   SYSTEM                                   */
          /* -------------------------------------------------------------------------- */
          export namespace System {
            export namespace App {
              export type created = {
                data: Partial<Levelup.V2.System.Entity.App>;
              };
              export type updated = {
                data: Partial<Levelup.V2.System.Entity.App>;
              };
              export type deleted = {
                data: Partial<Levelup.V2.System.Entity.App>;
              };
              export type restored = {
                data: Partial<Levelup.V2.System.Entity.App>;
              };
              export type disabled = {
                data: Partial<Levelup.V2.System.Entity.App>;
              };
              export type enabled = {
                data: Partial<Levelup.V2.System.Entity.App>;
              };
            }
          }
        }
      }
    }
  }
}
