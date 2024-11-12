import * as React from "react";
import DefaultLayout from "../../../layouts/default.layout";
import LoginForm from "@/features/auth/forms/login.form";
import Link from "next/link";


export type PageProps = JouryCMS.Theme.PageProps & {};

const ThemePage: React.FC<PageProps> = ({ route }) => {
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <DefaultLayout route={route}>
      <div className=" min-h-screen-80 p-4  relative flex flex-col justify-center items-center">
        <div className="flex flex-col gap-4 sm:-mt-40">

          <div className="mx-auto w-96 max-w-full  shadow-xl  rounded-2xl shadow-darkblue-950/5  ">
            <LoginForm />
          </div>
          <div className="d">
            <p className="text-xl text-center">لديك حساب؟  <Link href={"/login"} className=" text-beige-500 hocus:text-beige-900">تسجيل الدخول</Link>

            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ThemePage;
