import { NextFunction, Request, Response, Router } from 'express';
import Container from 'typedi';
import middlewares from '../../../middlewares';
import initLogger from '../../../utilities/logging';
import { respond } from '../../../utilities/requests';
import { getAuthData } from '../../../utilities/requests/get-auth-data';
import UploadService from '../services/upload.service';

import ApiAlias = Levelup.CMS.V1.Storage.Api;

export const ROOT_PATH = '/upload';

export default (app: Router): void => {
  const logger = initLogger('CONTROLLER', 'UploaderController');
  const route = Router();

  app.use(ROOT_PATH, 
    // middlewares.AUTH.requireUser, 
    route);

  // POST /
  route.post(
    '/',
    // middlewares.AUTH.requireUser,
    // async (req: Request, res: Response, next: NextFunction) => {
    //   const logger: Logger = Container.get('logger');
    //   logger.debug('[UploadFiles] before upload body: %o', req.body);
    //   return next();
    // },
    middlewares.UPLOADING.uploadMiddleware.array('files', 12),
    async (req: Request, res: Response, next: NextFunction) => {
      /**
       * Always get the auth data at the beginning of the function
       */
      const AUTH_DATA = await getAuthData(req);

      logger.debug('[UploadFiles] body: %o', req.body);
      try {
        const uploadServiceInstance = Container.get(UploadService);

        logger.value('Req.files', req.files);

        const files = await uploadServiceInstance.saveMultipleFilesToDB(req.files, AUTH_DATA);
        logger.value('uploaded files', files);
        respond<ApiAlias.Upload.Response>(res, { data: { files } });
      } catch (e) {
        logger.error(e.message,e);
        return next(e);
      }
    }
  );

  // POST /load-remote/
  route.post('/load-remote', middlewares.AUTH.requireUser, async (req: Request, res: Response, next: NextFunction) => {
    try {
      /**
       * Always get the auth data at the beginning of the function
       */
      const AUTH_DATA = await getAuthData(req);

      /**
       * Load the required services and managers
       */
      const uploadServiceInstance = Container.get(UploadService);

      /**
       * Call the service method if the validation conditions are fulfilled
       */
      const result = await uploadServiceInstance.loadRemoteFile(req.body as ApiAlias.LoadRemote.Request, AUTH_DATA);
      /**
       * Respond to the client
       */
      return respond<ApiAlias.LoadRemote.Response>(res, result, 201);
    } catch (e) {
      /**
       * Pass the error to the next middleware
       * the error logging logic is handled on the service layer
       */
      return next(e);
    }
  });
};
