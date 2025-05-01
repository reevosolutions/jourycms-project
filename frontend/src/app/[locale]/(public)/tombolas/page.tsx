/* eslint-disable unicorn/no-useless-undefined */
import { publicRoutes } from "@/config";
import initLogger, { LoggerContext } from "@/lib/logging";
import { ArticleTypeSlug } from "@/themes/miqat/config";
import { getArticleTypeBySlug, listArticles } from "@/themes/miqat/data";
import ThemePage_Server from "@/themes/miqat/pages/omrah/page.server";


const ROUTE = publicRoutes.homepage._.tombolas;
const ARTICLE_TYPE_SLUG: ArticleTypeSlug = ArticleTypeSlug.TOMBOLA;

const logger = initLogger(LoggerContext.PAGE, ROUTE.path);

const COUNT = 12;

export const revalidate = 60;


export type PageProps = {
  params: Promise<{ page: string | number }>
}
export default async function Page({ params }: PageProps) {

  let { page } = await params
  page = Number.parseInt(`${page || '1'}`)
  /* -------------------------------------------------------------------------- */
  /*                                    QUERY                                   */
  /* -------------------------------------------------------------------------- */
  let articleType: Levelup.CMS.V1.Content.Api.ArticleTypes.GetOne.Response['data'] | undefined = undefined;
  let data: Levelup.CMS.V1.Content.Api.Articles.List.Response | undefined = undefined;
  try {
    const articleTypeData = await getArticleTypeBySlug(ARTICLE_TYPE_SLUG);
    articleType = articleTypeData?.data;
    data = await listArticles({
      page: page,
      count: COUNT,
      filters: {
        article_type: ARTICLE_TYPE_SLUG
      }
    });
  } catch (error: any) {
    // do nothing  
    data = {
      error: {
        message: error.message,
        name: error.name,
        status: error.status || 500,
      }
    }
  }

  logger.value('data', { articleType, data, pathPattern: ROUTE._.paged.path, });

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return <ThemePage_Server {...{
    route: ROUTE,
    count: COUNT,
    page: page as number,
    showPagination: true,
    pathPattern: ROUTE._.paged.path,
    articleType: articleType as Levelup.CMS.V1.Utils.NonUndefined<Levelup.CMS.V1.Content.Api.ArticleTypes.GetOne.Response['data']>,
    data,
    error: data?.error,
  }} />;
  // return <div className="d">
  //   {data?.title}
  //   <div className="d">{article_slug}</div>
  // </div>;
}
