'use client'

import React, { useEffect } from "react";
import useFaqStore from "@/store/faq-store";
import { faqColumns } from "@/app/dashboard/faqs/faq-columns";
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