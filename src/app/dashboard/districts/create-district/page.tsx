'use client'

import { CreateDistrictSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useDistrictStore from "@/store/district-store";
import useRegionStore from "@/store/region-store";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const CreateDistrictPage = () => {
  const { createDistrict } = useDistrictStore();
  const { regions, getRegions } = useRegionStore()
  const router = useRouter();

  useEffect(() => {
    getRegions().then()
  }, [getRegions]);

  const form = useForm<z.infer<typeof CreateDistrictSchema>>({
    resolver: zodResolver(CreateDistrictSchema),
    defaultValues: {
      name: "",
      regionId: "",
    },
  })

  function onSubmit(values: z.infer<typeof CreateDistrictSchema>) {
    console.log(values)
    createDistrict(values).then(() => {
      toast.success("District successfully created")
      form.reset();
    }).catch(() => {
      toast.error("Error creating district")
    })
  }

  return(
    <div className={"w-full h-full px-3 pb-10 pr-64"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={"flex gap-x-2 items-center mt-5"}>
            <ArrowLeft onClick={router.back} className="h-6 w-6 cursor-pointer"/>
            <h1 className={"text-3xl font-bold"}>Tuman yaratish</h1>
          </div>
          <div className={"mt-10 grid gap-y-5"}>
            <FormField
              control={form.control}
              name="regionId"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Regions</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Tanlang..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {regions.map((r) => (
                        <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Baliqchi..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="w-full flex justify-end">
              <Button type="submit" className="mt-5">
                Create
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CreateDistrictPage;