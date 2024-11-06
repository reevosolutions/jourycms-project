
declare module Levelup {
  namespace CMS {
    namespace V1 {

      /**
       * @description Service CacheManager
       */
      namespace CacheManager {
        namespace Store {
          export type TStoredLevelupObject<E extends TEntity> = {
            value: EntityType<E>;
            last_updated: Date
          }
          export type TStoredForeignObject<Obj> = {
            value: Obj;
            last_updated: Date
          }


          export namespace Firebase {

            export type FCMTokenObjectOnRedis = {
              fcm_token: string;
              user: Utils.Common.ID;
              app: Utils.Common.ID | null;
              role: string | null;
            }
          }

        }
      }
    }
  }
}
