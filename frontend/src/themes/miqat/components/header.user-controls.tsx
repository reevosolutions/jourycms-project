'use client';

import useAuth from "@/hooks/use-auth";
import initLogger, { LoggerContext } from "@/lib/logging";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";
import { LuChevronDown } from "react-icons/lu";


const logger = initLogger(LoggerContext.COMPONENT, 'header');



export type HeaderUserControlsProps = JouryCMS.Theme.ComponentProps & {
};

const HeaderUserControls: React.FC<HeaderUserControlsProps> = ({ children }) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const { isAuthenticated } = useAuth();

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (


    <div className="d flex items-center">
      <Link
        href="/login"
        className="flex h-28 items-center justify-center gap-3 border-b-4 border-transparent text-white duration-200 hocus:text-beige-50"
      >
        <span className="d">
          {isAuthenticated ? "حسابي" : "تسجيل الدخول"}
        </span>
        <LuChevronDown className="h-5 w-5" />
      </Link>
    </div>


  );
};

export default HeaderUserControls;
