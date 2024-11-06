
/**
 * @description This file is used as a controller.
 * @generator Levelup
 * @author dr. Salmi <reevosolutions@gmail.com>
 * @since 2024-03-09 05:33:01
 */


// import the service-specific models
import { ArticleType } from '../features/content/models/article-type.model';
import { Article } from '../features/content/models/article.model';
import { Comment } from '../features/content/models/comment.model';
import { Review } from '../features/content/models/review.model';
import { Term } from '../features/content/models/term.model';
import { Taxonomy } from '../features/content/models/taxonomy.model';
import { TranslationItem } from '../features/content/models/translation.item.model';
import { TranslationNamespace } from '../features/content/models/translation.namespace.model';
import { TranslationProject } from '../features/content/models/translation.project.model';

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

	}
}

export default getServiceModels;
