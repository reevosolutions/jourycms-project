"use client";

import {useSdk} from "@/hooks/use-sdk";
import initLogger, {LoggerContext} from "@/lib/logging";
import {useQuery} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import React, {useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {LuLoader2} from "react-icons/lu";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

const logger = initLogger(LoggerContext.FORM, "article");

import EntityAlias = Levelup.CMS.V1.Content.Entity.Article;
import ApiAlias = Levelup.CMS.V1.Content.Api.Articles;
import BreadcrumbComponent from "../presentation/breadcrumb";
import {cn} from "@/lib/utils";
import RoleIcon from "../listing/users/role-icon";
type AdminDashboardPageProps = {};

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({}) => {
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
  const [articleTypes, setArticleTypes] = useState<
    Levelup.CMS.V1.Content.Entity.ArticleType[]
  >([]);

  /* -------------------------------------------------------------------------- */
  /*                                    QUERY                                   */
  /* -------------------------------------------------------------------------- */

  const {data, error, refetch, isFetching, isFetched} = useQuery({
    queryKey: ["aggregate"],
    queryFn: async () => {
      const articlesByTypes = await sdk.content.articles.aggregateByTypes();
      const usersByRoles = await sdk.auth.users.aggregateByRoles();
      return {articlesByTypes, usersByRoles};
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
              ]}
            />
          </div>

          {error ? (
            <Alert variant={"destructive"}>
              <AlertTitle>حدث خطأ</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          ) : isFetched && !isFetching ? (
            <div className="grid grid-cols-1 gap-12">
              <section className="mt-8">
                <h2 className="text-3xl font-semibold">{"المحتوى"}</h2>
                <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {Object.values(
                    data?.articlesByTypes?.edge?.article_types || {},
                  ).map(item => {
                    const count =
                      data?.articlesByTypes?.data?.find(
                        i => i.article_type === item?._id,
                      )?.count || 0;
                    return (
                      <div
                        className="flex flex-col items-center justify-center rounded-xl border border-slate-100 shadow-md shadow-slate-50"
                        key={item?._id || ""}
                      >
                        <span className="p-4 text-lg font-semibold">
                          {item?.labels?.plural}
                        </span>
                        <span
                          className={cn(
                            "p-4 pb-8 text-3xl font-light",
                            count === 0 && "text-slate-300",
                          )}
                        >
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>
              <section className="mt-8">
                <h2 className="text-3xl font-semibold">{"الأعضاء"}</h2>
                <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {data?.usersByRoles?.data?.map(item => {
                    return (
                      <div
                        className="flex flex-col items-center justify-center rounded-xl border border-slate-100 shadow-md shadow-slate-50"
                        key={item?.role || ""}
                      >
                        <div className="p-4 pt-8 text-lg font-semibold">
                          <span className="mx-auto block w-12">
                            <RoleIcon role={item.role as any} />
                          </span>
                        </div>
                        <span
                          className={cn(
                            "p-4 pb-8 text-3xl font-light",
                            item.count === 0 && "text-slate-300",
                          )}
                        >
                          {item.count || 0}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
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

export default AdminDashboardPage;
