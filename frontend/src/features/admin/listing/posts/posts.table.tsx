"use client";

import { useSdk } from "@/hooks/use-sdk";
import initLogger, { LoggerContext } from "@/lib/logging";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table';

const logger = initLogger(LoggerContext.FORM, 'article');

import EntityAlias = Levelup.CMS.V1.Content.Entity.Article;
import ApiAlias = Levelup.CMS.V1.Content.Api.Articles;
import { Checkbox } from "@/components/ui/checkbox";
import TanstackTable from "../common/tanstack-table";
import { setPathParams } from "@/lib/routes";
import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";
import Link from "next/link";
import { adminRoutes } from "@/config";
import { format } from "date-fns";

type PostListProps = {
  data: Levelup.CMS.V1.Content.Entity.Article[];
  articleType?: Levelup.CMS.V1.Content.Entity.ArticleType | null;
  edge?: Levelup.CMS.V1.Content.Api.Articles.List.Response['edge'];
};

const PostListTable: React.FC<PostListProps> = ({ articleType, data, edge }) => {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const { t: tLabel } = useTranslation("label");
  const router = useRouter();

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({}); // manage your own row selection state

  /* -------------------------------------------------------------------------- */
  /*                                    QUERY                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    FORMS                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                   METHODS                                  */
  /* -------------------------------------------------------------------------- */
  const loadExtraData = useCallback(() => {

  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                    TABLE                                   */
  /* -------------------------------------------------------------------------- */
  const columns = useMemo<ColumnDef<EntityAlias, any>[]>(
    () => [
      {
        id: "select-col",
        size: 24,
        meta: {
          className: "select-col py-2",

        },
        header: ({ table }) => <Checkbox checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()} />,
        cell: ({ row }) => <Checkbox checked={row.getIsSelected()} disabled={!row.getCanSelect()} onChange={row.getToggleSelectedHandler()} />,
      },
      {
        id: "title",
        header: () => <span className="d">{tLabel("Title")}</span>,
        cell: (info) => {
          return (
            <div className="flex gap-1 flex-col py-2 ">
              <span className="text-sm font-medium text-text-700">{info.row.original.title}</span>

            </div>
          );
        },
      },
      {
        id: "created_at",
        header: () => <span className="d">{tLabel("Created at")}</span>,
        cell: (info) => {
          return (
            <span className="text-sm font-medium text-text-700">{format(info.row.original.created_at || new Date(), 'dd-MM-yyyy')}</span>
          );
        },
      },
      {
        id: "controls",
        header: () => <span className="d"></span>,
        cell: (info) => {
          return (
            <div className="flex gap-1 justify-end  py-2 ">
              <Link
                href={setPathParams('/:slug', { slug: info.row.original.slug })}
                className=" text-text-500 hover:text-text-900 duration-200 transition-all p-1"
              >
                <LuEye className="w-5 h5" />
              </Link>
              <Link
                href={setPathParams(adminRoutes.articles._.edit.path, { id: info.row.original._id })}
                className=" text-text-500 hover:text-text-900 duration-200 transition-all p-1"
              >
                <LuPencil className="w-5 h5" />
              </Link>
              <Link
                href={'#'}
                className=" text-red-500 hover:text-red-700 duration-200 transition-all p-1"
              >
                <LuTrash2 className="w-5 h5" />
              </Link>
            </div>
          );
        },
      }
    ],
    []
  );

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row._id,
    onRowSelectionChange: setRowSelection, //hoist up the row selection state to your own scope
    state: {
      rowSelection, //pass the row selection state back to the table instance
    },
  });

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="form-group upcms-table upcms-posts-table">
      <TanstackTable id={'post-list'} table={table} />
    </div>
  );
};

export default PostListTable;
