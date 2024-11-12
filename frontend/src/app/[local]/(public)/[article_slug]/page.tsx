import { publicRoutes } from "@/config";
import { getArticleBySlug, listArticles } from "@/themes/miqat/data";
import ArticlePage from "@/themes/miqat/pages/article";
import Image from "next/image";

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
  const data = await getArticleBySlug(article_slug);
  
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return <ArticlePage {...{ route: ROUTE }} initialData={data} />;
  // return <div className="d">
  //   {data?.title}
  //   <div className="d">{article_slug}</div>
  // </div>;
}
