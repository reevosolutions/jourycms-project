"use client";

import { useSdk } from "@/hooks/use-sdk";
import initLogger, { LoggerContext } from "@/lib/logging";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const logger = initLogger(LoggerContext.FORM, "article");

import EntityAlias = Levelup.CMS.V1.Content.Entity.Article;
import ApiAlias = Levelup.CMS.V1.Content.Api.Articles;
import Listing from "..";

type PostListProps = {
  articleType_slug?: string;
  /**
   * @default true
   */
  showTitle?: boolean;
};

const PostList: React.FC<PostListProps> = ({
  articleType_slug,
  showTitle = true,
}) => {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const sdk = useSdk();
  const { t: tLabel } = useTranslation("label");
  const router = useRouter();
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [articleType, setArticleType] =
    useState<Levelup.CMS.V1.Content.Entity.ArticleType | null>(null);
  const [filteredItems, setFilteredItems] = useState<EntityAlias[]>([]);
  const [items, setItems] = useState<EntityAlias[]>([]);
  const [count, setCount] = useState(24);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [fields, setFields] = useState<
    Levelup.CMS.V1.Utils.Api.Request.TProjectableFields<EntityAlias>[]
  >([
    "title",
    "slug",
    "body",
    "article_type",
    "meta_fields",
    "created_at",
    "updated_at",
    "published_at",
    "is_featured",
    "is_published",
    "featured_image",
  ]);
  /* -------------------------------------------------------------------------- */
  /*                                    QUERY                                   */
  /* -------------------------------------------------------------------------- */
  const articleTypeQuery = useQuery({
    queryKey: ["articleType", articleType_slug],
    enabled: !!articleType_slug,
    queryFn: async () => {
      if (articleType_slug) {
        const data = await sdk.content.articleTypes.getBySlug(articleType_slug);
        setArticleType(data?.data || null);
        return data;
      }
      return null;
    },
  });

  const { data, error, refetch, isFetching, isFetched } = useQuery({
    queryKey: ["articleType", articleType, search, page, count, fields],
    enabled: !!articleType,

    queryFn: async () => {
      if (articleType) {
        const data = await sdk.content.articles.list({
          count: count,
          page: page,
          search: search,
          filters: {
            article_type: articleType._id,
          },
          fields,
        });
        return data;
      }
    },
  });

  /* -------------------------------------------------------------------------- */
  /*                                    FORMS                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */
  const loadExtraData = useCallback(() => {}, []);

  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    loadExtraData();
  }, [loadExtraData, items]);

  useEffect(() => {
    setItems(data?.data || []);
  }, [data?.data]);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  logger.value("filteredItems", filteredItems);
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="form-group upcms-post-list min-h-screen">
      <div className="flex flex-row gap-4">
        <section className="flex-grow pt-6">
          {showTitle && (
            <h1 className="up-page-title mb-4 text-xl font-bold">
              {articleType?.labels.list || tLabel("Posts")}
            </h1>
          )}
          <Listing.Posts.PostListTable
            articleType={articleType}
            data={filteredItems}
          />
        </section>
      </div>
    </div>
  );
};

export default PostList;
