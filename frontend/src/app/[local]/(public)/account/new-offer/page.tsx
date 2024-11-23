import { publicRoutes } from "@/config";
import ThemePage from "@/themes/miqat/pages/user-dashboard/new-offer";

const ROUTE = publicRoutes.homepage._.myAccount._.newOffer;


export default function Page() {
  return <ThemePage route={ROUTE} />;
}
