import { publicRoutes } from "@/config";
import ThemePage_Client from "@/themes/miqat/pages/hajj/page.client";

const ROUTE = publicRoutes.homepage._.hajj;


export default function Page() {
  return <ThemePage_Client route={ROUTE} />;
}
