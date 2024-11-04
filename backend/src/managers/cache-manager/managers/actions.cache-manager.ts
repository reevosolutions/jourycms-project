import Container from "typedi";
import CacheManager from "..";
import config from "../../../config";
import initLogger, { LoggerService } from "../../../utilities/logging";

export default class ActionsCacheManager {
  private logger: LoggerService;

  private static instance: ActionsCacheManager;
  private readonly cache: CacheManager;

  private readonly CACHE_KEY = "blockedActions";
  private readonly EXPIRATION = 3600 * 48;

  private constructor() {
    this.cache = Container.get(CacheManager);
    this.logger = initLogger("COMPONENT", `${this.constructor.name}`);
  }

  public static getInstance(): ActionsCacheManager {
    if (!ActionsCacheManager.instance) {
      ActionsCacheManager.instance = new ActionsCacheManager();
    }
    return ActionsCacheManager.instance;
  }

  public async block(
    actionId: string,
    options: {
      /**
       * in milliseconds (default: 30 minutes)
       */
      maxFreezeTime: number;
      serviceName?: string;
    } = {
      maxFreezeTime: 1000 * 60 * 30,
    }
  ) {
    try {
      const client = await this.cache.getClient();
      await client.hSet(
        this.cache.generateForeignKey(this.CACHE_KEY),
        actionId,
        JSON.stringify({
          service: options.serviceName || config.currentService.name,
          actionId,
          blocked: true,
        })
      );
      setTimeout(async () => {
        this.unblock(
          options.serviceName || config.currentService.name,
          actionId
        );
      }, options.maxFreezeTime);
    } catch (e) {
      this.logger.error(this.block.name, e);
      throw e;
    }
  }

  public async unblock(serviceName: string, actionId: string) {
    try {
      const client = await this.cache.getClient();
      await client.hSet(
        this.cache.generateForeignKey(this.CACHE_KEY),
        actionId,
        JSON.stringify({
          service: serviceName,
          actionId,
          blocked: false,
        })
      );
    } catch (e) {
      this.logger.error(this.unblock.name, e);
    }
  }

  public async isBlocked(
    serviceName: string,
    actionId: string
  ): Promise<boolean> {
    try {
      const client = await this.cache.getClient();
      const value =
        (await client.hGet(
          this.cache.generateForeignKey(this.CACHE_KEY),
          actionId
        )) || `{service: "${serviceName}", blocked: false}`;
      const object = JSON.parse(value) || {
        service: serviceName,
        actionId,
        blocked: false,
      };
      this.logger.value(this.isBlocked.name, { value, object });
      if (object.service === serviceName && object.blocked) {
        return true;
      }
      return false;
    } catch (e) {
      this.logger.error(this.isBlocked.name, e);
      return false;
    }
  }

  public async unblockAllServiceActions(serviceName: string) {
    try {
      const client = await this.cache.getClient();
      const val = await client.hGetAll(
        this.cache.generateForeignKey(this.CACHE_KEY)
      );
      if (val) {
        Object.keys(val).forEach(async (key) => {
          const value = JSON.parse(val[key]);
          if (value.service === serviceName) {
            await client.hSet(
              this.cache.generateForeignKey(this.CACHE_KEY),
              key,
              JSON.stringify({
                service: serviceName,
                actionId: value.actionId,
                blocked: false,
              })
            );
          }
        });
      }
    } catch (e) {
      this.logger.error(this.unblockAllServiceActions.name, e);
      throw e;
    }
  }

  public async unblockAllActionsForAllServices() {
    try {
      const client = await this.cache.getClient();
      const val = await client.hGetAll(
        this.cache.generateForeignKey(this.CACHE_KEY)
      );
      if (val) {
        Object.keys(val).forEach(async (key) => {
          const value = JSON.parse(val[key]);
          await client.hSet(
            this.cache.generateForeignKey(this.CACHE_KEY),
            key,
            JSON.stringify({
              service: value.service,
              actionId: value.actionId,
              blocked: false,
            })
          );
        });
      }
    } catch (e) {
      this.logger.error(this.unblockAllActionsForAllServices.name, e);
      throw e;
    }
  }
}
