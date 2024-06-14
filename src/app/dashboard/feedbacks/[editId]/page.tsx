'use client'

import {useForm} from "react-hook-form";
import {CreateFeedbackSchema} from "@/lib/validation";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import React, {useEffect, useState} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {Input} from "@/components/ui/input";
import useFeedbackStore from "@/store/feedback-store";

const EditFeedbackPage = ({ params }: { params: { editId: string } }) => {
  const { updateFeedback, feedbacks } = useFeedbackStore();

  useEffect(() => {
    const feedback = feedbacks.find((f) => f.id === params.editId);
    if(feedback){
      form.setValue("message", feedback.message);
      form.setValue("fullName", feedback.fullName);
    }
  }, []);


  const form = useForm<z.infer<typeof CreateFeedbackSchema>>({
    resolver: zodResolver(CreateFeedbackSchema),
  })

  function onSubmit(values: z.infer<typeof CreateFeedbackSchema>) {
    const editedFeedback = {
      id: params.editId,
      message: values.message,
      fullName: values.fullName,
      createDate: new Date(),
    }
    console.log(editedFeedback)
    updateFeedback(editedFeedback).then(() => {
      toast.success("Feedbacks successfully edited")
      form.reset();
    }).catch(() => {
      toast.error("Error editing feedbacks")
    })
  }

  return (
    <div className={"w-full h-full px-3 pb-10 pr-64"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className={"text-3xl font-bold mt-5"}>Tahrirlash</h1>
          <div className={"mt-10 grid gap-y-5"}>
            <FormField
              control={form.control}
              name="fullName"
              render={({field}) => (
                <FormItem>
                  <FormLabel>F.I.SH.</FormLabel>
                  <FormControl>
                    <Input placeholder="Solijoniy Jahongir..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Xabar</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Web sayt juda yaxshi ishlab chiqilgan ishlaringa omad..." {...field} />
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
  );
}

export default EditFeedbackPage;