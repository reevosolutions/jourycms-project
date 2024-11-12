import config from '../config';
import exceptions from '../exceptions';
import initLogger from '../utilities/logging';
const logger = initLogger("MIDDLEWARE", 'authenticateService');
/**
 * @description Attach the calling service to req.attached_entities
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const authenticateService = async (req, res, next) => {
    try {
        const service_secret = req.headers['x-service-secret'];
        const service_name = req.headers['x-service-name'] || 'unknown';
        // logger.value('SERVICE_SECRET', req.headers, service_secret);
        if (!service_secret) {
            return next();
        }
        else {
            if (!req.attached_entities)
                req.attached_entities = {};
            if (service_secret === config.security.internalServiceSecret)
                req.attached_entities.service = {
                    name: service_name,
                    is_external: false,
                };
            else if (service_secret === config.security.externalServiceSecret)
                req.attached_entities.service = {
                    name: service_name,
                    is_external: true,
                };
            else if (service_secret === config.security.frontendServiceSecret) {
                req.attached_entities.service = {
                    name: 'frontend',
                    is_external: true,
                };
            }
            else {
                throw new exceptions.UnauthorizedException('Invalid service secret');
            }
        }
        return next();
    }
    catch (error) {
        logger.error('Error attaching service to req', error);
        return next(new exceptions.UnauthorizedException(error.message));
    }
};
export default authenticateService;
//# sourceMappingURL=authenticate-service.middleware.js.map