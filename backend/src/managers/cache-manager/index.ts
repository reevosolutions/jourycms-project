import moment from "moment";
import { RedisClientType, RedisFlushModes, createClient } from "redis";
import Container, { Service } from "typedi";
import { errorToObject } from "../../utilities/exceptions";
import initLogger, { LoggerService } from "../../utilities/logging";
import HeavyComputingCacheManager from "./managers/heavy-computing.cache-manager";
import ActionsCacheManager from "./managers/actions.cache-manager";
import TasksCacheManager from "./managers/tasks.cache-manager";
import FCMTokensCacheManager from "./managers/fcm-tokens.cache-manager";
import config from "../../config";
import { defaults } from "../../utilities/helpers/utils.helpers";
import UsersCacheManager from "./entity-managers/auth/users.cache-manager";
import RolesCacheManager from "./entity-managers/auth/roles.cache-manager";
import PermissionGroupsCacheManager from "./entity-managers/auth/permission-groups.cache-manager";
import ApiKeysCacheManager from "./entity-managers/auth/api-keys.cache-manager";
import PermissionsCacheManager from "./entity-managers/auth/permissions.cache-manager";
import AppsCacheManager from "./entity-managers/system/apps.cache-manager";
import { initJouryCMSSdk } from "../../utilities/data/sdk";
import exceptions from "../../exceptions";

@Service()
export default class CacheManager {
  protected logger: LoggerService;
  protected client: RedisClientType;

  public constructor() {
    this.logger = initLogger("COMPONENT", `${this.constructor.name}`);
    this.getClient();
  }

  public async getClient(): Promise<RedisClientType> {
    if (this.client) return this.client;

    this.client = createClient({
      url: config.cacheManager.redis.url,
    });


    this.client.on("error", (err) => {
      this.logger.error(this.getClient.name, "Redis Client Error", err);
    });

    await this.client.connect();

    this.logger.success(
      config.cacheManager.redis.url || "redis://localhost:6379",
      this.client.configGet,
      "Redis client connected successfully"
    );

    return this.client;
  }

  protected _entityRelatedToCompany(
    entity: Levelup.CMS.V1.CacheManager.TEntity
  ): boolean {
    const notRelated: Levelup.CMS.V1.CacheManager.TEntity[] = [
      "app",
    ];
    return !notRelated.includes(entity);
  }

  public generateEntityKey(
    entity: Levelup.CMS.V1.CacheManager.TEntity,
    company?: string | null
  ): string {
    if (this._entityRelatedToCompany(entity) && company)
      return `${config.cacheManager.keyPrefix || "LUP_V2:"
        }${company}:${entity}`;
    else
      return `${config.cacheManager.keyPrefix || "LUP_V2:"}noCompany:${entity}`;
  }

  public generateForeignKey(id: string, company?: string | null): string {
    if (company)
      return `${config.cacheManager.keyPrefix || "LUP_V2:FOREIGN:"
        }${company}:${id}`;
    else
      return `${config.cacheManager.keyPrefix || "LUP_V2:FOREIGN:"
        }noCompany:${id}`;
  }

  public async getCollectionEntries<T = any>(
    key: string
  ): Promise<{
    [key: string]: T;
  }> {
    try {
      const client = await this.getClient();
      let entries = (await client.hGetAll(key)) as {
        [key: string]: T;
      };
      if (entries && Object.keys(entries).length) {
        entries = Object.entries(entries).reduce(
          (prev, [k, entry]) => {
            return {
              ...prev,
              [k]: JSON.parse(entry as string) as T,
            };
          },
          {} as {
            [key: string]: T;
          }
        );
      }
      return entries;
    } catch (error) {
      this.logger.error(this.getCollectionEntries.name, error);
      throw error;
    }
  }

  public async setForeign<T>(
    key: string,
    id: string,
    value: T,
    config: {
      company?: string | null;
    }
  ) {
    try {
      const client = await this.getClient();
      await client.hSet(
        this.generateForeignKey(key, config.company || null),
        id.toString(),
        JSON.stringify({
          last_updated: new Date(),
          value,
        })
      );
    } catch (error) {
      this.logger.error(this.setForeign.name, error);
      throw error;
    }
  }

