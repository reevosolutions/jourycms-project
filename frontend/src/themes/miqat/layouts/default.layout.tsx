"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";

export type LayoutProps = JouryCMS.Theme.LayoutProps & {};

const DefaultLayout: React.FC<LayoutProps> = ({ children }) => {
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="jcms-layout font-hammah text-lg">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
