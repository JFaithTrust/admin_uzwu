"use client";
import React, { useEffect } from "react";
import { jobCategoryColumns } from "@/app/dashboard/job-categories/job-category-columns";
import useJobCategoryStore from "@/store/job-category-store";
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