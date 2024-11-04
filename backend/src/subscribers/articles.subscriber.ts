/**
 * @description This file is used to create event subscribers.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-06 00:40:13
 */

import { EventSubscriber, On } from 'event-dispatch';
import CacheManager from '../managers/cache-manager';
import AmqpManager from '../managers/amqp-manager';
import Container from 'typedi';
import initLogger from '../utilities/logging';
import events from '../config/events.config';
import config from '../config';
import { errorToObject } from '../utilities/exceptions';
import { mapDocumentToExposed } from '../utils/mappers/general.mappers';

const logger = initLogger("SUBSCRIBER", "Article");

@EventSubscriber()
export default class ArticleSubscriber {


  /**
   * @method onArticleCreated
   * @alias ON_ARTICLE_CREATE
   * @param {Levelup.V2.Events.Payloads.Cm.Article.created} payload
   */
  @On(events.cm.article.created)
  public async onArticleCreated({data}: Levelup.V2.Events.Payloads.Cm.Article.created): Promise < void> {
    
    try {
      /**
       * Logic to run in ALL_ENVIRONMENTS
       */ 
      const cache = Container.get(CacheManager);
      const amqpManager = Container.get(AmqpManager);

      /**
       * Map object to exposed
       */
      data = mapDocumentToExposed(data);

      

      if(config.environement === 'development') {
        /**
         * Here you can add any logic to run in DEVELOPMENT
         */
        const identifier = data['email'] ? data['email'] : data['name'] ? data['name'] : data['tracking_id'] || data['_id'];
        logger.event(events.cm.article.created, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.cm.article.created}:ERROR`, error);
      }
      logger.save.error({
        name: events.cm.article.created,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onArticleUpdated
   * @alias ON_ARTICLE_UPDATE
   * @param {Levelup.V2.Events.Payloads.Cm.Article.updated} payload
   */
  @On(events.cm.article.updated)
  public async onArticleUpdated({data}: Levelup.V2.Events.Payloads.Cm.Article.updated): Promise < void> {
    
    try {
      /**
       * Logic to run in ALL_ENVIRONMENTS
       */ 
      const cache = Container.get(CacheManager);
      const amqpManager = Container.get(AmqpManager);

      /**
       * Map object to exposed
       */
      data = mapDocumentToExposed(data);

      

      if(config.environement === 'development') {
        /**
         * Here you can add any logic to run in DEVELOPMENT
         */
        const identifier = data['email'] ? data['email'] : data['name'] ? data['name'] : data['tracking_id'] || data['_id'];
        logger.event(events.cm.article.updated, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.cm.article.updated}:ERROR`, error);
      }
      logger.save.error({
        name: events.cm.article.updated,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onArticleDeleted
   * @alias ON_ARTICLE_DELETE
   * @param {Levelup.V2.Events.Payloads.Cm.Article.deleted} payload
   */
  @On(events.cm.article.deleted)
  public async onArticleDeleted({data}: Levelup.V2.Events.Payloads.Cm.Article.deleted): Promise < void> {
    
    try {
      /**
       * Logic to run in ALL_ENVIRONMENTS
       */ 
      const cache = Container.get(CacheManager);
      const amqpManager = Container.get(AmqpManager);

      /**
       * Map object to exposed
       */
      data = mapDocumentToExposed(data);

      

      if(config.environement === 'development') {
        /**
         * Here you can add any logic to run in DEVELOPMENT
         */
        const identifier = data['email'] ? data['email'] : data['name'] ? data['name'] : data['tracking_id'] || data['_id'];
        logger.event(events.cm.article.deleted, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.cm.article.deleted}:ERROR`, error);
      }
      logger.save.error({
        name: events.cm.article.deleted,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onArticleRestored
   * @alias ON_ARTICLE_RESTORE
   * @param {Levelup.V2.Events.Payloads.Cm.Article.restored} payload
   */
  @On(events.cm.article.restored)
  public async onArticleRestored({data}: Levelup.V2.Events.Payloads.Cm.Article.restored): Promise < void> {
    
    try {
      /**
       * Logic to run in ALL_ENVIRONMENTS
       */ 
      const cache = Container.get(CacheManager);
      const amqpManager = Container.get(AmqpManager);

      /**
       * Map object to exposed
       */
      data = mapDocumentToExposed(data);

      

      if(config.environement === 'development') {
        /**
         * Here you can add any logic to run in DEVELOPMENT
         */
        const identifier = data['email'] ? data['email'] : data['name'] ? data['name'] : data['tracking_id'] || data['_id'];
        logger.event(events.cm.article.restored, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.cm.article.restored}:ERROR`, error);
      }
      logger.save.error({
        name: events.cm.article.restored,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




}

