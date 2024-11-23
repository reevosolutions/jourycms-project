import { publicRoutes } from "@/config";
import ThemePage from "@/themes/miqat/pages/user-dashboard/account";

const ROUTE = publicRoutes.homepage._.myAccount;


export default function Page() {
  return <ThemePage route={ROUTE} />;
}
