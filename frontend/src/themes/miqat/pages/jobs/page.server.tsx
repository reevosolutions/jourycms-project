import * as React from "react";
import ContentSection_Server from "../../components/content.section.server";
import DefaultLayout from "../../layouts/default.layout";


export type PageProps = JouryCMS.Theme.PageProps & {
  showPagination?: boolean;
  pathPattern?: `/${string}/:page`;
  count: number;
  page: number;
  articleType: Levelup.CMS.V1.Content.Entity.ArticleType;
  data?: Levelup.CMS.V1.Content.Api.Articles.List.Response;
  error?: any;
};

const ThemePage_Server: React.FC<PageProps> = ({ route, showPagination = true,
  pathPattern,
  count = 12,
  page = 1,
  data,
  articleType,
  error, }) => {
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <DefaultLayout route={route}>
      <div className="container mx-auto">
        <ContentSection_Server
          {...{
            showPagination,
            pathPattern,
            count,
            page,
            data,
            articleType,
            error,
          }} />
      </div>
    </DefaultLayout>
  );
};

export default ThemePage_Server;