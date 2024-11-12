import initLogger from "../utilities/logging";
const logger = initLogger('MIDDLEWARE', 'endpointNotFoundHandler');
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
export default endpointNotFoundHandler;
//# sourceMappingURL=endpoint-not-found-handler.middleware.js.map