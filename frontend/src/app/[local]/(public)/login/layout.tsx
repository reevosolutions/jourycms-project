import { publicRoutes } from "@/config";
import { getRouteTree } from "@/lib/routes/utills.routes";

import type { Metadata } from "next";

/**
 * Always define the ROUTE variable at the beginning of the page
 */
const ROUTE = publicRoutes.homepage._.login;
const ROUTE_PARENTS = getRouteTree(ROUTE, publicRoutes);
const PARENT_ROUTE =
  ROUTE_PARENTS.length > 1
    ? ROUTE_PARENTS.at(-2)
    : undefined;
const QUERY_ID = ROUTE.path;

export const metadata: Metadata = {
  title: ROUTE.title,
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}