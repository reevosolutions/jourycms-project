import config from '../../../config';
import moment from 'moment';
import initLogger, { LoggerService } from '../../../utilities/logging';
import { v4 as uuidv4 } from 'uuid';
import Container from "typedi";
import CacheManager from "..";



export default class TasksCacheManager {
  private logger: LoggerService;
  private static instance: TasksCacheManager;
  private readonly cache: CacheManager;

  private readonly CACHE_KEY = 'frozenTasks';
  private readonly EXPIRATION = 3600 * 48;


  private constructor() {
    this.cache = Container.get(CacheManager);
    this.logger = initLogger('COMPONENT', `${this.constructor.name}`);
    

  }

  public static getInstance(): TasksCacheManager {
    if (!TasksCacheManager.instance) {
      TasksCacheManager.instance = new TasksCacheManager();
    }
    return TasksCacheManager.instance;
  }


  public async freeze(taskId: string, options: {
    /**
     * in milliseconds (default: 30 minutes)
     */
    maxFreezeTime: number,
    serviceName?: string
  } = {
      maxFreezeTime: 1000 * 60 * 30,
    }) {
    try {
      const client = await this.cache.getClient();
      await client.hSet(this.cache.generateForeignKey(this.CACHE_KEY), taskId, JSON.stringify({
        service: options.serviceName || config.currentService.name,
        taskId,
        frozen: true
      }));
      setTimeout(async () => {
        this.unfreeze(options.serviceName || config.currentService.name, taskId);
      }, options.maxFreezeTime);
    } catch (e) {
      this.logger.error(this.freeze.name, e);
      throw e;
    }
  }

  public async unfreeze(serviceName: string, taskId: string) {
    try {
      const client = await this.cache.getClient();
      await client.hSet(this.cache.generateForeignKey(this.CACHE_KEY), taskId, JSON.stringify({
        service: serviceName,
        taskId,
        frozen: false
      }));
    } catch (e) {
      this.logger.error(this.unfreeze.name, e);
    }
  }

  public async isFrozen(serviceName: string, taskId: string): Promise<boolean> {
    try {
      const client = await this.cache.getClient();
      const value = await client.hGet(this.cache.generateForeignKey(this.CACHE_KEY), taskId) || `{service: "${serviceName}", frozen: false}`;
      const object = JSON.parse(value) || {
        service: serviceName,
        taskId,
        frozen: false
      };
      this.logger.value(this.isFrozen.name, { value, object })
      if (object.service === serviceName && object.frozen) {
        return true;
      }
      return false;
    } catch (e) {
      this.logger.error(this.isFrozen.name, e);
      return false;
    }
  }

  public async unfreezeAllServiceTasks(serviceName: string) {
    try {
      const client = await this.cache.getClient();
      const val = await client.hGetAll(this.cache.generateForeignKey(this.CACHE_KEY));
      if (val) {
        Object.keys(val).forEach(async key => {
          const value = JSON.parse(val[key]);
          if (value.service === serviceName) {
            await client.hSet(this.cache.generateForeignKey(this.CACHE_KEY), key, JSON.stringify({
              service: serviceName,
              taskId: value.taskId,
              frozen: false
            }));
          }
        });
      }
    } catch (e) {
      this.logger.error(this.unfreezeAllServiceTasks.name, e);
      throw e;
    }
  }
}


