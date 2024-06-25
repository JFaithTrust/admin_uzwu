'use client'

import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {CreateDistrictSchema, UpdateDistrictSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import useDistrictStore from "@/store/district-store";
import {useRouter} from "next/navigation";

const EditDistrictPage = ({params}: { params: { editId: string } }) => {
  const {updateDistrict, district, getDistrictById} = useDistrictStore();
  const router = useRouter();

  useEffect(() => {
    getDistrictById(params.editId).then()
  }, []);

  useEffect(() => {
    if (district) {
      form.setValue("name", district.name);
    }
  }, [district]);

  const form = useForm<z.infer<typeof UpdateDistrictSchema>>({
    resolver: zodResolver(UpdateDistrictSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(values: z.infer<typeof UpdateDistrictSchema>) {
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
    router.back()
  }

  return (
    <div className={"w-full h-full px-3 pb-10 pr-64"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className={"text-3xl font-bold mt-5"}>Tumanni tahrirlash</h1>
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
                Tahrirlash
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default EditDistrictPage;