import * as React from "react";
import DefaultLayout from "../../layouts/default.layout";
import { ArticleTypeSlug } from "../../config";
import ContentSection from "../../components/content.section";


export type PageProps = JouryCMS.Theme.PageProps & {};

const ThemePage: React.FC<PageProps> = ({ route }) => {
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <DefaultLayout route={route}>
      <div className="container mx-auto">
      <ContentSection articleTypeSlug={ArticleTypeSlug.TOMBOLA} count={12} showPagination />
      </div>
    </DefaultLayout>
  );
};

export default ThemePage;
