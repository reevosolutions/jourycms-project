import * as React from "react";
import DefaultLayout from "../../layouts/default.layout";
import HomepageCallToActionSection from "./sections/account-call-to-action.section";
import HomepageBlogSection from "./sections/blog.section";
import HomepageContentSection from "./sections/content.section";
import HomepageEscortsSection from "./sections/escorts.section";
import HomepageHeroSection from "./sections/hero.section";
import OmrahOnDemandSection from "./sections/omrah-on-demand.section";
import OrderVisaSection from "./sections/order-visa.section";
import HomepagePartnersSection from "./sections/partners.section";
import HomepageSeatsSection from "./sections/seats.section";

export type PageProps = JouryCMS.Theme.PageProps & {};

const ThemePage_Client_Default: React.FC<PageProps> = ({route}) => {
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <DefaultLayout route={route}>
      <HomepageHeroSection />
      <HomepageContentSection />
      <OmrahOnDemandSection />
      <OrderVisaSection />
      <HomepageEscortsSection />
      <HomepageSeatsSection />
      <HomepageCallToActionSection />
      <HomepageBlogSection />
      <HomepagePartnersSection />
    </DefaultLayout>
  );
};

export default ThemePage_Client_Default;
