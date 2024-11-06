/**
 * @description This file is used to create event subscribers.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-06 00:40:13
 */

import { EventSubscriber, On } from 'event-dispatch';
import CacheManager from '../managers/cache-manager';
import Container from 'typedi';
import initLogger from '../utilities/logging';
import events from '../config/events.config';
import config from '../config';
import { errorToObject } from '../utilities/exceptions';
import { mapDocumentToExposed } from '../utils/mappers/general.mappers';

const logger = initLogger("SUBSCRIBER", "ArticleType");

@EventSubscriber()
export default class ArticleTypeSubscriber {


  /**
   * @method onArticleTypeCreated
   * @alias ON_ARTICLE_TYPE_CREATE
   * @param {Levelup.CMS.V1.Events.Payloads.Content.ArticleType.created} payload
   */
  @On(events.content.articleType.created)
  public async onArticleTypeCreated({data}: Levelup.CMS.V1.Events.Payloads.Content.ArticleType.created): Promise < void> {
    
    try {
      /**
       * Logic to run in ALL_ENVIRONMENTS
       */ 
      const cache = Container.get(CacheManager);
      

      /**
       * Map object to exposed
       */
      data = mapDocumentToExposed(data);

      

      if(config.environement === 'development') {
        /**
         * Here you can add any logic to run in DEVELOPMENT
         */
        const identifier = data['email'] ? data['email'] : data['name'] ? data['name'] : data['tracking_id'] || data['_id'];
        logger.event(events.content.articleType.created, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.articleType.created}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.articleType.created,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onArticleTypeUpdated
   * @alias ON_ARTICLE_TYPE_UPDATE
   * @param {Levelup.CMS.V1.Events.Payloads.Content.ArticleType.updated} payload
   */
  @On(events.content.articleType.updated)
  public async onArticleTypeUpdated({data}: Levelup.CMS.V1.Events.Payloads.Content.ArticleType.updated): Promise < void> {
    
    try {
      /**
       * Logic to run in ALL_ENVIRONMENTS
       */ 
      const cache = Container.get(CacheManager);
      

      /**
       * Map object to exposed
       */
      data = mapDocumentToExposed(data);

      

      if(config.environement === 'development') {
        /**
         * Here you can add any logic to run in DEVELOPMENT
         */
        const identifier = data['email'] ? data['email'] : data['name'] ? data['name'] : data['tracking_id'] || data['_id'];
        logger.event(events.content.articleType.updated, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.articleType.updated}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.articleType.updated,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onArticleTypeDeleted
   * @alias ON_ARTICLE_TYPE_DELETE
   * @param {Levelup.CMS.V1.Events.Payloads.Content.ArticleType.deleted} payload
   */
  @On(events.content.articleType.deleted)
  public async onArticleTypeDeleted({data}: Levelup.CMS.V1.Events.Payloads.Content.ArticleType.deleted): Promise < void> {
    
    try {
      /**
       * Logic to run in ALL_ENVIRONMENTS
       */ 
      const cache = Container.get(CacheManager);
      

      /**
       * Map object to exposed
       */
      data = mapDocumentToExposed(data);

      

      if(config.environement === 'development') {
        /**
         * Here you can add any logic to run in DEVELOPMENT
         */
        const identifier = data['email'] ? data['email'] : data['name'] ? data['name'] : data['tracking_id'] || data['_id'];
        logger.event(events.content.articleType.deleted, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.articleType.deleted}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.articleType.deleted,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onArticleTypeRestored
   * @alias ON_ARTICLE_TYPE_RESTORE
   * @param {Levelup.CMS.V1.Events.Payloads.Content.ArticleType.restored} payload
   */
  @On(events.content.articleType.restored)
  public async onArticleTypeRestored({data}: Levelup.CMS.V1.Events.Payloads.Content.ArticleType.restored): Promise < void> {
    
    try {
      /**
       * Logic to run in ALL_ENVIRONMENTS
       */ 
      const cache = Container.get(CacheManager);
      

      /**
       * Map object to exposed
       */
      data = mapDocumentToExposed(data);

      

      if(config.environement === 'development') {
        /**
         * Here you can add any logic to run in DEVELOPMENT
         */
        const identifier = data['email'] ? data['email'] : data['name'] ? data['name'] : data['tracking_id'] || data['_id'];
        logger.event(events.content.articleType.restored, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.articleType.restored}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.articleType.restored,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




}

