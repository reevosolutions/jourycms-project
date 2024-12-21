"use client";

import {useSdk} from "@/hooks/use-sdk";
import initLogger, {LoggerContext} from "@/lib/logging";
import {useQuery} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import React, {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

const logger = initLogger(LoggerContext.FORM, "article");

import Listing from "..";
import Link from "next/link";
import BreadcrumbComponent from "../../presentation/breadcrumb";
import CustomPagination from "../../presentation/pagination";
import {Button} from "@/components/ui/button";
import {LuDelete, LuLoader2, LuSearch, LuX} from "react-icons/lu";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

import EntityAlias = Levelup.CMS.V1.Content.Entity.Article;
import ApiAlias = Levelup.CMS.V1.Content.Api.Articles;
import {Input} from "@/components/ui/input";
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
  const {t: tLabel} = useTranslation("label");
  const router = useRouter();
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [articleType, setArticleType] =
    useState<Levelup.CMS.V1.Content.Entity.ArticleType | null>(null);
  const [filteredItems, setFilteredItems] = useState<EntityAlias[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [items, setItems] = useState<EntityAlias[]>([]);
  const [count, setCount] = useState(24);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [_search, set_Search] = useState("");
  const [fields, setFields] = useState<
    Levelup.CMS.V1.Utils.Api.Request.TProjectableFields<EntityAlias>[]
  >([
    "title",
    "slug",
    "article_type",
    "meta_fields",
    "created_at",
    "created_by",
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

  const {data, error, refetch, isFetching, isFetched} = useQuery({
    queryKey: ["articleType", articleType?._id, _search, page, count, fields],
    enabled: !!articleType?._id,

    queryFn: async () => {
      if (articleType) {
        const data = await sdk.content.articles.list({
          count: count,
          page: page,
          search: _search,
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
  const handleSearch = useCallback((search: string) => {
    setPage(1);
    set_Search(search);
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
    setIsDataLoaded(true);
  }, [items]);

  logger.value("filteredItems", filteredItems);
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="form-group upcms-post-list min-h-screen">
      <div className="flex flex-row gap-4">
        <section className="flex-grow pt-6">
          <div className="mb-4">
            <BreadcrumbComponent
              items={[
                {
                  title: tLabel("الرئيسية"),
                  path: `/admin/`,
                },
                {
                  title: articleType?.labels.list || tLabel("Posts"),
                },
              ]}
            />
          </div>
          {showTitle && (
            <h1 className="up-page-title mb-4 flex items-center justify-between text-xl font-bold">
              {articleType?.labels.list || tLabel("Posts")}
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => refetch()}
                  className=""
                  variant={"secondary"}
                >
                  {isFetching && <LuLoader2 className="animate-spin" />}
                  {"تحديث"}
                </Button>
                <Link
                  href={`/admin/articles/new/${articleType_slug}`}
                  className="rounded-lg bg-primary-700 px-4 py-2 text-sm text-white transition-colors hover:bg-primary-900 hocus:bg-primary-900"
                >
                  {articleType?.labels.create || tLabel("new post")}
                </Link>
              </div>
            </h1>
          )}

          {error ? (
            <Alert variant={"destructive"}>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          ) : isFetched && isDataLoaded && !isFetching ? (
            <>
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <Input
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                    onKeyDown={event => {
                      if (event.key === "Enter") {
                        handleSearch(search);
                      }
                    }}
                    placeholder="ابحث عن مقال"
                  />

                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      
                      setSearch("");
                      handleSearch("");
                    }}
                    disabled={!search}
                  >
                    <LuX className="h-6 w-6" />
                  </Button>
                  <Button
                    variant={"ghost"}
                    onClick={() => {
                      handleSearch(search);
                    }}
                    disabled={!search}
                  >
                    <LuSearch className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              {filteredItems.length > 0 ? (
                <>
                  <Listing.Posts.PostListTable
                    articleType={articleType}
                    data={filteredItems}
                    edge={data?.edge}
                  />
                  {(data?.pagination?.pages || 0) > 1 && (
                    <div className="my-8 mt-12">
                      <CustomPagination
                        totalCount={data?.pagination?.total}
                        currentPage={page}
                        pageSize={count}
                        onPageChange={setPage}
                        className="text-base"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="flex min-h-screen-60 flex-col items-center justify-center">
                  <p className="mx-6 rounded-xl border border-dashed border-slate-200 px-12 py-6 text-center text-lg">
                    {"لا توجد عناصر بعد"}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex min-h-screen-60 flex-col items-center justify-center">
              <LuLoader2 className="h-12 w-12 animate-spin text-slate-300" />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default PostList;
