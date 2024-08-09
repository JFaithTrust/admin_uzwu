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
import {districtColumns} from "@/app/dashboard/districts/district-columns";
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
import useDistrictStore from "@/store/district-store";
import {TableSkeleton} from "@/components/skeletons/table-skeleton";
import { DataTable } from "@/components/layout/data-table";

const DistrictsPage = () => {

  const { districts, getDistricts } = useDistrictStore()

  useEffect(() => {
    getDistricts().then()
  }, [getDistricts]);

  return (
    <div className={"w-full"}>
      <DataTable columns={districtColumns} data={districts} updateData={getDistricts} rowCount={districts.length} />
    </div>
  );
}

export default DistrictsPage;