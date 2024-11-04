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

const logger = initLogger("SUBSCRIBER", "Tag");

@EventSubscriber()
export default class TagSubscriber {


  /**
   * @method onTagCreated
   * @alias ON_TAG_CREATE
   * @param {Levelup.V2.Events.Payloads.Cm.Term.created} payload
   */
  @On(events.cm.term.created)
  public async onTagCreated({data}: Levelup.V2.Events.Payloads.Cm.Term.created): Promise < void> {
    
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
        logger.event(events.cm.term.created, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.cm.term.created}:ERROR`, error);
      }
      logger.save.error({
        name: events.cm.term.created,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onTagUpdated
   * @alias ON_TAG_UPDATE
   * @param {Levelup.V2.Events.Payloads.Cm.Term.updated} payload
   */
  @On(events.cm.term.updated)
  public async onTagUpdated({data}: Levelup.V2.Events.Payloads.Cm.Term.updated): Promise < void> {
    
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
        logger.event(events.cm.term.updated, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.cm.term.updated}:ERROR`, error);
      }
      logger.save.error({
        name: events.cm.term.updated,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onTagDeleted
   * @alias ON_TAG_DELETE
   * @param {Levelup.V2.Events.Payloads.Cm.Term.deleted} payload
   */
  @On(events.cm.term.deleted)
  public async onTagDeleted({data}: Levelup.V2.Events.Payloads.Cm.Term.deleted): Promise < void> {
    
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
        logger.event(events.cm.term.deleted, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.cm.term.deleted}:ERROR`, error);
      }
      logger.save.error({
        name: events.cm.term.deleted,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onTagRestored
   * @alias ON_TAG_RESTORE
   * @param {Levelup.V2.Events.Payloads.Cm.Term.restored} payload
   */
  @On(events.cm.term.restored)
  public async onTagRestored({data}: Levelup.V2.Events.Payloads.Cm.Term.restored): Promise < void> {
    
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
        logger.event(events.cm.term.restored, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.cm.term.restored}:ERROR`, error);
      }
      logger.save.error({
        name: events.cm.term.restored,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




}

