'use client'

import React, {useEffect, useState} from "react";
import {
  ColumnFiltersState, flexRender,
  getCoreRowModel, getFilteredRowModel,
  getPaginationRowModel, getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";
import {regionColumns} from "@/app/dashboard/regions/region-columns";
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
import useRegionStore from "@/store/region-store";
import {TableSkeleton} from "@/components/skeletons/table-skeleton";
import { DataTable } from "@/components/layout/data-table";

const RegionsPage = () => {

  const { regions, getRegions } = useRegionStore()

  useEffect(() => {
    getRegions().then()
  }, [getRegions]);

  return (
    <div className={"w-full"}>
      <DataTable columns={regionColumns} data={regions} updateData={getRegions} rowCount={regions.length} />
    </div>
  )
}

export default RegionsPage