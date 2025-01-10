import { publicRoutes } from "@/config";
import ThemePage from "@/themes/miqat/pages/user-dashboard/change-password";

const ROUTE = publicRoutes.homepage._.myAccount._.changePassword;


export default function Page() {
  return <ThemePage route={ROUTE} />;
}
