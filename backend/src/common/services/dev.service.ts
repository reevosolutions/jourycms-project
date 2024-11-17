/**
 * @description This file is used as a dev service.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26 July 2000
 * @since 29-04-2024 10:50:30
 */

import * as cheerio from "cheerio";
import fs from "fs";
import { DeepRequired } from "utility-types";
import Container, { Inject, Service } from "typedi";
import BaseService from "../base.service";
import { EventDispatcher } from "../../decorators/eventDispatcher.decorator";
import { cities } from "../../features/content/utils/seed/algeria.cities.config";
import { ksa_cities } from "../../features/content/utils/seed/ksa.cities.config";
import { states } from "../../features/content/utils/seed/algeria.states.config";
import { fakerAR as faker } from "@faker-js/faker";
import ArticlesService from "../../features/content/services/articles.service";
import ArticleTypesService from "../../features/content/services/article-types.service";
import UsersService from "../../features/auth/services/users.service";
import AuthService from "../../features/auth/services/auth.service";
import { addLeadingZeros, buildUserFullName } from "../../utilities/strings";
import moment from "moment";

type User = Levelup.CMS.V1.Users.Entity.ExposedUser;
type RegisterPayload = DeepRequired<
  Levelup.CMS.V1.Auth.Api.Auth.Signup.Request["data"]
>;
type Article = Omit<
  Levelup.CMS.V1.Content.Entity.Article,
  "_type" | "_id" | "slug"
>;
type ArticleType = Levelup.CMS.V1.Content.Entity.ArticleType;
type CustomField<
  T extends Levelup.CMS.V1.Content.CustomFields.CustomFieldType,
> = Levelup.CMS.V1.Content.CustomFields.MetaField<T>;

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
  HEALTH_SERVICE = "health-service",
}

/**
 * @description
 */
@Service()
export default class DevService extends BaseService {
  private types: { [slug in `${ArticleTypeSlug}`]?: ArticleType } = {};
  usersService: UsersService;
  authService: AuthService;
  articlesService: ArticlesService;
  articleTypesService: ArticleTypesService;
  loremHtml: string;

