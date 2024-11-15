import config from "@/config";
import { initSdk } from "jourycms-sdk";

export const serverSdk = initSdk(
  "frontend",
  {
    ...config.sdk,
    headersInjector: ()=>({}),
    // refreshTokenHandler: ,
  },
  'server',
);;


export const getArticleTypeBySlug = async (slug: string): Promise<Levelup.CMS.V1.Content.Api.ArticleTypes.GetOne.Response> => {
  const data = await serverSdk.content.articleTypes.getBySlug(slug);
  return data || null
}

export const getArticleBySlug = async (slug: string): Promise<Levelup.CMS.V1.Content.Api.Articles.GetOne.Response> => {
  const data = await serverSdk.content.articles.getBySlug(slug, {});
  return data || null
}

export const listArticles = async (query: Levelup.CMS.V1.Content.Api.Articles.List.Request) => {
  const data = await serverSdk.content.articles.list(query);
  return data
}