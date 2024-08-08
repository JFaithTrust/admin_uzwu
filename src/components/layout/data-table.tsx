import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from "@tanstack/react-table";
import { jobColumns } from "@/app/dashboard/jobs/job-columns";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import React, { useEffect, useState } from "react";
import { SearchBar } from "@/components/layout/search-bar";
import { clsx } from "clsx";
import { Filter } from "@/components/layout/filter";
import { AddButton } from "@/components/layout/add-button";
import { CustomPagination } from "@/components/layout/custom-pagination";
import { PaginationType } from "@/types";

interface TableProps<D, V> {
  columns: ColumnDef<D, V>[]
  data: D[]
  updateData: (pageNumber: number, pageSize: number) => Promise<void>
  rowCount: number
  hasFilter?: boolean
  hasSearchbar?: boolean
  hasPagination?: boolean
  hasAddButton?: boolean
  addButtonLink?: string
  searchedBy?: string
  isReportPage?: boolean
}

export function DataTable<D, V>({
                                  columns,
                                  data,
                                  updateData,
                                  rowCount,
                                  hasFilter = false,
                                  hasSearchbar = false,
                                  hasPagination = false,
                                  hasAddButton = false,
                                  addButtonLink = "",
                                  searchedBy = "",
                                  isReportPage = false,
                                }: TableProps<D, V>) {
  const [pagination, setPagination] = useState<PaginationType>({
    pageIndex: 0,
    pageSize: 5
  })
  const [sorting, setSorting] = React.useState<SortingState>([]);

  useEffect(() => {
    updateData(pagination.pageIndex + 1, pagination.pageSize).then();
  }, [pagination]);

  const table = useReactTable<D>({
    data: data,
    columns: columns,
    onSortingChange: setSorting,
    // onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    // onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      // columnFilters,
      // columnVisibility,
    },
  });

  return (
    <div>
      <div className={clsx("flex items-center", {
        "justify-between": !isReportPage,
        "justify-end gap-x-2": isReportPage
      })}>
        {hasSearchbar && (
          <SearchBar<D> table={table} searchedBy={searchedBy} />
        )}

        <div className={"flex items-center justify-between py-4"}>
          {hasFilter && (
            <Filter table={table} />
          )}
          {hasAddButton && (
            <AddButton link={addButtonLink} />
          )}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={jobColumns.length}
                  className="h-24 text-center"
                >
                  <TableSkeleton />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {hasPagination && (
        <CustomPagination pagination={pagination} setPagination={setPagination} rowCount={rowCount} />
      )}
    </div>
  )
}