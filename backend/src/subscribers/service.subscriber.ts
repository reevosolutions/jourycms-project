import { EventSubscriber, On } from 'event-dispatch';
import mongoose from 'mongoose';
import events from '../config/events.config';
import initLogger from '../utilities/logging/index';
import { loadServicePermissions } from './../utilities/system/permissions.utilities';

import config from '../config';
import { toKebabCase } from '../utilities/strings';
import DevService from '../services/dev.service';
import Container from 'typedi';
import BuilderService from '../services/builder.service';

const logger = initLogger('SUBSCRIBER', 'service');

@EventSubscriber()
export default class ServiceSubscriber {
  @On(events.service.serviceLoadSucceeded)
  public async onServiceLoadSucceeded(): Promise<void> {
    try {
      logger.success('Service started successfully');

      await loadServicePermissions();

      const builderService = Container.get(BuilderService);
      await builderService.run();

      if (config.environement === 'development') {
        /**
         * Here you can add any logic to run after the service has started in development
         * e.g. start seeding the database, tests, etc.
         */
        const devService = Container.get(DevService);
        // await devService.parseTemuCategories();
        // await devService.resetTranslationProjects();
      } else {
        /**
         * Here you can add any logic to run after the service has started in production
         * e.g. start seeding the database, start a cron job, etc.
         */
      }
    } catch (error) {
      logger.error(`${events.service.serviceLoadSucceeded}:ERROR`, error);
    }
  }

  @On(events.service.dbConnect)
  public async onDbConnect(connection: mongoose.Connection): Promise<void> {
    try {
      logger.success(events.service.dbConnect, connection.host);
    } catch (error) {
      logger.error(`${events.service.dbConnect}:ERROR`, error);
    }
  }

  @On(events.service.dbDisconnect)
  public async onDbDisconnect(connection: mongoose.Connection): Promise<void> {
    try {
      logger.error('disconnected', connection.host);
    } catch (error) {
      logger.error(`${events.service.dbDisconnect}:ERROR`, error);
    }
  }
}
