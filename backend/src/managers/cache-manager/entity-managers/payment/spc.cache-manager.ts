import Container from "typedi";
import CacheManager from "../..";
import initLogger, { LoggerService } from "../../../../utilities/logging";

/**
 * @description Cache manager for Offices
 */
export default class SpcCacheManager {
  private logger: LoggerService;

  private static instance: SpcCacheManager;
  private readonly cache: CacheManager;

  private readonly EXPIRATION = 3600 * 48;
  private readonly CITY_ZONE_ENTITY = "spcCityZone" as const;
  private readonly STATE_ZONE_ENTITY = "spcStateZone" as const;
  private readonly CITY_BASED_ZONING_ENTITY = "spcCityBasedZoning" as const;
  private readonly STATE_BASED_ZONING_ENTITY = "spcStateBasedZoning" as const;

  private constructor() {
    this.cache = Container.get(CacheManager);
    this.logger = initLogger("COMPONENT", `${this.constructor.name}`);
  }

  public static getInstance(): SpcCacheManager {
    if (!SpcCacheManager.instance) {
      SpcCacheManager.instance = new SpcCacheManager();
    }
    return SpcCacheManager.instance;
  }

  /* -------------------------------- City Zone ------------------------------- */
  public async getCityZone(zone: number, company: string | null) {
    return this.cache.get(`${this.CITY_ZONE_ENTITY}`, zone.toString(), {
      expiration: this.EXPIRATION,
      force_load_from_db: true,
      company: company,
    });
  }

  public async getManyCityZones(
    zones: number[],
    config: {
      expiration: number;
      force_load_from_db: boolean;
      company: string | null;
    } = {
      expiration: 3600 * 24,
      force_load_from_db: true,
      company: null,
    }
  ) {
    return this.cache.getMany(
      this.CITY_ZONE_ENTITY,
      zones.map((z) => z.toString()),
      config
    );
  }

  public async listCityZones(
    config: {
      query?: Levelup.V2.CacheManager.TListQueryParams<"spcCityZone">;
      force_load_from_db?: boolean;
      filter?: (
        item: Levelup.V2.SystemStructure.EntityType<"spcCityZone">
      ) => boolean;
      company: string | null;
    } = {
      query: {} as any,
      force_load_from_db: true,
      company: null,
    }
  ): Promise<Levelup.V2.SystemStructure.EntityType<"spcCityZone">[]> {
    return this.cache.list(this.CITY_ZONE_ENTITY, config);
  }

  public async setCityZone(
    zone: number,
    value: Partial<Levelup.V2.SystemStructure.EntityType<"spcCityZone">>,
    company: string | null
  ) {
    return this.cache.set(
      this.CITY_ZONE_ENTITY,
      zone.toString(),
      value as any,
      company
    );
  }

  public async unsetCityZone(zone: number, company: string | null) {
    return this.cache.unset(this.CITY_ZONE_ENTITY, zone.toString(), company);
  }

  public async unsetAllCityZones(company: string | null) {
    return this.cache.unsetAll(this.CITY_ZONE_ENTITY, company);
  }

  /* -------------------------------- State Zone ------------------------------- */
  public async getStateZone(zone: number, company: string | null) {
    return this.cache.get(`${this.STATE_ZONE_ENTITY}`, zone.toString(), {
      expiration: this.EXPIRATION,
      force_load_from_db: true,
      company: company,
    });
  }

  public async getManyStateZones(
    zones: number[],
    config: {
      expiration: number;
      force_load_from_db: boolean;
      company: string | null;
    } = {
      expiration: 3600 * 24,
      force_load_from_db: true,
      company: null,
    }
  ) {
    return this.cache.getMany(
      this.STATE_ZONE_ENTITY,
      zones.map((z) => z.toString()),
      config
    );
  }

  public async listStateZones(
    config: {
      query?: Levelup.V2.CacheManager.TListQueryParams<"spcStateZone">;
      force_load_from_db?: boolean;
      filter?: (
        item: Levelup.V2.SystemStructure.EntityType<"spcStateZone">
      ) => boolean;
      company: string | null;
    } = {
      query: {} as any,
      force_load_from_db: true,
      company: null,
    }
  ): Promise<Levelup.V2.SystemStructure.EntityType<"spcStateZone">[]> {
    return this.cache.list(this.STATE_ZONE_ENTITY, config);
  }

