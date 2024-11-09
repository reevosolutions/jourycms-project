'use client';
import { ParallaxBanner } from 'react-scroll-parallax';
import { ParallaxProvider } from 'react-scroll-parallax';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSdk } from "@/hooks/use-sdk";
import initLogger, { LoggerContext } from "@/lib/logging";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


const logger = initLogger(LoggerContext.FORM, 'article');

import EntityAlias = Levelup.CMS.V1.Content.Entity.Article;
import ApiAlias = Levelup.CMS.V1.Content.Api.Articles;
import Listing from "..";

import Icons from '@/features/admin/ui/icons';
import HomepageSearchForm from '@/themes/miqat/components/homepage-search-form';
import Link from 'next/link';
import Image from 'next/image';
import OmrahPostCard from '@/themes/miqat/components/post-card.omrah';

export type HomepageContentOmrahSectionProps = JouryCMS.Theme.ComponentProps & {
};


const HomepageContentOmrahSection: React.FC<HomepageContentOmrahSectionProps> = ({ children }) => {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */
  const articleType_slug = 'trip';
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const sdk = useSdk();
  const { t: tLabel } = useTranslation("label");
  const router = useRouter();
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [articleType, setArticleType] = useState<Levelup.CMS.V1.Content.Entity.ArticleType | null>(null);
  const [filteredItems, setFilteredItems] = useState<EntityAlias[]>([]);
  const [items, setItems] = useState<EntityAlias[]>([]);
  const [count, setCount] = useState(12);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [fields, setFields] = useState<Levelup.CMS.V1.Utils.Api.Request.TProjectableFields<EntityAlias>[]>(['title', 'slug', 'body', 'article_type', 'meta_fields', 'created_at', 'updated_at', 'published_at', 'is_featured', 'is_published', 'featured_image']);

  /* -------------------------------------------------------------------------- */
  /*                                    QUERY                                   */
  /* -------------------------------------------------------------------------- */
  const articleTypeQuery = useQuery({
    queryKey: ['articleType', articleType_slug],
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
    queryKey: ['articleType', articleType_slug, search, page, count, fields],
    enabled: !!articleType,

    queryFn: async () => {
      if (articleType) {
        const data = await sdk.content.articles.list({
          count: count,
          page: page,
          search: search,
          filters: {
            article_type: articleType._id
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
  const loadExtraData = useCallback(() => {

  }, []);

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


  logger.value('filteredItems', filteredItems);
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="py-12">
      {isFetching ? (
        <div className="text-center">
          جار التحميل...
        </div>
      ) : error ? (
        <div className="text-center">
          حدث خطأ
        </div>
      ) : !filteredItems.length ? (
        <div className="text-center">
          لا يوجد عناصر الان
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
          {filteredItems.map((item, index) => (
            <OmrahPostCard key={index} data={item} edge={data?.edge} />
          ))
          }
        </div >
      )}
    </div >
  );
}

export default HomepageContentOmrahSection; 