/**
 * @description This file is used as a dev service.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 26 July 2000
 * @since 29-04-2024 10:50:30
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
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { Inject, Service } from 'typedi';
import BaseService from '../../../common/base.service';
import { EventDispatcher } from '../../../decorators/eventDispatcher.decorator';
import { ObjectUpdatedProperties } from '../../../utilities/objects';
import downloadRemoteFile from '../../../utilities/remote/download-remote-file';
/**
 * @description
 */
let DevService = class DevService extends BaseService {
    constructor(translationItemModel, translationNamespaceModel, translationProjectModel, eventDispatcher) {
        super();
        this.translationItemModel = translationItemModel;
        this.translationNamespaceModel = translationNamespaceModel;
        this.translationProjectModel = translationProjectModel;
        this.eventDispatcher = eventDispatcher;
    }
    testUpdateComparison() {
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
    async resetTranslationProjects() {
        try {
            this.translationProjectModel.deleteMany({}).exec();
            this.translationNamespaceModel.deleteMany({}).exec();
            this.translationItemModel.deleteMany({}).exec();
        }
        catch (error) {
            this.logger.error('resetTranslationProjects:ERROR', error);
        }
    }
    async parseTemuCategories() {
        const scenario = this.initScenario(this.logger, this.parseTemuCategories, {});
        try {
            const filePath = path.join(__dirname, '../../../assets/temu-assets/temu-categories.html');
            const jsonFilePath = path.join(__dirname, '../../assets/temu/categories.json');
            const html = fs.readFileSync(filePath, 'utf8');
            const $ = cheerio.load(html);
            const categories = [];
            $('.mainContent > div').each((index, element) => {
                const categoryElement = $(element).find(' > h2 > a');
                if (!categoryElement.text())
                    return;
                const category = {
                    name: categoryElement.text().trim(),
                    slug: categoryElement.text().trim().toKebabCase(),
                    url: categoryElement.attr('href').trim(),
                    subCategories: []
                };
                $(element)
                    .find('div.columnLayoutContainer > div > div > div ')
                    .each((index, subCategoryElement) => {
                    var _a, _b, _c, _d, _e;
                    const imgElement = $(subCategoryElement).find(' a > img');
                    const subCategory = {
                        name: (_a = $(subCategoryElement).find(' h3').text()) === null || _a === void 0 ? void 0 : _a.trim(),
                        slug: (_b = $(subCategoryElement).find(' h3').text()) === null || _b === void 0 ? void 0 : _b.trim().toKebabCase(),
                        url: (_c = $(subCategoryElement).find(' a').attr('href')) === null || _c === void 0 ? void 0 : _c.trim(),
                        image: (_e = ((_d = imgElement.attr('src')) !== null && _d !== void 0 ? _d : imgElement.attr('data-src'))) === null || _e === void 0 ? void 0 : _e.trim()
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
        }
        catch (error) {
            scenario.error(error);
        }
    }
};
DevService = __decorate([
    Service(),
    __param(0, Inject('translationItemModel')),
    __param(1, Inject('translationNamespaceModel')),
    __param(2, Inject('translationProjectModel')),
    __param(3, EventDispatcher()),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], DevService);
export default DevService;
//# sourceMappingURL=dev.service.js.map