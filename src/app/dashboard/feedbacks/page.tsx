'use client'

import React, { useEffect, useState } from "react";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";
import { feedbackColumns } from "@/app/dashboard/feedbacks/feedback-columns";
import useFeedbackStore from "@/store/feedback-store";
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