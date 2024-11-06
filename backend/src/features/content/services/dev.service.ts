/**
 * @description This file is used as a dev service.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26 July 2000
 * @since 29-04-2024 10:50:30
 */

import { Inject, Service } from 'typedi';
import { ObjectUpdatedProperties } from '../../../utilities/objects';
import BaseService from '../../../common/base.service';
import Container from 'typedi';
import events from '../../../config/events.config';
import { faker } from '@faker-js/faker';
import { EventDispatcher } from '../../../decorators/eventDispatcher.decorator';
import * as cheerio from 'cheerio';
import path from 'path';
import fs from 'fs';
import downloadRemoteFile from '../../../utilities/remote/download-remote-file';
/**
 * @description
 */
@Service()
export default class DevService extends BaseService {
  public constructor(
    @Inject('translationItemModel') private translationItemModel: Levelup.CMS.V1.Content.Translation.Model.Item,
    @Inject('translationNamespaceModel') private translationNamespaceModel: Levelup.CMS.V1.Content.Translation.Model.Namespace,
    @Inject('translationProjectModel') private translationProjectModel: Levelup.CMS.V1.Content.Translation.Model.Project,

    @EventDispatcher() private eventDispatcher: EventDispatcher
  ) {
    super();
  }

  public testUpdateComparison() {
    const oldObject = {
      name: 'John',
      age: 30,
      location: { city: 'New York', country: 'USA' },
      preferences: { theme: 'dark' }
    };

    const newObject = {
      name: 'John',
      age: 31,
      location: { city: 'San Francisco', country: 'USA' },
      preferences: { theme: 'light' }
    };

    const updates = new ObjectUpdatedProperties(oldObject, newObject, ['preferences']);

    this.logger.debug('UPDATEs', updates.asObject);
    this.logger.debug('UPDATEs Array', updates.asArray);
  }

  /**
   * Update :
   * @author dr. Salmi <reevosolutions@gmail.com>
   * @since 16-10-2024 23:40:44
   */
  public async resetTranslationProjects() {
    try {
      this.translationProjectModel.deleteMany({}).exec();
      this.translationNamespaceModel.deleteMany({}).exec();
      this.translationItemModel.deleteMany({}).exec();
    } catch (error) {
      this.logger.error('resetTranslationProjects:ERROR', error);
      
    }
  }

  public async parseTemuCategories() {
    const scenario = this.initScenario(this.logger, this.parseTemuCategories, {});

    try {
      const filePath = path.join(__dirname, '../../../assets/temu-assets/temu-categories.html');
      const jsonFilePath = path.join(__dirname, '../../assets/temu/categories.json');
      const html = fs.readFileSync(filePath, 'utf8');
      const $ = cheerio.load(html);
      type Datum = {
        name: string;
        slug: string;
        url: string;
        subCategories: {
          name: string;
          slug: string;
          url: string;
          image: string;
        }[];
      };
      const categories: Datum[] = [];

      $('.mainContent > div').each((index, element) => {
        const categoryElement = $(element).find(' > h2 > a');
        if (!categoryElement.text()) return;
        const category: Datum = {
          name: categoryElement.text().trim(),
          slug: categoryElement.text().trim().toKebabCase(),
          url: categoryElement.attr('href').trim(),
          subCategories: []
        };

        $(element)
          .find('div.columnLayoutContainer > div > div > div ')
          .each((index, subCategoryElement) => {
            const imgElement = $(subCategoryElement).find(' a > img');
            const subCategory: Datum['subCategories'][number] = {
              name: $(subCategoryElement).find(' h3').text()?.trim(),
              slug: $(subCategoryElement).find(' h3').text()?.trim().toKebabCase(),
              url: $(subCategoryElement).find(' a').attr('href')?.trim(),
              image: (imgElement.attr('src') ?? imgElement.attr('data-src'))?.trim()
            };

            category.subCategories.push(subCategory);
          });

        categories.push(category);
      });

      for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < categories[i].subCategories.length; j++) {
          const subCategory = categories[i].subCategories[j];
          if (subCategory.image) {
            const imagePath = path.join(__dirname, '../../assets/temu/categories-images', `${subCategory.slug}.webp`);
            if (!fs.existsSync(imagePath)) {
              await downloadRemoteFile(subCategory.image, imagePath);
            }
          }
        }
      }

      scenario.set({ filePath, categories });

      fs.writeFileSync(jsonFilePath, JSON.stringify(categories, null, 2));
      //
      scenario.log();
    } catch (error) {
      scenario.error(error);
    }
  }
}
