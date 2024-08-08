"use client";

import React, { useEffect } from "react";
import { workerColumns } from "@/app/dashboard/workers/worker-columns";
import useWorkerStore from "@/store/worker-store";
import { DataTable } from "@/components/layout/data-table";

const WorkerPage = () => {

  const { workers, getWorkersPagination } = useWorkerStore();
  const { count, updateWorkerCount } = useWorkerStore();

  useEffect(() => {
    updateWorkerCount().then();
  }, []);

  return (
    <div className="w-full">
      {/*<div className="flex items-center justify-between py-4">*/}
      {/*  <Input*/}
      {/*    placeholder="Filter titles..."*/}
      {/*    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}*/}
      {/*    onChange={(event) =>*/}
      {/*      table.getColumn("title")?.setFilterValue(event.target.value)*/}
      {/*    }*/}
      {/*    className="max-w-sm"*/}
      {/*  />*/}
      {/*  <div className="flex gap-x-4">*/}
      {/*    <DropdownMenu>*/}
      {/*      <DropdownMenuTrigger asChild>*/}
      {/*        <Button variant="outline" className="ml-auto">*/}
      {/*          Columns <ChevronDown className="ml-2 h-4 w-4" />*/}
      {/*        </Button>*/}
      {/*      </DropdownMenuTrigger>*/}
      {/*      <DropdownMenuContent align="end">*/}
      {/*        {table*/}
      {/*          .getAllColumns()*/}
      {/*          .filter((column) => column.getCanHide())*/}
      {/*          .map((column) => {*/}
      {/*            return (*/}
      {/*              <DropdownMenuCheckboxItem*/}
      {/*                key={column.id}*/}
      {/*                className="capitalize"*/}
      {/*                checked={column.getIsVisible()}*/}
      {/*                onCheckedChange={(value) =>*/}
      {/*                  column.toggleVisibility(!!value)*/}
      {/*                }*/}
      {/*              >*/}
      {/*                {column.id}*/}
      {/*              </DropdownMenuCheckboxItem>*/}
      {/*            );*/}
      {/*          })}*/}
      {/*      </DropdownMenuContent>*/}
      {/*    </DropdownMenu>*/}
      {/*    <Link href={"/dashboard/workers/create-worker"}>*/}
      {/*      <Button*/}
      {/*        variant="outline"*/}
      {/*        className="ml-auto bg-sky-100 text-blue-600 hover:text-blue-600/85 border-blue-500"*/}
      {/*      >*/}
      {/*        Create*/}
      {/*      </Button>*/}
      {/*    </Link>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<div className="rounded-md border">*/}
      {/*  <Table>*/}
      {/*    <TableHeader>*/}
      {/*      {table.getHeaderGroups().map((headerGroup) => (*/}
      {/*        <TableRow key={headerGroup.id}>*/}
      {/*          {headerGroup.headers.map((header) => {*/}
      {/*            return (*/}
      {/*              <TableHead key={header.id}>*/}
      {/*                {header.isPlaceholder*/}
      {/*                  ? null*/}
      {/*                  : flexRender(*/}
      {/*                    header.column.columnDef.header,*/}
      {/*                    header.getContext()*/}
      {/*                  )}*/}
      {/*              </TableHead>*/}
      {/*            );*/}
      {/*          })}*/}
      {/*        </TableRow>*/}
      {/*      ))}*/}
      {/*    </TableHeader>*/}
      {/*    <TableBody>*/}
      {/*      {table.getRowModel().rows?.length ? (*/}
      {/*        table.getRowModel().rows.map((row) => (*/}
      {/*          <TableRow*/}
      {/*            key={row.id}*/}
      {/*            data-state={row.getIsSelected() && "selected"}*/}
      {/*          >*/}
      {/*            {row.getVisibleCells().map((cell) => (*/}
      {/*              <TableCell key={cell.id}>*/}
      {/*                {flexRender(*/}
      {/*                  cell.column.columnDef.cell,*/}
      {/*                  cell.getContext()*/}
      {/*                )}*/}
      {/*              </TableCell>*/}
      {/*            ))}*/}
      {/*          </TableRow>*/}
      {/*        ))*/}
      {/*      ) : (*/}
      {/*        <TableRow>*/}
      {/*          <TableCell*/}
      {/*            colSpan={workerColumns.length}*/}
      {/*            className="h-24 text-center"*/}
      {/*          >*/}
      {/*            <TableSkeleton />*/}
      {/*          </TableCell>*/}
      {/*        </TableRow>*/}
      {/*      )}*/}
      {/*    </TableBody>*/}
      {/*  </Table>*/}
      {/*</div>*/}
      {/*<div className="flex items-center justify-end space-x-2 py-4">*/}
      {/*  /!*<div className="flex-1 text-sm text-muted-foreground">*!/*/}
      {/*  /!*  {table.getFilteredSelectedRowModel().rows.length} of{" "}*!/*/}
      {/*  /!*  {table.getFilteredRowModel().rows.length} row(s) selected.*!/*/}
      {/*  /!*</div>*!/*/}
      {/*  <div className="space-x-2">*/}
      {/*    <Button*/}
      {/*      variant="outline"*/}
      {/*      size="sm"*/}
      {/*      onClick={() => table.previousPage()}*/}
      {/*      disabled={!table.getCanPreviousPage()}*/}
      {/*    >*/}
      {/*      Previous*/}
      {/*    </Button>*/}
      {/*    <Button*/}
      {/*      variant="outline"*/}
      {/*      size="sm"*/}
      {/*      onClick={() => table.nextPage()}*/}
      {/*      disabled={!table.getCanNextPage()}*/}
      {/*    >*/}
      {/*      Next*/}
      {/*    </Button>*/}
      {/*  </div>*/}
      {/*</div>*/}
      <DataTable columns={workerColumns} data={workers} updateData={getWorkersPagination} rowCount={count}
                 hasPagination={true} hasFilter={true} hasAddButton={true}
                 addButtonLink={"/dashboard/jobs/create-worker"} />
    </div>
  );
};

export default WorkerPage;