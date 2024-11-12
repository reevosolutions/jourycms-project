import { publicRoutes } from "@/config";
import DesignPage from "@/themes/miqat/pages/design";

const ROUTE = publicRoutes.homepage;

export default function Home() {
  return <DesignPage  route={ROUTE} />;
}
