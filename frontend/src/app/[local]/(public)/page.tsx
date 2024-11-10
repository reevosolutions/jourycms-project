import { publicRoutes } from "@/config";
import Homepage from "@/themes/miqat/pages/homepage";
import Image from "next/image";

const ROUTE = publicRoutes.homepage;

export default function Home() {
  return <Homepage {...{ route: ROUTE }} />;
}
