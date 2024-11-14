"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../utilities/logging"));
const logger = (0, logging_1.default)("MIDDLEWARE", 'secureApiWithAppKeyMiddleware');
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
exports.default = secureApiWithAppKeyMiddleware;
//# sourceMappingURL=secure-api-by-app-key.middleware.js.map