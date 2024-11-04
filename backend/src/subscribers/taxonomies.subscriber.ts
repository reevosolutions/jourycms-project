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

const logger = initLogger("SUBSCRIBER", "Taxonomy");

@EventSubscriber()
export default class TaxonomySubscriber {


  /**
   * @method onTaxonomyCreated
   * @alias ON_TAXONOMY_CREATE
   * @param {Levelup.V2.Events.Payloads.Cm.Taxonomy.created} payload
   */
  @On(events.cm.taxonomy.created)
  public async onTaxonomyCreated({data}: Levelup.V2.Events.Payloads.Cm.Taxonomy.created): Promise < void> {
    
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
        logger.event(events.cm.taxonomy.created, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.cm.taxonomy.created}:ERROR`, error);
      }
      logger.save.error({
        name: events.cm.taxonomy.created,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onTaxonomyUpdated
   * @alias ON_TAXONOMY_UPDATE
   * @param {Levelup.V2.Events.Payloads.Cm.Taxonomy.updated} payload
   */
  @On(events.cm.taxonomy.updated)
  public async onTaxonomyUpdated({data}: Levelup.V2.Events.Payloads.Cm.Taxonomy.updated): Promise < void> {
    
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
        logger.event(events.cm.taxonomy.updated, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.cm.taxonomy.updated}:ERROR`, error);
      }
      logger.save.error({
        name: events.cm.taxonomy.updated,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onTaxonomyDeleted
   * @alias ON_TAXONOMY_DELETE
   * @param {Levelup.V2.Events.Payloads.Cm.Taxonomy.deleted} payload
   */
  @On(events.cm.taxonomy.deleted)
  public async onTaxonomyDeleted({data}: Levelup.V2.Events.Payloads.Cm.Taxonomy.deleted): Promise < void> {
    
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
        logger.event(events.cm.taxonomy.deleted, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.cm.taxonomy.deleted}:ERROR`, error);
      }
      logger.save.error({
        name: events.cm.taxonomy.deleted,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onTaxonomyRestored
   * @alias ON_TAXONOMY_RESTORE
   * @param {Levelup.V2.Events.Payloads.Cm.Taxonomy.restored} payload
   */
  @On(events.cm.taxonomy.restored)
  public async onTaxonomyRestored({data}: Levelup.V2.Events.Payloads.Cm.Taxonomy.restored): Promise < void> {
    
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
        logger.event(events.cm.taxonomy.restored, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.cm.taxonomy.restored}:ERROR`, error);
      }
      logger.save.error({
        name: events.cm.taxonomy.restored,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




}

