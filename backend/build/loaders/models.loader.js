"use strict";
/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-03-09 05:33:01
 */
Object.defineProperty(exports, "__esModule", { value: true });
// import the service-specific models
const article_type_model_1 = require("../features/content/models/article-type.model");
const article_model_1 = require("../features/content/models/article.model");
const comment_model_1 = require("../features/content/models/comment.model");
const review_model_1 = require("../features/content/models/review.model");
const term_model_1 = require("../features/content/models/term.model");
const taxonomy_model_1 = require("../features/content/models/taxonomy.model");
const translation_item_model_1 = require("../features/content/models/translation.item.model");
const translation_namespace_model_1 = require("../features/content/models/translation.namespace.model");
const translation_project_model_1 = require("../features/content/models/translation.project.model");
const uploaded_file_model_1 = require("../features/storage/models/uploaded-file.model");
/**
 * Load the service models.
 *
 * @returns A dictionary of service models.
 */
const getServiceModels = () => {
    return {
        /**
         * The content feature models.
         */
        articleTypeModel: article_type_model_1.ArticleType,
        articleModel: article_model_1.Article,
        commentModel: comment_model_1.Comment,
        reviewModel: review_model_1.Review,
        termModel: term_model_1.Term,
        taxonomyModel: taxonomy_model_1.Taxonomy,
        translationItemModel: translation_item_model_1.TranslationItem,
        translationNamespaceModel: translation_namespace_model_1.TranslationNamespace,
        translationProjectModel: translation_project_model_1.TranslationProject,
        uploadedFileModel: uploaded_file_model_1.UploadedFile,
    };
};
exports.default = getServiceModels;
//# sourceMappingURL=models.loader.js.map