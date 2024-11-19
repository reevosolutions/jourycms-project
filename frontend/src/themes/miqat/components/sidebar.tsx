"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";

import {Button} from "@/components/ui/button";
import {adminRoutes, publicRoutes} from "@/config";
import initLogger, {LoggerContext} from "@/lib/logging";
import {LuMenu, LuUserCircle} from "react-icons/lu";
import useAuth from "@/hooks/use-auth";
import {buildUserFullName} from "@/lib/utilities/strings";
import Link from "next/link";
import {useAppDispatch} from "@/lib/redux/hooks";
import {logout} from "@features/auth/redux/slice";
import {Separator} from "@/components/ui/separator";

const logger = initLogger(LoggerContext.COMPONENT, "ThemeSidebar");

const menuItems = [
  publicRoutes.homepage,
  publicRoutes.homepage._.omrah,
  publicRoutes.homepage._.tombolas,
  publicRoutes.homepage._.healthServices,
  publicRoutes.homepage._.transportationServices,
];

type Props = {};

const ThemeSidebar: React.FC<Props> = () => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const {currentUser} = useAuth();
  const dispatch = useAppDispatch();

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button className="block text-slate-100 hover:text-beige-50">
            <LuMenu className="h-7 w-7" />
          </button>
        </SheetTrigger>
        <SheetContent side="end">
          <SheetHeader>
            {currentUser ? (
              <div className="flex items-center gap-3 px-4 pt-8">
                <LuUserCircle className="h-6 w-6" />
                <span className="text">
                  {buildUserFullName(currentUser.profile)}
                </span>
              </div>
            ) : null}
          </SheetHeader>

          <div className="px-4 font-hammah text-2xl pt-8">
            <ul>
              {menuItems.map(route => (
                <li key={route.path}>
                  <Link
                    className="block py-1 text-darkblue-800 transition-all hocus:text-beige-600"
                    href={route.path}
                  >
                    {route.title}
                  </Link>
                </li>
              ))}
              {currentUser ? (
                <>
                  <Separator className="mb-4 mt-4" />
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
                  <li>
                    <button
                      className="block py-1 text-red2-900 transition-all hocus:text-red2-600"
                      onClick={() => {
                        dispatch(logout());
                      }}
                    >
                      {"تسجيل الخروج"}
                    </button>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ThemeSidebar;
