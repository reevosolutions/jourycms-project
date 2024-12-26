import * as React from "react";
import DefaultLayout from "../../layouts/default.layout";
import ContentSection from "../../components/content.section.client";
import {ArticleTypeSlug} from "../../config";
import {ReactQueryDevtoolsProvider} from "@/lib/utils/dev-tools/react-query-dev-tools";
import HomepageHeroSection from "./sections/hero.section";
import HomepageContentSection from "./sections/content.section";
import HomepageCallToActionSection from "./sections/account-call-to-action.section";
import HomepagePartnersSection from "./sections/partners.section";
import HomepageSeatsSection from "./sections/seats.section";
import HomepageEscortsSection from "./sections/escorts.section";
import HomepageBlogSection from "./sections/blog.section";
import OmrahOnDemandSection from "./sections/omrah-on-demand.section";
import OrderVisaSection from "./sections/order-visa.section";
import ThemePage_Client_2 from "./page.client.variant-2";
import ThemePage_Client_Default from "./page.client.variant-default";
import ThemePage_Client_3 from "./page.client.variant-3";

export type PageProps = JouryCMS.Theme.PageProps & {
  variant?: "default" | "2" | "3";
};

const ThemePage_Client: React.FC<PageProps> = ({
  route,
  variant = "default",
}) => {
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <ReactQueryDevtoolsProvider>
      {variant === "2" ? (
        <ThemePage_Client_2 route={route} />
      ) : variant === "3" ? (
        <ThemePage_Client_3 route={route} />
      ) : (
        <ThemePage_Client_Default route={route} />
      )}
    </ReactQueryDevtoolsProvider>
  );
};

export default ThemePage_Client;
