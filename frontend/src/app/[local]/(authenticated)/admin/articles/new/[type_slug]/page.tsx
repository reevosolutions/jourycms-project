import { adminRoutes } from "@/config";
import AdminLayout from "@/features/admin/layout";
import PostForm from "@/features/admin/post-editor/forms/post-form/post.form";
import { useSdk } from "@/hooks/use-sdk";
import { getRouteTree, setPathParams } from "@/lib/routes";
import { redirect, useRouter } from "next/navigation";

const ROUTE = adminRoutes.articles._.create;
const ROUTE_PARENTS = getRouteTree(ROUTE, adminRoutes);
const PARENT_ROUTE =
  ROUTE_PARENTS.length > 1
    ? ROUTE_PARENTS.at(-2)
    : undefined;
const QUERY_ID = ROUTE.path;

type PageProps = {
  params: Promise<{
    type_slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */
  const {type_slug} = (await params);

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
      <PostForm articleType_slug={type_slug}
        onSubmit={(article)=>{
           redirect(setPathParams(adminRoutes.articles._.edit.path, {id: article._id}));
        }}
      />
    </AdminLayout.PageLayout>
  );
}
