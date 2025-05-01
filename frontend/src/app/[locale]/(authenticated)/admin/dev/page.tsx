"use client";

import {Button} from "@/components/ui/button";
import {adminRoutes} from "@/config";
import AdminDashboardPage from "@/features/admin/dashboard";
import AdminLayout from "@/features/admin/layout";
import UnderConstrunction from "@/features/admin/presentation/under-construction";
import {useSdk} from "@/hooks/use-sdk";
import {getRouteTree} from "@/lib/routes";
import {useEffect} from "react";
import {toast} from "sonner";

const ROUTE = adminRoutes.settings;
const ROUTE_PARENTS = getRouteTree(ROUTE, adminRoutes);
const PARENT_ROUTE =
  ROUTE_PARENTS.length > 1 ? ROUTE_PARENTS.at(-2) : undefined;
const QUERY_ID = ROUTE.path;

export default function Page() {
  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const sdk = useSdk();

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <AdminLayout.PageLayout title="إدارة الموقع">
      <div className="flex min-h-screen-80 flex-col items-center justify-center">
        <div className="d">
          <Button
            onClick={() => {
              sdk.emit("jwt-token-expired");
            }}
          >
            Trigger JWT Expired
          </Button>
        </div>
      </div>
    </AdminLayout.PageLayout>
  );
}
