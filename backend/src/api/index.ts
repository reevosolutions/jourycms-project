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
import exportController from '../controllers/export.controller';
import reviewsController from '../controllers/reviews.controller';
import TermsController from '../controllers/terms.controller';
import taxonomiesController from '../controllers/taxonomies.controller';
import translationItemsController from '../controllers/translation.items.controller';
import translationNamespacesController from '../controllers/translation.namespaces.controller';
import translationProjectsController from '../controllers/translation.projects.controller';
import translationToolsController from '../controllers/translation.tools.controller';

// guaranteed to get dependencies
export default (): Router => {
  const app = Router();

  /**
   * Always inject the export controller.
   */
  exportController(app);

  /**
   * Service-specific controllers.
   */
  
	articleTypesController(app);
	articlesController(app);
	commentsController(app);
	reviewsController(app);
	TermsController(app);
	taxonomiesController(app);
	translationItemsController(app);
	translationNamespacesController(app);
	translationProjectsController(app);
	translationToolsController(app);

  return app;
};

