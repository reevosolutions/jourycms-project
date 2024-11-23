'use client';
import { publicRoutes } from "@/config";
import LoginForm from "@/features/auth/forms/login.form";
import useAuth from "@/hooks/use-auth";
import { ReactQueryDevtoolsProvider } from "@/lib/utils/dev-tools/react-query-dev-tools";
import Link from "next/link";
import { redirect } from "next/navigation";
import * as React from "react";
import DefaultLayout from "../../../layouts/default.layout";

import ApiAlias = Levelup.CMS.V1.Auth.Api.Auth.Signin;
export type PageProps = JouryCMS.Theme.PageProps & {};

const ThemePage: React.FC<PageProps> = ({ route }) => {

  const { isAuthenticated, currentUser } = useAuth();
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return isAuthenticated ? redirect(publicRoutes.homepage._.myAccount.path) : (
    <ReactQueryDevtoolsProvider>

    <DefaultLayout route={route}>
      <div className=" min-h-screen-80 p-4  relative flex flex-col justify-center items-center">
        <div className="flex flex-col gap-4 sm:-mt-40">

          <div className="mx-auto w-80 sm:w-96 max-w-full  sm:shadow-xl  rounded-2xl sm:shadow-darkblue-950/5  ">
            <LoginForm />
          </div>
          <div className="d">
            <p className="text-2xl text-center">ليس لديك حساب؟  {" "}<Link href={"/register"} className=" text-red2-500 hocus:text-beige-900">تسجيل</Link>
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
    </ReactQueryDevtoolsProvider>
  );
};

export default ThemePage;
