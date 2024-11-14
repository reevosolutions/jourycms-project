"use strict";
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26-10-2024 23:24:33
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
const cache_manager_1 = __importDefault(require("../../../managers/cache-manager"));
const translation_tools_service_1 = __importDefault(require("./translation.tools.service"));
const faker_1 = require("@faker-js/faker");
const ar_types_seed_1 = __importDefault(require("../utils/seed/ar.types.seed"));
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26-10-2024 23:24:33
 * @description this is used to perform build operations on service level on startup
 */
let BuilderService = class BuilderService extends base_service_1.default {
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
     * @description entry method
     */
    async run() {
        const scenario = this.initScenario(this.logger, this.seed);
        try {
            await this.seed();
            await this.cleanupData();
            await this.upgrade();
            await this.refreshCache();
        }
        catch (error) {
            scenario.error(error);
        }
    }
    /**
     * @description this is used to test the update comparison
     */
    async seed() {
        const scenario = this.initScenario(this.logger, this.seed);
        try {
            for (const type of ar_types_seed_1.default.types) {
                const existing = await this.articleTypeModel.findOne({
                    slug: type.slug
                });
                if (!existing) {
                    await this.articleTypeModel.create(type);
                }
                else {
                    this.logger.info(`Article type ${type.slug} already exists`);
                    await this.articleTypeModel.updateOne({
                        _id: existing._id
                    }, {
                        $set: type
                    }).exec();
                }
            }
        }
        catch (error) {
            scenario.error(error);
        }
    }
    /**
     * @description this is used to clean up data
     */
    async cleanupData() {
        const scenario = this.initScenario(this.logger, this.cleanupData);
        try {
        }
        catch (error) {
            scenario.error(error);
        }
    }
    /**
     * @description this is used to upgrade the service and refactor the database
     */
    async upgrade() {
        const scenario = this.initScenario(this.logger, this.upgrade);
        try {
            const translationToolsService = typedi_1.default.get(translation_tools_service_1.default);
            await translationToolsService.translateUsingGoogleAPI();
            const type = await this.articleTypeModel.findOne({
                slug: 'trip'
            });
            const omrahType = await this.articleTypeModel.findOne({
                slug: 'omrah'
            });
            if (type) {
                const articles = await this.articleModel.find({
                    article_type: type._id,
                });
                for (const article of articles) {
                    article.article_type = omrahType === null || omrahType === void 0 ? void 0 : omrahType._id;
                    article.title = 'عمرة رمضان';
                    article.meta_fields.price = faker_1.faker.number.int({ min: 11, max: 50 }) * 10000 + faker_1.faker.number.int({ min: 1, max: 9 }) * 1000;
                    article.meta_fields.duarttion = undefined;
                    article.meta_fields.trip_duration = faker_1.faker.helpers.arrayElement([15, 21, 30, 45]);
                    article.meta_fields.agency = '672eb5728cb4792976274773';
                    this.logger.info(`Updating article ${article._id}`, article.meta_fields.trip_duration);
                    await this.articleModel.updateOne({
                        _id: article._id
                    }, {
                        $set: {
                            meta_fields: article.meta_fields,
                            article_type: article.article_type
                        }
                    }).exec();
                }
            }
        }
        catch (error) {
            scenario.error(error);
        }
    }
    /**
     * @description this is used to refresh the cache
     */
    async refreshCache() {
        const scenario = this.initScenario(this.logger, this.refreshCache);
        try {
            const cache = typedi_1.default.get(cache_manager_1.default);
        }
        catch (error) {
            scenario.error(error);
        }
    }
};
BuilderService = __decorate([
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
], BuilderService);
exports.default = BuilderService;
//# sourceMappingURL=builder.service.js.map