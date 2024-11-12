import { publicRoutes } from "@/config";
import ThemePage from "@/themes/miqat/pages/health-services";
import Image from "next/image";

const ROUTE = publicRoutes.homepage._.healthServices;


export default function Page() {
  return <ThemePage route={ROUTE} />;
}
