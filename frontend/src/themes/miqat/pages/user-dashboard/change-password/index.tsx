"use client";
import { publicRoutes } from "@/config";
import ChangePasswordForm from "@/features/auth/forms/change-password.form";
import useAuth from "@/hooks/use-auth";
import useCMSContent from "@/hooks/use-cms-content";
import initLogger, { LoggerContext } from "@/lib/logging";
import { ReactQueryDevtoolsProvider } from "@/lib/utils/dev-tools/react-query-dev-tools";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import DefaultLayout from "../../../layouts/default.layout";

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
  const [profileId, setProfileId] = useState<string | undefined>();
  const [isProfieLoaded, setIsProfieLoaded] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return !isAuthenticated ? (
    redirect(publicRoutes.homepage._.login.path)
  ) : (
    <ReactQueryDevtoolsProvider>
      <DefaultLayout route={route}>
        <div className="relative flex min-h-screen-80 flex-col items-center justify-center p-4">
          <div className="flex flex-col gap-4 sm:-mt-40">
            <div className="mx-auto w-80 max-w-full rounded-2xl sm:w-96 sm:shadow-xl sm:shadow-darkblue-950/5">
              <ChangePasswordForm />
            </div>
          </div>
        </div>
      </DefaultLayout>
    </ReactQueryDevtoolsProvider>
  );
};

export default ThemePage;
