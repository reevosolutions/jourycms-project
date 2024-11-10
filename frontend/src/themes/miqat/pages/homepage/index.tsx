import * as React from "react";
import DefaultLayout from "../../layouts/default.layout";
import HomepageHeroSection from "./sections/hero.section";
import HomepageContentSection from "./sections/content.section";
import HomepageCallToActionSection from "./sections/account-call-to-action.section";
import HomepagePartnersSection from "./sections/partners.section";
import HomepageSeatsSection from "./sections/seats.section";
import HomepageEscortsSection from "./sections/escorts.section";

export type PageProps = JouryCMS.Theme.PageProps & {};

const Homepage: React.FC<PageProps> = ({ route }) => {
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <DefaultLayout
      {...{route}}
    >
      <HomepageHeroSection />
      <HomepageContentSection />
      <HomepageEscortsSection />
      <HomepageSeatsSection />
      <HomepageCallToActionSection />
      <HomepagePartnersSection />
    </DefaultLayout>
  );
};

export default Homepage;
