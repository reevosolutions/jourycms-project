"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_dispatch_1 = require("event-dispatch");
const events_config_1 = __importDefault(require("../config/events.config"));
const logging_1 = __importDefault(require("../utilities/logging"));
const dependency_injector_loader_1 = __importDefault(require("./dependency-injector.loader"));
require("./event-subscribers.loader");
const express_loader_1 = __importDefault(require("./express.loader"));
const httpLogger_loader_1 = __importDefault(require("./httpLogger.loader"));
const jobs_loader_1 = __importDefault(require("./jobs.loader"));
const models_loader_1 = __importDefault(require("./models.loader"));
const mongoose_loader_1 = __importDefault(require("./mongoose.loader"));
const logger = (0, logging_1.default)("LOADER", 'index');
/**
 * Initializes and loads various components of the backend application.
 *
 * @param expressApp - The Express application instance.
 * @returns A Promise that resolves when all components are loaded.
 */
exports.default = async ({ expressApp }) => {
    // Load the MongoDB connection
    const mongoConnection = await (0, mongoose_loader_1.default)();
    /**
     * WTF is going on here?
     *
     * We are injecting the mongoose models into the DI container.
     * I know this is controversial but will provide a lot of flexibility at the time
     * of writing unit tests, just go and check how beautiful they are!
     */
    const models = (0, models_loader_1.default)();
    await (0, dependency_injector_loader_1.default)({
        models: Object.keys(models).map((key) => ({
            name: key,
            model: models[key],
        }))
    });
    logger.info('✌️ Dependency Injector loaded');
    // Load the HTTP logger middleware
    await (0, httpLogger_loader_1.default)({ app: expressApp });
    logger.info('✌️ Http Logger loaded');
    // Load scheduled jobs
    (0, jobs_loader_1.default)();
    // Load the Express application
    await (0, express_loader_1.default)({ app: expressApp });
    logger.info('✌️ Express loaded');
    // Create an event dispatcher and dispatch a serviceLoadSucceeded event
    const eventDispatcher = new event_dispatch_1.EventDispatcher();
    eventDispatcher.dispatch(events_config_1.default.service.serviceLoadSucceeded);
};
//# sourceMappingURL=index.js.map