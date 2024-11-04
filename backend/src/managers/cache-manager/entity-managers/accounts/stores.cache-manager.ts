import Container from 'typedi';
import CacheManager from '../..';
import initLogger, { LoggerService } from '../../../../utilities/logging';
import { defaults } from '../../../../utilities/helpers/utils.helpers';


/**
 * @description Cache manager for Stores
 */
export default class StoresCacheManager
  implements Levelup.V2.CacheManager.EntityCacheManager<"store">
{
  private logger: LoggerService;

  private static instance: StoresCacheManager;
  private readonly cache: CacheManager;

  private readonly EXPIRATION = 3600 * 48;
  private readonly ENTITY = "store" as const;

  private constructor() {
    this.cache = Container.get(CacheManager);
    this.logger = initLogger("COMPONENT", `${this.constructor.name}`);
  }

  public static getInstance(): StoresCacheManager {
    if (!StoresCacheManager.instance) {
      StoresCacheManager.instance = new StoresCacheManager();
    }
    return StoresCacheManager.instance;
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
      query?: Levelup.V2.CacheManager.TListQueryParams<"store">;
      force_load_from_db?: boolean;
      filter?: (
        item: Levelup.V2.SystemStructure.EntityType<"store">
      ) => boolean;
    } = {
      query: {} as any,
      force_load_from_db: true,
    }
  ): Promise<Levelup.V2.SystemStructure.EntityType<"store">[]> {
    return this.cache.list(this.ENTITY, config);
  }

  public async set(
    id: string,
    value: Partial<Levelup.V2.SystemStructure.EntityType<"store">>,
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
