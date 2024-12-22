import { publicRoutes } from "@/config";
import ThemePage_Client from "@/themes/miqat/pages/visa/page.client";

const ROUTE = publicRoutes.homepage._.visa;


export default function Page() {
  return <ThemePage_Client route={ROUTE} />;
}
