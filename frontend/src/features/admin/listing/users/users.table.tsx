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
              <span className="text-sm font-medium text-text-700">
                {
                  info.row.original.role === 'admin' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path fill="currentColor" d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm9 6h1v5h-8v-5h1v-1a3 3 0 0 1 6 0v1zm-2 0v-1a1 1 0 0 0-2 0v1h2z" />
                    </svg>
                  )
                    : info.row.original.role === 'agency' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path fill="currentColor" d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm9 6h1v5h-8v-5h1v-1a3 3 0 0 1 6 0v1zm-2 0v-1a1 1 0 0 0-2 0v1h2z" />
                      </svg>
                    )
                      : info.row.original.role === 'doctor' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
                          <path fill="currentColor"
                            d="M111 412a46 46 0 0 0-14 33l1 8a24 24 0 0 0 4 8l4 4 7 1v-9a4 4 0 0 1-3-1l-1-2-2-4v-5a37 37 0 0 1 7-22 46 46 0 0 1 23-17 34 34 0 0 1 22 1c6 3 12 7 16 11 5 5 8 11 9 16 2 4 2 8 2 11v5l-1 3-1 2-2 1-2 1v9a14 14 0 0 0 10-3l3-4 2-6 1-8-2-14-7-13c-4-6-10-12-17-16a48 48 0 0 0-24-7 45 45 0 0 0-35 17z" />
                          <path fill="currentColor"
                            d="M166 452c-2 1-3 3-3 5v8c0 2 1 4 3 5 1 2 3 2 5 2l6-2v-18l-6-1c-2-1-4 0-5 1zm-44-1-6 1v18l6 2a7 7 0 0 0 8-7v-8a7 7 0 0 0-8-6z" />
                          <path fill="currentColor"
                            d="M453 430a82 82 0 0 0-31-46l-21-12-33-13a174 174 0 0 1-34-17l-8-8c-2-3-3-7-3-11a85 85 0 0 1 2-32c5-5 9-12 13-19l12-27a49 49 0 0 0 22-19 82 82 0 0 0 11-35c0-6-1-11-4-16-1-4-3-7-6-10a233 233 0 0 0 8-52 127 127 0 0 0-8-44 68 68 0 0 0-45-38 95 95 0 0 0-22-20c-5-3-11-5-17-6l-17-2a281 281 0 0 0-37 4l-9 2a46 46 0 0 1-6 0h-6a126 126 0 0 1-27-7l-2-1-2-1h-1a9 9 0 0 0-4 1l-3 1-3 2-7 6a109 109 0 0 0-15 19l-4 8a202 202 0 0 0-13 66 204 204 0 0 0 4 40l1 3v8l2 9-7 11a39 39 0 0 0-3 26c1 7 3 13 6 18 4 8 8 15 14 19 4 4 8 6 12 8l12 27c4 7 8 14 13 19a107 107 0 0 1 2 32l-2 7c-1 4-3 7-6 10l-11 8-15 7-31 11-25 12-17 13c-8 7-15 16-20 27-4 12-7 25-7 41l1 6 3 5c2 3 5 6 9 8 6 5 14 9 24 13 16 6 37 11 64 15a719 719 0 0 0 264-15 130 130 0 0 0 24-12l9-9 3-5 1-6c0-11-1-21-4-29zm-126-72-50 78-5-38 14-15-9-15 38-21a49 49 0 0 0 12 11zM183 87c45 10 134-9 134-9s1 22 16 42c6 8 11 20 14 32-1-2-3-2-6-3-8-1-20-2-33-1-38 2-35 5-51 5s-12-3-50-5c-13-1-25 0-33 1-4 1-6 1-7 4 0 1 0 2-2 3 5-16 17-36 18-69zm157 89c0 1 0 23-15 30a41 41 0 0 1-36 0c-6-3-10-8-12-14l-1-5c-1-4-4-16 3-21 4-4 18-6 31-6 11 0 23 2 27 5 2 3 3 7 3 11zm-101 11-1 5c-2 6-6 11-12 14-5 3-11 4-18 4-6 0-13-1-18-4-15-7-15-29-15-30 0-4 1-8 3-11 3-3 16-5 27-5 13 0 27 2 31 6 7 5 4 17 3 21zm-50 77c-4-7-8-16-12-28l-2-3-3-2a34 34 0 0 1-18-14 65 65 0 0 1-8-26c0-3 0-7 2-10 1-3 3-5 6-7l8 11c2 2 3 0 3-4 2 9 6 24 20 32 20 11 51 7 61-17 4-11 4-22 11-22s8 11 12 22c10 24 41 28 61 17s20-38 20-39 1-2 3-2l2 12 5-9 4 7a23 23 0 0 1 2 14l-5 15c-3 6-6 11-10 14-3 3-7 5-11 6l-3 2-2 3a155 155 0 0 1-23 45l-2 2-1 2a130 130 0 0 0-3 39l3 12 1 1-51 27-57-26 4-14v-10c0-11-2-21-3-29l-1-2-2-2c-4-4-8-10-11-17zm-1 92 8-8 43 20-9 15 14 15-5 36-55-75 4-3zm252 103-4 5-8 5-23 9c-15 5-35 9-59 12a732 732 0 0 1-248-15 109 109 0 0 1-20-10l-5-5a5 5 0 0 1-1-1c0-10 1-18 3-25a65 65 0 0 1 24-36l19-11 23-9v17h11v-21l22-9 87 119 75-118 1 1 7 17 2 21v44h-27v12h67v-12h-27v-44a96 96 0 0 0-6-34l28 11 23 10 14 11c7 6 12 13 16 22s6 20 6 34z" />
                        </svg>
                      )
                        : info.row.original.role === 'escort' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 200.7 200.7" fill="currentColor">
                            <path fill="currentColor" d="m191 111.6-.3-.3a22 22 0 0 0-9-5.9l-.6-.2a100.6 100.6 0 0 0-12.5-5c-5.2-2.5-5.7-4-5.8-4.2l-.3-.5.2-.5a36.8 36.8 0 0 0 7.5-15.5l.2-.3c1-1.4 1.7-3 2-4.7 1.2-4.4 1.2-7.6.2-9.8l-.1-.2v-.3c1.4-5.6 2.7-16.2-3.8-23.7-1-1.3-5-5.7-12.8-8l-3.8-1.2a52 52 0 0 0-10.7-2.4c-.4 0-.8 0-1.3.2h-1.4c-2 0-4.3 1-4.3 1-2.1.8-13.2 6-16.7 16.8-.6 1.5-1.8 6.2-.3 16.5v.4c-1.7 2.2-1.8 5.6-.5 10.2.4 2.1 1 3.7 2 5l.2.3a36 36 0 0 0 6.9 15.3l.3.4-.3.4a2 2 0 0 0-.3.6c-.5 1.6-4.7 4-11.2 6.6l-2.8-1-3.2-1.2c-6.9-3.4-7.8-5.4-7.9-5.8l-.4-.8.4-.8a49.6 49.6 0 0 0 10-20.8l.3-.5a13 13 0 0 0 2.6-6.2c1.7-5.9 1.7-10.2.3-13.2l-.2-.3.1-.3c1.8-7.7 3.6-21.9-5.2-31.8a34.2 34.2 0 0 0-17-10.7l-5.1-1.7a70.4 70.4 0 0 0-14.5-3.2c-.5 0-1 0-1.7.2l-.7.1a15 15 0 0 0-6.9 1.2C59.7 7 45 13.8 40.1 28.4c-.7 2-2.3 8.3-.3 22.1l.1.4-.3.4c-2 2.8-2.2 7.4-.5 13.6a14 14 0 0 0 2.7 6.6l.2.5a48.3 48.3 0 0 0 9.3 20.6l.5.5-.5.7-.3.8c-1.2 3.3-14.4 9.2-26 12.8-8.3 3.1-12 8.3-12 8.3-11.5 17-13 53.6-13 55.2.2 9.5 4.5 11.4 5.3 11.7l.8.3c25.3 11 62.4 13.2 66.6 13.5H74l3.6-.1h.5l.8.1h.2c1.7 0 41.5-2.4 66.3-13.5 1.4-.4 5.8-2.2 6.2-11.5 8.8-.8 30-3.2 44.4-9.7 1-.2 4.6-1.7 4.7-9.2-.2-3-1.6-28.7-9.7-40.9zM55 98.4l.7-.7.7.7c6 5.7 12.8 8.8 19 8.8 6.4 0 13-2.7 19.1-8l.6-.5 1.3.7a30 30 0 0 0 4.1 3l1.3.6-.2.1.5.3a60 60 0 0 0 7.8 3.6c.2.1 6.3 2 13.2 5.3l1.3.3c6.5 2.5 9.3 6 9.4 6.2 10.2 15.1 11.9 48.1 12 51.8 0 5.2-1.5 6.5-1.9 6.8-22.8 10.2-57.3 12.9-64 13.3h-.4l-.7-.1h-.3l-4.7.2h-1.1c-4.2-.3-41.4-2.7-65.2-13.3-.5-.2-1.9-1.9-2-6.6 0-.4 1.2-36 12-51.9.5-.7 3.4-4 9.2-6.3A99.3 99.3 0 0 0 51.4 102l1-.8c.4-.6 1.5-1.7 2.7-2.8zm71.2 8.9-1-.3-4.8-2a35.6 35.6 0 0 0 6.4-4l2-2 .5-.4.4.4a22 22 0 0 0 14.2 6.6c4.8 0 9.8-2.1 14.3-6l.4-.3.9.4c.8.8 2.3 2 3 2.3l.8.3v.1l.4.3a40.8 40.8 0 0 0 5.8 2.7c.2 0 4.7 1.5 9.8 3.9l1 .3c4.7 1.8 6.7 4.2 6.9 4.5 7.6 11.3 8.8 35.7 9 38.4-.1 3.8-1.2 4.8-1.4 5a152.7 152.7 0 0 1-43.5 9.5c-.8-11.2-3.6-37.6-12.8-51.4l-.4-.4a30 30 0 0 0-12-7.9zm-5.4-40.8.2-.2c.7-.5 1-1.4 1-2.2-1.8-10.3-.7-14.7-.3-15.7 3-9.2 12.4-13.5 14.3-14.3l1.8-.5h.3l1.4-.1v.1h.4l.9-.2h.4c.3 0 4 .4 9.5 2l3.8 1.4a21 21 0 0 1 10.7 6.6c5.5 6.3 4 15.8 2.6 20.9-.1.6 0 1.2.3 1.8l.3.4c.4.5.8 2.6-.4 7a5.8 5.8 0 0 1-1.5 3.2c-.3.3-.5.7-.5 1.2-1.9 11-11.7 23.3-22.1 23.3-8.8 0-18.9-11.3-20.7-23.3 0-.5-.3-.9-.6-1.2a6.5 6.5 0 0 1-1.5-3.6c-.9-3-1-5.6-.3-6.6zM44.2 54.6l.3-.3c1-.6 1.4-1.7 1.2-2.8-2.3-14-.8-19.8-.3-21.2C49.4 17.9 62.2 12 64.7 11a14 14 0 0 1 2.5-.6l.3-.1 2.1-.1v.1h.5l1.3-.2.5-.1c.4 0 5.3.6 12.7 2.8l5.1 1.8c9.4 2.8 13.7 8 14.5 9 7.5 8.5 5.5 21.3 3.6 28.2-.2.8 0 1.6.4 2.3l.4.5c.7 1 1 4-.6 9.7-.3 1.8-1 3.3-2 4.3-.3.4-.6 1-.7 1.5-2.5 15-15.8 31.5-29.9 31.5-12 0-25.5-15.3-28-31.5 0-.5-.3-1-.7-1.5-1-1-1.7-2.6-2-4.9-1.3-4.2-1.4-7.6-.5-9z" />
                          </svg>
                        )
                          : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
                              <path fill="currentColor" fillRule="evenodd" d="M12 12c2.7614 0 5-2.4624 5-5.5S14.7614 1 12 1 7 3.4624 7 6.5 9.2386 12 12 12Zm0-2.2c-1.6569 0-3-1.4775-3-3.3 0-1.8225 1.3431-3.3 3-3.3s3 1.4775 3 3.3c0 1.8225-1.3431 3.3-3 3.3Zm7.1029 4.3087c-.8425-.8453-2.1459-1.0276-3.1868-.41a33.026 33.026 0 0 0-.5125.3118c-.4099.253-.7281.4493-1.1382.6178C13.75 14.8401 13.0835 15 12 15c-1.0732 0-1.7507-.1509-2.274-.3553-.4625-.1807-.8278-.4077-1.3092-.7069a59.8519 59.8519 0 0 0-.2966-.1835c-1.0443-.6411-2.3856-.4921-3.256.3876-.3798.3837-.8238.88-1.1793 1.4207C3.346 16.0781 3 16.7638 3 17.5v2.5003C3 21.6574 4.3433 23 6 23h12c1.6567 0 3-1.3426 3-2.9997V17.5c0-.7459-.3553-1.4408-.7004-1.9609-.3626-.5464-.8144-1.0468-1.1967-1.4304Zm-2.1662 1.31c.2392-.1419.5413-.1071.7496.1018.3351.3363.6861.7316.9468 1.1245.2782.4192.3669.707.3669.855v2.5003c0 .5521-.4475.9997-1 .9997H6c-.5525 0-1-.4476-1-.9997V17.5c0-.1451.0855-.4271.3561-.8387.254-.3865.5975-.7769.9297-1.1126.2083-.2106.5253-.2513.788-.0899.0828.0507.167.1033.2531.1571.4825.3012 1.0223.6381 1.6715.8917C9.793 16.8181 10.7242 17 12 17c1.3002 0 2.2313-.1954 3.0254-.5217.5752-.2363 1.0825-.5501 1.5304-.8271.1321-.0817.259-.1602.3809-.2325Z" clipRule="evenodd" />
                            </svg>
                          )

                }
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