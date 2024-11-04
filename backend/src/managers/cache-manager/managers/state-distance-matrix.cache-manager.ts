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

export default class StateDistanceMatrixCacheManager {
  private logger: LoggerService;

  private static instance: StateDistanceMatrixCacheManager;
  private readonly cache: CacheManager;

  private readonly CACHE_KEY = "distanceMatrix:state";
  private readonly EXPIRATION = SECONDS_IN_A_WEEK;

  private constructor() {
    this.cache = Container.get(CacheManager);
    this.logger = initLogger("COMPONENT", `${this.constructor.name}`);
  }

  public static getInstance(): StateDistanceMatrixCacheManager {
    if (!StateDistanceMatrixCacheManager.instance) {
      StateDistanceMatrixCacheManager.instance =
        new StateDistanceMatrixCacheManager();
    }
    return StateDistanceMatrixCacheManager.instance;
  }

  public async set(
    country_code: Levelup.V2.Utils.Common.LocationAdministrativeCode,
    states: [
      Levelup.V2.Utils.Common.LocationAdministrativeCode,
      Levelup.V2.Utils.Common.LocationAdministrativeCode
    ],
    data: Datum
  ) {
    try {
      const client = await this.cache.getClient();
      states = states.sort();
      await client.hSet(
        this.cache.generateForeignKey(
          `${this.CACHE_KEY}:${country_code}:${states[0]}`
        ),
        states[1],
        JSON.stringify(data)
      );
    } catch (e) {
      this.logger.error(this.set.name, e);
      throw e;
    }
  }

  public async get(
    country_code: Levelup.V2.Utils.Common.LocationAdministrativeCode,
    states: [
      Levelup.V2.Utils.Common.LocationAdministrativeCode,
      Levelup.V2.Utils.Common.LocationAdministrativeCode
    ]
  ): Promise<Datum | null> {
    try {
      const client = await this.cache.getClient();
      states = states.sort();

      const value =
        (await client.hGet(
          this.cache.generateForeignKey(
            `${this.CACHE_KEY}:${country_code}:${states[0]}`
          ),
          states[1]
        )) || null;

      return value ? JSON.parse(value) : null;
    } catch (e) {
      this.logger.error(this.get.name, e);
      return null;
    }
  }
}
