import Container from "typedi";
import CacheManager from "../..";
import initLogger, { LoggerService } from "../../../../utilities/logging";
import { defaults } from "../../../../utilities/helpers/utils.helpers";

/**
 * @description Cache manager for Users
 */
export default class UsersCacheManager
  implements Levelup.CMS.V1.CacheManager.EntityCacheManager<"user">
{
  private logger: LoggerService;

  private static instance: UsersCacheManager;
  private readonly cache: CacheManager;

  private readonly EXPIRATION = 3600 * 48;
  protected readonly ENTITY = "user" as const;

  private constructor() {
    this.cache = Container.get(CacheManager);
    this.logger = initLogger("COMPONENT", `${this.constructor.name}`);
  }

  public static getInstance(): UsersCacheManager {
    if (!UsersCacheManager.instance) {
      UsersCacheManager.instance = new UsersCacheManager();
    }
    return UsersCacheManager.instance;
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

  public async getMany(
    ids: string[],
    config: {
      expiration: number;
      force_load_from_db: boolean;
    } = {
      expiration: 3600 * 24,
      force_load_from_db: true,
    }
  ) {
    return this.cache.getMany(this.ENTITY, ids, config);
  }

  public async list(
    config: {
      query?: Levelup.CMS.V1.CacheManager.TListQueryParams<"user">;
      force_load_from_db?: boolean;
      filter?: (item: Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<"user">) => boolean;
      company?: string | null;
    } = {
      query: {} as any,
      force_load_from_db: true,
    }
  ): Promise<Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<"user">[]> {
    return this.cache.list(this.ENTITY, config);
  }

  public async set(
    id: string,
    value: Partial<Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<"user">>,
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
