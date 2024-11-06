"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const config_1 = __importDefault(require("../config"));
const transports = [];
if (process.env.NODE_ENV !== 'development') {
    transports.push(new winston_1.default.transports.Console());
}
else {
    transports.push(new winston_1.default.transports.Console({
        format: winston_1.default.format.combine(winston_1.default.format.cli(), winston_1.default.format.colorize(), winston_1.default.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }), winston_1.default.format.align(), 
        // winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
        winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat()),
    }));
}
// transports.push(new winston.transports.File({
//   level: 'error',
//   filename: 'logs/errors.log',
// }));
// transports.push(new winston.transports.File({ filename: 'logs/combined.log' }));
const LoggerInstance = winston_1.default.createLogger({
    level: config_1.default.logging.level,
    levels: winston_1.default.config.npm.levels,
    // defaultMeta: { service: config.serviceName },
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat(), 
    // winston.format.prettyPrint(),
    winston_1.default.format.json()),
    // exceptionHandlers: [
    //   new winston.transports.File({ filename: 'logs/exception.log' }),
    // ],
    // rejectionHandlers: [
    //   new winston.transports.File({ filename: 'logs/rejections.log' }),
    // ],
    transports,
});
exports.default = LoggerInstance;
//# sourceMappingURL=logger.loader.js.map