import { EventDispatcher } from "event-dispatch";
import mongoose from 'mongoose';
import config from '../config';
import events from '../config/events.config';
import initLogger from '../utilities/logging';

const logger = initLogger("LOADER", "mongoose");

export default async (): Promise<mongoose.mongo.Db> => {
  try {
    const eventDispatcher = new EventDispatcher();

    logger.value('uri', config.currentService.db.uri);
    logger.value('connect to', config.currentService.db.connectTo);
    const connection = await mongoose.connect(config.currentService.db.uri, {
      /**
       * @deprecated on 6.^
       */
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    } as any);
    eventDispatcher.dispatch(events.service.dbConnect, connection.connection);
    return connection.connection.db;
  } catch (error) {
    logger.error(error.message);
  }
};


