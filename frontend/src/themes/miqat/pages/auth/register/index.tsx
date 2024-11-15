'use client';
import { publicRoutes } from "@/config";
import RegisterForm from "@/features/auth/forms/register.form";
import useAuth from "@/hooks/use-auth";
import { ReactQueryDevtoolsProvider } from "@/lib/utils/dev-tools/react-query-dev-tools";
import Link from "next/link";
import { redirect } from "next/navigation";
import * as React from "react";
import DefaultLayout from "../../../layouts/default.layout";


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
          <div className="flex flex-col gap-4 py-16">

            <div className="mx-auto lg:w-[700px] max-w-full w-full  shadow-xl  rounded-2xl shadow-darkblue-950/5  ">
              <RegisterForm />
            </div>
            <div className="d">
              <p className="text-xl text-center">لديك حساب؟  <Link href={"/login"} className=" text-beige-500 hocus:text-beige-900">تسجيل الدخول</Link></p>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </ReactQueryDevtoolsProvider>
  );
};

export default ThemePage;
