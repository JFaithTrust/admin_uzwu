'use client'

import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import { CreateRegionSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import useRegionStore from "@/store/region-store";
import {ArrowLeft} from "lucide-react";
import {useRouter} from "next/navigation";

const EditRegionPage = ({ params }: { params: { editId: string } }) => {
  const { updateRegion, region, getRegionById } = useRegionStore();
  const router = useRouter();

  useEffect(() =>{
    getRegionById(params.editId).then()
  }, []);

  useEffect(() => {
    if(region){
      form.setValue("name", region.name);
    }
  }, [region]);

  const form = useForm<z.infer<typeof CreateRegionSchema>>({
    resolver: zodResolver(CreateRegionSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(values: z.infer<typeof CreateRegionSchema>) {
    const editedRegion = {
      id: params.editId,
      name: values.name,
    }
    updateRegion(editedRegion).then(() => {
      toast.success("Region successfully updated")
      form.reset();
    }).catch(() => {
      toast.error("Error occurred while updating region")
    })
  }

  return (
    <div className={"w-full h-full px-3 pb-10 pr-64"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={"flex gap-x-2 items-center mt-5"}>
            <ArrowLeft onClick={router.back} className="h-6 w-6 cursor-pointer"/>
            <h1 className={"text-3xl font-bold"}>Viloyatni tahrirlash</h1>
          </div>
          <div className={"mt-10 grid gap-y-5"}>
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Region name..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="w-full flex justify-end">
              <Button type="submit" className="mt-5">
                Edit
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default EditRegionPage;