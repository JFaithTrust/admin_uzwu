"use client";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {PhoneInput} from "@/components/ui/phone-input";
import useJobCategoryStore from "@/store/job-category-store";
import useRegionStore from "@/store/region-store";
import useDistrictStore from "@/store/district-store";
import useWorkerStore from "@/store/worker-store";
import {CreateWorkerSchema, updateWorkerSchema} from "@/lib/validation";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {ArrowLeft, CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {cn} from "@/lib/utils";
import {toast} from "sonner";
import {useRouter} from "next/navigation";

const EditWorkerPage = ({params}: { params: { editId: string } }) => {

  const {jobCategories, getJobCategories} = useJobCategoryStore()
  const {regions, getRegions} = useRegionStore()
  const {getDistrictsByRegionId, districts} = useDistrictStore()
  const {updateWorker, getWorkerById, worker} = useWorkerStore()
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    getJobCategories().then()
    getRegions().then()
    getWorkerById(params.editId).then()
  }, [params.editId]);

  useEffect(() => {
    if (worker) {
      form.setValue("deadline", new Date(worker.deadline));
      form.setValue("birthDate", new Date(worker.birthDate));
      form.setValue("title", worker.title);
      form.setValue("salary", worker.salary.toString());
      form.setValue("gender", worker.gender === "Male" ? "1" : "0");
      form.setValue("workingTime", worker.workingTime);
      form.setValue("workingSchedule", worker.workingSchedule);
      form.setValue("telegramLink", worker.telegramLink);
      form.setValue("instagramLink", worker.instagramLink);
      form.setValue("tgUserName", worker.tgUserName);
      form.setValue("phoneNumber", '+' + worker.phoneNumber);
      form.setValue("categoryId", worker.jobCategory.id);
      form.setValue("regionId", worker.district.region.id);
      getDistrictsByRegionId(worker.district.region.id).then()
      form.setValue("districtId", worker.district.id);
      setIsLoaded(true)
    }
  }, [worker]);

  const form = useForm<z.infer<typeof updateWorkerSchema>>({
    resolver: zodResolver(updateWorkerSchema),
    defaultValues: {
      categoryId: "",
      districtId: "",
    },
  });

  function onSubmit(data: z.infer<typeof updateWorkerSchema>) {
    const updatedWorker = {
      id: params.editId,
      deadline: data.deadline,
      birthDate: data.birthDate,
      title: data.title,
      salary: +data.salary,
      gender: +data.gender,
      workingTime: data.workingTime,
      workingSchedule: data.workingSchedule,
      telegramLink: data.telegramLink,
      instagramLink: data.instagramLink,
      tgUserName: data.tgUserName,
      phoneNumber: data.phoneNumber.slice(1, data.phoneNumber.length),
      categoryId: data.categoryId,
      districtId: data.districtId,
    }
    updateWorker(updatedWorker).then(
      () => {
        router.back()
        toast.success("Worker updated successfully!")
      }
    ).catch(
      (e) => {
        toast.error("Error updating worker", e)
      }
    )
  }

  return (
    <div className="w-full h-full px-3 pb-10 pr-64">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={"flex gap-x-2 items-center mt-5"}>
            <ArrowLeft onClick={router.back} className="h-6 w-6 cursor-pointer"/>
            <h1 className="text-3xl font-bold">Ishchini tahrirlash</h1>
          </div>
          <div className="mt-10 grid gap-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Sarlavha</FormLabel>
                  <FormControl>
                    <Input placeholder="Bahor oshxonasi uchun ishchi kerak..." {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-x-12">
              <FormField
                control={form.control}
                name="workingTime"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Ishlash vaqti</FormLabel>
                    <FormControl>
                      <Input placeholder="8:00 dan 20:00 gacha..." {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workingSchedule"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Ish jadvali</FormLabel>
                    <FormControl>
                      <Input placeholder="haftada 6 kun ish 1 kun dam..." {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-12">
              <FormField
                control={form.control}
                name="categoryId"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Kategoriyalar</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Tanlang..."/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jobCategories.map((c) => (
                          <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input type={"number"} placeholder="1000000" className={"w-56"} {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-end gap-x-16">
              <FormField
                control={form.control}
                name="gender"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Jins</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex space-x-2"
                      >
                        <FormItem className="flex items-center space-x-2 border rounded-lg border-gray-300 px-3 py-2.5">
                          <FormControl>
                            <RadioGroupItem value="0"/>
                          </FormControl>
                          <FormLabel className="font-normal">
                            Erkak
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 border rounded-lg border-gray-300 px-2 py-2">
                          <FormControl>
                            <RadioGroupItem value="1"/>
                          </FormControl>
                          <FormLabel className="font-normal">
                            Ayol
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deadline"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Muxlat</FormLabel>
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
              <FormField
                control={form.control}
                name="birthDate"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Tug&apos;ulgan kun</FormLabel>
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
            <div className={"grid grid-cols-2 gap-x-12"}>
              {/* Regions Combobox */}
              <FormField
                control={form.control}
                name="regionId"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Viloyatlar</FormLabel>
                    <Select onValueChange={
                      (value) => {
                        field.onChange(value)
                        getDistrictsByRegionId(value).then()
                      }} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Tanlang..."/>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {regions.map((r) => (
                          <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              {/*Districts Combobox*/}
              {isLoaded &&
                <FormField
                  control={form.control}
                  name="districtId"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Tumanlar</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Tanlang..."/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {districts.map((d) => (
                            <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              }
            </div>
            <div className="grid grid-cols-4 gap-x-12">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Telefon nomer</FormLabel>
                    <FormControl>
                      <PhoneInput placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tgUserName"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Tg. profile username</FormLabel>
                    <FormControl>
                      <Input placeholder="jfaithtrust" {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telegramLink"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Telegram group link</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter link" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagramLink"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Instagram group link</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter link" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-full flex justify-end">
            <Button type="submit" className="mt-5">
              Tahrirlash
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditWorkerPage;