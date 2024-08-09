"use client";
import React, {useEffect, useState} from "react";
import {
  ColumnFiltersState, flexRender,
  getCoreRowModel, getFilteredRowModel,
  getPaginationRowModel, getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";
import {jobCategoryColumns} from "@/app/dashboard/job-categories/job-category-columns";
import {Input} from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDown} from "lucide-react";
import Link from "next/link";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import useJobCategoryStore from "@/store/job-category-store";
import {TableSkeleton} from "@/components/skeletons/table-skeleton";
import { DataTable } from "@/components/layout/data-table";

const JobTypes = () => {

  const { jobCategories, getJobCategories } = useJobCategoryStore()

  useEffect(() => {
    getJobCategories().then()
  }, [getJobCategories]);


  return (
    <div className={"w-full"}>
      <DataTable columns={jobCategoryColumns} data={jobCategories} updateData={getJobCategories} rowCount={jobCategories.length} />
    </div>
  );
};

export default JobTypes;