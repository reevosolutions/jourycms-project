import clsx from "clsx";
import { buildPaginationRange, DOTS } from "@hooks/use-pagination";
import { last } from "lodash";
import React from "react";
import Icons from "@/features/admin/ui/icons";

const CustomPagination_Client: React.FC<{
  onPageChange: (page: number) => void;
  totalCount?: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
}> = ({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className }) => {
  const paginationRange = buildPaginationRange({
    currentPage,
    totalCount: totalCount || 0,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1 <= (lastPage as number) ? currentPage + 1 : currentPage);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1 > 0 ? currentPage - 1 : 1);
  };

  const onPage = (page: number) => {
    onPageChange(page);
  };

  if (!paginationRange) {
    return null;
  }

  let lastPage = paginationRange.at(-1);
  return (
    <ul className={clsx("pagination-container", "my-8 flex justify-center items-center space-x-1", className)}>
      <li
        className={clsx("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div
          className={clsx("pagination-item min-w-[28px] rounded-full p-2 text-center ", {
            "selected bg-white text-beige-700": currentPage === 1,
            " cursor-pointer bg-white/40 text-beige-500 transition-colors duration-500 hover:bg-beige-50 hover:text-beige-700   ":
              currentPage !== 1,
          })}
        >
          <Icons.Chevron.Left className="h-5 w-5 text-beige-500  rtl:rotate-180" />
        </div>
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={`${pageNumber}${index}`} className="pagination-item dots px-2 text-beige-400">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={`${pageNumber}${index}`}
            className={clsx("pagination-item min-w-[36px] rounded-full px-2 py-1 text-center ", {
              "selected bg-beige-50/50 text-beige-600": pageNumber === currentPage,
              " cursor-pointer bg-white/40 text-beige-500 transition-colors duration-500 hover:bg-beige-50 hover:text-beige-700   ":
                pageNumber !== currentPage,
            })}
            onClick={() => onPage(pageNumber as number)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={clsx("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div
          className={clsx("pagination-item min-w-[28px] rounded-full p-2 text-center ", {
            "selected bg-white text-beige-700": currentPage === lastPage,
            " cursor-pointer bg-white/40 text-beige-500 transition-colors duration-500 hover:bg-beige-50 hover:text-beige-700   ":
              currentPage !== lastPage,
          })}
        >
          <Icons.Chevron.Right className="h-5 w-5 text-beige-500 rtl:rotate-180" />
        </div>
      </li>
      <li>
        <div className="rounded-full bg-white/40 px-2 hover:bg-beige-50 hover:text-beige-700  ">
          <select
            onChange={(event) => onPage(Number.parseInt(event.target.value))}
            className="cursor-pointer bg-transparent py-1  text-beige-500 transition-colors duration-500 hover:text-beige-700   "
            value={currentPage}
          >
            {Array.from({ length: Math.min(last(paginationRange) as number, 300) }).fill(true).map((t, p) => (
              <option key={p} value={p + 1}>
                {p + 1}
              </option>
            ))}
          </select>
        </div>
      </li>
    </ul>
  );
};

export default CustomPagination_Client;
