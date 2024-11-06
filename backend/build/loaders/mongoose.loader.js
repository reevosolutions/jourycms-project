"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const event_dispatch_1 = require("event-dispatch");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const events_config_1 = __importDefault(require("../config/events.config"));
const logging_1 = __importDefault(require("../utilities/logging"));
const logger = (0, logging_1.default)("LOADER", "mongoose");
exports.default = async () => {
    try {
        const eventDispatcher = new event_dispatch_1.EventDispatcher();
        logger.value('uri', config_1.default.currentService.db.uri);
        logger.value('connect to', config_1.default.currentService.db.connectTo);
        const connection = await mongoose_1.default.connect(config_1.default.currentService.db.uri, {
            /**
             * @deprecated on 6.^
             */
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        eventDispatcher.dispatch(events_config_1.default.service.dbConnect, connection.connection);
        return connection.connection.db;
    }
    catch (error) {
        logger.error(error.message);
    }
};
//# sourceMappingURL=mongoose.loader.js.map