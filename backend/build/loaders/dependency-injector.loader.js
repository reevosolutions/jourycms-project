"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const logger_loader_1 = __importDefault(require("./logger.loader"));
const firebase_manager_1 = __importDefault(require("../managers/firebase-manager"));
const index_1 = __importDefault(require("../managers/translation-manager/index"));
exports.default = async ({ models, }) => {
    try {
        models.forEach(m => {
            typedi_1.Container.set(m.name, m.model);
        });
        await index_1.default.init();
        typedi_1.Container.set('firebaseManager', typedi_1.Container.get(firebase_manager_1.default));
        typedi_1.Container.set('logger', logger_loader_1.default);
    }
    catch (e) {
        logger_loader_1.default.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
};
//# sourceMappingURL=dependency-injector.loader.js.map