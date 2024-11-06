"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const logging_1 = __importDefault(require("../../utilities/logging"));
const index_1 = require("./../../utilities/strings/index");
const config_1 = __importDefault(require("../../config"));
const logger = (0, logging_1.default)("MIDDLEWARE", 'uploadMiddleware');
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        var _a, _b, _c, _d;
        try {
            fs.mkdirSync(path_1.default.join(__dirname, `../../../uploads/${(_b = (_a = req.attached_entities) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b._id}/`), { recursive: true });
            cb(null, `uploads/${(_d = (_c = req.attached_entities) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d._id}/`);
        }
        catch (error) {
            logger.error(error.message, error);
        }
    },
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}.${Date.now()}.${(0, uuid_1.v4)()}${path_1.default.extname(file.originalname)}`);
    },
});
logger.value('max-file-size', (0, index_1.formatBytes)(config_1.default.http.upload.maxFileSize));
const uploadMiddleware = (0, multer_1.default)({
    storage, limits: {
        fileSize: config_1.default.http.upload.maxFileSize
    }
});
exports.default = uploadMiddleware;
//# sourceMappingURL=multer.middleware.js.map