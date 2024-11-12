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
          ): Promise<Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>>;

          getMany(
            ids: string[],
            config?: {
              expiration?: number;
              force_load_from_db?: boolean;
              company?: string | null;
            }
          ): Promise<Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[]>;

          list(config?: {
            query: Levelup.CMS.V1.CacheManager.TListQueryParams<E>;
            force_load_from_db?: boolean;
            company?: string | null;
          }): Promise<Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[]>;

          set(
            id: string,
            value: Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>,
            company?: string | null
          ): Promise<void>;

          unset(id: string, company?: string | null): Promise<void>;

          unsetAll(company?: string | null): Promise<void>;
        }


        export type TEntity = Utils.SystemStructure.Models.AllModels;

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
          
          : // content
          E extends "article"
          ? Content.Api.Articles.List.Request
          : E extends "articleType"
          ? Content.Api.ArticleTypes.List.Request
          : E extends "taxonomy"
          ? Content.Api.Taxonomies.List.Request
          : E extends "term"
          ? Content.Api.Terms.List.Request

          : never;




        export type TListQueryParams<E extends TEntity> =
          E extends Levelup.CMS.V1.Utils.SystemStructure.Models.AllModels
          ? Levelup.CMS.V1.CacheManager.TLevelupListQueryParams<E>
          : never;
      }
    }
  }
}
