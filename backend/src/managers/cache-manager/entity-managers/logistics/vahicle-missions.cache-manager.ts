import Container from 'typedi';
import CacheManager from '../..';
import initLogger, { LoggerService } from '../../../../utilities/logging';
import { defaults } from '../../../../utilities/helpers/utils.helpers';


/**
 * @description Cache manager for VehicleMissions
 */
export default class VehicleMissionsCacheManager
  implements Levelup.V2.CacheManager.EntityCacheManager<"vehicleMission">
{
  private logger: LoggerService;

  private static instance: VehicleMissionsCacheManager;
  private readonly cache: CacheManager;

  private readonly EXPIRATION = 3600 * 48;
  private readonly ENTITY = "vehicleMission" as const;

  private constructor() {
    this.cache = Container.get(CacheManager);
    this.logger = initLogger("COMPONENT", `${this.constructor.name}`);
  }

  public static getInstance(): VehicleMissionsCacheManager {
    if (!VehicleMissionsCacheManager.instance) {
      VehicleMissionsCacheManager.instance = new VehicleMissionsCacheManager();
    }
    return VehicleMissionsCacheManager.instance;
  }

  public async get(
    id: string,
    config?: {
      expiration?: number;
      force_load_from_db?: boolean;
      company?: string | null;
    }
  ) {
    return this.cache.get(this.ENTITY, id, defaults(config, {
      expiration: this.EXPIRATION,
      force_load_from_db: true,
      company: null,
    }));
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
      query?: Levelup.V2.CacheManager.TListQueryParams<"vehicleMission">;
      force_load_from_db?: boolean;
      filter?: (
        item: Levelup.V2.SystemStructure.EntityType<"vehicleMission">
      ) => boolean;
    } = {
      query: {} as any,
      force_load_from_db: true,
    }
  ): Promise<Levelup.V2.SystemStructure.EntityType<"vehicleMission">[]> {
    return this.cache.list(this.ENTITY, config);
  }

  public async set(
    id: string,
    value: Partial<Levelup.V2.SystemStructure.EntityType<"vehicleMission">>,
    company?: string | null
  ) {
    return this.cache.set(this.ENTITY, id, value as any, company);
  }

  public async unset(id: string, company?: string | null) {
    return this.cache.unset(this.ENTITY, id, company);
  }

  public async unsetAll(company?: string | null) {
    return this.cache.unsetAll(this.ENTITY, company);
  }
}