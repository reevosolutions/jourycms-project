
import { adminRoutes } from "@/config";
import AdminLayout from "@/features/admin/layout";
import PostForm from "@/features/admin/post-editor/forms/post-form/post.form";
import { useSdk } from "@/hooks/use-sdk";
import { getRouteTree } from "@/lib/routes";

const ROUTE = adminRoutes.articles._.create;
const ROUTE_PARENTS = getRouteTree(ROUTE, adminRoutes);
const PARENT_ROUTE =
  ROUTE_PARENTS.length > 1
    ? ROUTE_PARENTS[ROUTE_PARENTS.length - 2]
    : undefined;
const QUERY_ID = ROUTE.path;


type PageProps = {
  params: Promise<{
    type_slug: string;
  }>
}

export default async function Page({ params }: PageProps) {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */
  const type_slug = (await params).type_slug;

  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const sdk = useSdk();

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
    <AdminLayout.PageLayout >
      <PostForm articleType_slug={type_slug} />
    </AdminLayout.PageLayout>
  );
}
