import * as React from "react";
import DefaultLayout from "../../layouts/default.layout";
import ContentSection from "../../components/content.section";
import { ArticleTypeSlug } from "../../config";


export type PageProps = JouryCMS.Theme.PageProps & {};

const ThemePage: React.FC<PageProps> = ({ route }) => {
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <DefaultLayout route={route}>
      <div className="container mx-auto">
        <ContentSection articleTypeSlug={ArticleTypeSlug.HEALTH_SERVICE} count={12} showPagination />
      </div>
    </DefaultLayout>
  );
};

export default ThemePage;
