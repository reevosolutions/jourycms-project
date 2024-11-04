import config from '../../../config';
import moment from 'moment';
import initLogger, { LoggerService } from '../../../utilities/logging';
import { v4 as uuidv4 } from 'uuid';
import Container from "typedi";
import CacheManager from "..";





export default class ParcelListingRequestsCacheManager {
  private logger: LoggerService;
  private static instance: ParcelListingRequestsCacheManager;
  private readonly cache: CacheManager;

  private readonly CACHE_KEY = 'parcelListingRequests';
  /**
   * in seconds
   */
  private readonly EXPIRATION = 60 * 5;


  private constructor() {
    this.cache = Container.get(CacheManager);
    this.logger = initLogger('COMPONENT', `${this.constructor.name}`);
    

  }

  public static getInstance(): ParcelListingRequestsCacheManager {
    if (!ParcelListingRequestsCacheManager.instance) {
      ParcelListingRequestsCacheManager.instance = new ParcelListingRequestsCacheManager();
    }
    return ParcelListingRequestsCacheManager.instance;
  }


  public async setParcelList(token: string, items: Levelup.V2.Shipping.Entity.Parcel[]) {
    try {
      const now = new Date();
      const expiration = 60 * 5;
      const client = await this.cache.getClient();
      await client.hSet(this.cache.generateForeignKey(this.CACHE_KEY), token, JSON.stringify({
        items,
        date: now,
      }));
    } catch (e) {
      this.logger.error(this.setParcelList.name, e)
      throw e;
    }
  }

  public async loadParcelList(token: string): Promise<{
    items: Levelup.V2.Shipping.Entity.Parcel[],
    date: Date
  } | undefined> {
    try {
      const client = await this.cache.getClient();
      const value = await client.hGet(this.cache.generateForeignKey(this.CACHE_KEY), token);
      if (value) {
        client.hDel(this.cache.generateForeignKey(this.CACHE_KEY), token);
        return JSON.parse(value);
      }
      return;
    } catch (e) {
      this.logger.error(this.loadParcelList.name, e);
      throw e;
    }
  }
}

