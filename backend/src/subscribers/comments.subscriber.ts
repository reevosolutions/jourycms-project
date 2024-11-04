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

const logger = initLogger("SUBSCRIBER", "Comment");

@EventSubscriber()
export default class CommentSubscriber {


  /**
   * @method onCommentCreated
   * @alias ON_COMMENT_CREATE
   * @param {Levelup.V2.Events.Payloads.Cm.Comment.created} payload
   */
  @On(events.cm.comment.created)
  public async onCommentCreated({data}: Levelup.V2.Events.Payloads.Cm.Comment.created): Promise < void> {
    
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
        logger.event(events.cm.comment.created, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.cm.comment.created}:ERROR`, error);
      }
      logger.save.error({
        name: events.cm.comment.created,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onCommentUpdated
   * @alias ON_COMMENT_UPDATE
   * @param {Levelup.V2.Events.Payloads.Cm.Comment.updated} payload
   */
  @On(events.cm.comment.updated)
  public async onCommentUpdated({data}: Levelup.V2.Events.Payloads.Cm.Comment.updated): Promise < void> {
    
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
        logger.event(events.cm.comment.updated, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.cm.comment.updated}:ERROR`, error);
      }
      logger.save.error({
        name: events.cm.comment.updated,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onCommentDeleted
   * @alias ON_COMMENT_DELETE
   * @param {Levelup.V2.Events.Payloads.Cm.Comment.deleted} payload
   */
  @On(events.cm.comment.deleted)
  public async onCommentDeleted({data}: Levelup.V2.Events.Payloads.Cm.Comment.deleted): Promise < void> {
    
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
        logger.event(events.cm.comment.deleted, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.cm.comment.deleted}:ERROR`, error);
      }
      logger.save.error({
        name: events.cm.comment.deleted,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onCommentRestored
   * @alias ON_COMMENT_RESTORE
   * @param {Levelup.V2.Events.Payloads.Cm.Comment.restored} payload
   */
  @On(events.cm.comment.restored)
  public async onCommentRestored({data}: Levelup.V2.Events.Payloads.Cm.Comment.restored): Promise < void> {
    
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
        logger.event(events.cm.comment.restored, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.cm.comment.restored}:ERROR`, error);
      }
      logger.save.error({
        name: events.cm.comment.restored,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




}

