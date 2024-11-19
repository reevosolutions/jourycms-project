"use client";
import {publicRoutes} from "@/config";
import useAuth from "@/hooks/use-auth";
import initLogger, {LoggerContext} from "@/lib/logging";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {usePathname} from "next/navigation";
import * as React from "react";
import {LuBriefcase} from "react-icons/lu";
import HeaderUserControls from "./header.user-controls";
import {SidebarProvider} from "@/components/ui/customized.sidebar";
import ThemeSidebar from "./sidebar";

const logger = initLogger(LoggerContext.COMPONENT, "header");

const HeaderLink: React.FC<{
  title: string;
  href: string;
  isCurrent: boolean;
}> = ({title, href, isCurrent}) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex h-28 items-center justify-center border-b-[6px] px-4 duration-200 lg:px-6 xl:px-8",
        isCurrent
          ? "border-beige-50 bg-darkblue-950/50 font-semibold text-beige-50"
          : "border-transparent text-white hocus:border-beige-50 hocus:text-beige-50",
      )}
    >
      {title}
    </Link>
  );
};

const menuItems = [
  publicRoutes.homepage,
  publicRoutes.homepage._.omrah,
  publicRoutes.homepage._.tombolas,
  publicRoutes.homepage._.healthServices,
  publicRoutes.homepage._.transportationServices,
];

export type HeaderProps = JouryCMS.Theme.ComponentProps & {
  route: Levelup.CMS.V1.UI.Routes.RouteItem;
};

