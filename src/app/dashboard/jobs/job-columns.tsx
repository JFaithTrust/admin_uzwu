import { ColumnDef } from "@tanstack/react-table";
import { Job } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import * as React from "react";
import { formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import useJobStore from "@/store/job-store";

export const jobColumns: ColumnDef<Job>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "salary",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Salary
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="uppercase">
        {formatNumber(row.getValue("salary"))} UZS
      </div>
    ),
  },
  {
    accessorKey: "phoneNumber",
    header: () => <div className="text-center">Phone number</div>,
    cell: ({ row }) => {
      const phoneNumber = parseFloat(row.getValue("phoneNumber"));

      // Format the amount as a dollar amount

      return <div className="text-center font-medium">+{phoneNumber}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          className="flex justify-center w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize flex justify-center w-full">
        {row.getValue("status") ? (
          <Badge variant={"success"}>Active</Badge>
        ) : (
          <Badge variant={"warning"}>Inactive</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "isTop",
    header: ({ column }) => {
      return (
        <Button
          className="flex justify-center w-full"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Top
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize flex justify-center w-full">
        {row.getValue("isTop") ? (
          <Badge variant={"success"}>Top</Badge>
        ) : (
          <Badge variant={"destructive"}>Not Top</Badge>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const job = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const {deleteJob, updateJobStatus} = useJobStore();

      const handleDelete = (id: string) => {
        deleteJob(id).then(
          () => {
            toast.success("Job successfully deleted");
          }
        ).catch(
          (error) => {
            toast.error("System error occurred. Please try again later.");
          }
        );
      }

      const handleChangeStatus = (id: string, status: boolean) => {
        updateJobStatus(id, status).then(
          () => {
            toast.success("Job status successfully updated");
          }
        ).catch(
          (error) => {
            toast.error("System error occurred. Please try again later.");
          }
        );
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 float-end">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/*<DropdownMenuItem*/}
            {/*  onClick={() => navigator.clipboard.writeText(JSON.stringify(payment))}*/}
            {/*>*/}
            {/*  Copy payment ID*/}
            {/*</DropdownMenuItem>*/}
            <DropdownMenuSeparator />
            <Link href={`/dashboard/jobs/${job.id}`}>
              <DropdownMenuItem>
                View
              </DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/jobs/edit-job/${job.id}`}>
              <DropdownMenuItem>
                Edit
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() => handleChangeStatus(job.id, job.status)}
              className={"!text-orange-500"}
            >
              {job.status ? "Deactivate" : "Activate"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(job.id)}
              className={"!text-red-500"}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]