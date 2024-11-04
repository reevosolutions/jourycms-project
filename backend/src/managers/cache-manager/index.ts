import moment from "moment";
import { RedisClientType, RedisFlushModes, createClient } from "redis";
import Container, { Service } from "typedi";
import { errorToObject } from "../../utilities/exceptions";
import initLogger, { LoggerService } from "../../utilities/logging";
import PdfPregenerationKeysCacheManager from "./managers/pdf-pregeneration-keys.cache-manager";
import HeavyComputingCacheManager from "./managers/heavy-computing.cache-manager";
import ActionsCacheManager from "./managers/actions.cache-manager";
import TasksCacheManager from "./managers/tasks.cache-manager";
import PricingCacheManager from "./managers/pricing.cache-manager";
import ParcelListingRequestsCacheManager from "./managers/parcel-listing-requests.cache-manager";
import FCMTokensCacheManager from "./managers/fcm-tokens.cache-manager";
import config from "../../config";
import { defaults } from "../../utilities/helpers/utils.helpers";
import UsersCacheManager from "./entity-managers/auth/users.cache-manager";
import CompaniesCacheManager from "./entity-managers/accounts/companies.cache-manager";
import StoresCacheManager from "./entity-managers/accounts/stores.cache-manager";
import RolesCacheManager from "./entity-managers/auth/roles.cache-manager";
import PermissionGroupsCacheManager from "./entity-managers/auth/permission-groups.cache-manager";
import ApiKeysCacheManager from "./entity-managers/auth/api-keys.cache-manager";
import PermissionsCacheManager from "./entity-managers/auth/permissions.cache-manager";
import WebhookListenersCacheManager from "./entity-managers/eventbus/webhook-listeners.cache-manager";
import CitiesCacheManager from "./entity-managers/locations/cities.cache-manager";
import CountriesCacheManager from "./entity-managers/locations/countries.cache-manager";
import StatesCacheManager from "./entity-managers/locations/states.cache-manager";
import OfficesCacheManager from "./entity-managers/logistics/offices.cache-manager";
import VehiclesCacheManager from "./entity-managers/logistics/vahicles.cache-manager";
import VehicleTypesCacheManager from "./entity-managers/logistics/vahicle-types.cache-manager";
import VehicleMissionsCacheManager from "./entity-managers/logistics/vahicle-missions.cache-manager";
import WarehousesCacheManager from "./entity-managers/logistics/warehouses.cache-manager";
import AppsCacheManager from "./entity-managers/system/apps.cache-manager";
import { initLevelupSdk } from "../../utilities/data/sdk";
import ProductsCacheManager from "./entity-managers/products/products.cache-manager";
import ProductCategoriesCacheManager from "./entity-managers/products/product-categories.cache-manager";
import SpcCacheManager from "./entity-managers/payment/spc.cache-manager";
import exceptions from "../../exceptions";
import CityDistanceMatrixCacheManager from "./managers/city-distance-matrix.cache-manager";
import StateDistanceMatrixCacheManager from "./managers/state-distance-matrix.cache-manager";

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
      this.getClient.name,
      "Redis client connected successfully"
    );

    return this.client;
  }

  protected _entityRelatedToCompany(
    entity: Levelup.V2.CacheManager.TEntity
  ): boolean {
    const notRelated: Levelup.V2.CacheManager.TEntity[] = [
      "app",
      "company",
      "country",
      "state",
      "city",
    ];
    return !notRelated.includes(entity);
  }

  public generateEntityKey(
    entity: Levelup.V2.CacheManager.TEntity,
    company?: string | null
  ): string {
    if (this._entityRelatedToCompany(entity) && company)
      return `${
        config.cacheManager.keyPrefix || "LUP_V2:"
      }${company}:${entity}`;
    else
      return `${config.cacheManager.keyPrefix || "LUP_V2:"}noCompany:${entity}`;
  }

  public generateForeignKey(id: string, company?: string | null): string {
    if (company)
      return `${
        config.cacheManager.keyPrefix || "LUP_V2:FOREIGN:"
      }${company}:${id}`;
    else
      return `${
        config.cacheManager.keyPrefix || "LUP_V2:FOREIGN:"
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
      | Levelup.V2.CacheManager.TEntity
      | Levelup.V2.CacheManager.TPharmadzEntity
  >(entity: E, id: string): Promise<Levelup.V2.SystemStructure.EntityType<E>> {
    try {
      let data: { data: any };
      let result: Levelup.V2.SystemStructure.EntityType<E>;

      const sdk = initLevelupSdk();

      switch (entity) {
        // auth
        case "user":
          data = await sdk.auth.users.getById(id);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>;
          break;
        case "apiKey":
          data = await sdk.auth.apiKeys.getById(id);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>;
          break;
        case "role":
          data = await sdk.auth.roles.getById(id);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>;
          break;
        case "permission":
          data = await sdk.auth.permissions.getById(id);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>;
          break;

        // locations
        case "country":
          data = await sdk.locations.countries.getById(id);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>;
          break;
        case "state":
          data = await sdk.locations.states.getById(id);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>;
          break;
        case "city":
          data = await sdk.locations.cities.getById(id);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>;
          break;

        // accounts
        case "company":
          data = await sdk.accounts.companies.getById(id);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>;
          break;
        case "store":
          data = await sdk.accounts.stores.getById(id);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>;
          break;

        // logistics
        case "office":
          data = await sdk.logistics.offices.getById(id);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>;
          break;
        case "warehouse":
          data = await sdk.logistics.warehouses.getById(id);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>;
          break;
        case "vehicle":
          data = await sdk.logistics.vehicles.getById(id);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>;
          break;
        case "vehicleType":
          data = await sdk.logistics.vehicleTypes.getById(id);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>;
          break;
        case "vehicleMission":
          data = await sdk.logistics.vehicleMissions.getById(id);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>;
          break;

        // products
        case "product":
          data = await sdk.products.products.getById(id);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>;
          break;
        case "productCategory":
          data = await sdk.products.productCategories.getById(id);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>;
          break;

        // system
        case "app":
          data = await sdk.system.apps.getById(id);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>;
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
          entity,
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

  public async loadListFromDB<E extends Levelup.V2.CacheManager.TEntity>(
    entity: E,
    query: Levelup.V2.CacheManager.TListQueryParams<E>,
    company: string | null
  ): Promise<Levelup.V2.SystemStructure.EntityType<E>[]> {
    try {
      let data: { data: any[] };
      let result: Levelup.V2.SystemStructure.EntityType<E>[] = [];

      query = {
        ...(query || {}),
        filters: {
          ...(query?.filters || {}),
        },
      } as any;

      if (company && this._entityRelatedToCompany(entity))
        (query.filters as any)!.company = company;

      const sdk = initLevelupSdk();

      switch (entity) {
        // auth
        case "user":
          data = await sdk.auth.users.list(query as any);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>[];
          break;
        case "role":
          data = await sdk.auth.roles.list(query as any);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>[];
          break;
        case "apiKey":
          data = await sdk.auth.apiKeys.list(query as any);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>[];
          break;
        case "permission":
          data = await sdk.auth.permissions.list(query as any);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>[];
          break;

        // locations
        case "country":
          data = await sdk.locations.countries.list(query as any);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>[];
          break;
        case "state":
          data = await sdk.locations.states.list(query as any);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>[];
          break;
        case "city":
          data = await sdk.locations.cities.list(query as any);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>[];
          break;

        // accounts
        case "company":
          data = await sdk.accounts.companies.list(query as any);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>[];
          break;
        case "store":
          data = await sdk.accounts.stores.list(query as any);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>[];
          break;

        // logistics
        case "office":
          data = await sdk.logistics.offices.list(query as any);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>[];
          break;
        case "warehouse":
          data = await sdk.logistics.warehouses.list(query as any);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>[];
          break;
        case "vehicle":
          data = await sdk.logistics.vehicles.list(query as any);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>[];
          break;
        case "vehicleType":
          data = await sdk.logistics.vehicleTypes.list(query as any);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>[];
          break;
        case "vehicleMission":
          data = await sdk.logistics.vehicleMissions.list(query as any);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>[];
          break;

        // payment
        case "spcCityBasedZoning":
          data = await sdk.payment.spcCityBasedZoning.list(query as any);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>[];
          break;
        case "spcStateBasedZoning":
          data = await sdk.payment.spcStateBasedZoning.list(query as any);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>[];
          break;
        case "spcCityZone":
          data = await sdk.payment.spcCityZones.list(query as any);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>[];
          break;
        case "spcStateZone":
          data = await sdk.payment.spcStateZones.list(query as any);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>[];
          break;

        // products
        case "product":
          data = await sdk.products.products.list(query as any);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>[];
          break;
        case "productCategory":
          data = await sdk.products.productCategories.list(query as any);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>[];
          break;

        // system
        case "app":
          data = await sdk.system.apps.list(query as any);
          result = data?.data as Levelup.V2.SystemStructure.EntityType<E>[];
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

  public async set<E extends Levelup.V2.CacheManager.TEntity>(
    entity: E,
    id: string,
    value: Levelup.V2.SystemStructure.EntityType<E>,
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

  public async get<E extends Levelup.V2.CacheManager.TEntity>(
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
  ): Promise<Levelup.V2.SystemStructure.EntityType<E>> {
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

      let oldDoc: Levelup.V2.CacheManager.Store.TStoredLevelupObject<E>;
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

  public async getMany<E extends Levelup.V2.CacheManager.TEntity>(
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
  ): Promise<Levelup.V2.SystemStructure.EntityType<E>[]> {
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
      }, Promise.resolve([] as Levelup.V2.SystemStructure.EntityType<E>[]));
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

  public async unset<E extends Levelup.V2.CacheManager.TEntity>(
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

  public async unsetAll<E extends Levelup.V2.CacheManager.TEntity>(
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

  public async list<E extends Levelup.V2.CacheManager.TEntity>(
    entity: E,
    config: {
      query?: Levelup.V2.CacheManager.TListQueryParams<E>;
      force_load_from_db?: boolean;
      filter?: (item: Levelup.V2.SystemStructure.EntityType<E>) => boolean;
      company?: string | null;
      customKey?: string | null;
    } = {
      query: {} as Levelup.V2.CacheManager.TListQueryParams<E>,
      force_load_from_db: true,
      filter: () => true,
      company: null,
      customKey: null,
    }
  ): Promise<Levelup.V2.SystemStructure.EntityType<E>[]> {
    try {
      /**
       * Apply defaults on config
       */
      config = defaults(config, {
        query: {} as Levelup.V2.CacheManager.TListQueryParams<E>,
        force_load_from_db: true,
        filter: () => true,
        company: null,
        customKey: null,
      });

      const customKey = config.customKey ? (config.customKey as E) : entity;

      let result: Levelup.V2.SystemStructure.EntityType<E>[] = [];
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

          let oldDoc: Levelup.V2.CacheManager.Store.TStoredLevelupObject<E>;
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
  public get parcelListingRequests() {
    return ParcelListingRequestsCacheManager.getInstance();
  }
  public get pdfPreGenerationKeys() {
    return PdfPregenerationKeysCacheManager.getInstance();
  }
  public get pricing() {
    return PricingCacheManager.getInstance();
  }
  public get tasks() {
    return TasksCacheManager.getInstance();
  }
  public get cityDistanceMatrix() {
    return CityDistanceMatrixCacheManager.getInstance();
  }
  public get stateDistanceMatrix() {
    return StateDistanceMatrixCacheManager.getInstance();
  }

  /* -------------------------------------------------------------------------- */
  /*                               ENTITY MANAGERS                              */
  /* -------------------------------------------------------------------------- */
  public get companies() {
    return CompaniesCacheManager.getInstance();
  }
  public get stores() {
    return StoresCacheManager.getInstance();
  }
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
  public get webhookListeners() {
    return WebhookListenersCacheManager.getInstance();
  }
  public get cities() {
    return CitiesCacheManager.getInstance();
  }
  public get countries() {
    return CountriesCacheManager.getInstance();
  }
  public get states() {
    return StatesCacheManager.getInstance();
  }
  public get offices() {
    return OfficesCacheManager.getInstance();
  }
  public get vehicles() {
    return VehiclesCacheManager.getInstance();
  }
  public get vehicleTypes() {
    return VehicleTypesCacheManager.getInstance();
  }
  public get vehicleMissions() {
    return VehicleMissionsCacheManager.getInstance();
  }
  public get warehouses() {
    return WarehousesCacheManager.getInstance();
  }
  public get apps() {
    return AppsCacheManager.getInstance();
  }

  public get products() {
    return ProductsCacheManager.getInstance();
  }
  public get productCategories() {
    return ProductCategoriesCacheManager.getInstance();
  }
  public get spc() {
    return SpcCacheManager.getInstance();
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
