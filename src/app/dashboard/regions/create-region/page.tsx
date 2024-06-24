"use client"

import {useForm} from "react-hook-form";
import {z} from "zod";
import {CreateRegionSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import useRegionStore from "@/store/region-store";
import {useRouter} from "next/navigation";
import {ArrowLeft} from "lucide-react";
import React from "react";

const CreateRegionPage = () => {
  const { createRegion } = useRegionStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateRegionSchema>>({
    resolver: zodResolver(CreateRegionSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(values: z.infer<typeof CreateRegionSchema>) {
    console.log(values)
    createRegion(values).then(() => {
      toast.success("Region successfully created")
      form.reset();
    }).catch(() => {
      toast.error("Error creating region")
    })
  }

  return (
    <div className={"w-full h-full px-3 pb-10 pr-64"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={"flex gap-x-2 items-center mt-5"}>
            <ArrowLeft onClick={router.back} className="h-6 w-6 cursor-pointer"/>
            <h1 className={"text-3xl font-bold"}>Viloyat yaratish</h1>
          </div>
          <div className={"mt-10 grid gap-y-5"}>
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Andijon viloyati..." {...field} />
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
  );
}

export default CreateRegionPage;