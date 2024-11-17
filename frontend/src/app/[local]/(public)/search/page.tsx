/* eslint-disable unicorn/no-useless-undefined */
import {publicRoutes} from "@/config";
import initLogger, {LoggerContext} from "@/lib/logging";
import {ArticleTypeSlug} from "@/themes/miqat/config";
import {
  getArticleTypeBySlug,
  listArticles,
  CustomFilterParams,
  searchWithFilter,
} from "@/themes/miqat/data";
import ThemePage_Server from "@/themes/miqat/pages/search/page.server";
import qs from "querystringify";

const ROUTE = publicRoutes.homepage._.search;
const ARTICLE_TYPE_SLUG: ArticleTypeSlug = ArticleTypeSlug.JOB_OFFER;

const logger = initLogger(LoggerContext.PAGE, ROUTE.path);

const COUNT = 12;

export const revalidate = 60;

export type PageProps = {
  params: Promise<{}>;
  searchParams: Promise<{[key: string]: string | string[] | undefined}>;
};
export default async function Page({params, searchParams}: PageProps) {
  const search: CustomFilterParams =
    (await searchParams) as unknown as CustomFilterParams;

  const type: `${ArticleTypeSlug}` = [
    "omrah",
    "blog",
    "shrine",
    "airelines-company",
    "hotel",
    "airoport",
    "gift",
    "agency",
    "doctor",
    "escort",
    "tombola",
    "job-offer",
    "bid",
    "transportation-service",
    "health-service",
  ].includes(search.t)
    ? search.t
    : "omrah";
  const page = Number.parseInt(`${search.p || "1"}`) || 1;

  /* -------------------------------------------------------------------------- */
  /*                                    QUERY                                   */
  /* -------------------------------------------------------------------------- */
  let articleType:
    | Levelup.CMS.V1.Content.Api.ArticleTypes.GetOne.Response["data"]
    | undefined = undefined;
  let data: Levelup.CMS.V1.Content.Api.Articles.List.Response | undefined =
    undefined;
  try {
    delete search.p;
    for (const k in search) {
      if (search[k as keyof CustomFilterParams] === "")
        delete search[k as keyof CustomFilterParams];
    }
    const articleTypeData = await getArticleTypeBySlug(ARTICLE_TYPE_SLUG);
    articleType = articleTypeData?.data;
    data = await searchWithFilter({
      page: page,
      count: COUNT,
      filters: {
        article_type: ARTICLE_TYPE_SLUG,
      },
      customFilter: {
        ...search,
        t: type,
      },
    });
  } catch (error: any) {
    // do nothing
    data = {
      error: {
        message: error.message,
        name: error.name,
        status: error.status || 500,
      },
    };
  }

  const pathPattern = `/search?${qs.stringify(search)}&p=:page`;

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <ThemePage_Server
      {...{
        route: ROUTE,
        count: COUNT,
        page: page as number,
        showPagination: true,
        pathPattern: pathPattern as any,
        articleType: articleType as Levelup.CMS.V1.Utils.NonUndefined<
          Levelup.CMS.V1.Content.Api.ArticleTypes.GetOne.Response["data"]
        >,
        data,
        error: data?.error,
        search,
      }}
    />
  );
}
