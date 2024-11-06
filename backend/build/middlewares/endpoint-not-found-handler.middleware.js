"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../utilities/logging"));
const logger = (0, logging_1.default)('MIDDLEWARE', 'endpointNotFoundHandler');
/**
 * @description Middleware to handle 404 errors
 * @returns {NextFunction} The next function to be called
 */
const endpointNotFoundHandler = () => {
    return (req, res, next) => {
        logger.error('Endpoint Not Found', req.method, req.url);
        logger.save.http({
            name: "Endpoint Not Found",
            payload: {
                message: `Endpoint Not Found: ${req.method.toUpperCase()} ${req.url}`,
                related_to: req.ip,
                method: req.method,
                url: req.url,
                headers: req.headers,
                body: req.body,
                params: req.params,
                query: req.query,
                ip: req.ip,
                attached_auth_data: req.attached_entities,
            }
        });
        const err = new Error('Endpoint Not Found');
        err['status'] = 404;
        next(err);
    };
};
exports.default = endpointNotFoundHandler;
//# sourceMappingURL=endpoint-not-found-handler.middleware.js.map