  public async setStateZone(
    zone: number,
    value: Partial<Levelup.V2.SystemStructure.EntityType<"spcStateZone">>,
    company: string | null
  ) {
    return this.cache.set(
      this.STATE_ZONE_ENTITY,
      zone.toString(),
      value as any,
      company
    );
  }

  public async unsetStateZone(zone: number, company: string | null) {
    return this.cache.unset(this.STATE_ZONE_ENTITY, zone.toString(), company);
  }

  public async unsetAllStateZones(company: string | null) {
    return this.cache.unsetAll(this.STATE_ZONE_ENTITY, company);
  }

  /* --------------------------- state based pricing -------------------------- */
  public async getStateBasedZoning(code: string, company: string | null) {
    return this.cache.get(this.STATE_BASED_ZONING_ENTITY, code.toString(), {
      expiration: this.EXPIRATION,
      force_load_from_db: true,
      company: company,
    });
  }

  public async getManyStateBasedZonings(
    codes: string[],
    config: {
      expiration: number;
      force_load_from_db: boolean;
      company: string | null;
    } = {
      expiration: 3600 * 24,
      force_load_from_db: true,
      company: null,
    }
  ) {
    return this.cache.getMany(this.STATE_BASED_ZONING_ENTITY, codes, config);
  }

  public async listStateBasedZonings(
    config: {
      query?: Levelup.V2.CacheManager.TListQueryParams<"spcStateBasedZoning">;
      force_load_from_db?: boolean;
      filter?: (
        item: Levelup.V2.SystemStructure.EntityType<"spcStateBasedZoning">
      ) => boolean;
      company: string | null;
    } = {
      query: {} as any,
      force_load_from_db: true,
      company: null,
    }
  ): Promise<Levelup.V2.SystemStructure.EntityType<"spcStateBasedZoning">[]> {
    return this.cache.list(this.STATE_BASED_ZONING_ENTITY, config);
  }

  public async setStateBasedZoning(
    value: Levelup.V2.Payment.Spc.Entity.StateBasedZoning
  ) {
    return this.cache.set(
      this.STATE_BASED_ZONING_ENTITY,
      value.state_code,
      value,
      value.company
    );
  }

  public async unsetStateBasedZoning(code: string, company: string | null) {
    return this.cache.unset(this.STATE_BASED_ZONING_ENTITY, code, company);
  }

  public async unsetAllStateBasedZonings(company: string | null) {
    return this.cache.unsetAll(this.STATE_BASED_ZONING_ENTITY, company);
  }

  /* --------------------------- city based pricing -------------------------- */
  public async getCityBasedZoning(state_code: string, company: string | null) {
    return this.cache.get(
      this.CITY_BASED_ZONING_ENTITY,
      state_code.toString(),
      {
        expiration: this.EXPIRATION,
        force_load_from_db: true,
        company: company,
      }
    );
  }

  public async getManyCityBasedZonings(
    state_codes: string[],
    config: {
      expiration: number;
      force_load_from_db: boolean;
      company: string | null;
    } = {
      expiration: 3600 * 24,
      force_load_from_db: true,
      company: null,
    }
  ) {
    return this.cache.getMany(
      this.CITY_BASED_ZONING_ENTITY,
      state_codes,
      config
    );
  }

  public async listCityBasedZonings(
    config: {
      query?: Levelup.V2.CacheManager.TListQueryParams<"spcCityBasedZoning">;
      force_load_from_db?: boolean;
      filter?: (
        item: Levelup.V2.SystemStructure.EntityType<"spcCityBasedZoning">
      ) => boolean;
      company: string | null;
    } = {
      query: {} as any,
      force_load_from_db: true,
      company: null,
    }
  ): Promise<Levelup.V2.SystemStructure.EntityType<"spcCityBasedZoning">[]> {
    return this.cache.list(this.CITY_BASED_ZONING_ENTITY, config);
  }

  public async setCityBasedZoning(
    value: Levelup.V2.Payment.Spc.Entity.CityBasedZoning
  ) {
    return this.cache.set(
      this.CITY_BASED_ZONING_ENTITY,
      value.state_code,
      value,
      value.company
    );
  }

  public async unsetCityBasedZoning(
    state_code: string,
    company: string | null
  ) {
    return this.cache.unset(this.CITY_BASED_ZONING_ENTITY, state_code, company);
  }

  public async unsetAllCityBasedZonings(company: string | null) {
    return this.cache.unsetAll(this.CITY_BASED_ZONING_ENTITY, company);
  }
}
