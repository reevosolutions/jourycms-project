import * as React from "react";
import BreadcrumbComponent from "../components/breadcrumb";
import Footer from "../components/footer";
import Header from "../components/header";
import {SidebarProvider} from "@/components/ui/customized.sidebar";
import ThemeSidebar from "../components/sidebar";
import Link from "next/link";
import clsx from "clsx";

export type LayoutProps = JouryCMS.Theme.LayoutProps & {};

const DefaultLayout: React.FC<LayoutProps> = ({
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
      <Header
        {...{
          route,
        }}
      />
      <main className="min-h-screen-80">
        {route.path !== "/" && (
          <div className="container mx-auto px-4 pt-4 md:px-8">
            <BreadcrumbComponent
              {...{
                route,
              }}
            />
            <div className="mb-4 mt-2 flex items-center justify-between gap-4">
              <h1 className="text-3xl text-gray-800 md:text-4xl">
                {route.title}
              </h1>
              {headerControls?.length ? (
                <div className="controls flex items-center gap-3">
                  {headerControls.map((control, index) => {
                    const ac = !control.ac || control.ac();
                    return !ac ? null : control.path ? (
                      <Link
                        key={`${control.title}`}
                        href={control.path}
                        onClick={() => {
                          control.onClick && control.onClick();
                        }}
                        className="flex items-center gap-3 rounded-lg bg-darkblue-700 px-4 py-1 text-xl text-white transition-all hocus:bg-darkblue-900 xl:text-2xl"
                      >
                        {control.icon &&
                          control.icon({
                            className: "w-5 h-5",
                          })}
                        <span className="inline-block pt-1">
                          {control.title}
                        </span>
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          control.onClick && control.onClick();
                        }}
                        className="flex items-center gap-3 rounded-lg bg-darkblue-700 px-4 py-1 text-xl text-white transition-all hocus:bg-darkblue-900 xl:text-2xl"
                      >
                        {control.icon &&
                          control.icon({
                            className: "w-5 h-5",
                          })}
                        <span className="inline-block pt-1">
                          {control.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        )}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
