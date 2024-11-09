
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
    id: string;
  }>
}

export default async function Page({ params }: PageProps) {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */
  const article_id = (await params).id;

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
      <PostForm article_id={article_id} />
    </AdminLayout.PageLayout>
  );
}
