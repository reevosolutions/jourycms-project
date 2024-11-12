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

const logger = initLogger("SUBSCRIBER", "Taxonomy");

@EventSubscriber()
export default class TaxonomySubscriber {


  /**
   * @method onTaxonomyCreated
   * @alias ON_TAXONOMY_CREATE
   * @param {Levelup.CMS.V1.Events.Payloads.Content.Taxonomy.created} payload
   */
  @On(events.content.taxonomy.created)
  public async onTaxonomyCreated({data}: Levelup.CMS.V1.Events.Payloads.Content.Taxonomy.created): Promise < void> {
    
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
        logger.event(events.content.taxonomy.created, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.taxonomy.created}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.taxonomy.created,
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
   * @param {Levelup.CMS.V1.Events.Payloads.Content.Taxonomy.updated} payload
   */
  @On(events.content.taxonomy.updated)
  public async onTaxonomyUpdated({data}: Levelup.CMS.V1.Events.Payloads.Content.Taxonomy.updated): Promise < void> {
    
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
        logger.event(events.content.taxonomy.updated, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.taxonomy.updated}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.taxonomy.updated,
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
   * @param {Levelup.CMS.V1.Events.Payloads.Content.Taxonomy.deleted} payload
   */
  @On(events.content.taxonomy.deleted)
  public async onTaxonomyDeleted({data}: Levelup.CMS.V1.Events.Payloads.Content.Taxonomy.deleted): Promise < void> {
    
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
        logger.event(events.content.taxonomy.deleted, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.taxonomy.deleted}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.taxonomy.deleted,
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
   * @param {Levelup.CMS.V1.Events.Payloads.Content.Taxonomy.restored} payload
   */
  @On(events.content.taxonomy.restored)
  public async onTaxonomyRestored({data}: Levelup.CMS.V1.Events.Payloads.Content.Taxonomy.restored): Promise < void> {
    
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
        logger.event(events.content.taxonomy.restored, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.taxonomy.restored}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.taxonomy.restored,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




}

