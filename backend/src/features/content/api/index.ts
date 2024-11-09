/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-03 00:17:36
 */

import { Router } from 'express';
import articleTypesController from '../controllers/article-types.controller';
import articlesController from '../controllers/articles.controller';
import commentsController from '../controllers/comments.controller';
import reviewsController from '../controllers/reviews.controller';
import TermsController from '../controllers/terms.controller';
import taxonomiesController from '../controllers/taxonomies.controller';
import translationItemsController from '../controllers/translation.items.controller';
import translationNamespacesController from '../controllers/translation.namespaces.controller';
import translationProjectsController from '../controllers/translation.projects.controller';
import translationToolsController from '../controllers/translation.tools.controller';
import initLogger, { LoggerContext } from '../../../utilities/logging';
import { respond } from '../../../utilities/requests';

const logger = initLogger(LoggerContext.CONTROLLER, "ContentController");

export const ROOT_PATH = '/content';

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

	articleTypesController(route);
	articlesController(route);
	commentsController(route);
	reviewsController(route);
	TermsController(route);
	taxonomiesController(route);
	translationItemsController(route);
	translationNamespacesController(route);
	translationProjectsController(route);
	translationToolsController(route);
};

