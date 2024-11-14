'use client';
import { adminRoutes } from "@/config";
import AdminLayout from "@/features/admin/layout";
import Listing from "@/features/admin/listing";
import BreadcrumbComponent from "@/features/admin/presentation/breadcrumb";
import useCMSContent from "@/hooks/use-cms-content";
import { useSdk } from "@/hooks/use-sdk";
import { getRouteTree } from "@/lib/routes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ROUTE = adminRoutes.articles;
const ROUTE_PARENTS = getRouteTree(ROUTE, adminRoutes);
const PARENT_ROUTE =
  ROUTE_PARENTS.length > 1
    ? ROUTE_PARENTS.at(-2)
    : undefined;
const QUERY_ID = ROUTE.path;

type PageProps = {

};

export default function Page({ }) {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const { t: tLabel } = useTranslation('label');
  const { getArticleTypes } = useCMSContent();
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [articleTypes, setArticleTypes] = useState<Levelup.CMS.V1.Content.Entity.ArticleType[]>([])
  /* -------------------------------------------------------------------------- */
  /*                                    QUERY                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   NETHODS                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    setArticleTypes(getArticleTypes());
  }, [getArticleTypes])

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <AdminLayout.PageLayout>
      <section className="flex-grow pt-6">
        <div className=" mb-4">
          <BreadcrumbComponent items={[
            {
              title: tLabel("الرئيسية"),
              path: `/admin/`
            },
            {
              title: ROUTE.title,
            },
          ]} />
        </div>

        <h1 className="up-page-title mb-4 text-xl font-bold flex items-center justify-between">
          {ROUTE.title}
          <div className="flex items-center gap-4">

          </div>
        </h1>

        <ul className="flex flex-col gap-4 px-4 py-8 min-h-screen-80">
          {articleTypes.map(item => (
            <li className="d" key={item._id}>
              <Link href={`/admin/articles/types/${item.slug}`}>
                <h2 className="text-xl font-bold text-primary-600">{item.labels.plural}</h2>
              </Link>
              <div className="text-base text-slate-600" dangerouslySetInnerHTML={{ __html: item.description }} />
            </li>
          ))}
        </ul>

      </section>
    </AdminLayout.PageLayout>
  );
}
