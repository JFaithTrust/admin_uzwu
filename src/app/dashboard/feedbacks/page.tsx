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
import {feedbackColumns} from "@/app/dashboard/feedbacks/feedback-columns";
import useFeedbackStore from "@/store/feedback-store";
import {TableSkeleton} from "@/components/skeletons/table-skeleton";
import { DataTable } from "@/components/layout/data-table";

const FeedbackPage = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const { feedbacks, getFeedbacks } = useFeedbackStore()

  useEffect(() => {
    getFeedbacks().then()
  }, [getFeedbacks])

  const table = useReactTable({
    data: feedbacks,
    columns: feedbackColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility
    }
  })

  return (
    <div className={"w-full"}>
      <DataTable columns={feedbackColumns} data={feedbacks} updateData={getFeedbacks} rowCount={feedbacks.length} />
    </div>
  );
}

export default FeedbackPage;