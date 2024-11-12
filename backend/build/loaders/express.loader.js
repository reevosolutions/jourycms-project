import { OpticMiddleware } from '@useoptic/express-middleware';
import cors from 'cors';
import express from 'express';
import helmet from "helmet";
import methodOverride from 'method-override';
import routes from '../api';
import sharedRoutes from '../api/shared-routes';
import config from '../config';
import middlewares from '../middlewares';
import session from "express-session";
export default ({ app }) => {
    app.use(helmet());
    app.disable('x-powered-by');
    /**
     * Expose the public folder as static
     */
    app.use(express.static('public'));
    /**
     * Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
     * It shows the real origin IP in the heroku or Cloudwatch logs
     */
    app.enable('trust proxy');
    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());
    // Some sauce that always add since 2014
    // "Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it."
    // Maybe not needed anymore ?
    app.use(methodOverride());
    // Transforms the raw string of req.body into json
    app.use(express.json({ limit: config.http.bodySizeLimit }));
    app.use(express.urlencoded({ extended: true, limit: config.http.bodySizeLimit }));
    app.use(session({
        secret: "keyboard cat",
        resave: false, // don't save session if unmodified
        saveUninitialized: false, // don't create session until something stored
    }));
    /**
     * Handle JWT token
     */
    app.use(middlewares.handleJWT);
    /**
     * Authenticate service
     */
    app.use(middlewares.authenticateService);
    /**
     * Attach auth data to the request object
     */
    app.use(middlewares.attachAuthData);
    /**
     * Health Check endpoints
     * TODO Explain why they are here
     */
    app.use(sharedRoutes());
    /**
     * Load API routes
     */
    app.use(config.http.api.prefix, routes());
    /**
     * API Documentation
     */
    app.use(OpticMiddleware({
        enabled: config.environement === 'development',
    }));
    /**
     * catch 404 and forward to error handler
     */
    app.use(middlewares.endpointNotFoundHandler());
    /**
     * Error handler
     */
    app.use(middlewares.errorHandler());
};
//# sourceMappingURL=express.loader.js.map