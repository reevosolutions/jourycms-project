/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26-10-2024 23:24:33
 */

import path from "path";
import Container, { Inject, Service } from "typedi";
import BaseService from "../../../common/base.service";
import { EventDispatcher } from "../../../decorators/eventDispatcher.decorator";
import CacheManager from "../../../managers/cache-manager";
import fs from "fs";
import sharp from "sharp";

const fg = require("fast-glob");


/**
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26-10-2024 23:24:33
 * @description this is used to perform build operations on service level on startup
 */
@Service()
export default class BuilderService extends BaseService {
  public constructor(
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
   * @description entry method
   */
  public async run() {
    const scenario = this.initScenario(this.logger, this.seed);
    try {
      this.seed();
      // this.dev();
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
    } catch (error) {
      scenario.error(error);
    }
  }
  /**
   * @description this is used to test the update comparison
   */
  public async dev() {
    const scenario = this.initScenario(this.logger, this.dev);
    try {

      const paths: string[] = await fg(path.join(__dirname, '../../../../dev/user-photos', '/**/*.jpg'));

      for (const file of paths) {
        this.logger.value("found a bar file:", file.split("/user-photos/")[1]);

        const width = 512;
        const height = 512;
        const filePath = file;
        const extension = 'jpg';
        const output = file.replace("/user-photos/", "/user-photos-cropped/");

        sharp(filePath)
        .resize({ width, height })
        .toFile(output)
        .then(() => {
          this.logger.success("Generated resized image");
            })
            .catch((e) => {
              this.logger.error(e.message, e)
            });
        
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
