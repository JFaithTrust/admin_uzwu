import { Input } from "@/components/ui/input";
import React from "react";
import { Table } from "@tanstack/table-core";

interface SearchBarProps<D> {
  table: Table<D>,
  searchedBy: string
}

export function SearchBar<D>({
                               table,
                               searchedBy
                             }: SearchBarProps<D>) {

  return (
    <Input
      placeholder="Filter titles..."
      value={(table.getColumn(searchedBy)?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn(searchedBy)?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  )
}