"use client";

import AdminLayout from "@/features/admin/layout";
import PostForm from "@/features/admin/post-editor/forms/post-form/post.form";
import { Tiptap } from "@/features/editors/tiptap";
import React, { useCallback, useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { adminRoutes } from "@/config";
import { getRouteTree } from "@/lib/routes";
import { count } from "console";
import { useSdk } from "@/hooks/use-sdk";
import { Button } from "@/components/ui/button";
import mock from "@/lib/mock/generators";

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
  const { data, error, isFetching, isFetched, isPending, refetch } = useQuery({
    queryKey: [QUERY_ID],
    queryFn: async () => {
      const data = await sdk.content.articleTypes.list({
        count: -1,
        filters: {

        }
      });

      return data;
    },
  })

  /* -------------------------------------------------------------------------- */
  /*                                   NETHODS                                  */
  /* -------------------------------------------------------------------------- */
  const seedData = useCallback(async () => {
    for (const type of mock.content.seedTypes()) {
      try {
        await sdk.content.articleTypes.create({ data: type });
      } catch (error) {

      }
    }
    refetch();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */


  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <AdminLayout.PageLayout title="New post">
      <div className="flex gap-2 justify-end">
        <Button onClick={() => refetch()}>Refresh</Button>
        <Button onClick={() => seedData()}>Seed</Button>
      </div>
    </AdminLayout.PageLayout>
  );
}
