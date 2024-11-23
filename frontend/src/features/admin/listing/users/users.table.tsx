"use client";

import {
  type ColumnDef,
  getCoreRowModel,
  type RowSelectionState,
  useReactTable
} from "@tanstack/react-table";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuEye, LuPencil, LuTrash2 } from "react-icons/lu";

import { Checkbox } from "@/components/ui/checkbox";
import { adminRoutes } from "@/config";
import initLogger, { LoggerContext } from "@/lib/logging";
import { setPathParams } from "@/lib/routes";

import { buildUserFullName } from "@/lib/utilities/strings";
import TanstackTable from "../common/tanstack-table";

const logger = initLogger(LoggerContext.FORM, "article");

import EntityAlias = Levelup.CMS.V1.Users.Entity.ExposedUser;
import ApiAlias = Levelup.CMS.V1.Users.Api.Users;
import RoleIcon from "./role-icon";

type UserListProps = {
  data: Levelup.CMS.V1.Users.Entity.ExposedUser[];
  edge?: Levelup.CMS.V1.Users.Api.Users.List.Response["edge"];
};

const roleTranslation = {
  'admin': 'مدير الموقع',
  'agency': 'وكالة سياحية',
  'doctor': 'طبيب',
  'escort': 'مرافق',
  'user': 'مستخدم',
}

const UserListTable: React.FC<UserListProps> = ({
  data,
  edge,
}) => {
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
  const loadExtraData = useCallback(() => { }, []);

  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => { }, []);

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
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      {
        id: "role",
        header: () => <span className="d">{tLabel("الدور")}</span>,
        cell: info => {
          return (
            <div className="flex flex-row gap-3 py-2">
              <span className="text-sm font-medium text-text-700 block w-5">
                <RoleIcon role={info.row.original.role} />
              </span>
              <span className="d">{roleTranslation[info.row.original.role as 'user' || 'user']}</span>
            </div>
          );
        },
      },
      {
        id: "name",
        header: () => <span className="d">{tLabel("الإسم")}</span>,
        cell: info => {
          return (
            <div className="flex flex-col gap-1 py-2">
              <span className="text-sm font-medium text-text-700">
                {buildUserFullName(info.row.original.profile)}
              </span>
            </div>
          );
        },
      },
      {
        id: "email",
        header: () => <span className="d">{tLabel("البريد الالكتروني")}</span>,
        cell: info => {
          return (
            <div className="flex flex-col gap-1 py-2">
              <span className="text-sm font-medium text-text-700">
                {info.row.original.email}
              </span>
            </div>
          );
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
                href={setPathParams(`${adminRoutes.users._.edit.path}/:id`, { id: info.row.original._id })}
                className="p-1 text-text-500 transition-all duration-200 hover:text-text-900"
              >
                <LuEye className="h5 w-5" />
              </Link>
              <Link
                href={setPathParams(adminRoutes.users._.edit.path, {
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
    [tLabel],
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
    <div className="form-group upcms-table upcms-Users-table">
      <TanstackTable id={"User-list"} table={table} />
    </div>
  );
};

export default UserListTable;
