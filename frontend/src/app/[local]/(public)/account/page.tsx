import { publicRoutes } from "@/config";
import ThemePage from "@/themes/miqat/pages/account";
import Image from "next/image";

const ROUTE = publicRoutes.homepage._.myAccount;


export default function Page() {
  return <ThemePage route={ROUTE} />;
}
