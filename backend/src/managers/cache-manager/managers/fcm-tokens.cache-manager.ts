import moment from 'moment';
import initLogger, { LoggerService } from '../../../utilities/logging';
import { v4 as uuidv4 } from 'uuid';
import Container from "typedi";
import CacheManager from "..";



export default class FCMTokensCacheManager {
  private logger: LoggerService;
  private static instance: FCMTokensCacheManager;
  private readonly cache: CacheManager;

  private readonly CACHE_KEY = 'fcmTokens';
  private readonly EXPIRATION = 3600 * 48;


  private constructor() {
    this.cache = Container.get(CacheManager);
    this.logger = initLogger('COMPONENT', `${this.constructor.name}`);
    

  }

  public static getInstance(): FCMTokensCacheManager {
    if (!FCMTokensCacheManager.instance) {
      FCMTokensCacheManager.instance = new FCMTokensCacheManager();
    }
    return FCMTokensCacheManager.instance;
  }


  /**
   * @generator Levelup
   * @author dr. Salmi <reevosolutions@gmail.com>
   * @since 25-02-2024 17:06:22
   */
  public async set(tokenObject: Levelup.V2.CacheManager.Store.Firebase.FCMTokenObjectOnRedis) {
    try {
      const now = new Date();
      const client = await this.cache.getClient();
      this.logger.event(this.set.name, `UPDATING ITEM ${tokenObject.fcm_token}`);
      await client.hSet(this.cache.generateForeignKey(this.CACHE_KEY), tokenObject.fcm_token, JSON.stringify({
        ...tokenObject,
        last_updated: now,
      }));
    } catch (e) {
      this.logger.error(this.set.name, e);
      throw e;
    }
  }

  /**
   * @generator Levelup
   * @since 25-02-2024 17:06:22
   */
  public async get(token: string): Promise<Levelup.V2.CacheManager.Store.Firebase.FCMTokenObjectOnRedis | null> {
    try {
      if (!token) return null;

      const client = await this.cache.getClient();
      const val = await client.hGet(this.cache.generateForeignKey(this.CACHE_KEY), token);
      let oldDoc: Levelup.V2.CacheManager.Store.TStoredForeignObject<Levelup.V2.CacheManager.Store.Firebase.FCMTokenObjectOnRedis>;

      if (val) {
        oldDoc = JSON.parse(val);
      }

      if (oldDoc) {
        if (this.cache.isExpired(oldDoc.last_updated, this.EXPIRATION)) {
          this.logger.warn(this.get.name, 'EXPIRED', token);
        }
        return oldDoc.value;
      } else
        this.logger.warn(this.get.name, 'NOT FOUND', token);

      return null;
    } catch (e) {
      this.logger.error(this.get.name, e);
      throw e;
    }
  }

  /**
   * @generator Levelup
   * @since 25-02-2024 17:06:22
   */
  public async unset(token: string) {
    try {
      const client = await this.cache.getClient();
      this.logger.event(this.unset.name, `DELETING ITEM ${token}`);
      await client.hDel(this.cache.generateForeignKey(this.CACHE_KEY), token);
    } catch (e) {
      this.logger.error(this.unset.name, e);
      throw e;
    }
  }

  /**
   * @generator Levelup
   * @since 25-02-2024 17:06:22
   */
  public async list() {
    try {
      const client = await this.cache.getClient();
      const val = await client.hGetAll(this.cache.generateForeignKey(this.CACHE_KEY));
      const FCMTokens: Levelup.V2.CacheManager.Store.Firebase.FCMTokenObjectOnRedis[] = [];
      if (val && Object.values(val).length) {
        Object.values(val).forEach(value => {
          const v: {
            FCMToken: Levelup.V2.CacheManager.Store.Firebase.FCMTokenObjectOnRedis;
            last_update: Date;
          } = JSON.parse(value);
          FCMTokens.push(v.FCMToken);

        })
      }
      if (FCMTokens.length) {
        this.logger.success(this.list.name, 'FCMToken items found on redis');
        return FCMTokens;
      }
      else {
        this.logger.warn(this.list.name, 'FCMToken items not found on DB or not filled');
      }
    } catch (e) {
      this.logger.error(this.list.name, e);
      throw e;
    }
  }


}
