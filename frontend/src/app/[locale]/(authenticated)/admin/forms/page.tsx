import {adminRoutes} from "@/config";
import AdminLayout from "@/features/admin/layout";
import Listing from "@/features/admin/listing";
import {useSdk} from "@/hooks/use-sdk";
import {getRouteTree} from "@/lib/routes";

const ROUTE = adminRoutes.forms._.list;
const ROUTE_PARENTS = getRouteTree(ROUTE, adminRoutes);
const PARENT_ROUTE =
  ROUTE_PARENTS.length > 1 ? ROUTE_PARENTS.at(-2) : undefined;
const QUERY_ID = ROUTE.path;

type PageProps = {
  params: Promise<{
    type_slug: string;
  }>;
};

export default async function Page({params}: PageProps) {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */
  const {type_slug} = await params;

  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /*                                    QUERY                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   NETHODS                                  */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <AdminLayout.PageLayout>
      <Listing.Forms.FormList  />
    </AdminLayout.PageLayout>
  );
}
