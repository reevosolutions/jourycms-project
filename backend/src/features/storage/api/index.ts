/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-03 00:17:36
 */

import { Router } from 'express';
import uploadedFilesController from '../controllers/uploaded-files.controller';
import uploadController from '../controllers/upload.controller';
import imagesController from '../controllers/images.controller';
import filesController from '../controllers/files.controller';
import initLogger, { LoggerContext } from '../../../utilities/logging';
import { respond } from '../../../utilities/requests';

const logger = initLogger(LoggerContext.CONTROLLER, "ContentController");

export const ROOT_PATH = '/storage';

// guaranteed to get dependencies
export default (app: Router): void => {
	const route = Router();


	app.use(
		ROOT_PATH,
		route
	);

	route.use('/', (req, res, next) => {
		logger.success('Content API');
		next();
	});

	route.get('/', (req, res, next) => {
		return respond(res, { message: 'Content API' });
	});

	uploadedFilesController(route);
  uploadController(route);
  imagesController(route);
  filesController(route);

};

