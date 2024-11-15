import * as React from "react";
import DefaultLayout from "../../layouts/default.layout";
import ContentSection from "../../components/content.section.client";
import { ArticleTypeSlug } from "../../config";
import { ReactQueryDevtoolsProvider } from "@/lib/utils/dev-tools/react-query-dev-tools";


export type PageProps = JouryCMS.Theme.PageProps & {};

const ThemePage_Client: React.FC<PageProps> = ({ route }) => {
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <ReactQueryDevtoolsProvider>
      <DefaultLayout route={route}>
        <div className="container mx-auto">
          <ContentSection articleTypeSlug={ArticleTypeSlug.TOMBOLA} count={12} showPagination />
        </div>
      </DefaultLayout>
    </ReactQueryDevtoolsProvider>
  );
};

export default ThemePage_Client;
