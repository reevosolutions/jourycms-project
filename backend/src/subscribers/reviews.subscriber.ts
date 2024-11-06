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

const logger = initLogger("SUBSCRIBER", "Review");

@EventSubscriber()
export default class ReviewSubscriber {


  /**
   * @method onReviewCreated
   * @alias ON_REVIEW_CREATE
   * @param {Levelup.CMS.V1.Events.Payloads.Content.Review.created} payload
   */
  @On(events.content.review.created)
  public async onReviewCreated({data}: Levelup.CMS.V1.Events.Payloads.Content.Review.created): Promise < void> {
    
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
        logger.event(events.content.review.created, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.review.created}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.review.created,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onReviewUpdated
   * @alias ON_REVIEW_UPDATE
   * @param {Levelup.CMS.V1.Events.Payloads.Content.Review.updated} payload
   */
  @On(events.content.review.updated)
  public async onReviewUpdated({data}: Levelup.CMS.V1.Events.Payloads.Content.Review.updated): Promise < void> {
    
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
        logger.event(events.content.review.updated, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.review.updated}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.review.updated,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onReviewDeleted
   * @alias ON_REVIEW_DELETE
   * @param {Levelup.CMS.V1.Events.Payloads.Content.Review.deleted} payload
   */
  @On(events.content.review.deleted)
  public async onReviewDeleted({data}: Levelup.CMS.V1.Events.Payloads.Content.Review.deleted): Promise < void> {
    
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
        logger.event(events.content.review.deleted, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.review.deleted}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.review.deleted,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onReviewRestored
   * @alias ON_REVIEW_RESTORE
   * @param {Levelup.CMS.V1.Events.Payloads.Content.Review.restored} payload
   */
  @On(events.content.review.restored)
  public async onReviewRestored({data}: Levelup.CMS.V1.Events.Payloads.Content.Review.restored): Promise < void> {
    
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
        logger.event(events.content.review.restored, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.review.restored}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.review.restored,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




}

