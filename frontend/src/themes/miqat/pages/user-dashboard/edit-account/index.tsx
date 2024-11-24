"use client";
import React, {useCallback, useEffect, useState} from "react";
import DefaultLayout from "../../../layouts/default.layout";
import {redirect, useRouter} from "next/navigation";
import useAuth from "@/hooks/use-auth";
import {publicRoutes} from "@/config";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {buildUserFullName} from "@/lib/utilities/strings";
import {LuAlertCircle, LuLoader2} from "react-icons/lu";
import RoleIcon from "../../../components/role-icon";
import {ReactQueryDevtoolsProvider} from "@/lib/utils/dev-tools/react-query-dev-tools";
import {PostForm} from "@/themes/miqat/components/forms";
import useCMSContent from "@/hooks/use-cms-content";
import { TMiqatRole } from "@/themes/miqat/config";
import { canEditHisProfile } from "@/themes/miqat/utils";
import initLogger, {LoggerContext} from "@/lib/logging";

const logger = initLogger(LoggerContext.PAGE, "edit-profile");

export type PageProps = JouryCMS.Theme.PageProps & {};

const ThemePage: React.FC<PageProps> = ({route}) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const router = useRouter();
  const {currentUser, isAuthenticated} = useAuth();
  const {
    getArticleTypeBySlug,
    getUserAgencyId,
    getEscortProfileId,
    getDoctorProfileId,
  } = useCMSContent();

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [profileId, setProfileId] =    useState<string | undefined>();

  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */
  const loadExtraData = useCallback(async () => {
    if (currentUser?._id) {
      let profileId: string | undefined;
      try {
        profileId = currentUser?.role === "agency"
          ? await getUserAgencyId(currentUser?._id)
          : currentUser?.role === "doctor"
            ? await getDoctorProfileId(currentUser?._id)
            : currentUser?.role === "escort"
              ? await getEscortProfileId(currentUser?._id)
              : undefined;
      } catch (error) {
        logger.error("Error on load profile", currentUser._id, error);
      }

      setProfileId(profileId);
    }
  }, [currentUser?._id, currentUser?.role, getDoctorProfileId, getEscortProfileId, getUserAgencyId]);

  
  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    loadExtraData();
  }, [loadExtraData]);

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return !currentUser?.attributes.is_approved || !canEditHisProfile(currentUser) ? (
    redirect(publicRoutes.homepage._.myAccount.path)
  ) : (
    <DefaultLayout route={route}>
      <div className="container mx-auto px-4 md:px-8">
        {currentUser ? (
          <div>
            
            <main className="my-6 lg:my-12 font-noto text-xl">
              {profileId ? (
                <PostForm.PostForm
                  article_id={profileId}
                  articleType_slug={currentUser?.role as any}
                  showBreadcrumb={false}
                  showTitle={false}
                  onSubmit={article => {
                    router.push(`/${article.slug}`);
                  }}
                />
              ) : (
                <div className="flex min-h-screen-60 flex-col items-center justify-center">
                  <LuLoader2 className="h-12 w-12 animate-spin text-slate-300" />
                </div>
              )}
            </main>
          </div>
        ) : null}
      </div>
    </DefaultLayout>
  );
};

export default ThemePage;
