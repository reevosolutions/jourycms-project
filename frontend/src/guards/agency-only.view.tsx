"use client";
import {publicRoutes} from "@/config";
import useAuth from "@/hooks/use-auth";
import Loader from "@/themes/miqat/components/loader";
import {redirect, useRouter} from "next/navigation";
import React from "react";

export type PageProps = JouryCMS.Theme.ComponentProps & {
  children: React.ReactNode;
};

const AgencyOnlyView: React.FC<PageProps> = ({children}) => {
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
  ) : !isAuthenticated ? null : currentUser?.role !== "agency" &&
    currentUser?.role !== "admin" ? null : (
    children
  );
};

export default AgencyOnlyView;
