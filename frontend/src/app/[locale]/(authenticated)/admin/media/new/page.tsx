"use client";

import { adminRoutes } from "@/config";
import AdminLayout from "@/features/admin/layout";
import UnderConstrunction from "@/features/admin/presentation/under-construction";
import { getRouteTree } from "@/lib/routes";

const ROUTE = adminRoutes.settings;
const ROUTE_PARENTS = getRouteTree(ROUTE, adminRoutes);
const PARENT_ROUTE =
  ROUTE_PARENTS.length > 1
    ? ROUTE_PARENTS.at(-2)
    : undefined;
const QUERY_ID = ROUTE.path;

export default function Page() {

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <AdminLayout.PageLayout title="إدارة الموقع">
      <UnderConstrunction />
    </AdminLayout.PageLayout>
  );
}
