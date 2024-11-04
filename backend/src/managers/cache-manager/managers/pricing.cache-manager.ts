import config from '../../../config';
import moment from 'moment';
import initLogger, { LoggerService } from '../../../utilities/logging';
import { v4 as uuidv4 } from 'uuid';
import Container from "typedi";
import CacheManager from "..";





export default class PricingCacheManager {
  private logger: LoggerService;
  private static instance: PricingCacheManager;
  private readonly cache: CacheManager;

  private readonly CACHE_KEY = 'PARCEL_LISTING_REQUESTS';
  private readonly SPC_STATE_BASED_ZONING_KEY: string = "SPC_STATE_BASED_ZONING";
  private readonly SPC_CITY_BASED_ZONING_KEY: string = "SPC_CITY_BASED_ZONING";
  private readonly SPC_STATE_ZONES_KEY: string = "SPC_STATE_ZONES";
  private readonly SPC_CITY_ZONES_KEY: string = "SPC_CITY_ZONES";

  /**
   * in seconds
   */
  private readonly EXPIRATION = 60 * 5;


  private constructor() {
    this.cache = Container.get(CacheManager);
    this.logger = initLogger('COMPONENT', `${this.constructor.name}`);


  }

  public static getInstance(): PricingCacheManager {
    if (!PricingCacheManager.instance) {
      PricingCacheManager.instance = new PricingCacheManager();
    }
    return PricingCacheManager.instance;
  }

  /* -------------------------------------------------------------------------- */
  /*                                 STATE ZONES                                */
  /* -------------------------------------------------------------------------- */
  public async setStateZone(id: string, value: Levelup.V2.Payment.Spc.Entity.StateZone): Promise<void> {
    try {
      const KEY = this.cache.generateForeignKey(this.SPC_STATE_ZONES_KEY);
      const client = await this.cache.getClient();
      this.logger.event(this.setStateZone.name, KEY, id);
      await client.hSet(KEY, id.toString(), JSON.stringify(value));
    } catch (e) {
      this.logger.error(this.setStateZone.name, e);
      throw e;
    }
  }

  public async setStateBasedZoning(id: string, value: Levelup.V2.Payment.Spc.Entity.StateBasedZoning): Promise<void> {
    try {
      const KEY = this.cache.generateForeignKey(this.SPC_STATE_BASED_ZONING_KEY);
      const client = await this.cache.getClient();
      this.logger.event(this.setStateBasedZoning.name, KEY, id);
      await client.hSet(KEY, id.toString(), JSON.stringify(value));
    } catch (e) {
      this.logger.error(this.setStateBasedZoning.name, e);
      throw e;
    }
  }


  public async listStateBasedZoning(company_id: string): Promise<Levelup.V2.Payment.Spc.Entity.StateBasedZoning[]> {
    try {
      const KEY = this.cache.generateForeignKey(this.SPC_STATE_BASED_ZONING_KEY);
      const client = await this.cache.getClient();
      const val = await client.hGetAll(KEY);
      const items: Levelup.V2.Payment.Spc.Entity.StateBasedZoning[] = [];
      if (val) {
        Object.values(val).forEach(value => {
          const v = JSON.parse(value);
          items.push(v);
        })
      }
      return items.filter(item => item.company === company_id);
    } catch (e) {
      this.logger.error(this.listStateBasedZoning.name, e);
      throw e;
    }
  }


  public async listStateZones(company_id: string): Promise<Levelup.V2.Payment.Spc.Entity.StateZone[]> {
    try {
      const KEY = this.cache.generateForeignKey(this.SPC_STATE_ZONES_KEY);
      const client = await this.cache.getClient();
      const val = await client.hGetAll(KEY);
      const items: Levelup.V2.Payment.Spc.Entity.StateZone[] = [];
      if (val) {
        Object.values(val).forEach(value => {
          const v = JSON.parse(value);
          items.push(v);
        })
      }
      return items.filter(item => item.company === company_id);
    } catch (e) {
      this.logger.error(this.listStateZones.name, e);
      throw e;
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                 CITY ZONES                                 */
  /* -------------------------------------------------------------------------- */
  public async setCityZone(id: string, value: Levelup.V2.Payment.Spc.Entity.CityZone): Promise<void> {
    try {
      const KEY = this.cache.generateForeignKey(this.SPC_CITY_ZONES_KEY);
      const client = await this.cache.getClient();
      this.logger.event(this.setStateZone.name, KEY, id);
      await client.hSet(KEY, id.toString(), JSON.stringify(value));
    } catch (e) {
      this.logger.error(this.setCityZone.name, e);
      throw e;
    }
  }

  public async setCityBasedZoning(id: string, value: Levelup.V2.Payment.Spc.Entity.CityBasedZoning): Promise<void> {
    try {
      const KEY = this.cache.generateForeignKey(this.SPC_CITY_BASED_ZONING_KEY);
      const client = await this.cache.getClient();
      this.logger.event(this.setCityBasedZoning.name, KEY, id);
      await client.hSet(KEY, id.toString(), JSON.stringify(value));
    } catch (e) {
      this.logger.error(this.setCityBasedZoning.name, e);
      throw e;
    }
  }


  public async listCityBasedZoning(company_id: string): Promise<Levelup.V2.Payment.Spc.Entity.CityBasedZoning[]> {
    try {
      const KEY = this.cache.generateForeignKey(this.SPC_CITY_BASED_ZONING_KEY);
      const client = await this.cache.getClient();
      const val = await client.hGetAll(KEY);
      const items: any[] = [];
      if (val) {
        Object.values(val).forEach(value => {
          const v = JSON.parse(value);
          items.push(v);
        })
      }
      return items.filter(item => item.company === company_id);
    } catch (e) {
      this.logger.error(this.listCityBasedZoning.name, e);
      throw e;
    }
  }


  public async listCityZones(company_id: string): Promise<Levelup.V2.Payment.Spc.Entity.CityZone[]> {
    try {
      const KEY = this.cache.generateForeignKey(this.SPC_CITY_ZONES_KEY);
      const client = await this.cache.getClient();
      const val = await client.hGetAll(KEY);
      const items: Levelup.V2.Payment.Spc.Entity.CityZone[] = [];
      if (val) {
        Object.values(val).forEach(value => {
          const v = JSON.parse(value);
          items.push(v);
        })
      }
      return items.filter(item => item.company === company_id);
    } catch (e) {
      this.logger.error(this.listCityZones.name, e);
      throw e;
    }
  }



}

