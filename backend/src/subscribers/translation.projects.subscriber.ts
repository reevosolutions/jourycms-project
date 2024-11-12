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

const logger = initLogger("SUBSCRIBER", "Project");

@EventSubscriber()
export default class TranslationProjectSubscriber {


  /**
   * @method onTranslationProjectCreated
   * @alias ON_TRANSLATION_PROJECT_CREATE
   * @param {Levelup.CMS.V1.Events.Payloads.Content.Translation.Project.created} payload
   */
  @On(events.content.translation.project.created)
  public async onTranslationProjectCreated({ data }: Levelup.CMS.V1.Events.Payloads.Content.Translation.Project.created): Promise<void> {

    try {
      /**
       * Logic to run in ALL_ENVIRONMENTS
       */
      const cache = Container.get(CacheManager);


      /**
       * Map object to exposed
       */
      data = mapDocumentToExposed(data);



      if (config.environement === 'development') {
        /**
         * Here you can add any logic to run in DEVELOPMENT
         */
        const identifier = data['email'] ? data['email'] : data['name'] ? data['name'] : data['tracking_id'] || data['_id'];
        logger.event(events.content.translation.project.created, identifier);

      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.translation.project.created}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.translation.project.created,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onTranslationProjectUpdated
   * @alias ON_TRANSLATION_PROJECT_UPDATE
   * @param {Levelup.CMS.V1.Events.Payloads.Content.Translation.Project.updated} payload
   */
  @On(events.content.translation.project.updated)
  public async onTranslationProjectUpdated({ data }: Levelup.CMS.V1.Events.Payloads.Content.Translation.Project.updated): Promise<void> {

    try {
      /**
       * Logic to run in ALL_ENVIRONMENTS
       */
      const cache = Container.get(CacheManager);


      /**
       * Map object to exposed
       */
      data = mapDocumentToExposed(data);



      if (config.environement === 'development') {
        /**
         * Here you can add any logic to run in DEVELOPMENT
         */
        const identifier = data['email'] ? data['email'] : data['name'] ? data['name'] : data['tracking_id'] || data['_id'];
        logger.event(events.content.translation.project.updated, identifier);

      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.translation.project.updated}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.translation.project.updated,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onTranslationProjectDeleted
   * @alias ON_TRANSLATION_PROJECT_DELETE
   * @param {Levelup.CMS.V1.Events.Payloads.Content.Translation.Project.deleted} payload
   */
  @On(events.content.translation.project.deleted)
  public async onTranslationProjectDeleted({ data }: Levelup.CMS.V1.Events.Payloads.Content.Translation.Project.deleted): Promise<void> {

    try {
      /**
       * Logic to run in ALL_ENVIRONMENTS
       */
      const cache = Container.get(CacheManager);


      /**
       * Map object to exposed
       */
      data = mapDocumentToExposed(data);



      if (config.environement === 'development') {
        /**
         * Here you can add any logic to run in DEVELOPMENT
         */
        const identifier = data['email'] ? data['email'] : data['name'] ? data['name'] : data['tracking_id'] || data['_id'];
        logger.event(events.content.translation.project.deleted, identifier);

      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.translation.project.deleted}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.translation.project.deleted,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




  /**
   * @method onTranslationProjectRestored
   * @alias ON_TRANSLATION_PROJECT_RESTORE
   * @param {Levelup.CMS.V1.Events.Payloads.Content.Translation.Project.restored} payload
   */
  @On(events.content.translation.project.restored)
  public async onTranslationProjectRestored({ data }: Levelup.CMS.V1.Events.Payloads.Content.Translation.Project.restored): Promise<void> {

    try {
      /**
       * Logic to run in ALL_ENVIRONMENTS
       */
      const cache = Container.get(CacheManager);


      /**
       * Map object to exposed
       */
      data = mapDocumentToExposed(data);



      if (config.environement === 'development') {
        /**
         * Here you can add any logic to run in DEVELOPMENT
         */
        const identifier = data['email'] ? data['email'] : data['name'] ? data['name'] : data['tracking_id'] || data['_id'];
        logger.event(events.content.translation.project.restored, identifier);

      }
      else {
        /**
         * Here you can add any logic to run in PRODUCTION
        */


      }
    } catch (error) {
      if (config.environement === 'development') {
        logger.error(`${events.content.translation.project.restored}:ERROR`, error);
      }
      logger.save.error({
        name: events.content.translation.project.restored,
        payload: {
          related_to: data['tracking_id'] || data['_id'],
          data,
          error: errorToObject(error),
        }
      })
    }
  }




}

