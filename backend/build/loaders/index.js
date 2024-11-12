import { EventDispatcher } from "event-dispatch";
import events from '../config/events.config';
import initLogger from '../utilities/logging';
import dependencyInjectorLoader from './dependency-injector.loader';
import './event-subscribers.loader';
import expressLoader from './express.loader';
import httpLoggerLoader from './httpLogger.loader';
import loadScheduledJobs from './jobs.loader';
import getServiceModels from './models.loader';
import mongooseLoader from './mongoose.loader';
const logger = initLogger("LOADER", 'index');
/**
 * Initializes and loads various components of the backend application.
 *
 * @param expressApp - The Express application instance.
 * @returns A Promise that resolves when all components are loaded.
 */
export default async ({ expressApp }) => {
    // Load the MongoDB connection
    const mongoConnection = await mongooseLoader();
    /**
     * WTF is going on here?
     *
     * We are injecting the mongoose models into the DI container.
     * I know this is controversial but will provide a lot of flexibility at the time
     * of writing unit tests, just go and check how beautiful they are!
     */
    const models = getServiceModels();
    await dependencyInjectorLoader({
        models: Object.keys(models).map((key) => ({
            name: key,
            model: models[key],
        }))
    });
    logger.info('✌️ Dependency Injector loaded');
    // Load the HTTP logger middleware
    await httpLoggerLoader({ app: expressApp });
    logger.info('✌️ Http Logger loaded');
    // Load scheduled jobs
    loadScheduledJobs();
    // Load the Express application
    await expressLoader({ app: expressApp });
    logger.info('✌️ Express loaded');
    // Create an event dispatcher and dispatch a serviceLoadSucceeded event
    const eventDispatcher = new EventDispatcher();
    eventDispatcher.dispatch(events.service.serviceLoadSucceeded);
};
//# sourceMappingURL=index.js.map