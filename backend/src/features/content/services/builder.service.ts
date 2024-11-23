/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26-10-2024 23:24:33
 */

import Container, { Inject, Service } from 'typedi';
import BaseService from '../../../common/base.service';
import { EventDispatcher } from '../../../decorators/eventDispatcher.decorator';
import CacheManager from '../../../managers/cache-manager';
import TranslationToolsService from './translation.tools.service';
import { faker } from '@faker-js/faker';
import articleTypesSeedData from '../utils/seed/ar.types.seed';

/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26-10-2024 23:24:33
 * @description this is used to perform build operations on service level on startup
 */
@Service()
export default class BuilderService extends BaseService {
  public constructor(
    @Inject('articleTypeModel') private articleTypeModel: Levelup.CMS.V1.Content.Model.ArticleType,
    @Inject('articleModel') private articleModel: Levelup.CMS.V1.Content.Model.Article,
    @Inject('commentModel') private commentModel: Levelup.CMS.V1.Content.Model.Comment,
    @Inject('reviewModel') private reviewModel: Levelup.CMS.V1.Content.Model.Review,
    @Inject('termModel') private termModel: Levelup.CMS.V1.Content.Model.Term,
    @Inject('taxonomyModel') private taxonomyModel: Levelup.CMS.V1.Content.Model.Taxonomy,
    @Inject('translationItemModel') private translationItemModel: Levelup.CMS.V1.Content.Translation.Model.Item,
    @Inject('translationNamespaceModel') private translationNamespaceModel: Levelup.CMS.V1.Content.Translation.Model.Namespace,
    @Inject('translationProjectModel') private translationProjectModel: Levelup.CMS.V1.Content.Translation.Model.Project,
    @EventDispatcher() private eventDispatcher: EventDispatcher) {
    super();
  }

  /**
   * @description entry method
   */
  public async run() {
    const scenario = this.initScenario(this.logger, this.seed);
    try {
      
    } catch (error) {
      scenario.error(error);
    }
  }

  /**
   * @description this is used to test the update comparison
   */
  public async seed() {
    const scenario = this.initScenario(this.logger, this.seed);
    try {

      for (const type of articleTypesSeedData.types) {
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

    } catch (error) {
      scenario.error(error);
    }
  }



  /**
   * @description this is used to clean up data
   */
  public async cleanupData() {
    const scenario = this.initScenario(this.logger, this.cleanupData);
    try {
    } catch (error) {
      scenario.error(error);
    }
  }

  /**
   * @description this is used to upgrade the service and refactor the database
   */
  public async upgrade() {
    const scenario = this.initScenario(this.logger, this.upgrade);
    try {



      const translationToolsService = Container.get(TranslationToolsService);
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
          article.article_type = omrahType?._id;
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
              article_type: article.article_type
            }
          }).exec();
        }
      }

    } catch (error) {
      scenario.error(error);
    }
  }

  /**
   * @description this is used to refresh the cache
   */
  public async refreshCache() {
    const scenario = this.initScenario(this.logger, this.refreshCache);
    try {
      const cache = Container.get(CacheManager);
    } catch (error) {
      scenario.error(error);
    }
  }
}
