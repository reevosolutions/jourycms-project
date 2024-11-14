/* eslint-disable unicorn/no-useless-undefined */
import { publicRoutes } from "@/config";
import { getArticleBySlug, listArticles } from "@/themes/miqat/data";
import ArticlePage from "@/themes/miqat/pages/article/omrah.index";
import Image from "next/image";
import { toast } from "sonner";

const ROUTE = publicRoutes.homepage;

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const data = await listArticles({
    count: 100,
    fields: ['slug'],
  })
  return (data?.data || []).map((post) => ({
    article_slug: String(post.slug),
  }))
}

export type PageProps = {
  params: Promise<{ article_slug: string }>
}
export default async function Page({ params }: PageProps) {

  const { article_slug } = await params
  /* -------------------------------------------------------------------------- */
  /*                                    QUERY                                   */
  /* -------------------------------------------------------------------------- */
  let data: Levelup.CMS.V1.Content.Api.Articles.GetOne.Response | undefined = undefined;
  try {
    data = await getArticleBySlug(article_slug);
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

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return <ArticlePage {...{ route: ROUTE }} initialData={data} />;
  // return <div className="d">
  //   {data?.title}
  //   <div className="d">{article_slug}</div>
  // </div>;
}
