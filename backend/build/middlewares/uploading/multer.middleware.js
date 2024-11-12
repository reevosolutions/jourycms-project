import * as fs from 'fs';
import multer from "multer";
import path from "path";
import { v4 as uuid } from 'uuid';
import initLogger from '../../utilities/logging';
import { formatBytes } from './../../utilities/strings/index';
import config from '../../config';
const logger = initLogger("MIDDLEWARE", 'uploadMiddleware');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var _a, _b, _c, _d;
        try {
            fs.mkdirSync(path.join(__dirname, `../../../uploads/${(_b = (_a = req.attached_entities) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id}/`), { recursive: true });
            cb(null, `uploads/${(_d = (_c = req.attached_entities) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d._id}/`);
        }
        catch (error) {
            logger.error(error.message, error);
        }
    },
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}.${Date.now()}.${uuid()}${path.extname(file.originalname)}`);
    },
});
logger.value('max-file-size', formatBytes(config.http.upload.maxFileSize));
const uploadMiddleware = multer({
    storage, limits: {
        fileSize: config.http.upload.maxFileSize
    }
});
export default uploadMiddleware;
//# sourceMappingURL=multer.middleware.js.map