import { publicRoutes } from "@/config";
import ThemePage from "@/themes/miqat/pages/auth/register";
import Image from "next/image";

const ROUTE = publicRoutes.homepage._.rgister;


export default function Page() {
  return <ThemePage route={ROUTE} />;
}
