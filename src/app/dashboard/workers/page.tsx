"use client";

import React, { useEffect } from "react";
import { workerColumns } from "@/app/dashboard/workers/worker-columns";
import useWorkerStore from "@/store/worker-store";
import { DataTable } from "@/components/layout/data-table";

const WorkerPage = () => {

  const { workers, getWorkersPagination } = useWorkerStore();
  const { count, updateWorkerCount } = useWorkerStore();

  useEffect(() => {
    updateWorkerCount().then();
  }, []);

  return (
    <div className="w-full">
      <DataTable columns={workerColumns} data={workers} updateData={getWorkersPagination} rowCount={count}
                 hasPagination={true} hasFilter={true} hasAddButton={true}
                 addButtonLink={"/dashboard/jobs/create-worker"} />
    </div>
  );
};

export default WorkerPage;