  public async getForeign<T>(
    key: string,
    id: string,
    config: {
      expiration?: number;
      company?: string | null;
    } = {
        expiration: 3600 * 24,
        company: null,
      }
  ): Promise<T | null> {
    try {
      /**
       * Apply defaults on config
       */
      config = defaults(config, {
        expiration: 3600 * 24,
        company: null,
      });
      if (!id) return null;
      const client = await this.getClient();
      const obj = await client.hGet(
        this.generateForeignKey(key, config.company),
        id.toString()
      );
      if (!obj) {
        return null;
      }

      const parsed: {
        value: T;
        last_updated: Date;
      } = JSON.parse(obj);

      if (!this.isExpired(parsed.last_updated, config.expiration)) {
        return parsed.value;
      } else this.logger.warn(this.get.name, key, "EXPIRED", id);
      return null;
    } catch (error) {
      this.logger.error(this.setForeign.name, error);
      throw error;
    }
  }

  public async unsetForeign(key: string, id: string, company?: string | null) {
    try {
      const client = await this.getClient();
      await client.hDel(this.generateForeignKey(key, company), id);
    } catch (error) {
      this.logger.error(this.unsetForeign.name, error);
      throw error;
    }
  }

  /**
   *
   * @param {Date} date
   * @param {number} expiration in seconds
   */
  public isExpired(last_updated: Date, expiration: number): boolean {
    return !moment(last_updated).isAfter(
      moment().subtract(expiration, "seconds")
    );
  }

  public generateLogItemName(method: CallableFunction): string {
    return `${this.constructor.name}:${method.name}`;
  }

  public async loadObjectByIdFormDB<
    E extends
    | Levelup.CMS.V1.CacheManager.TEntity

  >(entity: E, id: string): Promise<Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>> {
    try {
      let data: { data: any };
      let result: Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>;

      const sdk = initJouryCMSSdk();

      switch (entity) {
        // auth
        case "user":
          data = await sdk.auth.users.getById(id);
          result = data?.data as Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>;
          break;
        case "apiKey":
          data = await sdk.auth.apiKeys.getById(id);
          result = data?.data as Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>;
          break;
        case "role":
          data = await sdk.auth.roles.getById(id);
          result = data?.data as Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>;
          break;
        case "permission":
          data = await sdk.auth.permissions.getById(id);
          result = data?.data as Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>;
          break;

        
        default:
          throw new exceptions.InternalServerError(
            `Data loading not handled for this entity: ${entity}`
          );
          break;
      }
      this.logger.value(this.loadObjectByIdFormDB.name, entity, id, !!result);
      if (!result)
        this.logger.trace.warn(
          this.loadObjectByIdFormDB.name,
          `${config.cacheManager.redis.url}/${entity}`,
          id,
          "NOT FOUND"
        );
      return result;
    } catch (error) {
      this.logger.save.error({
        name: this.generateLogItemName(this.loadObjectByIdFormDB),
        payload: {
          entity,
          id,
          error: errorToObject(error),
        },
      });
      return;
    }
  }

