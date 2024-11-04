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

const logger = initLogger("SUBSCRIBER", "Namespace");

@EventSubscriber()
export default class TranslationNamespaceSubscriber {


  /**
   * @method onTranslationNamespaceCreated
   * @alias ON_TRANSLATION_NAMESPACE_CREATE
   * @param {Levelup.V2.Events.Payloads.Cm.Translation.Namespace.created} payload
   */
  @On(events.cm.translation.namespace.created)
  public async onTranslationNamespaceCreated({data}: Levelup.V2.Events.Payloads.Cm.Translation.Namespace.created): Promise < void> {
    
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
        logger.event(events.cm.translation.namespace.created, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.cm.translation.namespace.created}:ERROR`, error);
      }
      logger.save.error({
        name: events.cm.translation.namespace.created,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onTranslationNamespaceUpdated
   * @alias ON_TRANSLATION_NAMESPACE_UPDATE
   * @param {Levelup.V2.Events.Payloads.Cm.Translation.Namespace.updated} payload
   */
  @On(events.cm.translation.namespace.updated)
  public async onTranslationNamespaceUpdated({data}: Levelup.V2.Events.Payloads.Cm.Translation.Namespace.updated): Promise < void> {
    
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
        logger.event(events.cm.translation.namespace.updated, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.cm.translation.namespace.updated}:ERROR`, error);
      }
      logger.save.error({
        name: events.cm.translation.namespace.updated,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onTranslationNamespaceDeleted
   * @alias ON_TRANSLATION_NAMESPACE_DELETE
   * @param {Levelup.V2.Events.Payloads.Cm.Translation.Namespace.deleted} payload
   */
  @On(events.cm.translation.namespace.deleted)
  public async onTranslationNamespaceDeleted({data}: Levelup.V2.Events.Payloads.Cm.Translation.Namespace.deleted): Promise < void> {
    
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
        logger.event(events.cm.translation.namespace.deleted, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.cm.translation.namespace.deleted}:ERROR`, error);
      }
      logger.save.error({
        name: events.cm.translation.namespace.deleted,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onTranslationNamespaceRestored
   * @alias ON_TRANSLATION_NAMESPACE_RESTORE
   * @param {Levelup.V2.Events.Payloads.Cm.Translation.Namespace.restored} payload
   */
  @On(events.cm.translation.namespace.restored)
  public async onTranslationNamespaceRestored({data}: Levelup.V2.Events.Payloads.Cm.Translation.Namespace.restored): Promise < void> {
    
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
        logger.event(events.cm.translation.namespace.restored, identifier);
        
      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.cm.translation.namespace.restored}:ERROR`, error);
      }
      logger.save.error({
        name: events.cm.translation.namespace.restored,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




}