  public constructor(
    @Inject("userModel") private userModel: Levelup.CMS.V1.Users.Model.User,
    @Inject("articleTypeModel")
    private articleTypeModel: Levelup.CMS.V1.Content.Model.ArticleType,
    @Inject("articleModel")
    private articleModel: Levelup.CMS.V1.Content.Model.Article,
    @Inject("commentModel")
    private commentModel: Levelup.CMS.V1.Content.Model.Comment,
    @Inject("reviewModel")
    private reviewModel: Levelup.CMS.V1.Content.Model.Review,
    @Inject("termModel") private termModel: Levelup.CMS.V1.Content.Model.Term,
    @Inject("taxonomyModel")
    private taxonomyModel: Levelup.CMS.V1.Content.Model.Taxonomy,
    @Inject("translationItemModel")
    private translationItemModel: Levelup.CMS.V1.Content.Translation.Model.Item,
    @Inject("translationNamespaceModel")
    private translationNamespaceModel: Levelup.CMS.V1.Content.Translation.Model.Namespace,
    @Inject("translationProjectModel")
    private translationProjectModel: Levelup.CMS.V1.Content.Translation.Model.Project,

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
`;
    const scenario = this.initScenario(this.logger, this.fillArticles);
    try {
      this.usersService = Container.get(UsersService);
      this.authService = Container.get(AuthService);
      this.articlesService = Container.get(ArticlesService);
      this.articleTypesService = Container.get(ArticleTypesService);

      await this.articleTypeModel.deleteOne({ slug: "trip" });

      const { data: articleTypes } = await this.articleTypesService.list(
        {
          count: -1,
        },
        {}
      );

      this.types = articleTypes.reduce(
        (prev, curr) => ({
          ...prev,
          [curr.slug]: curr,
        }),
        {} as { [slug in `${ArticleTypeSlug}`]: (typeof articleTypes)[0] }
      );

      scenario.set({ articleTypes: articleTypes.map((i) => i.slug) });

      // await this.reset();
      // await this.fillDoctors();
      // await this.fillEscorts();
      // await this.fillAgencies();
      // await this.fillAiroports();
      // await this.fillAirlines();
      // await this.fillShrines();
      // await this.fillHotels();
      // await this.fillTrips();
      // await this.setAgenciesLogo();

      /**
       *
       */
      scenario.end();
    } catch (error) {
      scenario.error(error);
    }
  }

  async reset() {
    await this.userModel.deleteMany({
      role: { $ne: "admin" },
    });
    await this.articleModel.deleteMany({});
  }

  async fillDoctors() {
    for (const state of faker.helpers.arrayElements(states, 58)) {
      const stateCities = cities.filter(
        (item) => item.state_code === state.code
      );
      for (const index of new Array(faker.number.int({ min: 1, max: 3 })).fill(
        null
      )) {
        try {
          const city = faker.helpers.arrayElement(stateCities);
          const data: RegisterPayload = {
            email: faker.internet.email(),
            password: "123",
            first_name: faker.person.firstName(),
            family_name: faker.person.lastName(),
            phones: [],
            account_type: "doctor",
            address: {
              country_code: "dz",
              country_name: "الجزائر",
              state_code: state.code,
              state_name: state.name,
              city_code: city.code,
              city_name: city.name,
              street_address: faker.location.streetAddress(),
            },
            website: faker.internet.url(),
            sex: faker.helpers.arrayElement(["male", "female"]),
          };

          const {
            data: { user },
          } = await this.authService.register({
            data,
          });

          if (user) {
            const article: Article = {
              title: buildUserFullName(user.profile),
              body: this.loremHtml,
              body_unformatted: "",
              body_structured: {},
              is_published: true,
              published_at: new Date(),
              is_featured: false,
              featured_image: null,
              article_type: this.types[ArticleTypeSlug.DOCTOR]?._id,
              related_tags: [],
              meta_fields: {
                country: "dz",
                state: state.code,
                city: city.code,
                experience_years: faker.number.int({ min: 0, max: 30 }),
              },
              attributes: undefined,
              snapshots: undefined,
              insights: undefined,
            };
            await this.articlesService.create(
              {
                data: article,
              },
              {
                current: {
                  user,
                },
              }
            );
          }
        } catch (error) {}
      }
    }
  }
  async fillEscorts() {
    for (const state of faker.helpers.arrayElements(states, 58)) {
      const stateCities = cities.filter(
        (item) => item.state_code === state.code
      );
      for (const index of new Array(faker.number.int({ min: 1, max: 3 })).fill(
        null
      )) {
        try {
          const city = faker.helpers.arrayElement(stateCities);
          const data: RegisterPayload = {
            email: faker.internet.email(),
            password: "123",
            first_name: faker.person.firstName(),
            family_name: faker.person.lastName(),
            phones: [],
            account_type: ArticleTypeSlug.ESCORT,
            address: {
              country_code: "dz",
              country_name: "الجزائر",
              state_code: state.code,
              state_name: state.name,
              city_code: city.code,
              city_name: city.name,
              street_address: faker.location.streetAddress(),
            },
            website: faker.internet.url(),
            sex: faker.helpers.arrayElement(["male", "female"]),
          };

          const {
            data: { user },
          } = await this.authService.register({
            data,
          });

          if (user) {
            const article: Article = {
              title: buildUserFullName(user.profile),
              body: this.loremHtml,
              body_unformatted: "",
              body_structured: {},
              is_published: true,
              published_at: new Date(),
              is_featured: false,
              featured_image: null,
              article_type: this.types[ArticleTypeSlug.ESCORT]?._id,
              related_tags: [],
              meta_fields: {
                country: "dz",
                state: state.code,
                city: city.code,
                experience_years: faker.number.int({ min: 0, max: 30 }),
              },
              attributes: undefined,
              snapshots: undefined,
              insights: undefined,
            };
            await this.articlesService.create(
              {
                data: article,
              },
              {
                current: {
                  user,
                },
              }
            );
          }
        } catch (error) {}
      }
    }
  }
  async fillAgencies() {
    for (const state of faker.helpers.arrayElements(states, 58)) {
      const stateCities = cities.filter(
        (item) => item.state_code === state.code
      );
      for (const index of new Array(faker.number.int({ min: 1, max: 10 })).fill(
        null
      )) {
        try {
          const city = faker.helpers.arrayElement(stateCities);
          const data: RegisterPayload = {
            email: faker.internet.email(),
            password: "123",
            first_name: faker.person.firstName(),
            family_name: faker.person.lastName(),
            phones: [],
            account_type: ArticleTypeSlug.AGENCY,
            address: {
              country_code: "dz",
              country_name: "الجزائر",
              state_code: state.code,
              state_name: state.name,
              city_code: city.code,
              city_name: city.name,
              street_address: faker.location.streetAddress(),
            },
            website: faker.internet.url(),
            sex: faker.helpers.arrayElement(["male", "female"]),
          };

          const {
            data: { user },
          } = await this.authService.register({
            data,
          });

          if (user) {
            const article: Article = {
              title: `وكالة ${user.profile.family_name} للسياحة والاسفار`,
              body: this.loremHtml,
              body_unformatted: "",
              body_structured: {},
              is_published: true,
              published_at: new Date(),
              is_featured: false,
              featured_image: null,
              article_type: this.types[ArticleTypeSlug.AGENCY]?._id,
              related_tags: [],
              meta_fields: {
                country: "dz",
                state: state.code,
                city: city.code,
              },
              attributes: undefined,
              snapshots: undefined,
              insights: undefined,
            };
            await this.articlesService.create(
              {
                data: article,
              },
              {
                current: {
                  user,
                },
              }
            );
          }
        } catch (error) {}
      }
    }
  }

  async fillAiroports() {
    const {
      data: [user],
    } = await this.usersService.list(
      {
        count: 1,
        filters: {
          role: "admin",
        },
      },
      this.internalAuthData
    );
    if (user) {
      const dzCount = await this.articleModel.countDocuments({
        "meta_fields.country": "dz",
        article_type: this.types[ArticleTypeSlug.AIROPORT]?._id,
      });

      if (!dzCount)
        for (const state of faker.helpers.arrayElements(states, 40)) {
          const stateCities = cities.filter(
            (item) => item.state_code === state.code
          );
          for (const index of new Array(
            faker.number.int({ min: 1, max: 1 })
          ).fill(null)) {
            try {
              const city = faker.helpers.arrayElement(stateCities);
              const article: Article = {
                title: `مطار ${state.name}`,
                body: this.loremHtml,
                body_unformatted: "",
                body_structured: {},
                is_published: true,
                published_at: new Date(),
                is_featured: false,
                featured_image: null,
                article_type: this.types[ArticleTypeSlug.AIROPORT]?._id,
                related_tags: [],
                meta_fields: {
                  country: "dz",
                  state: state.code,
                  city: city.code,
                },
                attributes: undefined,
                snapshots: undefined,
                insights: undefined,
              };
              await this.articlesService.create(
                { data: article },
                { current: { user } }
              );
            } catch (error) {}
          }
        }

      const ksaCount = await this.articleModel.countDocuments({
        "meta_fields.country": "ksa",
        article_type: this.types[ArticleTypeSlug.AIROPORT]?._id,
      });
      if (!ksaCount)
        for (const city of faker.helpers.arrayElements(ksa_cities, 20)) {
          const article: Article = {
            title: `مطار ${city.name}`,
            body: this.loremHtml,
            body_unformatted: "",
            body_structured: {},
            is_published: true,
            published_at: new Date(),
            is_featured: false,
            featured_image: null,
            article_type: this.types[ArticleTypeSlug.AIROPORT]?._id,
            related_tags: [],
            meta_fields: {
              country: "ksa",
              ksa_city: city.code,
            },
            attributes: undefined,
            snapshots: undefined,
            insights: undefined,
          };
          await this.articlesService.create(
            { data: article },
            { current: { user } }
          );
        }
    }
  }

  async fillAirlines() {
    const {
      data: [user],
    } = await this.usersService.list(
      {
        count: 1,
        filters: {
          role: "admin",
        },
      },
      this.internalAuthData
    );
    if (user) {
      for (const state of faker.helpers.arrayElements(states, 40)) {
        const stateCities = cities.filter(
          (item) => item.state_code === state.code
        );
        for (const index of new Array(
          faker.number.int({ min: 1, max: 1 })
        ).fill(null)) {
          try {
            const city = faker.helpers.arrayElement(stateCities);
            const article: Article = {
              title: faker.company.buzzPhrase(),
              body: this.loremHtml,
              body_unformatted: "",
              body_structured: {},
              is_published: true,
              published_at: new Date(),
              is_featured: false,
              featured_image: null,
              article_type: this.types[ArticleTypeSlug.AIRELINES_COMPANY]?._id,
              related_tags: [],
              meta_fields: {
                country: "dz",
                state: state.code,
                city: city.code,
              },
              attributes: undefined,
              snapshots: undefined,
              insights: undefined,
            };
            await this.articlesService.create(
              { data: article },
              { current: { user } }
            );
          } catch (error) {}
        }
      }
    }
  }

  async fillShrines() {
    const shrines = [
      {
        name: "المسجد الحرام",
        makkah_medina: "mekkah",
        description:
          "<p>المسجد الحرام هو أكبر وأقدس مسجد في الإسلام، ويقع في قلب مكة المكرمة. يحيط المسجد بالكعبة، وهو أول بيت وضع للناس على الأرض لعبادة الله. المسجد الحرام يشهد تجمع ملايين المسلمين سنويًا لأداء الحج والعمرة، ويحتوي على عدة مواقع مقدسة مثل <strong>الكعبة</strong>، <strong>مقام إبراهيم</strong>، و <strong>الحجر الأسود</strong>.</p>",
      },
      {
        name: "الكعبة",
        makkah_medina: "mekkah",
        description:
          "<p>الكعبة هي هيكل مكعب الشكل يقع في وسط المسجد الحرام، ويعتبر قبلة المسلمين في صلاتهم. يعتقد أن إبراهيم وابنه إسماعيل هما من رفعا قواعد الكعبة. تحتوي الكعبة على <strong>الحجر الأسود</strong>، وهو حجر مبارك يمسحه المسلمون عند الطواف إن استطاعوا. يعتبر الطواف حول الكعبة سبعة أشواط من أهم مناسك الحج والعمرة.</p>",
      },
      {
        name: "مقام إبراهيم",
        makkah_medina: "mekkah",
        description:
          "<p>مقام إبراهيم هو حجر أثري يقع بالقرب من الكعبة في المسجد الحرام، يُعتقد أن إبراهيم عليه السلام وقف عليه أثناء بناء الكعبة. يحتوي الحجر على أثر قدمي النبي إبراهيم. يصلي المسلمون ركعتين خلف المقام بعد الطواف حول الكعبة، اقتداءً بسنة النبي محمد صلى الله عليه وسلم.</p>",
      },
      {
        name: "الحجر الأسود",
        makkah_medina: "mekkah",
        description:
          "<p>الحجر الأسود هو حجر يقع في أحد أركان الكعبة، ويعتبر من أقدس الأحجار في الإسلام. يعتقد المسلمون أنه نزل من الجنة، وهو يلمس أو يُقبل عند الطواف حول الكعبة إن أمكن. يعد الحجر الأسود بداية الطواف ونهايته، ويُعتبر رمزًا للوحدة بين المسلمين.</p>",
      },
      {
        name: "الصفا والمروة",
        makkah_medina: "mekkah",
        description:
          "<p>الصفا والمروة هما جبلان صغيران يقعان بالقرب من الكعبة. يُعد السعي بينهما جزءًا من مناسك الحج والعمرة، وهو تذكار لسعي السيدة هاجر بحثًا عن الماء لابنها إسماعيل. يقوم المسلمون بالسعي سبعة أشواط بين الجبلين كرمز للتوكل على الله وتلبية احتياجاتهم.</p>",
      },
      {
        name: "بئر زمزم",
        makkah_medina: "mekkah",
        description:
          "<p>بئر زمزم هو بئر مقدس يقع في المسجد الحرام، يُعتقد أنه تفجر بفضل الله كمعجزة لتوفير الماء للسيدة هاجر وابنها إسماعيل. يُعتبر ماء زمزم مقدسًا ويشربه الحجاج والمعتمرون بنية التبرك وطلب الشفاء. يُذكر أن ماء زمزم لا ينضب رغم توافد الملايين من المسلمين عليه على مر العصور.</p>",
      },
      {
        name: "جبل عرفات",
        makkah_medina: "mekkah",
        description:
          "<p>جبل عرفات هو موقع مقدس يقع خارج حدود مكة، حيث يقف الحجاج في التاسع من ذي الحجة من كل عام للدعاء والتضرع إلى الله. يُعتبر الوقوف بعرفات من أعظم أركان الحج، ويقال إنه المكان الذي التقى فيه آدم وحواء بعد نزولهما إلى الأرض. يشهد يوم عرفة تجمعًا مهيبًا للمسلمين من كل أنحاء العالم للدعاء والاستغفار.</p>",
      },
      {
        name: "منى",
        makkah_medina: "mekkah",
        description:
          "<p>منى هي منطقة تقع بالقرب من مكة المكرمة، ويقضي فيها الحجاج معظم أيام الحج. تشتهر بوجود الجمرات، حيث يقوم الحجاج برمي الجمرات كرمز لرجم الشيطان. وتعد هذه المنطقة من أهم محطات مناسك الحج، ويؤدي فيها الحجاج عدة مناسك مثل <strong>المبيت في منى</strong> ورمي الجمرات خلال أيام التشريق.</p>",
      },
      {
        name: "المسجد النبوي",
        makkah_medina: "medina",
        description:
          "<p>المسجد النبوي هو ثاني أقدس مسجد في الإسلام، ويقع في المدينة المنورة. أسسه النبي محمد صلى الله عليه وسلم، ويحتوي على قبره وقبري صاحبيه أبي بكر الصديق وعمر بن الخطاب. يتميز المسجد النبوي بمكانة عظيمة لدى المسلمين، ويقصدونه للصلاة والتبرك بزيارة الروضة الشريفة التي يُقال إنها روضة من رياض الجنة.</p>",
      },
      {
        name: "الروضة الشريفة",
        makkah_medina: "medina",
        description:
          "<p>الروضة الشريفة هي مساحة محددة داخل المسجد النبوي بين منبر النبي وقبره، ويعتبرها المسلمون جزءًا من الجنة. تعد زيارة الروضة الشريفة من الأعمال المحببة، حيث يجلس المسلمون فيها للدعاء والصلاة، ويعتقدون أنها مكان مبارك ذو فضل عظيم.</p>",
      },
      {
        name: "قبر النبي محمد",
        makkah_medina: "medina",
        description:
          "<p>قبر النبي محمد صلى الله عليه وسلم يقع في الحجرة الشريفة داخل المسجد النبوي. يُعد زيارة قبر النبي من الأعمال التي يقوم بها المسلمون أثناء زيارتهم للمدينة المنورة، ويعتبرونه مكانًا مباركًا يذكرهم بسيرة النبي وأخلاقه. يُدفن بجانب النبي كل من أبي بكر الصديق وعمر بن الخطاب رضي الله عنهما.</p>",
      },
    ];

    const {
      data: [user],
    } = await this.usersService.list(
      {
        count: 1,
        filters: {
          role: "admin",
        },
      },
      this.internalAuthData
    );

    const count = await this.articleModel.countDocuments({
      article_type: this.types[ArticleTypeSlug.SHRINE]?._id,
    });
    if (!count)
      for (const shrine of shrines) {
        if (user) {
          const article: Article = {
            title: shrine.name,
            body: shrine.description,
            body_unformatted: "",
            body_structured: {},
            is_published: true,
            published_at: new Date(),
            is_featured: false,
            featured_image: null,
            article_type: this.types[ArticleTypeSlug.SHRINE]?._id,
            related_tags: [],
            meta_fields: {
              country: "ksa",
              medina_mekkah: shrine.makkah_medina,
            },
            attributes: undefined,
            snapshots: undefined,
            insights: undefined,
          };
          await this.articlesService.create(
            { data: article },
            { current: { user } }
          );
        }
      }
  }
  async fillHotels() {
    const {
      data: [user],
    } = await this.usersService.list(
      {
        count: 1,
        filters: {
          role: "admin",
        },
      },
      this.internalAuthData
    );

    if (user) {
      const count = await this.articleModel.countDocuments({
        article_type: this.types[ArticleTypeSlug.HOTEL]?._id,
      });
      if (!count)
        for (let index = 0; index < 20; index++) {
          const article: Article = {
            title: faker.company.buzzPhrase(),
            body: this.loremHtml,
            body_unformatted: "",
            body_structured: {},
            is_published: true,
            published_at: new Date(),
            is_featured: false,
            featured_image: null,
            article_type: this.types[ArticleTypeSlug.HOTEL]?._id,
            related_tags: [],
            meta_fields: {
              country: "ksa",
              medina_mekkah: faker.helpers.arrayElement(["mekkah", "medina"]),
              distance_to_haram: faker.number.int({ min: 0, max: 100 }),
              hotel_rating: faker.number.int({ min: 1, max: 5 }),
            },
            attributes: undefined,
            snapshots: undefined,
            insights: undefined,
          };
          await this.articlesService.create(
            { data: article },
            { current: { user } }
          );
        }
    }
  }

  async fillTrips() {
    const {
      data: [user],
    } = await this.usersService.list(
      {
        count: 1,
        filters: {
          role: "admin",
        },
      },
      this.internalAuthData
    );

    const type = this.types[ArticleTypeSlug.AGENCY];
    this.logger.tree("type", type);
    const { data: agencies } = await this.articlesService.list(
      {
        count: 200,
        filters: { article_type: this.types[ArticleTypeSlug.AGENCY]?._id },
      },
      this.internalAuthData
    );
    // return;

    if (user) {
      const { data: hotels } = await this.articlesService.list(
        {
          count: 200,
          filters: { article_type: this.types[ArticleTypeSlug.HOTEL]?._id },
        },
        this.internalAuthData
      );

      const { data: ksaAiroports } = await this.articlesService.list(
        {
          count: 200,
          filters: {
            article_type: this.types[ArticleTypeSlug.AIROPORT]?._id,
            "meta_fields.country": "ksa",
          },
        },
        this.internalAuthData
      );

      const { data: dzAiroports } = await this.articlesService.list(
        {
          count: 200,
          filters: {
            article_type: this.types[ArticleTypeSlug.AIROPORT]?._id,
            "meta_fields.country": "dz",
          },
        },
        this.internalAuthData
      );

      const { data: airlinesCompanies } = await this.articlesService.list(
        {
          count: 200,
          filters: {
            article_type: this.types[ArticleTypeSlug.AIRELINES_COMPANY]?._id,
          },
        },
        this.internalAuthData
      );

      const { data: shrines } = await this.articlesService.list(
        {
          count: 200,
          filters: { article_type: this.types[ArticleTypeSlug.SHRINE]?._id },
        },
        this.internalAuthData
      );

      const trip_durations = (
        this.types[ArticleTypeSlug.OMRAH]?.custom_meta_fields.find(
          (f) => f.field_key === "trip_duration"
        ) as CustomField<"select">
      )?.field_options.choices.map((c) => c.value);
      const trip_types = (
        this.types[ArticleTypeSlug.OMRAH]?.custom_meta_fields.find(
          (f) => f.field_key === "trip_type"
        ) as CustomField<"select">
      )?.field_options.choices.map((c) => c.value);
      const subsistence_at_mekkah = (
        this.types[ArticleTypeSlug.OMRAH]?.custom_meta_fields.find(
          (f) => f.field_key === "subsistence_at_mekkah"
        ) as CustomField<"select">
      )?.field_options.choices.map((c) => c.value);
      const subsistence_at_medina = (
        this.types[ArticleTypeSlug.OMRAH]?.custom_meta_fields.find(
          (f) => f.field_key === "subsistence_at_medina"
        ) as CustomField<"select">
      )?.field_options.choices.map((c) => c.value);
      const medina_mekkah = (
        this.types[ArticleTypeSlug.OMRAH]?.custom_meta_fields.find(
          (f) => f.field_key === "medina_mekkah"
        ) as CustomField<"select">
      )?.field_options.choices.map((c) => c.value) || ["medina", "mekkah"];
      const algerianArabicMonths = {
        1: "جانفي", // January
        2: "فيفري", // February
        3: "مارس", // March
        4: "أفريل", // April
        5: "ماي", // May
        6: "جوان", // June
        7: "جويلية", // July
        8: "أوت", // August
        9: "سبتمبر", // September
        10: "أكتوبر", // October
        11: "نوفمبر", // November
        12: "ديسمبر", // December
      };

      for (let index = 0; index < 500; index++) {
        const agency = faker.helpers.arrayElement(agencies);
        const { data: owner } = await this.usersService.getById(
          agency.created_by,
          this.internalAuthData
        );
        const month = faker.number.int({ min: 1, max: 12 });
        if (owner) {
          const article: Article = {
            title: `عرض عمرة في شهر ${algerianArabicMonths[month]}`,
            body: this.loremHtml,
            body_unformatted: "",
            body_structured: {},
            is_published: true,
            published_at: new Date(),
            is_featured: false,
            featured_image: null,
            article_type: this.types[ArticleTypeSlug.OMRAH]._id,
            related_tags: [],
            meta_fields: {
              agency: agency._id,
              trip_duration: faker.helpers.arrayElement(trip_durations),
              flight_number: faker.finance.iban(),
              price: faker.number.int({ min: 10, max: 60 }) * 10_000,
              ramdhan_trip: month === 2,
              airelines_company:
                faker.helpers.arrayElement(airlinesCompanies)?._id,
              departure_airoport: faker.helpers.arrayElement(dzAiroports)?._id,
              arrival_airoport: faker.helpers.arrayElement(ksaAiroports)?._id,
              mekkah_hotel: faker.helpers.arrayElement(hotels)?._id,
              medina_hotel: faker.helpers.arrayElement(hotels)?._id,
              shrines_at_mekkah: faker.helpers
                .arrayElements(
                  shrines.filter(
                    (i) => i.meta_fields["medina_mekkah"] === "mekkah"
                  ),
                  { min: 1, max: 5 }
                )
                ?.map((i) => i._id),
              shrines_at_medina: faker.helpers
                .arrayElements(
                  shrines.filter(
                    (i) => i.meta_fields["medina_mekkah"] === "medina"
                  ),
                  { min: 1, max: 5 }
                )
                ?.map((i) => i._id),
              flight_time: `${addLeadingZeros(faker.number.int({ min: 0, max: 23 }), 2)}:00`,
              flight_date: moment(faker.date.future({ years: 1 })).set(
                "month",
                month - 1
              ),
              entry_point: faker.helpers.arrayElement(medina_mekkah),
              trip_type: faker.helpers.arrayElement(trip_types),
              subsistence_at_medina: faker.helpers.arrayElements(
                subsistence_at_medina,
                { min: 0, max: subsistence_at_medina.length }
              ),
              subsistence_at_mekkah: faker.helpers.arrayElements(
                subsistence_at_mekkah,
                { min: 0, max: subsistence_at_mekkah.length }
              ),
            },
            attributes: undefined,
            snapshots: undefined,
            insights: undefined,
          };

          await this.articlesService.create(
            { data: article },
            { current: { user: owner } }
          );
        }
      }
    }
  }
  async setAgenciesLogo() {
    await this.articleModel.updateMany(
      {
        article_type: this.types[ArticleTypeSlug.AGENCY]._id,
      },
      {
        $set: {
          "meta_fields.logo": {
            id: "67359090d7e49753b7d64325",
            url: "",
          },
        },
      }
    );
  }
}
