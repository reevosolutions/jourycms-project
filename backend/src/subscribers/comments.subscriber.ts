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
import { mapDocumentToExposed } from '../common/mappers/general.mappers';

const logger = initLogger("SUBSCRIBER", "Comment");

@EventSubscriber()
export default class CommentSubscriber {


  /**
   * @method onCommentCreated
   * @alias ON_COMMENT_CREATE
   * @param {Levelup.CMS.V1.Events.Payloads.Content.Comment.created} payload
   */
  @On(events.content.comment.created)
  public async onCommentCreated({data}: Levelup.CMS.V1.Events.Payloads.Content.Comment.created): Promise < void> {
    
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
        logger.event(events.content.comment.created, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.comment.created}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.comment.created,
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
   * @param {Levelup.CMS.V1.Events.Payloads.Content.Comment.updated} payload
   */
  @On(events.content.comment.updated)
  public async onCommentUpdated({data}: Levelup.CMS.V1.Events.Payloads.Content.Comment.updated): Promise < void> {
    
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
        logger.event(events.content.comment.updated, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.comment.updated}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.comment.updated,
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
   * @param {Levelup.CMS.V1.Events.Payloads.Content.Comment.deleted} payload
   */
  @On(events.content.comment.deleted)
  public async onCommentDeleted({data}: Levelup.CMS.V1.Events.Payloads.Content.Comment.deleted): Promise < void> {
    
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
        logger.event(events.content.comment.deleted, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.comment.deleted}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.comment.deleted,
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
   * @param {Levelup.CMS.V1.Events.Payloads.Content.Comment.restored} payload
   */
  @On(events.content.comment.restored)
  public async onCommentRestored({data}: Levelup.CMS.V1.Events.Payloads.Content.Comment.restored): Promise < void> {
    
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
        logger.event(events.content.comment.restored, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.comment.restored}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.comment.restored,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




}

