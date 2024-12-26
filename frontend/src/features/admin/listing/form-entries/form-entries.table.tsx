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
import {
  LuCheck,
  LuCheckCircle,
  LuExternalLink,
  LuEye,
  LuPencil,
  LuTrash2,
} from "react-icons/lu";

import {Checkbox} from "@/components/ui/checkbox";
import {adminRoutes} from "@/config";
import initLogger, {LoggerContext} from "@/lib/logging";
import {setPathParams} from "@/lib/routes";

import TanstackTable from "../common/tanstack-table";

const logger = initLogger(LoggerContext.FORM, "formEntry");

import EntityAlias = Levelup.CMS.V1.Content.Entity.FormEntry;
import ApiAlias = Levelup.CMS.V1.Content.Api.FormEntries;
import {buildUserFullName} from "@/lib/utilities/strings";
import {useSdk} from "@/hooks/use-sdk";
import {cn} from "@/lib/utils";

type FormEntryListProps = {
  data: Levelup.CMS.V1.Content.Entity.FormEntry[];
  form?: Levelup.CMS.V1.Content.Entity.Form | null;
  edge?: Levelup.CMS.V1.Content.Api.FormEntries.List.Response["edge"];
};

const FormEntryListTable: React.FC<FormEntryListProps> = ({
  form,
  data: _data,
  edge,
}) => {
  /* -------------------------------------------------------------------------- */
  /*                                   CONFIG                                   */
  /* -------------------------------------------------------------------------- */

  /* -------------------------------------------------------------------------- */
  /*                                    TOOLS                                   */
  /* -------------------------------------------------------------------------- */
  const {t: tLabel} = useTranslation("label");
  const router = useRouter();
  const sdk = useSdk();

  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({}); // manage your own row selection state
  const [data, setData] = useState<Levelup.CMS.V1.Content.Entity.FormEntry[]>(
    [],
  );
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
  const handleToggleHendled = useCallback(
    async (item: EntityAlias) => {
      try {
        const {data} = await sdk.content.formEntries.update(item._id, {
          data: {
            is_handled: !item.is_handled,
          },
        });
        setData(old =>
          old.map(element => (element._id === item._id ? data : element)),
        );
        loadExtraData();
      } catch (error) {
        logger.error("handleToggleHendled", error);
      }
    },
    [loadExtraData, sdk.content.formEntries],
  );

  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    setData(_data);
  }, [_data]);

  /* -------------------------------------------------------------------------- */
  /*                                    TABLE                                   */
  /* -------------------------------------------------------------------------- */
  const columnHelper = createColumnHelper<EntityAlias>();

  const columns = useMemo<ColumnDef<EntityAlias, any>[]>(() => {
    const customColumns: ColumnDef<EntityAlias, unknown>[] = [];
    const form = Object.values(edge?.forms || {})[0];
    if (
      form?.settings &&
      form.settings.shown_fields_on_dashboard &&
      (form?.settings?.shown_fields_on_dashboard || []).length > 0
    ) {
      for (const field_key of form.settings.shown_fields_on_dashboard) {
        const field = form.fields.find(f => f.field_key === field_key);
        if (!field) continue;

        customColumns.push({
          id: field_key,
          header: () => <span className="d">{field.field_label}</span>,
          cell: info => {
            const value = info.row.original.data[field_key];
            return (
              <span className="text-sm font-medium text-text-700">{value}</span>
            );
          },
        });
      }
    }
    return [
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
          ) : (
            <span className="text-sm font-medium text-text-500">
              {tLabel("guest")}
            </span>
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
      ...customColumns,
      {
        id: "controls",
        header: () => <span className="d"></span>,
        cell: info => {
          return (
            <div className="flex justify-end gap-1 py-2">
              <button
                className={cn(
                  "p-1 text-text-500 transition-all duration-200",
                  info.row.original.is_handled
                    ? "text-green-500 hover:text-red-500"
                    : "text-gray-500 hover:text-green-700",
                )}
                onClick={() => {
                  handleToggleHendled(info.row.original);
                }}
              >
                {info.row.original.is_handled ? (
                  <LuCheckCircle className="h5 w-5" />
                ) : (
                  <LuCheck className="h5 w-5" />
                )}
              </button>
              <Link
                href={setPathParams(
                  adminRoutes.forms._.entries._.details.path,
                  {
                    id: info.row.original._id,
                  },
                )}
                className="p-1 text-text-500 transition-all duration-200 hover:text-text-900"
              >
                <LuExternalLink className="h5 w-5" />
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
    ];
  }, [edge?.forms, edge?.users, handleToggleHendled, tLabel]);

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
    <div className="form-group upcms-table upcms-formEntrys-table">
      <TanstackTable
        id={"formEntry-list"}
        table={table}
        getRowClassName={row => {
          return row.original.is_handled
            ? " bg-slate-50 text-slate-600"
            : " font-medium text-text-700";
        }}
      />
    </div>
  );
};

export default FormEntryListTable;
