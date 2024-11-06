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

const logger = initLogger("SUBSCRIBER", "Item");

@EventSubscriber()
export default class TranslationItemSubscriber {


  /**
   * @method onTranslationItemCreated
   * @alias ON_TRANSLATION_ITEM_CREATE
   * @param {Levelup.CMS.V1.Events.Payloads.Content.Translation.Item.created} payload
   */
  @On(events.content.translation.item.created)
  public async onTranslationItemCreated({data}: Levelup.CMS.V1.Events.Payloads.Content.Translation.Item.created): Promise < void> {
    
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
        logger.event(events.content.translation.item.created, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.translation.item.created}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.translation.item.created,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onTranslationItemUpdated
   * @alias ON_TRANSLATION_ITEM_UPDATE
   * @param {Levelup.CMS.V1.Events.Payloads.Content.Translation.Item.updated} payload
   */
  @On(events.content.translation.item.updated)
  public async onTranslationItemUpdated({data}: Levelup.CMS.V1.Events.Payloads.Content.Translation.Item.updated): Promise < void> {
    
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
        logger.event(events.content.translation.item.updated, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.translation.item.updated}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.translation.item.updated,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onTranslationItemDeleted
   * @alias ON_TRANSLATION_ITEM_DELETE
   * @param {Levelup.CMS.V1.Events.Payloads.Content.Translation.Item.deleted} payload
   */
  @On(events.content.translation.item.deleted)
  public async onTranslationItemDeleted({data}: Levelup.CMS.V1.Events.Payloads.Content.Translation.Item.deleted): Promise < void> {
    
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
        logger.event(events.content.translation.item.deleted, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.translation.item.deleted}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.translation.item.deleted,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onTranslationItemRestored
   * @alias ON_TRANSLATION_ITEM_RESTORE
   * @param {Levelup.CMS.V1.Events.Payloads.Content.Translation.Item.restored} payload
   */
  @On(events.content.translation.item.restored)
  public async onTranslationItemRestored({data}: Levelup.CMS.V1.Events.Payloads.Content.Translation.Item.restored): Promise < void> {
    
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
        logger.event(events.content.translation.item.restored, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.translation.item.restored}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.translation.item.restored,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




}

