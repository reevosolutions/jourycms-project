/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26-10-2024 23:24:33
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import Container, { Inject, Service } from 'typedi';
import BaseService from '../../../common/base.service';
import { EventDispatcher } from '../../../decorators/eventDispatcher.decorator';
import CacheManager from '../../../managers/cache-manager';
import TranslationToolsService from './translation.tools.service';
import { faker } from '@faker-js/faker';
/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26-10-2024 23:24:33
 * @description this is used to perform build operations on service level on startup
 */
let BuilderService = class BuilderService extends BaseService {
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
            const translationToolsService = Container.get(TranslationToolsService);
            await translationToolsService.translateUsingGoogleAPI();
            const type = await this.articleTypeModel.findOne({
                slug: 'trip'
            });
            if (type) {
                const articles = await this.articleModel.find({
                    article_type: type._id,
                });
                for (const article of articles) {
                    article.title = 'عمرة رمضان';
                    article.meta_fields.price = faker.number.int({ min: 11, max: 50 }) * 10000 + faker.number.int({ min: 1, max: 9 }) * 1000;
                    article.meta_fields.duarttion = undefined;
                    article.meta_fields.trip_duration = faker.helpers.arrayElement([15, 21, 30, 45]);
                    article.meta_fields.agency = '672eb5728cb4792976274773';
                    this.logger.info(`Updating article ${article._id}`, article.meta_fields.trip_duration);
                    await this.articleModel.updateOne({
                        _id: article._id
                    }, {
                        $set: {
                            meta_fields: article.meta_fields,
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
            const cache = Container.get(CacheManager);
        }
        catch (error) {
            scenario.error(error);
        }
    }
};
BuilderService = __decorate([
    Service(),
    __param(0, Inject('articleTypeModel')),
    __param(1, Inject('articleModel')),
    __param(2, Inject('commentModel')),
    __param(3, Inject('reviewModel')),
    __param(4, Inject('termModel')),
    __param(5, Inject('taxonomyModel')),
    __param(6, Inject('translationItemModel')),
    __param(7, Inject('translationNamespaceModel')),
    __param(8, Inject('translationProjectModel')),
    __param(9, EventDispatcher()),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], BuilderService);
export default BuilderService;
//# sourceMappingURL=builder.service.js.map