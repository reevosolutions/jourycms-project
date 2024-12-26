import {adminRoutes} from "@/config";
import AdminLayout from "@/features/admin/layout";
import Listing from "@/features/admin/listing";
import {useSdk} from "@/hooks/use-sdk";
import {getRouteTree} from "@/lib/routes";

const ROUTE = adminRoutes.forms._.entries;
const ROUTE_PARENTS = getRouteTree(ROUTE, adminRoutes);
const PARENT_ROUTE =
  ROUTE_PARENTS.length > 1 ? ROUTE_PARENTS.at(-2) : undefined;
const QUERY_ID = ROUTE.path;

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({params}: PageProps) {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */
  const {id} = await params;

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
      <Listing.FormEntries.FormEntryList form_id={id} />
    </AdminLayout.PageLayout>
  );
}
