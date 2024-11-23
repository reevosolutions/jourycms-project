"use client";
import React, {useCallback, useEffect, useState} from "react";
import DefaultLayout from "../../../layouts/default.layout";
import {redirect, useRouter} from "next/navigation";
import useAuth from "@/hooks/use-auth";
import {publicRoutes} from "@/config";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {buildUserFullName} from "@/lib/utilities/strings";
import {LuAlertCircle} from "react-icons/lu";
import RoleIcon from "../../../components/role-icon";
import {ReactQueryDevtoolsProvider} from "@/lib/utils/dev-tools/react-query-dev-tools";
import {PostForm} from "@/themes/miqat/components/forms";
import useCMSContent from "@/hooks/use-cms-content";

export type PageProps = JouryCMS.Theme.PageProps & {};

const ThemePage: React.FC<PageProps> = ({route}) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const router = useRouter();
  const {currentUser, isAuthenticated} = useAuth();
  const {getArticleTypeBySlug, getUserAgency} = useCMSContent();

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [agency, setAgency] =
    useState<Levelup.CMS.V1.Content.Entity.Article | null>(null);

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
  }, [currentUser?._id, getUserAgency]);

  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    loadExtraData();
  }, [loadExtraData]);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return !currentUser?.attributes.is_approved ? (
    redirect(publicRoutes.homepage._.myAccount.path)
  ) : (
    <DefaultLayout route={route}>
      <div className="container mx-auto px-4 md:px-8">
        {currentUser ? (
          <div>
            <aside className="flex items-center gap-4 text-3xl">
              <span className="block w-12 text-sm font-medium text-beige-100">
                <RoleIcon role={currentUser.role} />
              </span>
              <span>{buildUserFullName(currentUser.profile)}</span>
            </aside>
            <main className="my-6 font-noto text-xl">
              <PostForm.PostForm
                hiddenMetaFields={[
                  'agency'
                ]}
                fill={{
                  meta_fields: {
                    agency: agency?._id,
                  },
                }}
                articleType_slug="omrah"
                showBreadcrumb={false}
                showTitle={false}
                onSubmit={article => {
                  router.push(`/${article.slug}`);
                }}
              />
            </main>
          </div>
        ) : null}
      </div>
    </DefaultLayout>
  );
};

export default ThemePage;
