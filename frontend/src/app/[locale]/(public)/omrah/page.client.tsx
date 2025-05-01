import { publicRoutes } from "@/config";
import ThemePage_Client from "@/themes/miqat/pages/omrah/page.client";

const ROUTE = publicRoutes.homepage._.omrah;


export default function Page() {
  return <ThemePage_Client route={ROUTE} />;
}
