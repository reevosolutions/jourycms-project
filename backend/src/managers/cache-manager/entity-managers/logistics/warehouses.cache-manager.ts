import Container from 'typedi';
import CacheManager from '../..';
import initLogger, { LoggerService } from '../../../../utilities/logging';
import { defaults } from '../../../../utilities/helpers/utils.helpers';


/**
 * @description Cache manager for Warehouses
 */
export default class WarehousesCacheManager
  implements Levelup.V2.CacheManager.EntityCacheManager<"warehouse">
{
  private logger: LoggerService;

  private static instance: WarehousesCacheManager;
  private readonly cache: CacheManager;

  private readonly EXPIRATION = 3600 * 48;
  private readonly ENTITY = "warehouse" as const;

  private constructor() {
    this.cache = Container.get(CacheManager);
    this.logger = initLogger("COMPONENT", `${this.constructor.name}`);
  }

  public static getInstance(): WarehousesCacheManager {
    if (!WarehousesCacheManager.instance) {
      WarehousesCacheManager.instance = new WarehousesCacheManager();
    }
    return WarehousesCacheManager.instance;
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
      query?: Levelup.V2.CacheManager.TListQueryParams<"warehouse">;
      force_load_from_db?: boolean;
      filter?: (
        item: Levelup.V2.SystemStructure.EntityType<"warehouse">
      ) => boolean;
    } = {
      query: {} as any,
      force_load_from_db: true,
    }
  ): Promise<Levelup.V2.SystemStructure.EntityType<"warehouse">[]> {
    return this.cache.list(this.ENTITY, config);
  }

  public async set(
    id: string,
    value: Partial<Levelup.V2.SystemStructure.EntityType<"warehouse">>,
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