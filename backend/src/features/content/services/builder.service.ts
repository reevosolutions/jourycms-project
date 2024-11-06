/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26-10-2024 23:24:33
 */

import Container, { Service } from 'typedi';
import BaseService from '../../../common/base.service';
import { EventDispatcher } from '../../../decorators/eventDispatcher.decorator';
import CacheManager from '../../../managers/cache-manager';
import TranslationToolsService from './translation.tools.service';

/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26-10-2024 23:24:33
 * @description this is used to perform build operations on service level on startup
 */
@Service()
export default class BuilderService extends BaseService {
  public constructor(@EventDispatcher() private eventDispatcher: EventDispatcher) {
    super();
  }

  /**
   * @description entry method
   */
  public async run() {
    const scenario = this.initScenario(this.logger, this.seed);
    try {
      await this.seed();
      await this.cleanupData();
      await this.upgrade();
      await this.refreshCache();
    } catch (error) {
      scenario.error(error);
    }
  }

  /**
   * @description this is used to test the update comparison
   */
  public async seed() {
    const scenario = this.initScenario(this.logger, this.seed);
    try {
      const translationToolsService = Container.get(TranslationToolsService);
      await translationToolsService.translateUsingGoogleAPI();
    } catch (error) {
      scenario.error(error);
    }
  }

  /**
   * @description this is used to clean up data
   */
  public async cleanupData() {
    const scenario = this.initScenario(this.logger, this.cleanupData);
    try {
    } catch (error) {
      scenario.error(error);
    }
  }

  /**
   * @description this is used to upgrade the service and refactor the database
   */
  public async upgrade() {
    const scenario = this.initScenario(this.logger, this.upgrade);
    try {
    } catch (error) {
      scenario.error(error);
    }
  }

  /**
   * @description this is used to refresh the cache
   */
  public async refreshCache() {
    const scenario = this.initScenario(this.logger, this.refreshCache);
    try {
      const cache = Container.get(CacheManager);
    } catch (error) {
      scenario.error(error);
    }
  }
}
