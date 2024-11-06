"use client";

import AdminLayout from "@/features/admin/layout";
import PostForm from "@/features/admin/post-editor/forms/post-form/form";
import { Tiptap } from "@/features/editors/tiptap";
import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { adminRoutes } from "@/config";
import { getRouteTree } from "@/lib/routes";
import { useSdk } from '@hooks/useSdk';

const ROUTE = adminRoutes.types;
const ROUTE_PARENTS = getRouteTree(ROUTE, adminRoutes);
const PARENT_ROUTE =
  ROUTE_PARENTS.length > 1
    ? ROUTE_PARENTS[ROUTE_PARENTS.length - 2]
    : undefined;
const QUERY_ID = ROUTE.path;


export default function Page() {
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
  const { } = useQuery({
    queryKey: [QUERY_ID],
    queryFn: async () => {
      const response = await fetch('/api/article-types');
      const data = await response.json();
      return data;
    },
  })

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
    <AdminLayout.PageLayout title="New post">
      <PostForm articleType={""}
      />
    </AdminLayout.PageLayout>
  );
}
