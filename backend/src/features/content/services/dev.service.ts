/**
 * @description This file is used as a dev service.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26 July 2000
 * @since 29-04-2024 10:50:30
 */

import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import Container, { Inject, Service } from 'typedi';
import BaseService from '../../../common/base.service';
import { EventDispatcher } from '../../../decorators/eventDispatcher.decorator';
import { ObjectUpdatedProperties } from '../../../utilities/objects';
import ArticlesService from './articles.service';
import ArticleTypesService from './article-types.service';
import { cities } from '../utils/seed/algeria.cities.config';
import { states } from '../utils/seed/algeria.states.config';
import { fakerAR as faker } from '@faker-js/faker';

type User = Levelup.CMS.V1.Users.Entity.ExposedUser;
type Article = Levelup.CMS.V1.Content.Entity.Article;

/**
 * @description
 */
@Service()
export default class DevService extends BaseService {
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

    @EventDispatcher() private eventDispatcher: EventDispatcher
  ) {
    super();
  }



  /**
   * Update :
   * @author dr. Salmi <reevosolutions@gmail.com>
   * @since 16-10-2024 23:40:44
   */
  public async fillArticles() {
    const scenario = this.initScenario(this.logger, this.fillArticles);
    try {
      const articlesService = Container.get(ArticlesService);
      const articleTypesService = Container.get(ArticleTypesService);

      await this.articleTypeModel.deleteOne({ slug: 'trip' });

      const { data: articleTypes } = await articleTypesService.list({
        count: -1
      }, {});



      scenario.set({ articleTypes: articleTypes.map(i => i.slug) });


      for(const state of states){
        const stateCities = cities.filter(item=>item.state_code === state.code);
        for(const index of new Array(faker.number.int({min: 3, max: 10})).fill(null)){
          const doctor: Partial<User> = {
            
          }
        }
      }


      /**
       * 
       */
      scenario.end();
    } catch (error) {
      scenario.error(error);
    }
  }

}
