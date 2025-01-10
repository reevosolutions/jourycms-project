/* eslint-disable unicorn/no-await-expression-member */
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
import {LuExternalLink, LuLoader2, LuPencil, LuTrash2} from "react-icons/lu";
import {Button} from "@/components/ui/button";
import {publicRoutes} from "@/config";
import Link from "next/link";
import {setPathParams} from "@/lib/routes";
import moment from "moment";
import {toast} from "sonner";

const AgencyOffersList: React.FC<{
  showHeader?: boolean;
  showPagination?: boolean;
  count?: number;
}> = ({showHeader, showPagination = true, count = 12}) => {
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

  const handleDeleteArticle = useCallback(
    async (id: string) => {
      const article = filteredItems.find(item => item._id === id);

      const canDelete =
        currentUser?.role === "admin" ||
        (currentUser?._id &&
          (await getUserAgency(currentUser?._id))?._id ===
            article?.meta_fields?.agency);

      if (!canDelete) {
        toast.error("لا يمكنك حذف هذا المقال");
        return;
      }

      const result = await sdk.content.articles.delete(id);

      if (result?.data?.deleted) {
        toast.success("تم حذف المقال بنجاح");
        setItems(old => old.filter(item => item._id !== id));
      }
    },
    [
      currentUser?._id,
      currentUser?.role,
      filteredItems,
      getUserAgency,
      sdk.content.articles,
    ],
  );

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
  return agency?._id ? (
    <div>
      {showHeader && (
        <h2 className="flex items-center justify-between">
          <span className="text-3xl">{"أخر عروض الوكالة"}</span>
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
      )}
      <div className="py-4">
        {error ? (
          <Alert variant={"destructive"}>
            <AlertTitle>خطأ</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        ) : isFetched && isDataLoaded && !isFetching ? (
          filteredItems.length > 0 ? (
            <div className="">
              <div className="mt-6 flex flex-col overflow-hidden rounded-xl border border-slate-100 text-xl shadow-lg shadow-slate-50 lg:text-2xl">
                {filteredItems.map(item => (
                  <div
                    className="flex gap-4 border-b border-slate-200 px-4 last:border-b-0 hover:bg-slate-50"
                    key={item._id}
                  >
                    <div className="flex-grow py-2 transition-all hocus:text-beige-600">
                      <Link href={`/${item.slug}`}>{item.title}</Link>
                    </div>
                    <div className="flex-shrink-0 py-2 text-xl text-slate-500">
                      <span>
                        {moment(item.created_at).format("DD/MM/YYYY")}
                      </span>
                    </div>
                    <div className="flex justify-end gap-1 py-2">
                      <Link
                        href={setPathParams("/:slug", {
                          slug: item.slug,
                        })}
                        className="p-1 text-text-500 transition-all duration-200 hover:text-text-900"
                      >
                        <LuExternalLink className="h5 w-5" />
                      </Link>
                      <Link
                        href={setPathParams(
                          publicRoutes.homepage._.myAccount._.editOffer.path,
                          {
                            id: item._id,
                          },
                        )}
                        className="p-1 text-text-500 transition-all duration-200 hover:text-text-900"
                      >
                        <LuPencil className="h5 w-5" />
                      </Link>
                      <button
                        className="p-1 text-red-500 transition-all duration-200 hover:text-red-700"
                        onClick={() => {
                          handleDeleteArticle(item._id);
                        }}
                      >
                        <LuTrash2 className="h5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {((showPagination && data?.pagination?.pages) || 0) > 1 ? (
                <div className="my-8 mt-12">
                  <CustomPagination
                    totalCount={data?.pagination?.total}
                    currentPage={page}
                    pageSize={count}
                    onPageChange={setPage}
                    className="text-base"
                  />
                </div>
              ) : null}
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
  ) : (
    <div className="d">
      <div className="flex min-h-screen-60 flex-col items-center justify-center">
        <p className="mx-6 rounded-xl border border-dashed border-slate-200 px-12 py-6 text-center text-lg">
          {"برحى إدخال بيانات الوكالة أولا"}
          {" "}
          <Link href={publicRoutes.homepage._.myAccount._.editAccount.path} className=" font-bold text-beige-300 hocus:text-red2-700">
            {"من هنا"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AgencyOffersList;
