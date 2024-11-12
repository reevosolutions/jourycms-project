import moment from 'moment';
import { RedisClientType, RedisFlushModes, createClient } from 'redis';
import Container, { Service } from 'typedi';
import { errorToObject } from '../../../utilities/exceptions';
import initLogger, { LoggerService } from '../../../utilities/logging';
import config from '../../../config';
import { defaults } from '../../../utilities/helpers/utils.helpers';
import { initJouryCMSSdk } from '../../../utilities/data/sdk';
import exceptions from '../../../exceptions';
import CacheManager from '../../../managers/cache-manager';
import ArticleTypesCacheManager from './entity-managers/content/articleTypes.cache-manager';
import ArticlesCacheManager from './entity-managers/content/articles.cache-manager';
import TaxonomiesCacheManager from './entity-managers/content/taxonomies.cache-manager';
import TermsCacheManager from './entity-managers/content/terms.cache-manager';

@Service()
export default class CustomCacheManager extends CacheManager {
  public constructor() {
    super();
  }

  public async customeLoadObjectByIdFormDB<
    E extends Levelup.CMS.V1.Utils.SystemStructure.Models.AllModels
  >(entity: E, id: string): Promise<Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>> {
    try {
      let data: { data: any };
      let result: Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>;

      const sdk = initJouryCMSSdk();

      switch (entity) {
        case 'articleType':
          data = await sdk.content.articleTypes.getById(id);
          result = data?.data as Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>;
          break;
        case 'article':
          data = await sdk.content.articles.getById(id);
          result = data?.data as Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>;
          break;
        case 'taxonomy':
          data = await sdk.content.taxonomies.getById(id);
          result = data?.data as Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>;
          break;
        case 'term':
          data = await sdk.content.terms.getById(id);
          result = data?.data as Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>;
          break;
        default:
          return this.loadObjectByIdFormDB(entity, id);

      }
      this.logger.trace.value(this.loadObjectByIdFormDB.name, entity, id, !!result);
      if (!result) this.logger.trace.warn(this.loadObjectByIdFormDB.name, entity, id, 'NOT FOUND');
      return result;
    } catch (error) {
      this.logger.save.error({
        name: this.generateLogItemName(this.loadObjectByIdFormDB),
        payload: {
          entity,
          id,
          error: errorToObject(error)
        }
      });
      return;
    }
  }

