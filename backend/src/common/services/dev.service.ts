/**
 * @description This file is used as a dev service.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26 July 2000
 * @since 29-04-2024 10:50:30
 */

import * as cheerio from 'cheerio';
import fs from 'fs';
import { DeepRequired } from 'utility-types';
import Container, { Inject, Service } from 'typedi';
import BaseService from '../base.service';
import { EventDispatcher } from '../../decorators/eventDispatcher.decorator';
import { cities } from '../../features/content/utils/seed/algeria.cities.config';
import { ksa_cities } from '../../features/content/utils/seed/ksa.cities.config';
import { states } from '../../features/content/utils/seed/algeria.states.config';
import { fakerAR as faker } from '@faker-js/faker';
import ArticlesService from '../../features/content/services/articles.service';
import ArticleTypesService from '../../features/content/services/article-types.service';
import UsersService from '../../features/auth/services/users.service';
import AuthService from '../../features/auth/services/auth.service';
import { buildUserFullName } from '../../utilities/strings';

type User = Levelup.CMS.V1.Users.Entity.ExposedUser;
type RegisterPayload = DeepRequired<Levelup.CMS.V1.Auth.Api.Auth.Signup.Request['data']>;
type Article = Omit<Levelup.CMS.V1.Content.Entity.Article, '_type' | '_id' | 'slug'>;
type ArticleType = Levelup.CMS.V1.Content.Entity.ArticleType;


export enum ArticleTypeSlug {
  OMRAH = "omrah",
  BLOG = "blog",
  TRIP = "trip",
  SHRINE = "shrine",
  AIRELINES_COMPANY = "airelines-company",
  HOTEL = "hotel",
  AIROPORT = "airoport",
  GIFT = "gift",
  AGENCY = "agency",
  DOCTOR = "doctor",
  ESCORT = "escort",
  TOMBOLA = "tombola",
  JOB_OFFER = "job-offer",
  BID = "bid",
  TRANSPORTATION_SERVICE = "transportation-service",
  HEALTH_SERVICE = 'health-service'
}

/**
 * @description
 */
@Service()
export default class DevService extends BaseService {

