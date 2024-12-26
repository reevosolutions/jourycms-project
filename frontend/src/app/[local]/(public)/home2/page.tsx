import { publicRoutes } from "@/config";
import ThemePage_Client from "@/themes/miqat/pages/homepage/page.client";

const ROUTE = publicRoutes.homepage;

export default function Home() {
  return <ThemePage_Client {...{ route: ROUTE }} variant="2" />;
}
