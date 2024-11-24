import { publicRoutes } from "@/config";
import ThemePage from "@/themes/miqat/pages/user-dashboard/edit-account";

const ROUTE = publicRoutes.homepage._.myAccount._.editAccount;


export default function Page() {
  return <ThemePage route={ROUTE} />;
}
