import { publicRoutes } from "@/config";
import ThemePage from "@/themes/miqat/pages/omarah";
import Image from "next/image";

const ROUTE = publicRoutes.homepage._.omrah;


export default function Page() {
  return <ThemePage route={ROUTE} />;
}
