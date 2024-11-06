/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-03 00:17:36
 */

import { Router } from 'express';
import contentAppController from '../features/content/api/index';

// guaranteed to get dependencies
export default (): Router => {
	const app = Router();

	/**
	 * Always inject the export controller.
	 */
	contentAppController(app);
	return app;
};

