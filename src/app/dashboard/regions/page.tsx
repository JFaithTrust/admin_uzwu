'use client'

import React, { useEffect } from "react";
import { regionColumns } from "@/app/dashboard/regions/region-columns";
import useRegionStore from "@/store/region-store";
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