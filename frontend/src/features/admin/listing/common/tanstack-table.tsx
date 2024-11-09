import { RowData, Table, flexRender } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";
import Icons from "../../ui/icons";

type Props<TData> = {
  id: string;
  table: Table<TData>;
  headerGrouped?: boolean;
  sortable?: boolean;
  className?: string;
};

const TanstackTable = <TData extends RowData>({ id, className = "", table, headerGrouped, sortable = true }: Props<TData>) => {
  const { t: tLabel } = useTranslation("label");
  return (
    <div className={`up-table relative ${id} ${className} ${headerGrouped ? "header-grouped" : ""}`}>
      <table className="w-full table-auto text-left rtl:text-right">
        <thead className="overflow-hidden text-xs uppercase text-foreground-900">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={`px-2 py-3 ${header.isPlaceholder ? "placeholder" : ""} ${header.id}`} colSpan={header.colSpan} scope="col">
                  {header.isPlaceholder ? null : (
                    <div
                      className={sortable && header.column.getCanSort() ? "flex cursor-pointer select-none items-center gap-3" : ""}
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === "asc"
                            ? tLabel("Sort ascending")
                            : header.column.getNextSortingOrder() === "desc"
                              ? tLabel("Sort descending")
                              : tLabel("Clear sort")
                          : undefined
                      }
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <Icons.Chevron.Up className="h-5 w-5 text-foreground-500" />,
                        desc: <Icons.Chevron.Down className="h-5 w-5 text-foreground-500" />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b border-background-800 bg-background hocus:bg-foreground-100/50">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={`${cell.column.id}`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TanstackTable;
