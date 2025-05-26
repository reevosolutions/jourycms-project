import * as React from "react";
import BreadcrumbComponent from "../components/breadcrumb";
import Footer from "../components/footer";
import Header from "../components/header";
import {SidebarProvider} from "@/components/ui/customized.sidebar";
import ThemeSidebar from "../components/sidebar";
import Link from "next/link";
import clsx from "clsx";

export type LayoutProps = JouryCMS.Theme.LayoutProps & {};

const WithoutHeaderAndFooterLayout: React.FC<LayoutProps> = ({
  children,
  route,
  headerControls,
  className=""
}) => {
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className={clsx("jcms-layout font-tajawal text-lg", className)}>
      <main className="min-h-screen-80">
        {children}
      </main>
    </div>
  );
};

export default WithoutHeaderAndFooterLayout;
