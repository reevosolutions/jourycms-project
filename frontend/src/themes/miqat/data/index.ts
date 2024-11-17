import config from "@/config";
import {initSdk} from "jourycms-sdk";
import {ArticleTypeSlug} from "../config";

export const serverSdk = initSdk(
  "frontend",
  {
    ...config.sdk,
    headersInjector: () => ({}),
    // refreshTokenHandler: ,
  },
  "server",
);

export type CustomFilterParams = {
  /**
   * @param article type
   */
  t: `${ArticleTypeSlug}`;
  /**
   * @param state
   */
  w?: string;
  /**
   * @param city
   */
  c?: string;
  /**
   * @param month
   */
  m?: string;
  /**
   * @param duration
   */
  d?: string;
  /**
   * @param services
   */
  s?: string | string[];
  /**
   * @param price min
   */
  pn?: number;
  /**
   * @param price max
   */
  px?: number;
  /**
   * @param experience min
   */
  xn?: number;
  /**
   * @param experience max
   */
  xx?: number;
  /**
   * @param sex
   */
  x?: "male" | "female" | "m" | "f";
  /**
   * @param speciaality
   */
  sp?: string | string[];
  /**
   * @param agency
   */
  a?: string;
  /**
   * @param search text
   */
  q?: string;
  /**
   * @param page
   */
  p?: string;
};

export const getArticleTypeBySlug = async (
  slug: string,
): Promise<Levelup.CMS.V1.Content.Api.ArticleTypes.GetOne.Response> => {
  const data = await serverSdk.content.articleTypes.getBySlug(slug);
  return data || null;
};

export const getArticleBySlug = async (
  slug: string,
): Promise<Levelup.CMS.V1.Content.Api.Articles.GetOne.Response> => {
  const data = await serverSdk.content.articles.getBySlug(slug, {});
  return data || null;
};

export const listArticles = async (
  query: Levelup.CMS.V1.Content.Api.Articles.List.Request,
) => {
  const data = await serverSdk.content.articles.list(query);
  return data;
};

export const searchWithFilter = async (
  query: Levelup.CMS.V1.Content.Api.Articles.List.Request & {
    customFilter: CustomFilterParams;
  },
) => {
  const data = await serverSdk.content.articles.list(query);
  return data;
};
