import winston from 'winston';
import config from '../config';
const transports = [];
if (process.env.NODE_ENV !== 'development') {
    transports.push(new winston.transports.Console());
}
else {
    transports.push(new winston.transports.Console({
        format: winston.format.combine(winston.format.cli(), winston.format.colorize(), winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }), winston.format.align(), 
        // winston.format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
        winston.format.errors({ stack: true }), winston.format.splat()),
    }));
}
// transports.push(new winston.transports.File({
//   level: 'error',
//   filename: 'logs/errors.log',
// }));
// transports.push(new winston.transports.File({ filename: 'logs/combined.log' }));
const LoggerInstance = winston.createLogger({
    level: config.logging.level,
    levels: winston.config.npm.levels,
    // defaultMeta: { service: config.serviceName },
    format: winston.format.combine(winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), winston.format.errors({ stack: true }), winston.format.splat(), 
    // winston.format.prettyPrint(),
    winston.format.json()),
    // exceptionHandlers: [
    //   new winston.transports.File({ filename: 'logs/exception.log' }),
    // ],
    // rejectionHandlers: [
    //   new winston.transports.File({ filename: 'logs/rejections.log' }),
    // ],
    transports,
});
export default LoggerInstance;
//# sourceMappingURL=logger.loader.js.map