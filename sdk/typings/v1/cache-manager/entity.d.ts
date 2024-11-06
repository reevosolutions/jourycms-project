declare module Levelup {
  namespace CMS {
    namespace V1 {
      /**
       * @description Service CacheManager
       */
      namespace CacheManager {
        export interface EntityCacheManager<E extends TEntity> {
          get(
            id: string,
            config?: {
              expiration?: number;
              force_load_from_db?: boolean;
              company?: string | null;
            }
          ): Promise<Levelup.V2.CacheManager.EntityType<E>>;

          getMany(
            ids: string[],
            config?: {
              expiration?: number;
              force_load_from_db?: boolean;
              company?: string | null;
            }
          ): Promise<Levelup.V2.CacheManager.EntityType<E>[]>;

          list(config?: {
            query: Levelup.V2.CacheManager.TListQueryParams<E>;
            force_load_from_db?: boolean;
            company?: string | null;
          }): Promise<Levelup.V2.CacheManager.EntityType<E>[]>;

          set(
            id: string,
            value: Levelup.V2.CacheManager.EntityType<E>,
            company?: string | null
          ): Promise<void>;

          unset(id: string, company?: string | null): Promise<void>;

          unsetAll(company?: string | null): Promise<void>;
        }

        export type TLevelupEntity =
          // auth
          | "user"
          | "apiKey"
          | "role"
          | "permission"
          | "permissionGroup"
          // system
          | "app"
          ;

        export type TLevelupListQueryParams<E extends TEntity> =
          // auth
          E extends "user"
          ? Users.Api.Users.List.Request
          : E extends "permission"
          ? Auth.Api.Permissions.List.Request
          : E extends "permissionGroup"
          ? Auth.Api.PermissionGroups.List.Request
          : E extends "role"
          ? Auth.Api.Roles.List.Request
          : E extends "apiKey"
          ? Auth.Api.ApiKeys.List.Request
          : // system
          E extends "app"
          ? System.Api.Apps.List.Request
          : never;



        export type TEntity = TLevelupEntity;

        export type TListQueryParams<E extends TEntity> =
          E extends Levelup.V2.CacheManager.TLevelupEntity
          ? Levelup.V2.CacheManager.TLevelupListQueryParams<E>
          : never;
      }
    }
  }
}
