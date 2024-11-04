import { Request } from 'express';
import * as fs from 'fs';
import multer from "multer";
import path from "path";
import { v4 as uuid } from 'uuid';
import initLogger from '../../utilities/logging';
import { formatBytes } from './../../utilities/strings/index';
import config from '../../config';
const logger = initLogger("MIDDLEWARE", 'uploadMiddleware');


const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    try {
      fs.mkdirSync(path.join(__dirname, `../../../uploads/${req.attached_entities?.user?._id}/`), { recursive: true });
      cb(null, `uploads/${req.attached_entities?.user?._id}/`);
    } catch (error) {
      logger.error(error.message, error);
    }

  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}.${Date.now()}.${uuid()}${path.extname(file.originalname)}`
    );
  },
});



logger.value('max-file-size', formatBytes(config.http.upload.maxFileSize));

const uploadMiddleware = multer({
  storage, limits: {
    fileSize: config.http.upload.maxFileSize
  }
});

export default uploadMiddleware;
