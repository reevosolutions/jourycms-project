"use client";

import useAuth from "@/hooks/use-auth";
import initLogger, {LoggerContext} from "@/lib/logging";
import {cn} from "@/lib/utils";
import Link from "next/link";
import * as React from "react";
import {LuChevronDown} from "react-icons/lu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/customized.popover";
import {adminRoutes, publicRoutes} from "@/config";
import {useAppDispatch} from "@/lib/redux/hooks";
import {logout} from "@features/auth/redux/slice";

const logger = initLogger(LoggerContext.COMPONENT, "header");

export type HeaderUserControlsProps = JouryCMS.Theme.ComponentProps & {};

const HeaderUserControls: React.FC<HeaderUserControlsProps> = ({children}) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const {isAuthenticated, currentUser} = useAuth();
  const dispatch = useAppDispatch();

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="d ms-auto flex items-center">
      {currentUser ? (
        <Popover>
          <PopoverTrigger className="flex h-16 items-center justify-center gap-3 border-b-4 border-transparent text-white duration-200 hocus:text-beige-50 lg:h-28">
            <span className="d">{"حسابي"}</span>
            <LuChevronDown className="h-5 w-5" />
          </PopoverTrigger>
          <PopoverContent className="-translate-y-4">
            <div className="px-4 font-tajawal text-xl">
              <ul>
                <li>
                  <Link
                    className="block py-1 text-darkblue-800 transition-all hocus:text-beige-600"
                    href={publicRoutes.homepage._.myAccount.path}
                  >
                    {"حسابي"}
                  </Link>
                </li>
                {currentUser?.role === "admin" && (
                  <li>
                    <Link
                      className="block py-1 text-darkblue-800 transition-all hocus:text-beige-600"
                      href={adminRoutes.articles.path}
                    >
                      {"إدارة الموقع"}
                    </Link>
                  </li>
                )}
                {currentUser?.role !== "admin" &&
                currentUser?.role !== "user" ? (
                  <li>
                    <Link
                      className="block py-1 text-darkblue-800 transition-all hocus:text-beige-600"
                      href={
                        publicRoutes.homepage._.myAccount._.editAccount.path
                      }
                    >
                      {publicRoutes.homepage._.myAccount._.editAccount.title}
                    </Link>
                  </li>
                ) : null}

                {currentUser?.role === "agency" && (
                  <li>
                    <Link
                      className="block py-1 text-darkblue-800 transition-all hocus:text-beige-600"
                      href={publicRoutes.homepage._.myAccount._.newOffer.path}
                    >
                      {publicRoutes.homepage._.myAccount._.newOffer.title}
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    className="block py-1 text-darkblue-800 transition-all hocus:text-beige-600"
                    href={
                      publicRoutes.homepage._.myAccount._.changePassword.path
                    }
                  >
                    {publicRoutes.homepage._.myAccount._.changePassword.title}
                  </Link>
                </li>
                <li>
                  <button
                    className="block py-1 text-red2-600 transition-all hover:text-beige-600 active:text-darkblue-800"
                    onClick={() => {
                      dispatch(logout());
                    }}
                  >
                    {"تسجيل الخروج"}
                  </button>
                </li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Popover>
          <PopoverTrigger className="flex h-16 items-center justify-center gap-3 border-b-4 border-transparent text-white duration-200 hocus:text-beige-50 lg:h-28">
            <span className="d">{"تسجيل الدخول"}</span>
            <LuChevronDown className="h-5 w-5" />
          </PopoverTrigger>

          <PopoverContent className="-translate-y-4">
            <div className="px-4 font-tajawal text-xl">
              <ul>
                <li>
                  <Link
                    className="block py-1 text-darkblue-800 transition-all hocus:text-beige-600"
                    href={publicRoutes.homepage._.login.path}
                  >
                    {"تسجيل الدخول"}
                  </Link>
                </li>
                <li>
                  <Link
                    className="block py-1 text-darkblue-800 transition-all hocus:text-beige-600"
                    href={publicRoutes.homepage._.rgister.path}
                  >
                    {"إنشاء حساب"}
                  </Link>
                </li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default HeaderUserControls;
