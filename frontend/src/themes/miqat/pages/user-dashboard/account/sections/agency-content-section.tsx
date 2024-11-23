"use client";
import {useSdk} from "@/hooks/use-sdk";
import {useRouter} from "next/navigation";
import React, {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import EntityAlias = Levelup.CMS.V1.Content.Entity.Article;
import ApiAlias = Levelup.CMS.V1.Content.Api.Articles;
import {useQuery} from "@tanstack/react-query";
import useCMSContent from "@/hooks/use-cms-content";
import useAuth from "@/hooks/use-auth";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import CustomPagination from "@/features/admin/presentation/pagination";
import {LuLoader2} from "react-icons/lu";
import {Button} from "@/components/ui/button";
import {publicRoutes} from "@/config";

const AgencyContentSection: React.FC<{}> = ({}) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const sdk = useSdk();
  const {t: tLabel} = useTranslation("label");
  const router = useRouter();
  const {getArticleTypeBySlug, getUserAgency} = useCMSContent();
  const {isAuthenticated, currentUser, authStatus} = useAuth();
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [articleType, setArticleType] =
    useState<Levelup.CMS.V1.Content.Entity.ArticleType | null>(null);
  const [agency, setAgency] =
    useState<Levelup.CMS.V1.Content.Entity.Article | null>(null);
  const [filteredItems, setFilteredItems] = useState<EntityAlias[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [items, setItems] = useState<EntityAlias[]>([]);
  const [count, setCount] = useState(24);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
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
  const {data, error, refetch, isFetching, isFetched} = useQuery({
    queryKey: [
      "articleType",
      articleType?._id,
      search,
      page,
      count,
      fields,
      agency?._id,
    ],
    enabled: !!articleType?._id && !!agency?._id,

    queryFn: async () => {
      if (articleType) {
        const data = await sdk.content.articles.list({
          count: count,
          page: page,
          search: search,
          filters: {
            article_type: articleType._id,
            "meta_fields.agency": agency?._id,
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
  const loadExtraData = useCallback(async () => {
    if (currentUser?._id) {
      getUserAgency(currentUser?._id)
        .then(agency => setAgency(agency || null))
        .catch(error => {
          console.error(error);
        });
    }
    getArticleTypeBySlug("omrah")
      .then(type => setArticleType(type))
      .catch(error => {
        console.error(error);
      });
  }, [currentUser?._id, getArticleTypeBySlug, getUserAgency]);

  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    loadExtraData();
  }, [loadExtraData]);

  useEffect(() => {
    setItems(data?.data || []);
  }, [data?.data]);

  useEffect(() => {
    setFilteredItems(items);
    setIsDataLoaded(true);
  }, [items]);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="my-6 border-t border-slate-200 py-4">
      <h2 className="flex items-center justify-between">
        <span className="text-3xl">{"عروض الوكالة"}</span>
        <div className="d">
          <Button
            variant={"default"}
            onClick={() => {
              router.push(publicRoutes.homepage._.myAccount._.newOffer.path);
            }}
            className="bg-darkblue-700 text-2xl transition-colors hocus:bg-darkblue-950"
          >
            {"عرض جديد"}
          </Button>
        </div>
      </h2>
      <div className="py-4">
        {error ? (
          <Alert variant={"destructive"}>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        ) : isFetched && isDataLoaded && !isFetching ? (
          filteredItems.length > 0 ? (
            <div className="">
              <div className="flex flex-col">
                {data?.data.map(item => (
                  <div className="flex" key={item._id}>
                    <div className="d">{item.title}</div>
                  </div>
                ))}
              </div>
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
            </div>
          ) : (
            <div className="flex min-h-screen-60 flex-col items-center justify-center">
              <p className="mx-6 rounded-xl border border-dashed border-slate-200 px-12 py-6 text-center text-lg">
                {"لا توجد عناصر بعد"}
              </p>
            </div>
          )
        ) : (
          <div className="flex min-h-screen-60 flex-col items-center justify-center">
            <LuLoader2 className="h-12 w-12 animate-spin text-slate-300" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AgencyContentSection;
