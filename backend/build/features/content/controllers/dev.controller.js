/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26 July 2000
 * @since 29-04-2024 05:32:17
 */
import { Router } from 'express';
import Container from 'typedi';
import middlewares from '../../../middlewares';
import initLogger from '../../../utilities/logging';
import { respond } from '../../../utilities/requests';
import { getAuthData } from '../../../utilities/requests/get-auth-data';
import DevService from '../services/dev.service';
/**
 * @generator Levelup
 * @description This file is used to build the Users controller
 */
export const ROOT_PATH = '/dev';
export default (app) => {
    const logger = initLogger("CONTROLLER", "dev");
    const route = Router();
    app.use(ROOT_PATH, middlewares.AUTH.requireUser, route);
    route.get('/', async (req, res, next) => {
        try {
            const AUTH_DATA = await getAuthData(req);
            const devService = Container.get(DevService);
            return respond(res, {
                status: "success",
            }, 200);
        }
        catch (error) {
            /**
             * Pass the error to the next middleware
             * the error logging logic is handled on the service layer
             */
            return next(error);
        }
    });
};
//# sourceMappingURL=dev.controller.js.map