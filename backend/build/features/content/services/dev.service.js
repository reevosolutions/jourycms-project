"use strict";
/**
 * @description This file is used as a dev service.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26 July 2000
 * @since 29-04-2024 10:50:30
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importStar(require("typedi"));
const base_service_1 = __importDefault(require("../../../common/base.service"));
const eventDispatcher_decorator_1 = require("../../../decorators/eventDispatcher.decorator");
const articles_service_1 = __importDefault(require("./articles.service"));
const article_types_service_1 = __importDefault(require("./article-types.service"));
const algeria_cities_config_1 = require("../utils/seed/algeria.cities.config");
const algeria_states_config_1 = require("../utils/seed/algeria.states.config");
const faker_1 = require("@faker-js/faker");
/**
 * @description
 */
let DevService = class DevService extends base_service_1.default {
    constructor(articleTypeModel, articleModel, commentModel, reviewModel, termModel, taxonomyModel, translationItemModel, translationNamespaceModel, translationProjectModel, eventDispatcher) {
        super();
        this.articleTypeModel = articleTypeModel;
        this.articleModel = articleModel;
        this.commentModel = commentModel;
        this.reviewModel = reviewModel;
        this.termModel = termModel;
        this.taxonomyModel = taxonomyModel;
        this.translationItemModel = translationItemModel;
        this.translationNamespaceModel = translationNamespaceModel;
        this.translationProjectModel = translationProjectModel;
        this.eventDispatcher = eventDispatcher;
    }
    /**
     * Update :
     * @author dr. Salmi <reevosolutions@gmail.com>
     * @since 16-10-2024 23:40:44
     */
    async fillArticles() {
        const scenario = this.initScenario(this.logger, this.fillArticles);
        try {
            const articlesService = typedi_1.default.get(articles_service_1.default);
            const articleTypesService = typedi_1.default.get(article_types_service_1.default);
            await this.articleTypeModel.deleteOne({ slug: 'trip' });
            const { data: articleTypes } = await articleTypesService.list({
                count: -1
            }, {});
            scenario.set({ articleTypes: articleTypes.map(i => i.slug) });
            for (const state of algeria_states_config_1.states) {
                const stateCities = algeria_cities_config_1.cities.filter(item => item.state_code === state.code);
                for (const index of new Array(faker_1.fakerAR.number.int({ min: 3, max: 10 })).fill(null)) {
                    const doctor = {};
                }
            }
            /**
             *
             */
            scenario.end();
        }
        catch (error) {
            scenario.error(error);
        }
    }
};
DevService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('articleTypeModel')),
    __param(1, (0, typedi_1.Inject)('articleModel')),
    __param(2, (0, typedi_1.Inject)('commentModel')),
    __param(3, (0, typedi_1.Inject)('reviewModel')),
    __param(4, (0, typedi_1.Inject)('termModel')),
    __param(5, (0, typedi_1.Inject)('taxonomyModel')),
    __param(6, (0, typedi_1.Inject)('translationItemModel')),
    __param(7, (0, typedi_1.Inject)('translationNamespaceModel')),
    __param(8, (0, typedi_1.Inject)('translationProjectModel')),
    __param(9, (0, eventDispatcher_decorator_1.EventDispatcher)()),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], DevService);
exports.default = DevService;
//# sourceMappingURL=dev.service.js.map