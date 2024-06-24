'use client'

import {useForm} from "react-hook-form";
import {CreateFaqSchema} from "@/lib/validation";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import React from "react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import useFaqStore from "@/store/faq-store";
import {ArrowLeft} from "lucide-react";
import {useRouter} from "next/navigation";

const CreateFaqPage = () => {
  const { createFaq } = useFaqStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateFaqSchema>>({
    resolver: zodResolver(CreateFaqSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  })

  function onSubmit(values: z.infer<typeof CreateFaqSchema>) {
    console.log(values)
    createFaq(values).then(() => {
      toast.success("F.A.Q. successfully created")
      form.reset();
    }).catch(() => {
      toast.error("An error occurred while creating F.A.Q.")
    })
  }

  return (
    <div className={"w-full h-full px-3 pb-10 pr-64"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={"flex gap-x-2 items-center mt-5"}>
            <ArrowLeft onClick={router.back} className="h-6 w-6 cursor-pointer"/>
            <h1 className={"text-3xl font-bold"}>F.A.Q. yaratish</h1>
          </div>
          <div className={"mt-10 grid gap-y-5"}>
            <FormField
              control={form.control}
              name="question"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Savol</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Siz bilan qanday bo'glansak bo'ladi..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="answer"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Javob</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Web saytimizning aloqa bo'limiga o'tgan xolatda..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="w-full flex justify-end">
              <Button type="submit" className="mt-5">
                Yaratish
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateFaqPage;