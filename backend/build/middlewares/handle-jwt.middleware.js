"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpirationHandler = exports.getTokenFromHeader = void 0;
const { expressjwt } = require("express-jwt");
const config_1 = __importDefault(require("../config"));
/**
 * We are assuming that the JWT will come in a header with the form
 *
 * Authorization: Bearer ${JWT}
 *
 * But it could come in a query parameter with the name that you want like
 * GET https://drsalmi-api.com/stats?apiKey=${JWT}
 * Luckily this API follow _common sense_ ergo a _good design_ and don't allow that ugly stuff
 */
const getTokenFromHeader = (req) => {
    /**
     * TODO Edge and Internet Explorer do some weird things with the headers
     * So I believe that this should handle more 'edge' cases ;)
     */
    if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
};
exports.getTokenFromHeader = getTokenFromHeader;
const ExpirationHandler = (req) => {
    req.jwt_expired = true;
};
exports.ExpirationHandler = ExpirationHandler;
/**
 * @description This middleware will check if the JWT is valid and attach the payload to the request
 */
const handleJWT = expressjwt({
    secret: config_1.default.security.jwt.secret, // The _secret_ to sign the JWTs
    algorithms: [config_1.default.security.jwt.algorithm], // JWT Algorithm
    requestProperty: 'auth', // Use req.auth to store the JWT
    getToken: exports.getTokenFromHeader, // How to extract the JWT from the request
    credentialsRequired: false, // Don't require the token to be present in the request
    onExpired: exports.ExpirationHandler, // Handle expired tokens
});
exports.default = handleJWT;
//# sourceMappingURL=handle-jwt.middleware.js.map