'use client'

import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateJobCategorySchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useJobCategoryStore from "@/store/job-category-store";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import React from "react";

const CreateJobCategoryPage = () => {
  const { createJobCategory } = useJobCategoryStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateJobCategorySchema>>({
    resolver: zodResolver(CreateJobCategorySchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  function onSubmit(values: z.infer<typeof CreateJobCategorySchema>) {
    createJobCategory(values).then(() => {
      toast.success("Job category successfully created")
      form.reset();
    }).catch(() => {
      toast.error("Error creating job category")
    })
  }

  return (
    <div className={"w-full h-full px-3 pb-10 pr-64"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={"flex gap-x-2 items-center mt-5"}>
            <ArrowLeft onClick={router.back} className="h-6 w-6 cursor-pointer"/>
            <h1 className={"text-3xl font-bold"}>Ish turi yaratish</h1>
          </div>
          <div className={"mt-10 grid gap-y-5"}>
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Job category title..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Job category description..." {...field} />
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
};

export default CreateJobCategoryPage;