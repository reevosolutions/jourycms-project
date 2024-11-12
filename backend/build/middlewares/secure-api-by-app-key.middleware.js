import initLogger from '../utilities/logging';
const logger = initLogger("MIDDLEWARE", 'secureApiWithAppKeyMiddleware');
/**
 * @description Secure Api with signature
 * TODO: finish this middleware
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const secureApiWithAppKeyMiddleware = (req, res, next) => {
    try {
        // console.log('req headers %o', req.headers);
        // const appKey = req.headers['x-signature'];
        logger.value('signature', req.headers['x-app-key']);
        // return next(new exceptions.UnauthorizedException());
        return next();
    }
    catch (error) {
        logger.error('🔥 Error attaching user to req: %o', error);
        return next(error);
    }
};
export default secureApiWithAppKeyMiddleware;
//# sourceMappingURL=secure-api-by-app-key.middleware.js.map