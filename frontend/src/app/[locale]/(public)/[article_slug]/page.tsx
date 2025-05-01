/* eslint-disable unicorn/no-await-expression-member */
/* eslint-disable unicorn/prefer-logical-operator-over-ternary */
/* eslint-disable unicorn/no-useless-undefined */
import {publicRoutes} from "@/config";
import {ArticleTypeSlug} from "@/themes/miqat/config";
import {
  getArticleBySlug,
  getArticleTypeById,
  listArticles,
} from "@/themes/miqat/data";
import ArticlePage from "@/themes/miqat/pages/article/article";

const ROUTE = publicRoutes.homepage;

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const data = await listArticles({
      count: 100,
      fields: ["slug"],
    });
    return (data?.data || []).map(post => ({
      article_slug: String(post.slug),
    }));
  } catch {
    return [];
  }
}

export type PageProps = {
  params: Promise<{article_slug: string}>;
};
export default async function Page({params}: PageProps) {
  const {article_slug} = await params;
  /* -------------------------------------------------------------------------- */
  /*                                    QUERY                                   */
  /* -------------------------------------------------------------------------- */
  let data: Levelup.CMS.V1.Content.Api.Articles.GetOne.Response | undefined =
    undefined;
  let articleType:
    | Levelup.CMS.V1.Content.Api.ArticleTypes.GetOne.Response["data"]
    | null
    | undefined = undefined;
  let relatedArticesData:
    | Levelup.CMS.V1.Content.Api.Articles.List.Response
    | undefined = undefined;
  try {
    data = await getArticleBySlug(article_slug);
    if (data?.data?.article_type) {
      articleType = data?.edge?.article_types?.[data?.data?.article_type]
        ? data?.edge?.article_types?.[data?.data?.article_type]
        : (await getArticleTypeById(data?.data?.article_type))?.data;
    }
    if (
      articleType?.slug === ArticleTypeSlug.OMRAH ||
      articleType?.slug === ArticleTypeSlug.HAJJ
    ) {
      relatedArticesData = await listArticles({
        count: 12,
        filters: {
          article_type: articleType._id,
          "meta_fields.agency": data?.data?.meta_fields?.agency,
        },
      });
    }
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

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <ArticlePage
      {...{route: ROUTE}}
      initialData={data}
      relatedArticles={relatedArticesData?.data}
    />
  );
  // return <div className="d">
  //   {data?.title}
  //   <div className="d">{article_slug}</div>
  // </div>;
}
