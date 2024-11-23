"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useSdk } from "@/hooks/use-sdk";
import initLogger, { LoggerContext } from "@/lib/logging";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuLoader2 } from "react-icons/lu";
import Listing from "..";
import BreadcrumbComponent from "../../presentation/breadcrumb";
import CustomPagination from "../../presentation/pagination";

const logger = initLogger(LoggerContext.FORM, "article");

import EntityAlias = Levelup.CMS.V1.Users.Entity.ExposedUser;
import ApiAlias = Levelup.CMS.V1.Users.Api.Users;
import { adminRoutes } from "@/config";

type UserListProps = {
  articleType_slug?: string;
  /**
   * @default true
   */
  showTitle?: boolean;
};

const UserList: React.FC<UserListProps> = ({
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
  const [filteredItems, setFilteredItems] = useState<EntityAlias[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [items, setItems] = useState<EntityAlias[]>([]);
  const [count, setCount] = useState(24);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [fields, setFields] = useState<
    Levelup.CMS.V1.Utils.Api.Request.TProjectableFields<EntityAlias>[]
  >([
    "profile",
    "tracking_id",
    "role",
    "email",
    "attributes",
    "created_at",
    "updated_at",
  ]);
  /* -------------------------------------------------------------------------- */
  /*                                    QUERY                                   */
  /* -------------------------------------------------------------------------- */
  const { data, error, refetch, isFetching, isFetched } = useQuery({
    queryKey: ["articleType", search, page, count, fields],
    queryFn: async () => {
      const data = await sdk.auth.users.list({
        count: count,
        page: page,
        search: search,
        filters: {
        },
        fields,
      });
      return data;
    },
  });

  /* -------------------------------------------------------------------------- */
  /*                                    FORMS                                   */
  /* -------------------------------------------------------------------------- */

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
    <div className="form-group upcms-User-list min-h-screen">
      <div className="flex flex-row gap-4">
        <section className="flex-grow pt-6">
          <div className=" mb-4">
            <BreadcrumbComponent items={[
              {
                title: tLabel("الرئيسية"),
                path: `/admin/`
              },
              {
                title: tLabel("المستخدمين"),
              },
            ]} />
          </div>
          {showTitle && (
            <h1 className="up-page-title mb-4 text-xl font-bold flex items-center justify-between">
              {tLabel("المستخدمين")}
              <div className="flex items-center gap-4">

                <Button
                  onClick={() => refetch()}
                  className=""
                  variant={"secondary"}
                >
                  {isFetching && <LuLoader2 className=" animate-spin" />}
                  {"تحديث"}
                </Button>
                <Link
                  href={adminRoutes.users._.create.path}
                  className=" rounded-lg bg-primary-700 hocus:bg-primary-900 transition-colors hover:bg-primary-900 text-white px-4 py-2 text-sm"
                >
                  {tLabel("إضافة مستخدم")}
                </Link>
              </div>
            </h1>
          )}

          {error ? (
            <Alert variant={"destructive"}>
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error.message}
              </AlertDescription>
            </Alert>
          ) : isFetched && isDataLoaded && !isFetching ? filteredItems.length > 0 ? (
            <>
              <Listing.Users.UserListTable
                data={filteredItems}
              />
              {(data?.pagination?.pages || 0) > 1 && (
                <div className="my-8 mt-12">
                  <CustomPagination totalCount={data?.pagination?.total} currentPage={page} pageSize={count} onPageChange={setPage} className=" text-base" />
                </div>
              )}
            </>
          ) : (
            <div className="flex justify-center min-h-screen-60 flex-col items-center">
              <p className="text-center py-6 text-lg px-12  mx-6 rounded-xl border border-dashed border-slate-200">
                {"لا توجد عناصر بعد"}
              </p>
            </div>
          ) : (
            <div className="flex justify-center min-h-screen-60 flex-col items-center">
              <LuLoader2 className=" animate-spin w-12 h-12 text-slate-300" />
            </div>
          )}

        </section>
      </div>
    </div>
  );
};

export default UserList;
