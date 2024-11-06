"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_middleware_1 = require("@useoptic/express-middleware");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const method_override_1 = __importDefault(require("method-override"));
const api_1 = __importDefault(require("../api"));
const shared_routes_1 = __importDefault(require("../api/shared-routes"));
const config_1 = __importDefault(require("../config"));
const middlewares_1 = __importDefault(require("../middlewares"));
const express_session_1 = __importDefault(require("express-session"));
exports.default = ({ app }) => {
    app.use((0, helmet_1.default)());
    app.disable('x-powered-by');
    /**
     * Expose the public folder as static
     */
    app.use(express_1.default.static('public'));
    /**
     * Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
     * It shows the real origin IP in the heroku or Cloudwatch logs
     */
    app.enable('trust proxy');
    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use((0, cors_1.default)());
    // Some sauce that always add since 2014
    // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
    // Maybe not needed anymore ?
    app.use((0, method_override_1.default)());
    // Transforms the raw string of req.body into json
    app.use(express_1.default.json({ limit: config_1.default.http.bodySizeLimit }));
    app.use(express_1.default.urlencoded({ extended: true, limit: config_1.default.http.bodySizeLimit }));
    app.use((0, express_session_1.default)({
        secret: "keyboard cat",
        resave: false, // don't save session if unmodified
        saveUninitialized: false, // don't create session until something stored
    }));
    /**
     * Handle JWT token
     */
    app.use(middlewares_1.default.handleJWT);
    /**
     * Authenticate service
     */
    app.use(middlewares_1.default.authenticateService);
    /**
     * Attach auth data to the request object
     */
    app.use(middlewares_1.default.attachAuthData);
    /**
     * Health Check endpoints
     * TODO Explain why they are here
     */
    app.use((0, shared_routes_1.default)());
    /**
     * Load API routes
     */
    app.use(config_1.default.http.api.prefix, (0, api_1.default)());
    /**
     * API Documentation
     */
    app.use((0, express_middleware_1.OpticMiddleware)({
        enabled: config_1.default.environement === 'development',
    }));
    /**
     * catch 404 and forward to error handler
     */
    app.use(middlewares_1.default.endpointNotFoundHandler());
    /**
     * Error handler
     */
    app.use(middlewares_1.default.errorHandler());
};
//# sourceMappingURL=express.loader.js.map