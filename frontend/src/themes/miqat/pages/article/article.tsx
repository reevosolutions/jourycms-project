import * as React from "react";
import DefaultLayout from "../../layouts/default.layout";

import initLogger, {LoggerContext} from "@/lib/logging";
import {ArticleTypeSlug} from "../../config";
import DefaultArticlePage from "./article.default";
import OmrahArticlePage from "./article.omrah";
import ContentSection_Server from "../../components/content.section.server";

const logger = initLogger(LoggerContext.COMPONENT, "Article");

type ApiAlias = Levelup.CMS.V1.Content.Api.Articles.GetOne.Response;
type Article = Levelup.CMS.V1.Content.Entity.Article;

export type PageProps = JouryCMS.Theme.PageProps & {
  initialData?: ApiAlias;
  articleType?: Levelup.CMS.V1.Content.Entity.ArticleType | null;
  relatedArticles?: Levelup.CMS.V1.Content.Entity.Article[];
};

const ArticlePage: React.FC<PageProps> = ({
  route,
  initialData,
  relatedArticles,
}) => {
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
          <div className="d">
            <OmrahArticlePage {...{route, initialData}} />

            {relatedArticles?.length ? (
              <div className=" pb-12">
                <h2 className="mb-4 mt-8 text-3xl font-bold text-center">
                  {"عروض ذات صلة"}
                </h2>
                <div className="container mx-auto px-4 md:px-8">
                  <ContentSection_Server
                    {...{
                      showPagination: false,
                      count: 12,
                      page: 1,
                      data: {
                        data: relatedArticles,
                        
                      },
                      articleType,
                      isOffer: true,
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>
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
