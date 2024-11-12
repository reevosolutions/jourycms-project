import config from '../config';
import initLogger from '../utilities/logging';
const logger = initLogger("MIDDLEWARE", 'unlessFromService');
/**
 * @description Attach the calling service to req.attached_entities or apply the middleware if no service is found
 * @param {RequestHandler} middleware The middleware to apply if no service is found
 */
const unlessFromService = (middleware) => {
    return (req, res, next) => {
        try {
            const service_secret = req.headers['x-service-secret'];
            const service_name = req.headers['x-service-name'] || 'unknown';
            if (!req.attached_entities)
                req.attached_entities = {};
            if (!service_secret)
                return middleware(req, res, next);
            else if (service_secret === config.security.internalServiceSecret) {
                req.attached_entities.service = {
                    name: service_name,
                    is_external: false,
                };
                return next();
            }
            else if (service_secret === config.security.externalServiceSecret) {
                req.attached_entities.service = {
                    name: service_name,
                    is_external: true,
                };
                return next();
            }
            else if (service_secret === config.security.frontendServiceSecret) {
                req.attached_entities.service = {
                    name: 'frontend',
                    is_external: true,
                };
                return next();
            }
            else
                return middleware(req, res, next);
        }
        catch (error) {
            logger.error('Error attaching service to req', error);
            return next(error);
        }
    };
};
export default unlessFromService;
//# sourceMappingURL=unless-from-service.middleware.js.map