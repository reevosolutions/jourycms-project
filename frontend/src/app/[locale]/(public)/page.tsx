import {publicRoutes} from "@config/index";
import ThemePage_Client from "@/themes/miqat/pages/homepage/page.client";
import ThemePage_Server from "@/themes/miqat/pages/inscription/page.server";
import {redirect} from 'next/navigation';

const ROUTE = publicRoutes.homepage;

const INSCRIPTIONS_PERIOD = true;

export default function Home() {
  return INSCRIPTIONS_PERIOD ? redirect('/dz') : <ThemePage_Client {...{route: ROUTE}} variant="3" />;
}
