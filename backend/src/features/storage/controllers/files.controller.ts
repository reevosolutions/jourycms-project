import { NextFunction, Request, Response, Router } from 'express';
import path from 'path';
import Container from 'typedi';
import exceptions from '../../../exceptions';
import initLogger from '../../../utilities/logging';
import UploadedFilesService from '../services/uploaded-files.service';

import ApiAlias = Levelup.CMS.V1.Storage.Api;


export const ROOT_PATH = '/files';


export default (app: Router): void => {
  const logger = initLogger("CONTROLLER", "FilesController");
  const route = Router();


  app.use(
    ROOT_PATH,
    // middlewares.AUTH.requireUser,
    route
  );



  // GET /files/:id
  route.get(
    '/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const filesServiceInstance = Container.get(UploadedFilesService);
        const { data: file } = await filesServiceInstance.getById(req.params.id);
        if (!file) throw new exceptions.ItemNotFoundException('File not found');
        else {
          logger.value('Sending file content', file._id, path.join(__dirname, '../../', file.file_path));
          res.status(200).sendFile(path.join(__dirname, '../../', file.file_path));
        }
      } catch (e) {
        return next(e);
      }
    },
  );




};
