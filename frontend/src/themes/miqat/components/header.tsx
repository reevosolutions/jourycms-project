"use client";
import { publicRoutes } from "@/config";
import useAuth from "@/hooks/use-auth";
import initLogger, { LoggerContext } from "@/lib/logging";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { LuBriefcase } from "react-icons/lu";
import HeaderUserControls from "./header.user-controls";


const logger = initLogger(LoggerContext.COMPONENT, 'header');


const HeaderLink: React.FC<{
  title: string;
  href: string;
  isCurrent: boolean;
}> = ({ title, href, isCurrent }) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex h-28 items-center justify-center border-b-[6px] px-8 duration-200",
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
  publicRoutes.homepage._.transportation,
];

export type HeaderProps = JouryCMS.Theme.ComponentProps & {
  route: Levelup.CMS.V1.UI.Routes.RouteItem;
};

const Header: React.FC<HeaderProps> = ({ children, route }) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const { isAuthenticated } = useAuth();
  let pathname = usePathname();
  if (pathname.startsWith('/ar') || pathname.startsWith('/fr') || pathname.startsWith('/en')) pathname = pathname.slice(3)

  logger.value('pathname', pathname);
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <header className="jcms-header h-28 bg-gradient-to-r from-darkblue-900 to-darkblue-800">
      <div className="inner container mx-auto flex items-center justify-between text-2xl font-medium">
        <nav className="items-center hidden lg:flex">
          {menuItems.map((item, index) => (
            <HeaderLink
              key={index}
              title={item.title}
              href={item.path}
              isCurrent={pathname === item.path || (pathname === '' && item.path === '/')}
            />
          ))}
        </nav>

        <HeaderUserControls />

        <nav className="d flex items-center">
          <Link
            className="flex items-center gap-4 rounded-lg bg-red2-800 px-4 py-1 text-white transition-all duration-200 hocus:bg-red2-950"
            href="/jobs"
          >
            <LuBriefcase className="h-5 w-5" />
            <span className="block px-2">وظائف</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;