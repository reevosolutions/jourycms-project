"use client";
import Link from "next/link";
import * as React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import useAuth from "@/hooks/use-auth";
import { LuBriefcase, LuChevronDown } from "react-icons/lu";

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

export type LayoutProps = JouryCMS.Theme.ComponentProps & {};

const menuItems = [
  {
    title: "الرئيسية",
    href: "/",
  },
  {
    title: "عروض العمرة",
    href: "/omrah",
  },
  {
    title: "طنبولات",
    href: "/tombolas",
  },
  {
    title: "مناقصات",
    href: "/bids",
  },
  {
    title: "خدمات صحية",
    href: "/services",
  },
  {
    title: "خدمات النقل",
    href: "/transportation",
  },
];

const Header: React.FC<LayoutProps> = ({ children }) => {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const { isAuthenticated } = useAuth();
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="jcms-header h-28 bg-gradient-to-r from-darkblue-900 to-darkblue-800">
      <div className="inner container mx-auto flex items-center justify-between text-2xl font-medium">
        <nav className="d flex items-center">
          {menuItems.map((item, index) => (
            <HeaderLink
              key={index}
              title={item.title}
              href={item.href}
              isCurrent={index === 0}
            />
          ))}
        </nav>

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
    </div>
  );
};

export default Header;
