import BaseServiceContainer from '../../base.service-container';

/**
 * @description Typing aliasing
 */
import SDK = Levelup.CMS.V1.SDK;
import TaxonomiesClient from './clients/taxonomies.client';
import ArticleTypesClient from './clients/article-types.client';
import ArticlesClient from './clients/articles.client';
import CommentsClient from './clients/comments.client';
import ReviewsClient from './clients/reviews.client';
import TermsClient from './clients/terms.client';
import TranslationItemsClient from './clients/translation.items.client';
import TranslationNamespacesClient from './clients/translation.namespaces.client';
import TranslationProjectsClient from './clients/translation.projects.client';
import FormsClient from './clients/forms.client';
import FormEntriesClient from './clients/form-entries.client';
type TClientName =
  'articles' |
  'articleTypes' |
  'taxonomies' |
  'terms' |
  'comments' |
  'reviews' |
  'translationItems' |
  'translationNamespaces' |
  'translationProjects' |
  'forms' |
  'formEntries' |
  '';
  

export default class CmServiceContainer extends BaseServiceContainer<TClientName> {

  constructor(sdk: SDK.ISdk) {
    super(sdk, '/api/v1/content');
  }

  get articles() {
    if (!this.clients.articles) this.clients.articles = new ArticlesClient(this);
    return this.clients.articles as ArticlesClient;
  }

  get articleTypes() {
    if (!this.clients.articleTypes) this.clients.articleTypes = new ArticleTypesClient(this);
    return this.clients.articleTypes as ArticleTypesClient;
  }

  get taxonomies() {
    if (!this.clients.taxonomies) this.clients.taxonomies = new TaxonomiesClient(this);
    return this.clients.taxonomies as TaxonomiesClient;
  }

  get terms() {
    if (!this.clients.terms) this.clients.terms = new TermsClient(this);
    return this.clients.terms as TermsClient;
  }

  get comments() {
    if (!this.clients.comments) this.clients.comments = new CommentsClient(this);
    return this.clients.comments as CommentsClient;
  }

  get reviews() {
    if (!this.clients.reviews) this.clients.reviews = new ReviewsClient(this);
    return this.clients.reviews as ReviewsClient;
  }

  get translationItems() {
    if (!this.clients.translationItems) this.clients.translationItems = new TranslationItemsClient(this);
    return this.clients.translationItems as TranslationItemsClient;
  }

  get translationNamespaces() {
    if (!this.clients.translationNamespaces) this.clients.translationNamespaces = new TranslationNamespacesClient(this);
    return this.clients.translationNamespaces as TranslationNamespacesClient;
  }

  get translationProjects() {
    if (!this.clients.translationProjects) this.clients.translationProjects = new TranslationProjectsClient(this);
    return this.clients.translationProjects as TranslationProjectsClient;
  }

  get forms() {
    if (!this.clients.forms) this.clients.forms = new FormsClient(this);
    return this.clients.forms as FormsClient;
  }

  get formEntries() {
    if (!this.clients.formEntries) this.clients.formEntries = new FormEntriesClient(this);
    return this.clients.formEntries as FormEntriesClient;
  }
  






}
