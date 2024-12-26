"use client";

import {
  type ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  type RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import {format} from "date-fns";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {LuClipboard, LuExternalLink, LuEye, LuPencil, LuTrash2} from "react-icons/lu";
import {Checkbox} from "@/components/ui/checkbox";
import {adminRoutes} from "@/config";
import initLogger, {LoggerContext} from "@/lib/logging";
import {setPathParams} from "@/lib/routes";
import {CopyToClipboard} from "react-copy-to-clipboard";
import TanstackTable from "../common/tanstack-table";
import {buildUserFullName} from "@/lib/utilities/strings";
import {FaClipboardList} from "react-icons/fa";

const logger = initLogger(LoggerContext.FORM, "form");

import EntityAlias = Levelup.CMS.V1.Content.Entity.Form;
import ApiAlias = Levelup.CMS.V1.Content.Api.Forms;
import { toast } from "sonner";

type FormListProps = {
  data: Levelup.CMS.V1.Content.Entity.Form[];
  edge?: Levelup.CMS.V1.Content.Api.Forms.List.Response["edge"];
};

const FormListTable: React.FC<FormListProps> = ({data, edge}) => {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const {t: tLabel} = useTranslation("label");
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
  const loadExtraData = useCallback(() => {}, []);

  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {}, []);

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
        header: ({table}) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({row}) => (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      {
        id: "title",
        header: () => <span className="d">{tLabel("العنوان")}</span>,
        cell: info => {
          return (
            <div className="flex flex-col gap-1 py-2">
              <Link
                href={setPathParams(adminRoutes.forms._.entries.path, {
                  id: info.row.original._id,
                })}
                className="text-text-500 transition-all duration-200 hover:text-text-900 inline-block"
              >
                <span className="text-sm font-medium text-text-700 hocus:text-primary-700 transition-all">
                  {info.row.original.name}
                </span>
              </Link>

              <CopyToClipboard
                text={info.row.original.slug}
                onCopy={(text) => {
                  toast.success("تم نسخ المعرف", {});
                }}
              >
                <span className="text-xs text-text-500 hocus:text-primary-700 transition-all cursor-copy flex items-center gap-3">
                  {info.row.original.slug}
                  <LuClipboard className="w-4 h-4" />
                </span>
              </CopyToClipboard>
            </div>
          );
        },
      },
      {
        id: "created_by",
        header: () => <span className="d">{tLabel("بواسطة")}</span>,
        cell: info => {
          const user = info.row.original.created_by
            ? edge?.users?.[info.row.original.created_by]
            : null;
          return user ? (
            <span className="text-sm font-medium text-text-700">
              {buildUserFullName(user)}
            </span>
          ) : null;
        },
      },
      {
        id: "created_at",
        header: () => <span className="d">{tLabel("تاريخ الإنشاء")}</span>,
        cell: info => {
          return (
            <span className="text-sm font-medium text-text-700">
              {format(info.row.original.created_at || new Date(), "dd-MM-yyyy")}
            </span>
          );
        },
      },
      {
        id: "controls",
        header: () => <span className="d"></span>,
        cell: info => {
          return (
            <div className="flex justify-end gap-1 py-2">
              <Link
                href={setPathParams(adminRoutes.forms._.entries.path, {
                  id: info.row.original._id,
                })}
                className="p-1 text-text-500 transition-all duration-200 hover:text-text-900"
              >
                <FaClipboardList className="h5 w-5" />
              </Link>
              <Link
                href={setPathParams(adminRoutes.forms._.edit.path, {
                  id: info.row.original._id,
                })}
                className="p-1 text-text-500 transition-all duration-200 hover:text-text-900"
              >
                <LuPencil className="h5 w-5" />
              </Link>
              <Link
                href={"#"}
                className="p-1 text-red-500 transition-all duration-200 hover:text-red-700"
              >
                <LuTrash2 className="h5 w-5" />
              </Link>
            </div>
          );
        },
      },
    ],
    [edge?.users, tLabel],
  );

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: row => row._id,
    onRowSelectionChange: setRowSelection, //hoist up the row selection state to your own scope
    state: {
      rowSelection, //pass the row selection state back to the table instance
    },
  });

  /* -------------------------------------------------------------------------- */
  /*                                   RETURN                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="form-group upcms-table upcms-forms-table">
      <TanstackTable id={"form-list"} table={table} />
    </div>
  );
};

export default FormListTable;
