'use client';
import * as React from "react";
import DefaultLayout from "../../layouts/default.layout";
import { redirect, useRouter } from "next/navigation";
import useAuth from "@/hooks/use-auth";
import { publicRoutes } from "@/config";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { buildUserFullName } from "@/lib/utilities/strings";
import { LuAlertCircle } from "react-icons/lu";

export type PageProps = JouryCMS.Theme.PageProps & {};

const ThemePage: React.FC<PageProps> = ({ route }) => {

  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const router = useRouter();
  const { currentUser, isAuthenticated } = useAuth();
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return !currentUser ? redirect(publicRoutes.homepage._.login.path) : (
    <DefaultLayout route={route}>
      <div className="container mx-auto">
        {currentUser ? (
          <div className="d">
            <p className=" text-xl ">
              مرحبا بك {buildUserFullName(currentUser.profile)}
            </p>
            {currentUser.role}
            {!currentUser.attributes.is_approved && (
              <Alert variant="default" className=" my-6 border-orange-300 bg-yellow-50 text-yellow-600">
                <LuAlertCircle className="h-6 w-6 right-4 text-yellow-500" />
                <AlertTitle className=" font-bold text-2xl ps-10">تفعيل الحساب</AlertTitle>
                <AlertDescription className="text-2xl  ps-10">
                  {"لم يتم تفعيل الحساب بعد"}
                </AlertDescription>
              </Alert>
            )}
          </div>
        ) : null}
      </div>
    </DefaultLayout>
  );
};

export default ThemePage;
