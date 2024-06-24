'use client'

import {useForm} from "react-hook-form";
import {CreateFeedbackSchema} from "@/lib/validation";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import React from "react";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {Input} from "@/components/ui/input";
import useFeedbackStore from "@/store/feedback-store";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {ArrowLeft, CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";
import {useRouter} from "next/navigation";

const CreateFeedbackPage = () => {
  const { createFeedback } = useFeedbackStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateFeedbackSchema>>({
    resolver: zodResolver(CreateFeedbackSchema),
    defaultValues: {
      message: "",
      fullName: "",
    },
  })

  function onSubmit(values: z.infer<typeof CreateFeedbackSchema>) {
    createFeedback(values).then(() => {
      toast.success("Feedbacks successfully created.")
      form.reset();
    }).catch(() => {
      toast.error("An error occurred while creating feedbacks.")
    })
  }

  return (
    <div className={"w-full h-full px-3 pb-10 pr-64"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={"flex gap-x-2 items-center mt-5"}>
            <ArrowLeft onClick={router.back} className="h-6 w-6 cursor-pointer"/>
            <h1 className={"text-3xl font-bold"}>Fikr-mulohaza yaratish</h1>
          </div>
          <div className={"mt-10 grid gap-y-5"}>
            <div className={"flex justify-between gap-x-12 items-end"}>
              <FormField
                control={form.control}
                name="fullName"
                render={({field}) => (
                  <FormItem className={"w-full"}>
                    <FormLabel>F.I.SH.</FormLabel>
                    <FormControl>
                      <Input placeholder="Solijoniy Jahongir..." {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({field}) => (
                  <FormItem className={"flex flex-col space-y-1"}>
                    <FormLabel>Chiqish muddati</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown-buttons"
                          selected={field.value}
                          onSelect={field.onChange}
                          fromYear={1960}
                          toYear={2030}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
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
                Yaratish
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default CreateFeedbackPage;