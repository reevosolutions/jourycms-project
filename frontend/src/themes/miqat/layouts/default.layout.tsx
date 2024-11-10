"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import BreadcrumbComponent from "../components/breadcrumb";

export type LayoutProps = JouryCMS.Theme.LayoutProps & {};

const DefaultLayout: React.FC<LayoutProps> = ({ children, route }) => {
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="jcms-layout font-hammah text-lg">
      <Header {...{
        route
      }} />
      <main className=" min-h-screen-80">
        {route.path !== "/" && (
          <div className="container mx-auto pt-4">
            <BreadcrumbComponent {...{
              route
            }} />
            <div className="mb-4">
              <h1 className=" text-4xl md:text-5xl  text-gray-800">{route.title}</h1>
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
