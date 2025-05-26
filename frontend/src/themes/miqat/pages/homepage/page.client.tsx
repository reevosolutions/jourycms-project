import { ReactQueryDevtoolsProvider } from "@/lib/utils/dev-tools/react-query-dev-tools";
import * as React from "react";
import ThemePage_Client_2 from "./page.client.variant-2";
import ThemePage_Client_3 from "./page.client.variant-3";
import ThemePage_Client_Default from "./page.client.variant-default";

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