  private types: { [slug in `${ArticleTypeSlug}`]?: ArticleType } = {}
  usersService: UsersService;
  authService: AuthService;
  articlesService: ArticlesService;
  articleTypesService: ArticleTypesService;
  loremHtml: string;

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
    this.loremHtml = `
    <p>و سأعرض مثال حي لهذا، من منا لم يتحمل جهد بدني شاق إلا من أجل الحصول على ميزة أو فائدة؟ ولكن من لديه الحق أن ينتقد شخص ما أراد أن يشعر بالسعادة التي لا تشوبها عواقب أليمة أو آخر أراد أن يتجنب الألم الذي ربما تنجم عنه بعض المتعة ؟ 
علي الجانب الآخر نشجب ونستنكر هؤلاء الرجال المفتونون بنشوة اللحظة الهائمون في رغباتهم فلا يدركون ما يعقبها من الألم والأسي المحتم، واللوم كذلك يشمل هؤلاء الذين أخفقوا في واجباتهم نتيجة لضعف إرادتهم فيتساوي مع هؤلاء الذين يتجنبون وينأون عن تحمل الكدح والألم . من المفترض أن نفرق بين هذه الحالات بكل سهولة ومرونة. في ذاك الوقت عندما تكون قدرتنا علي الاختيار غير مقيدة بشرط وعندما لا نجد ما يمنعنا أن نفعل الأفضل فها نحن نرحب بالسرور والسعادة ونتجنب كل ما يبعث إلينا الألم. في بعض الأحيان ونظراً للالتزامات التي يفرضها علينا الواجب والعمل سنتنازل غالباً ونرفض الشعور بالسرور ونقبل ما يجلبه إلينا الأسى. الإنسان الحكيم عليه أن يمسك زمام الأمور ويختار إما أن يرفض مصادر السعادة من أجل ما هو أكثر أهمية أو يتحمل الألم من أجل ألا يتحمل ما هو أسوأ. </p>
<ul>
   <li>ها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لمن.</li>
   <li> نتيجة لظروف ما قد تكمن السعاده فيما نتحمله م</li>
   <li>  الألم الذي ربما تنجم عنه بعض ا.</li>
</ul>
	       <p>لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار  النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة لظروف ما قد تكمن السعاده فيما نتحمله من كد وأسي.</p>
         <dl>
   <dt>أراد أن يشع</dt>
   <dd>علي الجانب الآخر نشجب ونستنكر هؤلاء الرجال المفتونون بنشوة اللحظة الهائمون في رغباتهم فلا يدركون ما يعقبها من الألم والأسي المحتم، واللوم كذلك يشمل هؤلاء الذين أخفقوا في واجباتهم.</dd>
   <dt>نتيجة لضعف إرادتهم فيتساوي مع هؤلاء </dt>
   <dd>من المفترض أن نفرق بين هذه الحالات بكل سهولة ومرونة. في ذاك الوقت عندما تكون قدرتنا علي الاختيار غير مقيدة بشرط وعندما لا نجد ما يمنعنا أن نفعل الأفضل فها نحن نرحب بالسرور والسعادة .</dd>
</dl>
<p>لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار  النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من يرغب في الحب ونيل المنال ويتلذذ بالآلام، الألم هو الألم ولكن نتيجة لظروف ما قد تكمن السعاده فيما نتحمله من كد وأسي.</p>
<ol>
   <li>تنكر هؤلاء الرجال المفتونون بنشوة اللحظة الهائمون في.</li>
   <li>م فيتساوي مع هؤلاء الذين يتجنبون وينأون عن تحم.</li>
   <li>فلا أحد يرفض أو يكره أو يتجنب الش.</li>
</ol>
`
    const scenario = this.initScenario(this.logger, this.fillArticles);
    try {
      this.usersService = Container.get(UsersService);
      this.authService = Container.get(AuthService);
      this.articlesService = Container.get(ArticlesService);
      this.articleTypesService = Container.get(ArticleTypesService);

      await this.articleTypeModel.deleteOne({ slug: 'trip' });

      const { data: articleTypes } = await this.articleTypesService.list({
        count: -1
      }, {});

      this.types = articleTypes.reduce((prev, curr) => ({
        ...prev,
        [curr.slug]: curr
      }), {} as { [slug in `${ArticleTypeSlug}`]: typeof articleTypes[0] });

      scenario.set({ articleTypes: articleTypes.map(i => i.slug) });

      // this.fillDoctors();
      // this.fillEscorts();
      // this.fillAgencies();
      // this.fillAiroports();


      /**
       * 
       */
      scenario.end();
    } catch (error) {
      scenario.error(error);
    }
  }

  async fillDoctors() {
    for (const state of faker.helpers.arrayElements(states, 10)) {
      const stateCities = cities.filter(item => item.state_code === state.code);
      for (const index of new Array(faker.number.int({ min: 1, max: 3 })).fill(null)) {
        try {
          const city = faker.helpers.arrayElement(stateCities);
          const data: RegisterPayload = {
            email: faker.internet.email(),
            password: '123',
            first_name: faker.person.firstName(),
            family_name: faker.person.lastName(),
            phones: [],
            account_type: 'doctor',
            address: {
              country_code: 'dz',
              country_name: 'الجزائر',
              state_code: state.code,
              state_name: state.name,
              city_code: city.code,
              city_name: city.name,
              street_address: faker.location.streetAddress()
            },
            website: faker.internet.url(),
            sex: faker.helpers.arrayElement(['male', 'female'])
          }

          const { data: { user } } = await this.authService.register({
            data
          });

          if (user) {
            const article: Article = {
              title: buildUserFullName(user.profile),
              body: this.loremHtml,
              body_unformatted: '',
              body_structured: {},
              is_published: true,
              published_at: new Date(),
              is_featured: false,
              featured_image: null,
              article_type: this.types[ArticleTypeSlug.DOCTOR]?._id,
              related_tags: [],
              meta_fields: {
                country: 'dz',
                state: state.code,
                city: city.code,
                experience_years: faker.number.int({ min: 0, max: 30 })
              },
              attributes: undefined,
              snapshots: undefined,
              insights: undefined
            }
            await this.articlesService.create({
              data: article
            }, {
              current: {
                user
              }
            })
          }
        } catch (error) {

        }
      }
    }
  }
  async fillEscorts() {
    for (const state of faker.helpers.arrayElements(states, 10)) {
      const stateCities = cities.filter(item => item.state_code === state.code);
      for (const index of new Array(faker.number.int({ min: 1, max: 3 })).fill(null)) {
        try {
          const city = faker.helpers.arrayElement(stateCities);
          const data: RegisterPayload = {
            email: faker.internet.email(),
            password: '123',
            first_name: faker.person.firstName(),
            family_name: faker.person.lastName(),
            phones: [],
            account_type: ArticleTypeSlug.ESCORT,
            address: {
              country_code: 'dz',
              country_name: 'الجزائر',
              state_code: state.code,
              state_name: state.name,
              city_code: city.code,
              city_name: city.name,
              street_address: faker.location.streetAddress()
            },
            website: faker.internet.url(),
            sex: faker.helpers.arrayElement(['male', 'female'])
          }

          const { data: { user } } = await this.authService.register({
            data
          });

          if (user) {
            const article: Article = {
              title: buildUserFullName(user.profile),
              body: this.loremHtml,
              body_unformatted: '',
              body_structured: {},
              is_published: true,
              published_at: new Date(),
              is_featured: false,
              featured_image: null,
              article_type: this.types[ArticleTypeSlug.ESCORT]?._id,
              related_tags: [],
              meta_fields: {
                country: 'dz',
                state: state.code,
                city: city.code,
                experience_years: faker.number.int({ min: 0, max: 30 })
              },
              attributes: undefined,
              snapshots: undefined,
              insights: undefined
            }
            await this.articlesService.create({
              data: article
            }, {
              current: {
                user
              }
            })
          }
        } catch (error) {

        }
      }
    }

  }
  async fillAgencies() {
    for (const state of faker.helpers.arrayElements(states, 10)) {
      const stateCities = cities.filter(item => item.state_code === state.code);
      for (const index of new Array(faker.number.int({ min: 1, max: 3 })).fill(null)) {
        try {
          const city = faker.helpers.arrayElement(stateCities);
          const data: RegisterPayload = {
            email: faker.internet.email(),
            password: '123',
            first_name: faker.person.firstName(),
            family_name: faker.person.lastName(),
            phones: [],
            account_type: ArticleTypeSlug.AGENCY,
            address: {
              country_code: 'dz',
              country_name: 'الجزائر',
              state_code: state.code,
              state_name: state.name,
              city_code: city.code,
              city_name: city.name,
              street_address: faker.location.streetAddress()
            },
            website: faker.internet.url(),
            sex: faker.helpers.arrayElement(['male', 'female'])
          }

          const { data: { user } } = await this.authService.register({
            data
          });

          if (user) {
            const article: Article = {
              title: `وكالة ${user.profile.family_name} للسياحة والاسفار`,
              body: this.loremHtml,
              body_unformatted: '',
              body_structured: {},
              is_published: true,
              published_at: new Date(),
              is_featured: false,
              featured_image: null,
              article_type: this.types[ArticleTypeSlug.AGENCY]?._id,
              related_tags: [],
              meta_fields: {
                country: 'dz',
                state: state.code,
                city: city.code,
              },
              attributes: undefined,
              snapshots: undefined,
              insights: undefined
            }
            await this.articlesService.create({
              data: article
            }, {
              current: {
                user
              }
            })
          }
        } catch (error) {

        }
      }
    }

  }
  async fillAiroports() {
    for (const state of faker.helpers.arrayElements(states, 10)) {
      const stateCities = cities.filter(item => item.state_code === state.code);
      for (const index of new Array(faker.number.int({ min: 1, max: 1 })).fill(null)) {
        try {
          const city = faker.helpers.arrayElement(stateCities);

          const { data: [user] } = await this.usersService.list({
            count: 1,
            filters: {
              role: 'admin'
            }
          }, {
            current: {
              service: {
                name: 'dev',
                is_external: false
              }
            }
          });

          if (user) {
            const article: Article = {
              title: `مطار ${state.name}`,
              body: this.loremHtml,
              body_unformatted: '',
              body_structured: {},
              is_published: true,
              published_at: new Date(),
              is_featured: false,
              featured_image: null,
              article_type: this.types[ArticleTypeSlug.AIROPORT]?._id,
              related_tags: [],
              meta_fields: {
                country: 'dz',
                state: state.code,
                city: city.code,
              },
              attributes: undefined,
              snapshots: undefined,
              insights: undefined
            }
            await this.articlesService.create({ data: article }, { current: { user } });
          }
        } catch (error) {

        }
      }
    }

    const { data: [user] } = await this.usersService.list({
      count: 1,
      filters: {
        role: 'admin'
      }
    }, {
      current: {
        service: {
          name: 'dev',
          is_external: false
        }
      }
    });

    const count = await this.articleModel.countDocuments({ 'meta_fields.country': 'ksa', article_type: ArticleTypeSlug.AIROPORT });
    if (!count)
      for (const city of faker.helpers.arrayElements(ksa_cities, 20)) {
        if (user) {
          const article: Article = {
            title: `مطار ${city.name}`,
            body: this.loremHtml,
            body_unformatted: '',
            body_structured: {},
            is_published: true,
            published_at: new Date(),
            is_featured: false,
            featured_image: null,
            article_type: this.types[ArticleTypeSlug.AIROPORT]?._id,
            related_tags: [],
            meta_fields: {
              country: 'ksa',
              ksa_city: city.code,
            },
            attributes: undefined,
            snapshots: undefined,
            insights: undefined
          }
          await this.articlesService.create({ data: article }, { current: { user } });
        }
      }

  }

}
