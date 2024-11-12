import { publicRoutes } from "@/config";
import ThemePage from "@/themes/miqat/pages/auth/login";
import Image from "next/image";

const ROUTE = publicRoutes.homepage._.login;


export default function Page() {
  return <ThemePage route={ROUTE} />;
}
