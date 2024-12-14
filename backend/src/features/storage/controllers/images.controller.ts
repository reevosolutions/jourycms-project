import { NextFunction, Request, Response, Router } from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import Container from 'typedi';
import UploadedFilesService from '../services/uploaded-files.service';
import initLogger from '../../../utilities/logging';
import exceptions from '../../../exceptions';

import ApiAlias = Levelup.CMS.V1.Storage.Api;

export const ROOT_PATH = '/images';

export default (app: Router): void => {
  const logger = initLogger('CONTROLLER', 'ImagesController');
  const route = Router();

  app.use(
    ROOT_PATH,
    // middlewares.AUTH.requireUser,
    route
  );

  // GET /images/:id
  route.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filesServiceInstance = Container.get(UploadedFilesService);
      const { data: file } = await filesServiceInstance.getById(req.params.id);
      if (!file) throw new exceptions.ItemNotFoundException('File not found');
      else {
        res.status(200).sendFile(path.join(__dirname, '../../../../', file.file_path));
      }
    } catch (e) {
      return next(e);
    }
  });



  route.get('/:id/blurred', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filesServiceInstance = Container.get(UploadedFilesService);
      const { data: file } = await filesServiceInstance.getById(req.params.id);
      if (!file) {
        logger.error('File not found', req.params.id);
        throw new exceptions.ItemNotFoundException('File not found');
      }
      else {
        const format = 'webp';
        const filePath = path.join(__dirname, '../../../../', file.file_path);
        const basename = path.parse(file.file_path).name;
        const dir = path.parse(file.file_path).dir;
        const extension = `.${format}`;
        const output = path.join(__dirname, '../../../../', `${dir}/${basename}-blurred${extension}`);

        logger.value('image', {
          filePath,
          basename,
          dir,
          extension,
          output
        });

        if (!fs.existsSync(filePath)) throw new exceptions.ItemNotFoundException('File not found.');
        if (true || !fs.existsSync(output)) {
          logger.warn('Generating resized image');
          let image = sharp(filePath)
            .resize({ width: 100 })
            .blur(15);
          image = format === 'webp' ? image.webp({ quality: 50 }) : image.jpeg({ quality: 50 });
          image
            .toFile(output)
            .then(() => {
              res.status(200).sendFile(output);
            })
            .catch(e => {
              throw e;
            });
        } else {
          res.status(200).sendFile(output);
        }
      }
    } catch (error) {
      logger.error(error.message, error);
      return next(error);
    }
  });
  route.get('/:id/blurred/:format', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filesServiceInstance = Container.get(UploadedFilesService);
      const { data: file } = await filesServiceInstance.getById(req.params.id);
      if (!file) {
        logger.error('File not found', req.params.id);
        throw new exceptions.ItemNotFoundException('File not found');
      }
      else {
        const format = req.params.format === 'jpg' ? 'jpeg' : 'webp';
        const filePath = path.join(__dirname, '../../../../', file.file_path);
        const basename = path.parse(file.file_path).name;
        const dir = path.parse(file.file_path).dir;
        const extension = `.${format}`;
        const output = path.join(__dirname, '../../../../', `${dir}/${basename}-blurred${extension}`);

        logger.value('image', {
          filePath,
          basename,
          dir,
          extension,
          output
        });

        if (!fs.existsSync(filePath)) throw new exceptions.ItemNotFoundException('File not found.');
        if (true || !fs.existsSync(output)) {
          logger.warn('Generating resized image');
          let image = sharp(filePath)
            .resize({ width: 100 })
            .blur(15);
          image = format === 'webp' ? image.webp({ quality: 50 }) : image.jpeg({ quality: 50 });
          image
            .toFile(output)
            .then(() => {
              res.status(200).sendFile(output);
            })
            .catch(e => {
              throw e;
            });
        } else {
          res.status(200).sendFile(output);
        }
      }
    } catch (error) {
      logger.error(error.message, error);
      return next(error);
    }
  });


  route.get('/:id/:width', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filesServiceInstance = Container.get(UploadedFilesService);
      const { data: file } = await filesServiceInstance.getById(req.params.id);
      if (!file) {
        logger.error('File not found', req.params.id);
        throw new exceptions.ItemNotFoundException('File not found');
      }
      else {
        const width = parseInt(req.params.width);
        const filePath = path.join(__dirname, '../../../../', file.file_path);
        const basename = path.parse(file.file_path).name;
        const dir = path.parse(file.file_path).dir;
        const extension = path.extname(file.file_path);
        const output = path.join(__dirname, '../../../../', `${dir}/${basename}-${width}${extension}`);

        logger.value('image', {
          width,
          filePath,
          basename,
          dir,
          extension,
          output
        });

        if (!fs.existsSync(filePath)) throw new exceptions.ItemNotFoundException('File not found.');
        if (!fs.existsSync(output)) {
          logger.warn('Generating resized image');
          sharp(filePath)
            .resize({ width })
            .toFile(output)
            .then(() => {
              res.status(200).sendFile(output);
            })
            .catch(e => {
              throw e;
            });
        } else {
          res.status(200).sendFile(output);
        }
      }
    } catch (e) {
      return next(e);
    }
  });

  route.get('/:id/:width/:height', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filesServiceInstance = Container.get(UploadedFilesService);
      const { data: file } = await filesServiceInstance.getById(req.params.id);
      if (!file) {
        logger.error('File not found', req.params.id);
        throw new exceptions.ItemNotFoundException('File not found');
      }
      else {
        const width = parseInt(req.params.width);
        const height = parseInt(req.params.height);
        const filePath = path.join(__dirname, '../../../../', file.file_path);
        const basename = path.parse(file.file_path).name;
        const dir = path.parse(file.file_path).dir;
        const extension = path.extname(file.file_path);
        const output = path.join(__dirname, '../../../../', `${dir}/${basename}-${width}x${height}${extension}`);

        logger.value('image', {
          width,
          height,
          filePath,
          basename,
          dir,
          extension,
          output
        });

        if (!fs.existsSync(filePath)) throw new exceptions.ItemNotFoundException('File not found.');
        if (!fs.existsSync(output)) {
          logger.warn('Generating resized image');
          sharp(filePath)
            .resize({ width, height })
            .toFile(output)
            .then(() => {
              res.status(200).sendFile(output);
            })
            .catch(e => {
              throw e;
            });
        } else {
          res.status(200).sendFile(output);
        }
      }
    } catch (e) {
      return next(e);
    }
  });


};