const Header: React.FC<HeaderProps> = ({children, route}) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const {isAuthenticated} = useAuth();
  let pathname = usePathname();
  if (
    pathname.startsWith("/ar") ||
    pathname.startsWith("/fr") ||
    pathname.startsWith("/en")
  )
    pathname = pathname.slice(3);

  logger.value("pathname", pathname);
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <header className="jcms-header h-16 bg-gradient-to-r from-darkblue-900 to-darkblue-800 lg:h-28">
      <div className="inner container mx-auto flex items-center gap-6 px-4 text-2xl font-medium md:px-8">
        <Link className="block w-24 lg:hidden text-beige-100 hover:text-red2-500 transition-all" href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="miqat"
            viewBox="0 0 1385.5 469.1"
          >
            <g>
              <path
                fill="currentColor"
                d="M889.5 386.3h9.4v-.2c-3 .2-6.2.2-9.4.2Zm58.1 43.5c4.8 4.4 7.1 9.8 7.1 16.1s-2.3 11.8-7 16.6a22 22 0 0 1-16.2 6.6c-6.6 0-12-2.2-16.5-6.6-4.4-5-6.6-10.6-6.6-16.6 0-6.3 2.2-11.7 6.6-16 4.4-4.8 10-7.2 16.6-7.2s12 2.4 16 7.1Zm63.9 0c4.7 4.4 7 9.8 7 16.1s-2.3 11.8-7 16.6a21.9 21.9 0 0 1-16.1 6.6c-6.6 0-12.1-2.2-16.6-6.6-4.4-5-6.6-10.6-6.6-16.6 0-6.3 2.2-11.7 6.6-16 4.1-4.8 9.7-7.2 16.6-7.2 6.3 0 11.6 2.4 16 7.1Z"
              />
              <path
                fill="currentColor"
                d="M1344.4 237.8c-27.2-25.2-59.6-37.8-97.5-37.8s-69.3 12.6-96.4 37.8a123.2 123.2 0 0 0-40.7 93.2c0 6.6.5 13 1.4 19.4h-62.9c-21.4 0-36.2-4.1-44.4-12.3a45 45 0 0 1-12.8-34V138H952v166a49 49 0 0 1-12.8 34.5c-7.9 7.8-24.4 11.8-49.6 11.8h-63.9l1-1c.6-.6.6-.7 0-.4 27.4-25 41.1-55.8 41.1-92.7s-13.7-68-41.1-93.2c-27.5-25.5-60-38.3-98-38.3s-69.3 12.8-96.4 38.3c-27 25.3-40.6 56.3-40.6 93.2s13.5 67.5 40.6 92.7c-1-1.6-.5-1.1 1.4 1.4h-92.2V0h-38.7v386.3h386.8c3.2 0 6.3 0 9.4-.2 33.5-1.6 57.6-11.7 72.4-30.5 17 20.5 42.7 30.7 77 30.7h74.3a124.1 124.1 0 0 0 27.9 37c27.1 25.1 59.2 37.7 96.4 37.7s70.3-12.6 97.5-37.8c27.4-25.2 41.1-56 41.1-92.7s-13.7-67.1-41.1-92.7Zm-546.2 83.8c-19.6 17.6-42.7 26.4-69.5 26.4s-49-8.8-68.6-26.4c-19.2-17.4-28.8-39.1-28.8-65.3s9.4-48.7 28.4-66.7c18.9-18 41.9-27 69-27s50.4 9 70 27a86.7 86.7 0 0 1 29.3 66.7 87.2 87.2 0 0 1-29.8 65.3Zm517.8 74.7c-19.2 17.3-42.3 26-69 26s-49.4-8.7-68.6-26A87.8 87.8 0 0 1 1149 331a87 87 0 0 1 28.8-66.2c19.2-18 42.2-27 69-27s50 9 69.6 27a85.9 85.9 0 0 1 28.8 66.2 87.8 87.8 0 0 1-29.3 65.3ZM258.2 106.9c-4.4-5-6.6-10.6-6.6-16.6a22 22 0 0 1 6.6-16c4.4-4.8 10-7.2 16.5-7.2s12 2.4 16.1 7.1c4.7 4.5 7.1 9.8 7.1 16.1s-2.4 11.8-7 16.6a22 22 0 0 1-16.2 6.6c-6.6 0-12.1-2.2-16.5-6.6Zm169.3 30.7h37.3v248.7H78c-19.8 0-35.1-3.8-45.9-11.3a71.4 71.4 0 0 1-27.4-39.3c-2.5-8.8-4-17.3-4.7-25.5v-106h36.4v81.9c0 26.1 7.4 44.4 22.2 54.8 3.5 2.2 8.4 4.4 14.7 6.7a71.4 71.4 0 0 0 16 2.8h338.2V137.6Z"
              />
              <path
                fill="currentColor"
                d="M681 79c-4.5-5-6.7-10.6-6.7-16.6 0-6.3 2.2-11.6 6.6-16 4.1-4.8 9.6-7.2 16.6-7.2 6.3 0 11.6 2.4 16 7.1 4.8 4.1 7.1 9.5 7.1 16.1s-2.3 11.8-7 16.6a22 22 0 0 1-16.1 6.6c-6.6 0-12.2-2.2-16.6-6.6Zm63.8 0c-4.4-5-6.7-10.6-6.7-16.6 0-6.3 2.2-11.6 6.7-16 4.4-4.8 9.9-7.2 16.5-7.2s12 2.4 16 7.1c4.8 4.1 7.2 9.5 7.2 16.1S782 74.2 777.4 79a21.9 21.9 0 0 1-16 6.6c-6.7 0-12.2-2.2-16.6-6.6Zm-550.5 27.9c-4.4-5-6.6-10.6-6.6-16.6 0-6.3 2.2-11.6 6.7-16 4-4.8 9.6-7.2 16.5-7.2a21 21 0 0 1 16 7.1c4.8 4.5 7.2 9.8 7.2 16.1s-2.4 11.8-7.1 16.6a22 22 0 0 1-16.1 6.6c-6.6 0-12.1-2.2-16.5-6.6Z"
              />
            </g>
          </svg>
        </Link>
        <nav className="me-auto hidden items-center lg:flex">
          {menuItems.map((item, index) => (
            <HeaderLink
              key={index}
              title={item.title}
              href={item.path}
              isCurrent={
                pathname === item.path || (pathname === "" && item.path === "/")
              }
            />
          ))}
        </nav>

        <HeaderUserControls />

        <nav className="hidden items-center lg:flex">
          <Link
            className="flex items-center gap-4 rounded-lg bg-red2-800 px-4 py-1 text-white transition-all duration-200 hocus:bg-red2-950"
            href="/jobs"
          >
            <LuBriefcase className="h-5 w-5" />
            <span className="block px-2">وظائف</span>
          </Link>
        </nav>
        <ThemeSidebar />
      </div>
    </header>
  );
};

export default Header;
