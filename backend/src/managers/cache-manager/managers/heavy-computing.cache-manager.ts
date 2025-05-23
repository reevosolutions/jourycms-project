import Container from "typedi";
import CacheManager from "..";
import { millisecondsToTimeString } from "../../../utilities/date/time.utilities";
import initLogger, { LoggerService } from "../../../utilities/logging";
import moment from "moment";

/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 25-02-2024 18:02:08
 */
export default class HeavyComputingCacheManager {
  private logger: LoggerService;
  private static instance: HeavyComputingCacheManager;
  private readonly cache: CacheManager;

  private readonly CACHE_KEY = "heavyComputing";

  private constructor() {
    this.cache = Container.get(CacheManager);
    this.logger = initLogger("COMPONENT", `${this.constructor.name}`);
  }

  public static getInstance(): HeavyComputingCacheManager {
    if (!HeavyComputingCacheManager.instance) {
      HeavyComputingCacheManager.instance = new HeavyComputingCacheManager();
    }
    return HeavyComputingCacheManager.instance;
  }

  /**
   *
   * @param {string} name
   * @param {number} expiration  in seconds
   * @param generator Function that returns a promise
   * @returns {data?: any,last_updated?: Date,found: boolean,expired: boolean,}
   */
  public async get<T = any>(
    name: string,
    expiration = 7200,
    generator: () => Promise<T>,
    force_regenerate?: boolean
  ): Promise<Levelup.CMS.V1.Utils.CachedHeavyResult<T>> {
    try {
      if (!name) return null;
      const now = new Date();
      const client = await this.cache.getClient();
      const val = await client.hGet(
        this.cache.generateForeignKey(this.CACHE_KEY),
        name
      );
      let oldDoc: {
        value: any;
        last_updated: Date;
      };

      if (val) {
        oldDoc = JSON.parse(val);
      }

      if (oldDoc) {
        const expired = this.cache.isExpired(oldDoc.last_updated, expiration);
        const next_update =
          expired || force_regenerate
            ? now
            : moment(oldDoc.last_updated).add(expiration, "seconds").toDate();
        if (expired || force_regenerate) {
          const timer = this.logger.timer;
          generator()
            .then((value) => {
              this.logger.success(
                `Updated expired or force regenerated heavy computing result successful in:`,
                `${timer.timeString}s`,
                name.cyan
              );
              this.set(name, value);
            })
            .catch((e) => {
              this.logger.success(
                `Updating expired or force regenerated heavy computing result failed in:`,
                `${timer.timeString}s`,
                name.cyan,
                e.message,
                e
              );
              this.logger.error(this.get.name, name, e);
            });
          this.logger.warn(
            expired
              ? "Heavy computing result expired"
              : "Forcing regenerate result",
            name,
            {
              last_updated: oldDoc.last_updated,
              expiration_in: `${millisecondsToTimeString(expiration * 1000)}`,
            }
          );
        }
        return { ...oldDoc, found: true, expired, next_update };
      } else {
        const timer = this.logger.timer;
        generator()
          .then((value) => {
            this.logger.success(
              `Updated not found heavy computing result successful in:`,
              `${timer.timeString}s`,
              name.cyan
            );
            this.set(name, value);
          })
          .catch((e) => {
            this.logger.error(this.get.name, name, e);
            this.logger.error(
              `Updating not found heavy computing result failed in:`,
              `${timer.timeString}s`,
              name.cyan,
              e.message,
              e
            );
          });
        this.logger.error("Heavy computing result not found", name);
      }

      return { found: false, expired: false, next_update: now };
    } catch (e) {
      this.logger.error(this.get.name, name, e);
      throw e;
    }
  }

  public async set(name: string, data: any): Promise<void> {
    try {
      const now = new Date();
      const client = await this.cache.getClient();
      this.logger.event("Updating heavy computing result store", name);
      await client.hSet(
        this.cache.generateForeignKey(this.CACHE_KEY),
        name,
        JSON.stringify({
          value: data,
          last_updated: now,
        })
      );
    } catch (e) {
      this.logger.error(this.set.name, name, e);

      throw e;
    }
  }

  public async unset(name: string): Promise<void> {
    try {
      const now = new Date();
      const client = await this.cache.getClient();
      this.logger.event(this.unset.name, name);
      await client.hDel(this.cache.generateForeignKey(this.CACHE_KEY), name);
    } catch (e) {
      this.logger.error(this.unset.name, name, e);
      throw e;
    }
  }
}


