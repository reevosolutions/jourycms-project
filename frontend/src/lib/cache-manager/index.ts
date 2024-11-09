import config from "@config/index";
import initLogger, { LoggerService } from "@lib/logging";
import LevelupDexieDatabase, { AuthEntity, AuthEntityType } from "./adapters/dexie";
import { NON_INDEXED_FIELDS, applyEncryptionMiddleware, clearAllTables } from "dexie-encrypted";
import EncryptionManager from "@lib/encryption-manager";
import JouryCMSSdk from "jourycms-sdk";

// !TODO: Remove this line on real production
const FORCE_NO_ENCRYPTION = true;

export default class CacheManager {
  private logger: LoggerService;
  crypto: EncryptionManager;

  private _db!: LevelupDexieDatabase;

  static instance: CacheManager;

  static getInstance() {
    if (!this.instance) {
      this.instance = new CacheManager();
    }
    return this.instance;
  }

  constructor() {
    this.logger = initLogger("UTILITY", `${this.constructor.name}`);
    /**
     * Init Encryption Manager
     */
    this.crypto = EncryptionManager.getInstance();

    this.init();
  }

  async init() {
    try {
      this.logger.info("Initializing Cache Manager");
      this._db = new LevelupDexieDatabase(config.cacheManager.dbName, config.cacheManager.dbVersion);

      /**
       * Apply encryption middleware
       */
      const tableSettings = this._db.tables.reduce(
        (acc, table) => {
          acc[table.name] = NON_INDEXED_FIELDS;
          return acc;
        },
        {} as Record<string, string>
      );

      if (!FORCE_NO_ENCRYPTION && process.env.NODE_ENV !== "development") {
        applyEncryptionMiddleware(this._db, this.crypto.getIv(), tableSettings, clearAllTables);
      }

      this._db.open();
      this.logger.success("Cache Manager initialized");
    } catch (error) {
      this.logger.error("Cache Manager initialization failed", error);
    }
  }

  get db(): LevelupDexieDatabase | undefined {
    return this._db;
  }

  private handleError(error: any) {
    this.logger.error("Cache Manager Error", error);
  }

  async setCurrentAuthObject<E extends AuthEntityType>(entity: E, data: AuthEntity<E>) {
    try {
      await this._db.current.put({
        ...data,
        entity,
      });
    } catch (error) {
      this.handleError(error);
    }
  }
  async getCurrentAuthObject<E extends AuthEntityType>(entity: E): Promise<AuthEntity<E> | null> {
    try {
      const user = await this._db.current.get(entity);
      if (!user) return null;
      return user as unknown as AuthEntity<E>;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async unsetCurrentAuthObject(entity: AuthEntityType) {
    try {
      await this._db.current.delete(entity);
    } catch (error) {
      this.handleError(error);
    }
  }

  async clearCurrentAuthData(supp: string[] = []) {
    try {
      for (const entity of ["original_user", "user", "app", "company", "store", "office", "warehouse", ...supp]) {
        await this._db.current.delete(entity as AuthEntityType);
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  async clearAllData() {
    try {
      await this._db.current.clear();
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUser(id: string, sdk: JouryCMSSdk) {
    try {
      const user = await this._db.users.get(id);
      this.logger.info("Company from cache", user);
      if (user) return user;
      this.logger.info("Company not found in cache, fetching from server");
      const { data } = await sdk.auth.users.getById(id);
      if (!data) return null;
      await this._db.users.put(data);
      return user;
    } catch (error) {
      this.handleError(error);
      this.logger.error("Failed to get user from cache", error);
      return null;
    }
  }
}
