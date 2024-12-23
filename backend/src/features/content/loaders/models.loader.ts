
/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-03-09 05:33:01
 */


// import the service-specific models
import { ArticleType } from '../models/article-type.model';
import { Article } from '../models/article.model';
import { Comment } from '../models/comment.model';
import { Review } from '../models/review.model';
import { Term } from '../models/term.model';
import { Taxonomy } from '../models/taxonomy.model';
import { TranslationItem } from '../models/translation.item.model';
import { TranslationNamespace } from '../models/translation.namespace.model';
import { TranslationProject } from '../models/translation.project.model';
import { Form } from '../models/form.model';
import { FormEntry } from '../models/form-entry.model';

/**
 * Load the service models.
 *
 * @returns A dictionary of service models.
 */
const getServiceModels: () => { [name: string]: any } = () => {
	return {
    /**
     * The content feature models.
     */
    articleTypeModel: ArticleType,
    articleModel: Article,
    commentModel: Comment,
    reviewModel: Review,
    termModel: Term,
    taxonomyModel: Taxonomy,
    translationItemModel: TranslationItem,
    translationNamespaceModel: TranslationNamespace,
    translationProjectModel: TranslationProject,
    FormModel: Form,
    FormEntryModel: FormEntry,
  };
}

export default getServiceModels;
