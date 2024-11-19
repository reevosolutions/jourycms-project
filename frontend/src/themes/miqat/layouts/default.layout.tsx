import * as React from "react";
import BreadcrumbComponent from "../components/breadcrumb";
import Footer from "../components/footer";
import Header from "../components/header";
import { SidebarProvider } from "@/components/ui/customized.sidebar";
import ThemeSidebar from "../components/sidebar";

export type LayoutProps = JouryCMS.Theme.LayoutProps & {};

const DefaultLayout: React.FC<LayoutProps> = ({children, route}) => {
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    
      <div className="jcms-layout font-hammah text-lg">
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
              <div className="mb-4">
                <h1 className="text-4xl text-gray-800 md:text-5xl">
                  {route.title}
                </h1>
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
