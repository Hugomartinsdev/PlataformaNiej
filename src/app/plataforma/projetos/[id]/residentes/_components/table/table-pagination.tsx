import { Table } from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-end px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2"></div>
        <div className="flex w-[120px] items-center justify-center text-sm font-medium">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="active:ring-brand-orange focus:outline-brand-orange active:outline-brand-orange flex h-8 w-8 items-center justify-center rounded-md p-0 hover:bg-gray-200 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir para a primeira página</span>
            <ChevronsLeft className="h-4 w-4" />
          </button>
          <button
            className="active:ring-brand-orange focus:outline-brand-orange active:outline-brand-orange flex h-8 w-8 items-center justify-center rounded-md p-0 hover:bg-gray-200"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir para a página anterior</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            className="active:ring-brand-orange focus:outline-brand-orange active:outline-brand-orange flex h-8 w-8 items-center justify-center rounded-md p-0 hover:bg-gray-200"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir para a próxima página</span>
            <ChevronRightIcon className="h-4 w-4" />
          </button>
          <button
            className="active:ring-brand-orange focus:outline-brand-orange active:outline-brand-orange flex h-8 w-8 items-center justify-center rounded-md p-0 hover:bg-gray-200 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir para a última página</span>
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
