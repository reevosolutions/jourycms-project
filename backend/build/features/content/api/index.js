"use strict";
/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-04-03 00:17:36
 */
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
exports.ROOT_PATH = void 0;
const express_1 = require("express");
const article_types_controller_1 = __importDefault(require("../controllers/article-types.controller"));
const articles_controller_1 = __importDefault(require("../controllers/articles.controller"));
const comments_controller_1 = __importDefault(require("../controllers/comments.controller"));
const reviews_controller_1 = __importDefault(require("../controllers/reviews.controller"));
const terms_controller_1 = __importDefault(require("../controllers/terms.controller"));
const taxonomies_controller_1 = __importDefault(require("../controllers/taxonomies.controller"));
const translation_items_controller_1 = __importDefault(require("../controllers/translation.items.controller"));
const translation_namespaces_controller_1 = __importDefault(require("../controllers/translation.namespaces.controller"));
const translation_projects_controller_1 = __importDefault(require("../controllers/translation.projects.controller"));
const translation_tools_controller_1 = __importDefault(require("../controllers/translation.tools.controller"));
const logging_1 = __importStar(require("../../../utilities/logging"));
const requests_1 = require("../../../utilities/requests");
const logger = (0, logging_1.default)(logging_1.LoggerContext.CONTROLLER, "ContentController");
exports.ROOT_PATH = '/content';
// guaranteed to get dependencies
exports.default = (app) => {
    const route = (0, express_1.Router)();
    app.use(exports.ROOT_PATH, route);
    route.use('/', (req, res, next) => {
        logger.success('Content API');
        next();
    });
    route.get('/', (req, res, next) => {
        return (0, requests_1.respond)(res, { message: 'Content API' });
    });
    (0, article_types_controller_1.default)(route);
    (0, articles_controller_1.default)(route);
    (0, comments_controller_1.default)(route);
    (0, reviews_controller_1.default)(route);
    (0, terms_controller_1.default)(route);
    (0, taxonomies_controller_1.default)(route);
    (0, translation_items_controller_1.default)(route);
    (0, translation_namespaces_controller_1.default)(route);
    (0, translation_projects_controller_1.default)(route);
    (0, translation_tools_controller_1.default)(route);
};
//# sourceMappingURL=index.js.map