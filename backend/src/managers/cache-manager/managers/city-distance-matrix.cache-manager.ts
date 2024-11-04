import Container from "typedi";
import CacheManager from "..";
import config from "../../../config";
import initLogger, { LoggerService } from "../../../utilities/logging";
import { SECONDS_IN_A_WEEK } from "../../../constants/date.constants";

type Datum = {
  codes: [
    Levelup.V2.Utils.Common.LocationAdministrativeCode,
    Levelup.V2.Utils.Common.LocationAdministrativeCode
  ];
  country_code: Levelup.V2.Utils.Common.LocationAdministrativeCode;
  distance: number;
  duration: number;
  duration_in_traffic: number;
};
export default class CityDistanceMatrixCacheManager {
  private logger: LoggerService;

  private static instance: CityDistanceMatrixCacheManager;
  private readonly cache: CacheManager;

  private readonly CACHE_KEY = "distanceMatrix:city";
  private readonly EXPIRATION = SECONDS_IN_A_WEEK;

  private constructor() {
    this.cache = Container.get(CacheManager);
    this.logger = initLogger("COMPONENT", `${this.constructor.name}`);
  }

  public static getInstance(): CityDistanceMatrixCacheManager {
    if (!CityDistanceMatrixCacheManager.instance) {
      CityDistanceMatrixCacheManager.instance =
        new CityDistanceMatrixCacheManager();
    }
    return CityDistanceMatrixCacheManager.instance;
  }

  public async set(
    country_code: Levelup.V2.Utils.Common.LocationAdministrativeCode,
    cities: [
      Levelup.V2.Utils.Common.LocationAdministrativeCode,
      Levelup.V2.Utils.Common.LocationAdministrativeCode
    ],
    data: Datum
  ) {
    try {
      const client = await this.cache.getClient();
      cities = cities.sort();
      await client.hSet(
        this.cache.generateForeignKey(
          `${this.CACHE_KEY}:${country_code}:${cities[0]}`
        ),
        cities[1],
        JSON.stringify(data)
      );
    } catch (e) {
      this.logger.error(this.set.name, e);
      throw e;
    }
  }

  public async get(
    country_code: Levelup.V2.Utils.Common.LocationAdministrativeCode,
    cities: [
      Levelup.V2.Utils.Common.LocationAdministrativeCode,
      Levelup.V2.Utils.Common.LocationAdministrativeCode
    ]
  ): Promise<Datum | null> {
    try {
      const client = await this.cache.getClient();
      cities = cities.sort();

      const value =
        (await client.hGet(
          this.cache.generateForeignKey(
            `${this.CACHE_KEY}:${country_code}:${cities[0]}`
          ),
          cities[1]
        )) || null;
      return value ? JSON.parse(value) : null;
    } catch (e) {
      this.logger.error(this.get.name, e);
      return null;
    }
  }
}
