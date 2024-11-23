"use client";
import {publicRoutes} from "@/config";
import useAuth from "@/hooks/use-auth";
import Loader from "@/themes/miqat/components/loader";
import {redirect, useRouter} from "next/navigation";
import React from "react";

export type PageProps = JouryCMS.Theme.ComponentProps & {
  children: React.ReactNode;
};

const DoctorOnlyGuard: React.FC<PageProps> = ({children}) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const {currentUser, authStatus, isAuthenticated} = useAuth();
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return authStatus === "loading" ? (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      <Loader />
    </div>
  ) : !isAuthenticated ? (
    redirect(publicRoutes.homepage._.login.path)
  ) : currentUser?.role !== "doctor" ? (
    redirect(publicRoutes.homepage.path)
  ) : (
    children
  );
};

export default DoctorOnlyGuard;
