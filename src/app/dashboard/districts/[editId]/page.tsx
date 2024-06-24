'use client'

import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {CreateDistrictSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import useDistrictStore from "@/store/district-store";
import {useRouter} from "next/navigation";
import {ArrowLeft} from "lucide-react";

const EditDistrictPage = ({ params }: { params: { editId: string } }) => {
  const { updateDistrict, district, getDistrictById } = useDistrictStore();
  const router = useRouter();

  useEffect(() =>{
    getDistrictById(params.editId).then()
  }, []);

  useEffect(() => {
    if(district){
      form.setValue("name", district.name);
    }
  }, [district]);

  const form = useForm<z.infer<typeof CreateDistrictSchema>>({
    resolver: zodResolver(CreateDistrictSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(values: z.infer<typeof CreateDistrictSchema>) {
    const editedDistrict = {
      id: params.editId,
      name: values.name,
    }
    updateDistrict(editedDistrict).then(() => {
      toast.success("District successfully updated")
      form.reset();
    }).catch(() => {
      toast.error("Error occurred while updating district")
    })
  }

  return (
    <div className={"w-full h-full px-3 pb-10 pr-64"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={"flex gap-x-2 items-center mt-5"}>
            <ArrowLeft onClick={router.back} className="h-6 w-6 cursor-pointer"/>
            <h1 className={"text-3xl font-bold"}>Tumanni tahrirlash</h1>
          </div>
          <div className={"mt-10 grid gap-y-5"}>
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
                Edit
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default EditDistrictPage;