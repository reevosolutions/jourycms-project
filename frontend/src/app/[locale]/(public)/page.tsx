import {publicRoutes} from "@config/index";
import ThemePage_Client from "@/themes/miqat/pages/homepage/page.client";
import ThemePage_Server from "@/themes/miqat/pages/inscription/page.server";

const ROUTE = publicRoutes.homepage;

export default function Home() {
  return <ThemePage_Server {...{route: ROUTE}} />;
}
