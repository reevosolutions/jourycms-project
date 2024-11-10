import * as React from "react";
import DefaultLayout from "../../../layouts/default.layout";


export type PageProps = JouryCMS.Theme.PageProps & {};

const ThemePage: React.FC<PageProps> = ({ route }) => {
  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <DefaultLayout route={route}>
      <div className="container mx-auto">
        login
      </div>
    </DefaultLayout>
  );
};

export default ThemePage;
