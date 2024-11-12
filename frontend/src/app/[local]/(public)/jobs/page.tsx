import { publicRoutes } from "@/config";
import ThemePage from "@/themes/miqat/pages/jobs";
import Image from "next/image";

const ROUTE = publicRoutes.homepage._.jobs;


export default function Page() {
  return <ThemePage route={ROUTE} />;
}
