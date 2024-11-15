'use server';
import Icons from "@/features/admin/ui/icons";
import { setPathParams } from "@/lib/routes";
import { buildPaginationRange, DOTS } from "@hooks/use-pagination";
import clsx from "clsx";
import Link from "next/link";
import React from "react";

const CustomPagination_Server: React.FC<{
  pathPattern: `/${string}/:page`;
  totalCount?: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
}> = ({ pathPattern, totalCount, siblingCount = 1, currentPage, pageSize, className }) => {
  const paginationRange = buildPaginationRange({
    currentPage,
    totalCount: totalCount || 0,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const getNext = () => currentPage + 1 <= (lastPage as number) ? currentPage + 1 : currentPage;

  const getPrevious = () => currentPage - 1 > 0 ? currentPage - 1 : 1;

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
      >
        <Link className={clsx("block pagination-item min-w-[28px] rounded-full p-2 text-center ", {
          "selected bg-white text-beige-700": currentPage === 1,
          " cursor-pointer bg-white/40 text-beige-500 transition-colors duration-500 hover:bg-beige-50 hover:text-beige-700   ":
            currentPage !== 1,
        })} href={setPathParams(pathPattern, { page: getPrevious() })}
        title="الصفحة السابقة"
        >
          <Icons.Chevron.Left  aria-label="previous page" className="h-5 w-5 text-beige-500  rtl:rotate-180" />
        </Link>
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
          >
            <Link
              className={clsx("pagination-item min-w-[36px] block rounded-full px-2 py-1 text-center ", {
                "selected bg-beige-50/50 text-beige-600": pageNumber === currentPage,
                " cursor-pointer bg-white/40 text-beige-500 transition-colors duration-500 hover:bg-beige-50 hover:text-beige-700   ":
                  pageNumber !== currentPage,
              })}
              href={setPathParams(pathPattern, { page: pageNumber })}
            >
              {pageNumber}
            </Link>
          </li>
        );
      })}
      <li
        className={clsx("pagination-item", {
          disabled: currentPage === lastPage,
        })}
      >
        <Link
          className={clsx("pagination-item block min-w-[28px] rounded-full p-2 text-center ", {
            "selected bg-white text-beige-700": currentPage === lastPage,
            " cursor-pointer bg-white/40 text-beige-500 transition-colors duration-500 hover:bg-beige-50 hover:text-beige-700   ":
              currentPage !== lastPage,
          })}
          title="الصفحة التالية"
          href={setPathParams(pathPattern, { page: getNext() })}>
          
          <Icons.Chevron.Right aria-label="next page" className="h-5 w-5 text-beige-500 rtl:rotate-180" />
        </Link>
      </li>
    </ul>
  );
};

export default CustomPagination_Server;
