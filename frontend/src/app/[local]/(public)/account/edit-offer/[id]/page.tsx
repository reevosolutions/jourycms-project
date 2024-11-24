import { publicRoutes } from "@/config";
import ThemePage from "@/themes/miqat/pages/user-dashboard/edit-offer";

const ROUTE = publicRoutes.homepage._.myAccount._.newOffer;


export type PageProps = {
  params: Promise<{id: string}>;
};
export default async function Page({params}: PageProps) {
  const {id} = await params;
  return <ThemePage route={ROUTE} id={id}/>;
}
