"use client";
import { ParallaxBanner } from "react-scroll-parallax";
import { ParallaxProvider } from "react-scroll-parallax";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Icons from "@/features/admin/ui/icons";
import HomepageSearchForm from "@/themes/miqat/components/homepage-search-form";
import Link from "next/link";
import React from "react";

export type HomepageContentTombolasSectionProps =
  JouryCMS.Theme.ComponentProps & {};

const HomepageContentTombolasSection: React.FC<
  HomepageContentTombolasSectionProps
> = ({ children }) => {
  return <div className="container mx-auto"></div>;
};

export default HomepageContentTombolasSection;
