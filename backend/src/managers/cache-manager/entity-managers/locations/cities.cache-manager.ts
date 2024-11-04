import Container from "typedi";
import CacheManager from "../..";
import initLogger, { LoggerService } from "../../../../utilities/logging";
import { defaults } from "../../../../utilities/helpers/utils.helpers";
import moment, { Moment } from "moment";
import { SECONDS_IN_AN_HOUR } from "../../../../constants/date.constants";

/**
 * @description Cache manager for Cities
 */
export default class CitiesCacheManager
  implements Levelup.V2.CacheManager.EntityCacheManager<"city">
{
  private logger: LoggerService;

  private static instance: CitiesCacheManager;
  private readonly cache: CacheManager;

  private readonly EXPIRATION = 3600 * 48;
  private readonly ENTITY = "city" as const;

  private constructor() {
    this.cache = Container.get(CacheManager);
    this.logger = initLogger("COMPONENT", `${this.constructor.name}`);
  }

  public static getInstance(): CitiesCacheManager {
    if (!CitiesCacheManager.instance) {
      CitiesCacheManager.instance = new CitiesCacheManager();
    }
    return CitiesCacheManager.instance;
  }

  public async get(
    id: string,
    config?: {
      expiration?: number;
      force_load_from_db?: boolean;
      company?: string | null;
    }
  ) {
    return this.cache.get(
      this.ENTITY,
      id,
      defaults(config, {
        expiration: this.EXPIRATION,
        force_load_from_db: true,
        company: null,
      })
    );
  }

  public async getByCode(
    country_code: string,
    state_code: string,
    city_code: string,
    config?: {
      expiration?: number;
      company?: string | null;
    }
  ) {
    return this.cache.get("city", city_code, {
      ...defaults(config, {
        expiration: this.EXPIRATION,
        company: null,
      }),
      force_load_from_db: false,
      customKey: `${this.ENTITY}:${country_code}:${state_code}`,
    });
  }

  public async getCountryCities(
    country_code: string,
    config?: {
      expiration?: number;
      company?: string | null;
    }
  ) {
    return this.cache.list(this.ENTITY, {
      query: {},
      force_load_from_db: false,
      customKey: `${this.ENTITY}:${country_code}:ALL`,
    });
  }

  public async getStateCities(
    country_code: string,
    state_code: string,
    config?: {
      expiration?: number;
      company?: string | null;
    }
  ) {
    return this.cache.list(this.ENTITY, {
      query: {},
      force_load_from_db: false,
      customKey: `${this.ENTITY}:${country_code}:${state_code}`,
    });
  }

  public async getMany(
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
  ) {
    return this.cache.getMany(this.ENTITY, ids, config);
  }

  public async list(
    config: {
      company?: string | null;
      query?: Levelup.V2.CacheManager.TListQueryParams<"city">;
      force_load_from_db?: boolean;
      filter?: (item: Levelup.V2.SystemStructure.EntityType<"city">) => boolean;
    } = {
      query: {} as any,
      force_load_from_db: true,
    }
  ): Promise<Levelup.V2.SystemStructure.EntityType<"city">[]> {
    await this.revalidateCache();
    return this.cache.list(this.ENTITY, config);
  }

  public async set(
    id: string,
    value: Partial<Levelup.V2.SystemStructure.EntityType<"city">>,
    company?: string | null
  ) {
    await this.cache.set(this.ENTITY, value.code, value as any, company, {
      customKey: `${this.ENTITY}:${value.country_code}:${value.state_code}`,
    });
    await this.cache.set(this.ENTITY, value.code, value as any, company, {
      customKey: `${this.ENTITY}:${value.country_code}:ALL`,
    });
    return this.cache.set(this.ENTITY, id, value as any, company);
  }

  public async unset(id: string, company?: string | null) {
    return this.cache.unset(this.ENTITY, id, company);
  }

  public async unsetAll(company?: string | null) {
    return this.cache.unsetAll(this.ENTITY, company);
  }

  public async revalidateCache() {
    const citiesLastUpdatedAt = await this.cache.getConfigValue<Date>(
      "CITIES_LAST_UPDATED_AT",
      moment().subtract(20, "day").toDate()
    );
    if (this.cache.isExpired(citiesLastUpdatedAt, SECONDS_IN_AN_HOUR)) {
      const cities = await this.cache.loadListFromDB(
        "city",
        {
          count: -1,
        },
        null
      );

      for (let idx = 0; idx < cities.length; idx++) {
        const city = cities[idx];
        await this.set(city._id, city);
      }
      await this.cache.setConfigValue<Date>(
        "CITIES_LAST_UPDATED_AT",
        moment().toDate()
      );
    }
  }
}
