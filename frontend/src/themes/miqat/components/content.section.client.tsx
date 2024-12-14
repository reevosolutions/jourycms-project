"use client";
import useCMSContent from "@/hooks/use-cms-content";
import {useSdk} from "@/hooks/use-sdk";
import initLogger, {LoggerContext} from "@/lib/logging";
import Loader from "@/themes/miqat/components/loader";
import NoPostsMessage from "@/themes/miqat/components/no-posts-message";
import CustomPagination from "@/themes/miqat/components/pagination.client";
import PostCard_Client from "@/themes/miqat/components/post-card.client";
import {ArticleTypeSlug} from "@/themes/miqat/config";
import {useQuery} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import React, {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

const logger = initLogger(LoggerContext.COMPONENT, "contentSection");

import EntityAlias = Levelup.CMS.V1.Content.Entity.Article;
import ApiAlias = Levelup.CMS.V1.Content.Api.Articles;
import PostCard_Server from "./post-card.server";

export type ContentSectionProps = JouryCMS.Theme.ComponentProps & {
  articleTypeSlug: `${ArticleTypeSlug}`;
  showPagination?: boolean;
  count: number;
};

const ContentSection_Client: React.FC<ContentSectionProps> = ({
  showPagination = true,
  articleTypeSlug,
  count: _count = 12,
}) => {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const sdk = useSdk();
  const {t: tLabel} = useTranslation("label");
  const router = useRouter();
  const {getArticleTypeBySlug} = useCMSContent();
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [articleType, setArticleType] =
    // eslint-disable-next-line no-undef
    useState<Levelup.CMS.V1.Content.Entity.ArticleType | null>(null);
  const [isItemsLoaded, setIsItemsLoaded] = useState(false);
  const [filteredItems, setFilteredItems] = useState<EntityAlias[]>([]);
  const [items, setItems] = useState<EntityAlias[]>([]);
  const [count, setCount] = useState(_count);
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
    queryKey: ["articleType", articleTypeSlug],
    enabled: !!articleTypeSlug,
    queryFn: async () => {
      if (articleTypeSlug) {
        const data = await getArticleTypeBySlug(articleTypeSlug);
        setArticleType(data || null);
        return data;
      }
      return null;
    },
  });

  const {data, error, refetch, isFetching, isFetched} = useQuery({
    queryKey: ["article", articleType, search, page, count, fields],
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
    const items = data?.data || [];
    setItems(items);
    setFilteredItems(items);
    setIsItemsLoaded(true);
  }, [data?.data]);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="py-4">
      {isFetching || !isFetched || !isItemsLoaded ? (
        <Loader />
      ) : error ? (
        <div className="flex flex-col gap-4">
          <div className="text-center text-3xl font-bold">حدث خطأ</div>
          <div className="text-center text-xl">{error.message}</div>
        </div>
      ) : filteredItems.length === 0 ? (
        <NoPostsMessage />
      ) : (
        <div className="">
          {articleType && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4">
              {filteredItems.map((item, index) => (
                <PostCard_Server
                  key={index}
                  data={item}
                  edge={data?.edge}
                  articleType={articleType}
                />
              ))}
            </div>
          )}
          {showPagination && (data?.pagination?.pages || 0) > 1 && (
            <div className="my-8 mt-12">
              <CustomPagination
                totalCount={data?.pagination?.total}
                currentPage={page}
                pageSize={count}
                onPageChange={setPage}
                className="text-lg"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentSection_Client;
