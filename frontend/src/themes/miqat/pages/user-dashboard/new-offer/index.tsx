"use client";
import { publicRoutes } from "@/config";
import useAuth from "@/hooks/use-auth";
import useCMSContent from "@/hooks/use-cms-content";
import { buildUserFullName } from "@/lib/utilities/strings";
import { PostForm } from "@/themes/miqat/components/forms";
import { redirect, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import RoleIcon from "../../../components/role-icon";
import DefaultLayout from "../../../layouts/default.layout";

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
            
            <main className="my-12 font-noto text-xl">
              <PostForm.PostForm
                hiddenMetaFields={["agency"]}
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

