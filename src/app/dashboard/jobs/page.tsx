"use client"

import React, { useEffect } from "react";
import useJobStore from "@/store/job-store";
import { jobColumns } from "@/app/dashboard/jobs/job-columns";
import { DataTable } from "@/components/layout/data-table";

const JobsPage = () => {
  const { jobs, getJobsPagination } = useJobStore();
  const { count, updateJobCount } = useJobStore();


  useEffect(() => {
    updateJobCount().then()
  }, []);

  return (
    <div className="w-full">
      <DataTable columns={jobColumns} data={jobs} updateData={getJobsPagination} rowCount={count}
                 hasPagination={true} hasFilter={true} hasAddButton={true}
                 addButtonLink={"/dashboard/jobs/create-job"} />
    </div>
  )
}

export default JobsPage