  public async customeLoadListFromDB<E extends Levelup.CMS.V1.Utils.SystemStructure.Models.AllModels>(
    entity: E,
    query: E extends Levelup.CMS.V1.Utils.SystemStructure.Models.AllModels
      ? Levelup.CMS.V1.CacheManager.TListQueryParams<E>
      : never,
    company: string | null
  ): Promise<Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[]> {
    try {
      let data: { data: any[] };
      let result: Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[] = [];

      query = {
        ...(query || {}),
        filters: {
          ...(query?.filters || {})
        }
      } as any;

      if (company && this._entityRelatedToCompany(entity as Levelup.CMS.V1.Utils.SystemStructure.Models.AllModels))
        (query.filters as any)!.company = company;

      const sdk = initJouryCMSSdk();

      switch (entity) {
        // pharmadz
        case 'articleType':
          data = await sdk.content.articleTypes.list(query as any);
          result = data?.data as Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[];
          break;
        case 'article':
          data = await sdk.content.articles.list(query as any);
          result = data?.data as Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[];
          break;
        case 'taxonomy':
          data = await sdk.content.taxonomies.list(query as any);
          result = data?.data as Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[];
          break;
        case 'term':
          data = await sdk.content.terms.list(query as any);
          result = data?.data as Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[];
          break;
        default:
          return this.loadListFromDB(entity, query as Levelup.CMS.V1.CacheManager.TListQueryParams<E>, company);
          break;
      }

      return result;
    } catch (error) {
      this.logger.error(this.generateLogItemName(this.loadListFromDB), {
        entity,
        query,
        error: errorToObject(error)
      });
      this.logger.save.error({
        name: this.generateLogItemName(this.loadListFromDB),
        payload: {
          entity,
          query,
          error: errorToObject(error)
        }
      });
      return;
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                            START COMMON METHODS                            */
  /* -------------------------------------------------------------------------- */

  public async set<E extends Levelup.CMS.V1.Utils.SystemStructure.Models.AllModels>(
    entity: E,
    id: string,
    value: Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>,
    company: string | null = null
  ) {
    try {
      const now = new Date();
      const client = await this.getClient();
      await client.hSet(
        this.generateEntityKey(entity, company),
        id.toString(),
        JSON.stringify({
          value,
          last_updated: now
        })
      );
      if (!company && (value as any).company) {
        await this.set(entity, id, value, (value as any).company);
      }
    } catch (error) {
      this.logger.save.error({
        name: this.generateLogItemName(this.set),
        payload: {
          entity,
          id,
          value
        }
      });
      throw error;
    }
  }

  public async get<E extends Levelup.CMS.V1.Utils.SystemStructure.Models.AllModels>(
    entity: E,
    id: string,
    config: {
      expiration?: number;
      force_load_from_db?: boolean;
      company?: string | null;
    } = {
        expiration: 3600 * 24,
        force_load_from_db: true,
        company: null
      }
  ): Promise<Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>> {
    try {
      /**
       * Apply defaults on config
       */
      config = defaults(config, {
        expiration: 3600 * 24,
        force_load_from_db: true,
        company: null
      });

      if (!id) return null;
      const client = await this.getClient();
      const val = await client.hGet(this.generateEntityKey(entity, config.company), id.toString());

      let oldDoc: Levelup.CMS.V1.CacheManager.Store.TStoredLevelupObject<E>;
      if (val) {
        oldDoc = JSON.parse(val);
      }

      if (oldDoc) {
        if (!this.isExpired(oldDoc.last_updated, config.expiration)) {
          return oldDoc.value;
        } else this.logger.trace.warn(this.get.name, entity, 'EXPIRED', id);
      } else this.logger.trace.warn(this.get.name, entity, 'NOT FOUND', id);

      if (!config.force_load_from_db) return null;

      const db_object = await this.customeLoadObjectByIdFormDB(entity, id);
      if (db_object) await this.set(entity, id, db_object, config.company);

      return db_object;
    } catch (error) {
      this.logger.save.error({
        name: this.generateLogItemName(this.get),
        payload: {
          entity,
          id,
          error: errorToObject(error)
        }
      });
      return null;
    }
  }

  public async getMany<E extends Levelup.CMS.V1.Utils.SystemStructure.Models.AllModels>(
    entity: E,
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
  ): Promise<Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[]> {
    try {
      if (!ids?.length) return [];

      /**
       * Apply defaults on config
       */
      config = defaults(config, {
        expiration: 3600 * 24,
        force_load_from_db: true,
        company: null
      });

      return ids.reduce(
        async (previousPromise, currentItem) => {
          const accumulator = await previousPromise;
          const result = await this.get(entity, currentItem.toString(), config);
          return [...accumulator, result];
        },
        Promise.resolve([] as Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[])
      );
    } catch (error) {
      this.logger.save.error({
        name: this.generateLogItemName(this.get),
        payload: {
          entity,
          ids,
          config,
          error: errorToObject(error)
        }
      });
      return [];
    }
  }

  public async unset<E extends Levelup.CMS.V1.Utils.SystemStructure.Models.AllModels>(entity: E, id: string, company: string | null = null) {
    try {
      const client = await this.getClient();
      await client.hDel(this.generateEntityKey(entity, company), id.toString());
    } catch (error) {
      this.logger.save.error({
        name: this.generateLogItemName(this.unset),
        payload: {
          entity,
          id,
          error: errorToObject(error)
        }
      });
      throw error;
    }
  }

  public async unsetAll<E extends Levelup.CMS.V1.Utils.SystemStructure.Models.AllModels>(entity: E, company: string | null = null) {
    try {
      const client = await this.getClient();
      await client.del(this.generateEntityKey(entity, company));
    } catch (error) {
      this.logger.save.error({
        name: this.generateLogItemName(this.unsetAll),
        payload: {
          entity,
          error: errorToObject(error)
        }
      });
      throw error;
    }
  }

  public async list<E extends Levelup.CMS.V1.Utils.SystemStructure.Models.AllModels>(
    entity: E,
    config: {
      query?: any;
      force_load_from_db?: boolean;
      filter?: (item: Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>) => boolean;
      company?: string | null;
    } = {
        query: {} as E extends Levelup.CMS.V1.Utils.SystemStructure.Models.AllModels
          ? Levelup.CMS.V1.CacheManager.TListQueryParams<E>
          : never,
        force_load_from_db: true,
        filter: () => true,
        company: null
      }
  ): Promise<Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[]> {
    try {
      type TQuery = E extends Levelup.CMS.V1.Utils.SystemStructure.Models.AllModels
        ? Levelup.CMS.V1.CacheManager.TListQueryParams<E>
        : never;
      /**
       * Apply defaults on config
       */
      config = defaults(config, {
        query: {} as TQuery,
        force_load_from_db: true,
        filter: () => true,
        company: null
      });

      let result: Levelup.CMS.V1.Utils.SystemStructure.Models.EntityType<E>[] = [];
      const client = await this.getClient();
      const valuesObject = await client.hGetAll(
        this.generateEntityKey(entity, config.company || (config.query?.filters as any)?.company)
      );

      if (valuesObject) {
        for (let idx = 0; idx < Object.values(valuesObject).length; idx++) {
          const val = Object.values(valuesObject)[idx];

          let oldDoc: Levelup.CMS.V1.CacheManager.Store.TStoredLevelupObject<E>;
          if (val) {
            oldDoc = JSON.parse(val);
          }

          if (oldDoc) {
            result.push(oldDoc.value);
          }
        }
      }

      result = result.filter(config.filter);

      if (!result.length && config.force_load_from_db) {
        const loadedData = await this.customeLoadListFromDB(entity, config.query as any, config.company);
        for (let idx = 0; idx < loadedData?.length || 0; idx++) {
          const item = loadedData[idx];
          await this.set(entity, item['_id'], item, config.company);
        }
        return (loadedData || []).filter(config.filter);
      } else return result;
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }
  /* -------------------------------------------------------------------------- */
  /*                             END COMMON METHODS                             */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                               ENTITY MANAGERS                              */
  /* -------------------------------------------------------------------------- */
  public get articleTypes() {
    return ArticleTypesCacheManager.getInstance();
  }

  public get articles() {
    return ArticlesCacheManager.getInstance();
  }

  public get taxonomies() {
    return TaxonomiesCacheManager.getInstance();
  }

  public get terms() {
    return TermsCacheManager.getInstance();
  }

  
  /* -------------------------------------------------------------------------- */
  /*                             END ENTITY MANAGERS                            */
  /* -------------------------------------------------------------------------- */
}
