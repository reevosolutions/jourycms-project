/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-03 00:17:36
 */

import { Router } from 'express';
import authController from '../controllers/auth.controller';
import usersController from '../controllers/users.controller';
import initLogger, { LoggerContext } from '../../../utilities/logging';
import { respond } from '../../../utilities/requests';

const logger = initLogger(LoggerContext.CONTROLLER, "AuthController");

export const ROOT_PATH = '/content';

// guaranteed to get dependencies
export default (app: Router): void => {
	const route = Router();


	app.use(
		ROOT_PATH,
		route
	);

	route.use('/', (req, res, next) => {
		logger.success('Auth API');
		next();
	});

	route.get('/', (req, res, next) => {
		return respond(res, { message: 'Auth API' });
	});

	authController(route);
	usersController(route);
};

