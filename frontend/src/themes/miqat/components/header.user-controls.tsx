'use client';

import useAuth from "@/hooks/use-auth";
import initLogger, { LoggerContext } from "@/lib/logging";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";
import { LuChevronDown } from "react-icons/lu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/customized.popover";
import { adminRoutes, publicRoutes } from "@/config";
import { useAppDispatch } from "@/lib/redux/hooks";
import { logout } from "@features/auth/redux/slice";

const logger = initLogger(LoggerContext.COMPONENT, 'header');



export type HeaderUserControlsProps = JouryCMS.Theme.ComponentProps & {
};

const HeaderUserControls: React.FC<HeaderUserControlsProps> = ({ children }) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const { isAuthenticated, currentUser } = useAuth();
  const dispatch = useAppDispatch();

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (


    <div className="d flex items-center ms-auto">
      {currentUser ? (
        <Popover>
          <PopoverTrigger
            className="flex h-28 items-center justify-center gap-3 border-b-4 border-transparent text-white duration-200 hocus:text-beige-50"
          >
            <span className="d">
              {"حسابي"}
            </span>
            <LuChevronDown className="h-5 w-5" />
          </PopoverTrigger>
          <PopoverContent className=" -translate-y-4">
            <div className="px-4 font-hammah text-2xl">
              <ul>
                <li>
                  <Link className=" text-darkblue-800 hocus:text-beige-600 transition-all py-1 block" href={publicRoutes.homepage._.myAccount.path}>
                    {"حسابي"}
                  </Link>
                </li>
                {currentUser?.role === 'admin' && (

                  <li>
                    <Link className=" text-darkblue-800 hocus:text-beige-600 transition-all py-1 block" href={adminRoutes.articles.path}>
                      {"إدارة الموقع"}
                    </Link>
                  </li>
                )}
                <li>
                  <Link className=" text-darkblue-800 hocus:text-beige-600 transition-all py-1 block" href="/account/settings">
                    {"الإعدادات"}
                  </Link>
                </li>
                <li>
                  <button className=" text-darkblue-800 active:text-darkblue-800 hover:text-beige-600 transition-all py-1 block"
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
          <PopoverTrigger
            className="flex h-28 items-center justify-center gap-3 border-b-4 border-transparent text-white duration-200 hocus:text-beige-50"
          >
            <span className="d">
              {"تسجيل الدخول"}
            </span>
            <LuChevronDown className="h-5 w-5" />
          </PopoverTrigger>
          <PopoverContent className=" -translate-y-4">
            <div className="px-4 font-hammah text-2xl">
              <ul>
                <li>
                  <Link className=" text-darkblue-800 hocus:text-beige-600 transition-all py-1 block" href={publicRoutes.homepage._.login.path}>
                    {"تسجيل الدخول"}
                  </Link>
                </li>
                <li>
                  <Link className=" text-darkblue-800 hocus:text-beige-600 transition-all py-1 block" href={publicRoutes.homepage._.rgister.path}>
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