  public async loadListFromDB<E extends Levelup.CMS.V1.CacheManager.TEntity>(
    entity: E,
    query: Levelup.CMS.V1.CacheManager.TListQueryParams<E>,
    company: string | null
  ): Promise<Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[]> {
    try {
      let data: { data: any[] };
      let result: Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[] = [];

      query = {
        ...(query || {}),
        filters: {
          ...(query?.filters || {}),
        },
      } as any;

      if (company && this._entityRelatedToCompany(entity))
        (query.filters as any)!.company = company;

      const sdk = initJouryCMSSdk();

      switch (entity) {
        // auth
        case "user":
          data = await sdk.auth.users.list(query as any);
          result = data?.data as Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[];
          break;
        case "role":
          data = await sdk.auth.roles.list(query as any);
          result = data?.data as Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[];
          break;
        case "apiKey":
          data = await sdk.auth.apiKeys.list(query as any);
          result = data?.data as Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[];
          break;
        case "permission":
          data = await sdk.auth.permissions.list(query as any);
          result = data?.data as Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[];
          break;

      
        default:
          throw new exceptions.InternalServerError(
            `Data loading not handled for this entity: ${entity}`
          );
          break;
      }

      return result;
    } catch (error) {
      this.logger.error(this.generateLogItemName(this.loadListFromDB), {
        entity,
        query,
        error: errorToObject(error),
      });
      this.logger.save.error({
        name: this.generateLogItemName(this.loadListFromDB),
        payload: {
          entity,
          query,
          error: errorToObject(error),
        },
      });
      return;
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                            START COMMON METHODS                            */
  /* -------------------------------------------------------------------------- */

  public async set<E extends Levelup.CMS.V1.CacheManager.TEntity>(
    entity: E,
    id: string,
    value: Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>,
    company: string | null = null,
    config: {
      customKey?: string | null;
    } = {
        customKey: null,
      }
  ) {
    try {
      /**
       * Apply defaults on config
       */
      config = defaults(config, {
        customKey: null,
      });

      const customKey = config.customKey ? (config.customKey as E) : entity;

      const now = new Date();
      const client = await this.getClient();
      await client.hSet(
        this.generateEntityKey(customKey, company),
        id.toString(),
        JSON.stringify({
          value,
          last_updated: now,
        })
      );
      if (!company && (value as any).company) {
        await this.set(entity, id, value, (value as any).company);
      }
    } catch (error) {
      this.logger.save.error({
        name: this.generateLogItemName(this.set),
        payload: {
          entity,
          id,
          value,
        },
      });
      throw error;
    }
  }

  public async get<E extends Levelup.CMS.V1.CacheManager.TEntity>(
    entity: E,
    id: string,
    config: {
      expiration?: number;
      force_load_from_db?: boolean;
      company?: string | null;
      customKey?: string | null;
    } = {
        expiration: 3600 * 24,
        force_load_from_db: true,
        company: null,
        customKey: null,
      }
  ): Promise<Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>> {
    try {
      /**
       * Apply defaults on config
       */
      config = defaults(config, {
        expiration: 3600 * 24,
        force_load_from_db: true,
        company: null,
        customKey: null,
      });

      const customKey = config.customKey ? (config.customKey as E) : entity;

      if (!id) return null;
      const client = await this.getClient();
      const val = await client.hGet(
        this.generateEntityKey(customKey, config.company),
        id.toString()
      );

      let oldDoc: Levelup.CMS.V1.CacheManager.Store.TStoredLevelupObject<E>;
      if (val) {
        oldDoc = JSON.parse(val);
      }

      if (oldDoc) {
        if (!this.isExpired(oldDoc.last_updated, config.expiration)) {
          return oldDoc.value;
        } else this.logger.warn(entity, "EXPIRED", id);
      } else this.logger.warn(entity, "NOT FOUND", id);

      if (!config.force_load_from_db) return null;

      const db_object = await this.loadObjectByIdFormDB(entity, id);
      if (db_object) {
        await this.set(customKey, id, db_object, config.company);
      }

      return db_object;
    } catch (error) {
      this.logger.save.error({
        name: this.generateLogItemName(this.get),
        payload: {
          entity,
          id,
          error: errorToObject(error),
        },
      });
      return null;
    }
  }

  public async getMany<E extends Levelup.CMS.V1.CacheManager.TEntity>(
    entity: E,
    ids: string[],
    config: {
      expiration?: number;
      force_load_from_db?: boolean;
      company?: string | null;
    } = {
        expiration: 3600 * 24,
        force_load_from_db: true,
        company: null,
      }
  ): Promise<Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[]> {
    try {
      if (!ids?.length) return [];

      /**
       * Apply defaults on config
       */
      config = defaults(config, {
        expiration: 3600 * 24,
        force_load_from_db: true,
        company: null,
      });

      return ids.reduce(async (previousPromise, currentItem) => {
        const accumulator = await previousPromise;
        const result = await this.get(entity, currentItem?.toString(), config);
        return [...accumulator, result];
      }, Promise.resolve([] as Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[]));
    } catch (error) {
      this.logger.save.error({
        name: this.generateLogItemName(this.get),
        payload: {
          entity,
          ids,
          config,
          error: errorToObject(error),
        },
      });
      return [];
    }
  }

  public async unset<E extends Levelup.CMS.V1.CacheManager.TEntity>(
    entity: E,
    id: string,
    company: string | null = null
  ) {
    try {
      const client = await this.getClient();
      await client.hDel(this.generateEntityKey(entity, company), id.toString());
    } catch (error) {
      this.logger.save.error({
        name: this.generateLogItemName(this.unset),
        payload: {
          entity,
          id,
          error: errorToObject(error),
        },
      });
      throw error;
    }
  }

  public async unsetAll<E extends Levelup.CMS.V1.CacheManager.TEntity>(
    entity: E,
    company: string | null = null
  ) {
    try {
      const client = await this.getClient();
      await client.del(this.generateEntityKey(entity, company));
    } catch (error) {
      this.logger.save.error({
        name: this.generateLogItemName(this.unsetAll),
        payload: {
          entity,
          error: errorToObject(error),
        },
      });
      throw error;
    }
  }

  public async list<E extends Levelup.CMS.V1.CacheManager.TEntity>(
    entity: E,
    config: {
      query?: Levelup.CMS.V1.CacheManager.TListQueryParams<E>;
      force_load_from_db?: boolean;
      filter?: (item: Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>) => boolean;
      company?: string | null;
      customKey?: string | null;
    } = {
        query: {} as Levelup.CMS.V1.CacheManager.TListQueryParams<E>,
        force_load_from_db: true,
        filter: () => true,
        company: null,
        customKey: null,
      }
  ): Promise<Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[]> {
    try {
      /**
       * Apply defaults on config
       */
      config = defaults(config, {
        query: {} as Levelup.CMS.V1.CacheManager.TListQueryParams<E>,
        force_load_from_db: true,
        filter: () => true,
        company: null,
        customKey: null,
      });

      const customKey = config.customKey ? (config.customKey as E) : entity;

      let result: Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[] = [];
      const client = await this.getClient();
      const valuesObject = await client.hGetAll(
        this.generateEntityKey(
          customKey,
          config.company || (config.query?.filters as any)?.company
        )
      );

      if (valuesObject) {
        for (let idx = 0; idx < Object.values(valuesObject).length; idx++) {
          const val = Object.values(valuesObject)[idx];

          let oldDoc: Levelup.CMS.V1.CacheManager.Store.TStoredLevelupObject<E>;
          if (val) {
            oldDoc = JSON.parse(val);
          }

          if (oldDoc) {
            result.push(oldDoc.value);
          }
        }
      }

      result = result.filter(config.filter);

      if (!result.length && config.force_load_from_db) {
        const loadedData = await this.loadListFromDB(
          entity,
          config.query,
          config.company
        );
        for (let idx = 0; idx < loadedData?.length || 0; idx++) {
          const item = loadedData[idx];
          await this.set(entity, item["_id"], item, config.company);
        }
        return (loadedData || []).filter(config.filter);
      } else return result;
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  public async getConfigValue<T, D extends T | undefined = T>(
    id: string,
    defaultValue: D
  ): Promise<T> {
    const client = await this.getClient();
    const val = await client.hGet("configuration", id);

    if (val) {
      const value: T = JSON.parse(val);
      return value;
    } else return defaultValue;
  }
  public async setConfigValue<T = any>(id: string, value: T) {
    const client = await this.getClient();
    await client.hSet("configuration", id, JSON.stringify(value));
  }
  /* -------------------------------------------------------------------------- */
  /*                             END COMMON METHODS                             */
  /* -------------------------------------------------------------------------- */

  public get actions() {
    return ActionsCacheManager.getInstance();
  }
  public get fcmTokens() {
    return FCMTokensCacheManager.getInstance();
  }
  public get heavyComputing() {
    return HeavyComputingCacheManager.getInstance();
  }
  public get tasks() {
    return TasksCacheManager.getInstance();
  }

  /* -------------------------------------------------------------------------- */
  /*                               ENTITY MANAGERS                              */
  /* -------------------------------------------------------------------------- */
  public get apiKeys() {
    return ApiKeysCacheManager.getInstance();
  }
  public get permissions() {
    return PermissionsCacheManager.getInstance();
  }
  public get permissionGroups() {
    return PermissionGroupsCacheManager.getInstance();
  }
  public get roles() {
    return RolesCacheManager.getInstance();
  }

  public get users() {
    return UsersCacheManager.getInstance();
  }
  public get apps() {
    return AppsCacheManager.getInstance();
  }

  public async flushAll() {
    const client = await this.getClient();

    const keys: string[] = await client.sendCommand(["keys", "*"]);

    keys.forEach((key) => {
      if (key.startsWith(`${config.cacheManager.keyPrefix || "LUP_V2_"}`)) {
        this.logger.info(this.flushAll.name, key);
        client.del(key);
      }
    });

    // client.multi().keys('*' as any).exec((err: any, keys: string[]) => {

    // });
  }
}
