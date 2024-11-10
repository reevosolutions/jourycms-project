import * as React from "react";
import DefaultLayout from "../../layouts/default.layout";
import ContentSection from "./sections/content.section";


export type PageProps = JouryCMS.Theme.PageProps & {};

const ThemePage: React.FC<PageProps> = ({ route }) => {
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <DefaultLayout route={route}>
      <div className="container mx-auto">
        <ContentSection />

      </div>
    </DefaultLayout>
  );
};

export default ThemePage;
