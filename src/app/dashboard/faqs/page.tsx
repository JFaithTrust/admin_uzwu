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
import useFaqStore from "@/store/faq-store";
import {TableSkeleton} from "@/components/skeletons/table-skeleton";
import {faqColumns} from "@/app/dashboard/faqs/faq-columns";
import { DataTable } from "@/components/layout/data-table";

const FAQPage = () => {

  const { faqs, getFaqs } = useFaqStore()

  useEffect(() => {
    getFaqs().then()
  }, [getFaqs])


  return (
    <div className={"w-full"}>
      <DataTable columns={faqColumns} data={faqs} updateData={getFaqs} rowCount={faqs.length} />
    </div>
  );
}

export default FAQPage;