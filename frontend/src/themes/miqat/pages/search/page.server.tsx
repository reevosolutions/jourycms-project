import * as React from "react";
import { CustomFilterParams } from "../../data";
import DefaultLayout from "../../layouts/default.layout";
import ContentSection_Server from "../../components/content.section.server";


export type PageProps = JouryCMS.Theme.PageProps & {
  showPagination?: boolean;
  pathPattern?: `/${string}/:page`;
  count: number;
  page: number;
  articleType: Levelup.CMS.V1.Content.Entity.ArticleType;
  data?: Levelup.CMS.V1.Content.Api.Articles.List.Response;
  error?: any;
  search: CustomFilterParams;
};

const ThemePage_Server: React.FC<PageProps> = ({
  route,
  showPagination = true,
  pathPattern,
  count = 12,
  page = 1,
  data,
  articleType,
  error,
  search,
}) => {
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <DefaultLayout route={route}>
      <div className="container mx-auto px-4 md:px-8">
        {/* <pre className=" bg-slate-50 p-4 my-6 rounded-xl text-xs" dir="ltr">
          {JSON.stringify(search, null, 2)}
        </pre> */}

        <ContentSection_Server
          {...{
            showPagination,
            pathPattern,
            count,
            page,
            data,
            articleType,
            error,
          }}
        />
      </div>
    </DefaultLayout>
  );
};

export default ThemePage_Server;
