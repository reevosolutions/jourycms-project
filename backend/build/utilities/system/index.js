"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerStatusReport = void 0;
const axios_1 = __importDefault(require("axios"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../config"));
const connection_utilities_1 = require("../data/db/connection.utilities");
const logging_1 = __importDefault(require("../logging"));
const logger = (0, logging_1.default)('UTILITY', 'system');
const getServerStatusReport = async () => {
    logger.event(`Getting My public IP address`);
    const url = 'https://checkip.amazonaws.com/';
    const response = await (0, axios_1.default)(url);
    logger.value(`My public IP address is: ${response.data.trim()}`);
    return {
        service: config_1.default.currentService.name,
        server: 'UP',
        db: {
            connect_to: config_1.default.currentService.db.connectTo,
            status: mongoose_1.default.STATES[mongoose_1.default.connection.readyState],
            connection_utl: (0, connection_utilities_1.getMongooseUri)(),
        },
        ip: response.data.trim(),
        env: {
            API_PREFIX: process.env.API_PREFIX,
            NODE_ENV: process.env.NODE_ENV,
            NEXT_PUBLIC_GATEWAY_URL: process.env.NEXT_PUBLIC_GATEWAY_URL,
            PORT: process.env.PORT,
            APPLICATION: process.env.APPLICATION,
            PWD: process.env.PWD,
            RXDB_NAME: process.env.RXDB_NAME
        },
        config: process.env.NODE_ENV === 'production' ? undefined : config_1.default
    };
};
exports.getServerStatusReport = getServerStatusReport;
//# sourceMappingURL=index.js.map