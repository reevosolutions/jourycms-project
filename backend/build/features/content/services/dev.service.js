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
const typedi_1 = require("typedi");
const objects_1 = require("../../../utilities/objects");
const base_service_1 = __importDefault(require("../../../common/base.service"));
const eventDispatcher_decorator_1 = require("../../../decorators/eventDispatcher.decorator");
const cheerio = __importStar(require("cheerio"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const download_remote_file_1 = __importDefault(require("../../../utilities/remote/download-remote-file"));
/**
 * @description
 */
let DevService = class DevService extends base_service_1.default {
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
        const updates = new objects_1.ObjectUpdatedProperties(oldObject, newObject, ['preferences']);
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
            const filePath = path_1.default.join(__dirname, '../../../assets/temu-assets/temu-categories.html');
            const jsonFilePath = path_1.default.join(__dirname, '../../assets/temu/categories.json');
            const html = fs_1.default.readFileSync(filePath, 'utf8');
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
                        const imagePath = path_1.default.join(__dirname, '../../assets/temu/categories-images', `${subCategory.slug}.webp`);
                        if (!fs_1.default.existsSync(imagePath)) {
                            await (0, download_remote_file_1.default)(subCategory.image, imagePath);
                        }
                    }
                }
            }
            scenario.set({ filePath, categories });
            fs_1.default.writeFileSync(jsonFilePath, JSON.stringify(categories, null, 2));
            //
            scenario.log();
        }
        catch (error) {
            scenario.error(error);
        }
    }
};
DevService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('translationItemModel')),
    __param(1, (0, typedi_1.Inject)('translationNamespaceModel')),
    __param(2, (0, typedi_1.Inject)('translationProjectModel')),
    __param(3, (0, eventDispatcher_decorator_1.EventDispatcher)()),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], DevService);
exports.default = DevService;
//# sourceMappingURL=dev.service.js.map