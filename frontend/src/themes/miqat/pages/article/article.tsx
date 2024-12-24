import * as React from "react";
import DefaultLayout from "../../layouts/default.layout";

import initLogger, { LoggerContext } from "@/lib/logging";
import { ArticleTypeSlug } from "../../config";
import DefaultArticlePage from "./article.default";
import OmrahArticlePage from "./article.omrah";

const logger = initLogger(LoggerContext.COMPONENT, "Article");

type ApiAlias = Levelup.CMS.V1.Content.Api.Articles.GetOne.Response;
type Article = Levelup.CMS.V1.Content.Entity.Article;

export type PageProps = JouryCMS.Theme.PageProps & {
  initialData?: ApiAlias;
  articleType?: Levelup.CMS.V1.Content.Entity.ArticleType | null;
};

const ArticlePage: React.FC<PageProps> = ({route, initialData}) => {
  const article = initialData?.data;
  const articleType = article?.article_type
    ? initialData?.edge?.article_types?.[article.article_type]
    : undefined;
  

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <DefaultLayout route={route}>
      <div className="container mx-auto px-4 md:px-8">
        {articleType?.slug === ArticleTypeSlug.OMRAH ||
        articleType?.slug === ArticleTypeSlug.HAJJ ? (
          <OmrahArticlePage {...{route, initialData}} />
        ) : articleType?.slug === ArticleTypeSlug.AGENCY ? (
          // <AgencyArticlePage {...{route, initialData}} />
          <DefaultArticlePage {...{route, initialData}} />
        ) : (
          <DefaultArticlePage {...{route, initialData}} />
        )}
      </div>
    </DefaultLayout>
  );
};

export default ArticlePage;
