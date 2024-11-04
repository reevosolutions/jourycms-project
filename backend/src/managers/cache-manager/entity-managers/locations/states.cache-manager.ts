import Container from "typedi";
import CacheManager from "../..";
import initLogger, { LoggerService } from "../../../../utilities/logging";
import { defaults } from "../../../../utilities/helpers/utils.helpers";
import moment from "moment";
import { SECONDS_IN_AN_HOUR } from "../../../../constants/date.constants";

/**
 * @description Cache manager for States
 */
export default class StatesCacheManager
  implements Levelup.V2.CacheManager.EntityCacheManager<"state">
{
  private logger: LoggerService;

  private static instance: StatesCacheManager;
  private readonly cache: CacheManager;

  private readonly EXPIRATION = 3600 * 48;
  private readonly ENTITY = "state" as const;

  private constructor() {
    this.cache = Container.get(CacheManager);
    this.logger = initLogger("COMPONENT", `${this.constructor.name}`);
  }

  public static getInstance(): StatesCacheManager {
    if (!StatesCacheManager.instance) {
      StatesCacheManager.instance = new StatesCacheManager();
    }
    return StatesCacheManager.instance;
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

  public async getCountryStates(
    country_code: string,
    config?: {
      expiration?: number;
      company?: string | null;
    }
  ) {
    return this.cache.list(this.ENTITY, {
      query: {},
      force_load_from_db: false,
      customKey: `${this.ENTITY}:${country_code}`,
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
      query?: Levelup.V2.CacheManager.TListQueryParams<"state">;
      force_load_from_db?: boolean;
      filter?: (
        item: Levelup.V2.SystemStructure.EntityType<"state">
      ) => boolean;
    } = {
      query: {} as any,
      force_load_from_db: true,
    }
  ): Promise<Levelup.V2.SystemStructure.EntityType<"state">[]> {
    await this.revalidateCache();
    return this.cache.list(this.ENTITY, config);
  }

  public async set(
    id: string,
    value: Partial<Levelup.V2.SystemStructure.EntityType<"state">>,
    company?: string | null
  ) {
    await this.cache.set(this.ENTITY, value.code, value as any, company, {
      customKey: `${this.ENTITY}:${value.country_code}`,
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
      "STATES_LAST_UPDATED_AT",
      moment().subtract(20, "day").toDate()
    );
    if (this.cache.isExpired(citiesLastUpdatedAt, SECONDS_IN_AN_HOUR)) {
      const states = await this.cache.loadListFromDB(
        "state",
        {
          count: -1,
        },
        null
      );

      for (let idx = 0; idx < states.length; idx++) {
        const state = states[idx];
        await this.set(state._id, state);
      }
      await this.cache.setConfigValue<Date>(
        "STATES_LAST_UPDATED_AT",
        moment().toDate()
      );
    }
  }
}
