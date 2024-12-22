import * as React from "react";
import DefaultLayout from "../../layouts/default.layout";
import ContentSection from "../../components/content.section.client";
import { ArticleTypeSlug } from "../../config";
import { ReactQueryDevtoolsProvider } from "@/lib/utils/dev-tools/react-query-dev-tools";
import HomepageHeroSection from "./sections/hero.section";
import HomepageContentSection from "./sections/content.section";
import HomepageCallToActionSection from "./sections/account-call-to-action.section";
import HomepagePartnersSection from "./sections/partners.section";
import HomepageSeatsSection from "./sections/seats.section";
import HomepageEscortsSection from "./sections/escorts.section";
import HomepageBlogSection from "./sections/blog.section";
import OmrahOnDemandSection from "./sections/omrah-on-demand.section";

export type PageProps = JouryCMS.Theme.PageProps & {};

const ThemePage_Client: React.FC<PageProps> = ({ route }) => {
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <ReactQueryDevtoolsProvider>
      <DefaultLayout route={route}>
        <HomepageHeroSection />
        <HomepageContentSection />
        <OmrahOnDemandSection />
        <HomepageEscortsSection />
        <HomepageSeatsSection />
        <HomepageCallToActionSection />
        <HomepageBlogSection />
        <HomepagePartnersSection />
      </DefaultLayout>
    </ReactQueryDevtoolsProvider>
  );
};

export default ThemePage_Client;
