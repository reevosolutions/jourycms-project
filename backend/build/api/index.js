/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-03 00:17:36
 */
import { Router } from 'express';
import contentAppController from '../features/content/api/index';
import storageAppController from '../features/storage/api/index';
import authAppController from '../features/auth/api/index';
// import authAppController from '../features/storage/api/index';
// guaranteed to get dependencies
export default () => {
    const app = Router();
    /**
     * Always inject the export controller.
     */
    authAppController(app);
    contentAppController(app);
    storageAppController(app);
    // authAppController(app);
    return app;
};
//# sourceMappingURL=index.js.map