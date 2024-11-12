import * as React from "react";
import DefaultLayout from "../../layouts/default.layout";


export type PageProps = JouryCMS.Theme.PageProps & {
  initialData?: Levelup.CMS.V1.Content.Api.Articles.GetOne.Response,
  articleType?: Levelup.CMS.V1.Content.Entity.ArticleType | null,
};

const ThemePage: React.FC<PageProps> = ({ route, initialData }) => {

  const article = initialData?.data;
  const articleType = article?.article_type ? initialData?.edge?.article_types?.[article.article_type] : undefined;

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <DefaultLayout route={route}>
      <div className="container mx-auto">
        {article ? (
          <div className="article-page">
            <div className="mb-4"></div>
            <div className="mb-4">
              <h1 className=" text-4xl md:text-5xl  text-gray-800">{article.title}</h1>
            </div>
            <article className="d">
              <div className="d">{articleType?.labels?.singular}</div>
            </article>
          </div>
        ) : null}
      </div>
    </DefaultLayout>
  );
};

export default ThemePage;
