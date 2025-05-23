"use client";
import React, {useCallback, useEffect, useState} from "react";
import DefaultLayout from "../../../layouts/default.layout";
import {redirect, useRouter} from "next/navigation";
import useAuth from "@/hooks/use-auth";
import {publicRoutes} from "@/config";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {buildUserFullName} from "@/lib/utilities/strings";
import {LuAlertCircle, LuCog, LuPencilLine} from "react-icons/lu";
import RoleIcon from "../../../components/role-icon";
import AgencyOffersList from "../../../components/agency-offers-list";
import {ReactQueryDevtoolsProvider} from "@/lib/utils/dev-tools/react-query-dev-tools";
import {canEditHisProfile} from "../../../utils/index";
import useCMSContent from "@/hooks/use-cms-content";
import initLogger, {LoggerContext} from "@/lib/logging";
import {useSdk} from "@/hooks/use-sdk";
import {useQuery} from "@tanstack/react-query";
import DefaultArticleComponent from "../../article/article.default";
import { GiBugleCall } from "react-icons/gi";

import ApiAlias = Levelup.CMS.V1.Content.Api.Articles.GetOne;

const logger = initLogger(LoggerContext.PAGE, "profile");

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
  const sdk = useSdk();

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [profileId, setProfileId] = useState<string | undefined>();

  /* -------------------------------------------------------------------------- */
  /*                                    QUERY                                   */
  /* -------------------------------------------------------------------------- */
  const {data, isFetched, isFetching, isPending, error} = useQuery({
    queryKey: ["articleType", profileId],
    enabled: !!profileId,

    queryFn: async () => {
      if (profileId) {
        const data = await sdk.content.articles.getById(profileId);
        return data;
      }
      return null;
    },
  });

  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */
  const loadExtraData = useCallback(async () => {
    if (currentUser?._id) {
      let profileId: string | undefined;
      try {
        profileId =
          currentUser?.role === "agency"
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
  }, [
    currentUser?._id,
    currentUser?.role,
    getDoctorProfileId,
    getEscortProfileId,
    getUserAgencyId,
  ]);

  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    loadExtraData();
  }, [loadExtraData]);
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return !currentUser ? (
    redirect(publicRoutes.homepage._.login.path)
  ) : (
    <DefaultLayout
      route={route}
      headerControls={[
        {
          title: "تحرير البروفايل",
          path: publicRoutes.homepage._.myAccount._.editAccount.path,
          icon: LuPencilLine,
          ac() {
            return canEditHisProfile(currentUser);
          },
        },
        {
          title: publicRoutes.homepage._.myAccount._.offers.title,
          path: publicRoutes.homepage._.myAccount._.offers.path,
          icon: GiBugleCall,
          ac() {
            return currentUser?.role === 'agency';
          },
        },
        {
          title: "إدارة الموقع",
          path: "/admin",
          icon: LuCog,
          ac() {
            return currentUser?.role === "admin";
          },
        },
      ]}
    >
      <div className="container mx-auto px-4 md:px-8">
        {currentUser ? (
          <div className="d">
            {!data?.data || isPending || isFetching ? (
              <div className="flex items-center gap-4 text-3xl">
                <span className="block w-12 text-sm font-medium text-beige-100">
                  <RoleIcon role={currentUser.role} />
                </span>
                <span>{buildUserFullName(currentUser.profile)}</span>
              </div>
            ) : null}
            {data?.data && (
              <div className="my-12">
                <DefaultArticleComponent initialData={data} />
              </div>
            )}
            {!currentUser.attributes.is_approved ? (
              <Alert
                variant="default"
                className="my-6 border-orange-300 bg-yellow-50 text-yellow-600"
              >
                <LuAlertCircle className="right-4 h-6 w-6 text-yellow-500" />
                <AlertTitle className="ps-10 text-2xl font-bold">
                  تفعيل الحساب
                </AlertTitle>
                <AlertDescription className="ps-10 text-2xl">
                  {"لم يتم تفعيل الحساب بعد"}
                </AlertDescription>
              </Alert>
            ) : (
              <ReactQueryDevtoolsProvider>
                <div className="my-12">
                  {currentUser.role === "agency" && (
                    <div className="my-6 border-t border-slate-200 py-4">
                      <AgencyOffersList showHeader />
                    </div>
                  )}
                </div>
              </ReactQueryDevtoolsProvider>
            )}
          </div>
        ) : null}
      </div>
    </DefaultLayout>
  );
};

export default ThemePage;
