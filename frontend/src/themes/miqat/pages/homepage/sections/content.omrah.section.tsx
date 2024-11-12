"use client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useSdk } from "@/hooks/use-sdk";
import initLogger, { LoggerContext } from "@/lib/logging";

const logger = initLogger(LoggerContext.FORM, "article");

// eslint-disable-next-line no-undef
import EntityAlias = Levelup.CMS.V1.Content.Entity.Article;
// eslint-disable-next-line no-undef
import ApiAlias = Levelup.CMS.V1.Content.Api.Articles;

import OmrahPostCard from "@/themes/miqat/components/post-card.omrah";
import useCMSContent from "@/hooks/use-cms-content";
import Loader from "@/themes/miqat/components/loader";

export type ContentSectionProps =
  // eslint-disable-next-line no-undef
  JouryCMS.Theme.ComponentProps & {};

const ContentSection: React.FC<
  ContentSectionProps
> = ({ }) => {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */
  const articleType_slug = "trip";

  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const sdk = useSdk();
  const { t: tLabel } = useTranslation("label");
  const router = useRouter();
  const { getArticleTypeBySlug } = useCMSContent();

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [articleType, setArticleType] =
    // eslint-disable-next-line no-undef
    useState<Levelup.CMS.V1.Content.Entity.ArticleType | null>(null);
  const [isItemsLoaded, setIsItemsLoaded] = useState(false);
  const [filteredItems, setFilteredItems] = useState<EntityAlias[]>([]);
  const [items, setItems] = useState<EntityAlias[]>([]);
  const [count, setCount] = useState(12);
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
        const data = await getArticleTypeBySlug(articleType_slug);
        setArticleType(data || null);
        return data;
      }
      return null;
    },
  });

  const { data, error, refetch, isFetching, isFetched } = useQuery({
    queryKey: ["article", articleType?._id, search, page, count, fields],
    enabled: !!articleType?._id,

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
  const loadExtraData = useCallback(() => { }, []);

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
        <div className="text-center">حدث خطأ</div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center">لا يوجد عناصر الان</div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4">
          {filteredItems.map((item, index) => (
            <OmrahPostCard key={index} data={item} edge={data?.edge} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentSection;
