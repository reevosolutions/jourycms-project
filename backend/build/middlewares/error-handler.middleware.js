"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
const exceptions_1 = __importDefault(require("../exceptions"));
const index_1 = require("../utilities/exceptions/index");
const logging_1 = __importDefault(require("../utilities/logging"));
const logger = (0, logging_1.default)('MIDDLEWARE', 'errorHandler');
/**
 *
 * @description Middleware to handle errors
 * TODO: Add logging, and check if the error is a LevelupException
 * @returns {NextFunction} The next function to be called
 */
const errorHandler = () => {
    return (err, req, res, next) => {
        // console.log('## Error handler middleware', err)
        var _a, _b, _c;
        /**
         * Handle 400 thrown by celebrate library
         */
        if ((0, celebrate_1.isCelebrateError)(err)) {
            res.status(400).json({
                error: {
                    is_celebrate: true,
                    message: err.message,
                    name: err.name,
                    status: 400,
                    details: {
                        body: err.details.get('body'),
                        query: err.details.get('query'),
                    },
                    stack: process.env.NODE_ENV !== 'development' ? undefined : (_a = err.stack) === null || _a === void 0 ? void 0 : _a.split('\n'),
                },
            }).end();
            return;
        }
        /**
         * Handle 110000 thrown by mongoose
         */
        if (((_b = err.name) === null || _b === void 0 ? void 0 : _b.includes('Mongo')) && err.code === 11000) {
            err = new exceptions_1.default.ValueAlreadyExistsException(`Value(s) already exists`, Object.keys(err.keyValue || {}).reduce((acc, val) => {
                acc[val] = {
                    value: err.keyValue[val],
                    message: `Value already exists`,
                };
                return acc;
            }, {}));
            err['is_mongoose'] = true;
        }
        /**
         * Handle Mongoose validation error
         */
        if (err instanceof mongoose_1.default.Error.ValidationError) {
            const fields = Object.values(err.errors).reduce((acc, val) => {
                acc[val.path] = {
                    value: val.value,
                    message: val.message,
                };
                return acc;
            }, {});
            err = new exceptions_1.default.ValidationException(err.message, fields);
            err['is_mongoose'] = true;
        }
        /**
         * Handle Joi.ValidationError
         */
        if (err instanceof joi_1.default.ValidationError) {
            err = new exceptions_1.default.ValidationException(err.message, err);
            err['is_joi'] = true;
        }
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            logger.warn('UnauthorizedError', err);
            res.status(err.status || 401).json({
                error: {
                    message: err.message,
                    name: err.name,
                    status: err.status || 401,
                    stack: process.env.NODE_ENV !== 'development' ? undefined : (_c = err.stack) === null || _c === void 0 ? void 0 : _c.split('\n'),
                },
            }).end();
            return;
        }
        /**
         * Convert error to object
         */
        const error = (0, index_1.errorToObject)(err);
        /**
         * Remove stack trace in production
         */
        if (process.env.NODE_ENV !== 'development') {
            delete error.stack;
        }
        /**
         * Send the error response
         */
        res.status(typeof (error.status) === 'number' ? error.status : 500).json({
            error,
        }).end();
    };
};
exports.default = errorHandler;
//# sourceMappingURL=error-handler.middleware.js.map