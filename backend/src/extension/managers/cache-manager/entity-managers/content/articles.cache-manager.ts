import Container from 'typedi';
import CacheManager from '../..';
import initLogger, { LoggerContext, LoggerService } from '../../../../../utilities/logging';
import { defaults } from '../../../../../utilities/helpers/utils.helpers';

/**
 * @description Cache manager for Articles
 */
export default class ArticlesCacheManager implements Levelup.CMS.V1.CacheManager.EntityCacheManager<'article'> {
  private logger: LoggerService;

  private static instance: ArticlesCacheManager;
  private readonly cache: CacheManager;

  private readonly EXPIRATION = 3600 * 48;
  private readonly ENTITY = 'article' as const;

  private constructor() {
    this.cache = Container.get(CacheManager);
    this.logger = initLogger(LoggerContext.COMPONENT, `${this.constructor.name}`);
  }

  public static getInstance(): ArticlesCacheManager {
    if (!ArticlesCacheManager.instance) {
      ArticlesCacheManager.instance = new ArticlesCacheManager();
    }
    return ArticlesCacheManager.instance;
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
        company: null
      })
    );
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
      company: null
    }
  ) {
    return this.cache.getMany(this.ENTITY, ids, config);
  }

  public async list(
    config: {
      company?: string | null;
      query?: Levelup.CMS.V1.CacheManager.TListQueryParams<'article'>;
      force_load_from_db?: boolean;
      filter?: (item: Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<'article'>) => boolean;
    } = {
      query: {} as any,
      force_load_from_db: true
    }
  ): Promise<Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<'article'>[]> {
    return this.cache.list(this.ENTITY, config);
  }

  public async set(
    id: string,
    value: Partial<Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<'article'>>,
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
