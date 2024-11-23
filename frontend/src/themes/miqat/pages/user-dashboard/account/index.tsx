"use client";
import * as React from "react";
import DefaultLayout from "../../../layouts/default.layout";
import {redirect, useRouter} from "next/navigation";
import useAuth from "@/hooks/use-auth";
import {publicRoutes} from "@/config";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {buildUserFullName} from "@/lib/utilities/strings";
import {LuAlertCircle} from "react-icons/lu";
import RoleIcon from "../../../components/role-icon";
import AgencyContentSection from "./sections/agency-content-section";
import {ReactQueryDevtoolsProvider} from "@/lib/utils/dev-tools/react-query-dev-tools";

export type PageProps = JouryCMS.Theme.PageProps & {};

const ThemePage: React.FC<PageProps> = ({route}) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const router = useRouter();
  const {currentUser, isAuthenticated} = useAuth();
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return !currentUser ? (
    redirect(publicRoutes.homepage._.login.path)
  ) : (
    <DefaultLayout route={route}>
      <div className="container mx-auto px-4 md:px-8">
        {currentUser ? (
          <div className="d">
            <div className="flex items-center gap-4 text-3xl">
              <span className="block w-12 text-sm font-medium text-beige-100">
                <RoleIcon role={currentUser.role} />
              </span>
              <span>{buildUserFullName(currentUser.profile)}</span>
            </div>
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
                <div className="my-6">
                  {currentUser.role === "agency" && <AgencyContentSection />}
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
