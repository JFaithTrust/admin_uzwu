'use client'

import React, { useEffect } from "react";
import { districtColumns } from "@/app/dashboard/districts/district-columns";
import useDistrictStore from "@/store/district-store";
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