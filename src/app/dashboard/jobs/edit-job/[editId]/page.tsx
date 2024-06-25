"use client"

import useJobCategoryStore from "@/store/job-category-store";
import useRegionStore from "@/store/region-store";
import React, {useEffect, useState} from "react";
import useDistrictStore from "@/store/district-store";
import useJobStore from "@/store/job-store";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {CreateJobSchema, CreateWorkerSchema, UpdateJobSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {ArrowLeft, CalendarIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {PhoneInput} from "@/components/ui/phone-input";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Textarea} from "@/components/ui/textarea";

const EditJobPage = ({ params }: { params: { editId: string } }) => {
  const {jobCategories, getJobCategories} = useJobCategoryStore()
  const {regions, getRegions} = useRegionStore()
  const {getDistrictsByRegionId, districts} = useDistrictStore()
  const {updateJob, job, getJobById} = useJobStore()
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()

  useEffect(() => {
    getJobCategories().then()
    getRegions().then()
    getJobById(params.editId).then()
  }, [params.editId]);

  useEffect(() => {
    if(job){
      form.setValue("title", job.title);
      form.setValue("salary", job.salary.toString());
      form.setValue("gender", job.gender === "Male" ? "1" : "0");
      form.setValue("workingTime", job.workingTime);
      form.setValue("workingSchedule", job.workingSchedule);
      form.setValue("deadline", new Date(job.deadline));
      form.setValue("telegramLink", job.telegramLink);
      form.setValue("instagramLink", job.instagramLink);
      form.setValue("tgUserName", job.tgUserName);
      form.setValue("phoneNumber", '+' + job.phoneNumber);
      form.setValue("benefit", job.benefit);
      form.setValue("requirement", job.requirement);
      form.setValue("minAge", job.minAge.toString());
      form.setValue("maxAge", job.maxAge.toString());
      form.setValue("longitude", job.longitude.toString());
      form.setValue("latitude", job.latitude.toString());
      form.setValue("categoryId", job.jobCategory.id);
      form.setValue("regionId", job.district.region.id);
      getDistrictsByRegionId(job.district.region.id).then()
      form.setValue("districtId", job.district.id);
      setIsLoaded(true)
    }
  }, [job]);

  const form = useForm<z.infer<typeof UpdateJobSchema>>({
    resolver: zodResolver(UpdateJobSchema),
    defaultValues: {
      categoryId: "",
      districtId: "",
    },
  });

  function onSubmit(data: z.infer<typeof UpdateJobSchema>) {
    const updatedJob = {
      id: params.editId,
      title: data.title,
      salary: +data.salary,
      gender: +data.gender,
      workingTime: data.workingTime,
      workingSchedule: data.workingSchedule,
      deadline: data.deadline,
      telegramLink: data.telegramLink,
      instagramLink: data.instagramLink,
      tgUserName: data.tgUserName,
      phoneNumber: data.phoneNumber.slice(1, data.phoneNumber.length),
      benefit: data.benefit,
      requirement: data.requirement,
      minAge: +data.minAge,
      maxAge: +data.maxAge,
      longitude: +data.longitude,
      latitude: +data.latitude,
      categoryId: data.categoryId,
      districtId: data.districtId,
    }
    updateJob(updatedJob).then(
      () => {
        router.back()
        toast.success("Job updated successfully")
      }
    ).catch(
      (e) => {
        toast.error("Error updating job", e)
      }
    )
  }

  return (
    <div className="w-full h-full px-3 pb-10 pr-64">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={"flex gap-x-2 items-center mt-5"}>
            <ArrowLeft onClick={router.back} className="h-6 w-6 cursor-pointer"/>
            <h1 className="text-3xl font-bold">Ishni tahrirlash</h1>
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
            <div className={"grid grid-cols-2 gap-x-12"}>
              <div className={"flex justify-between"}>
                <div className={"flex gap-x-12"}>
                  <FormField
                    control={form.control}
                    name="minAge"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Min. yosh</FormLabel>
                        <FormControl>
                          <Input type={"number"} className={"w-16"} placeholder="20" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="maxAge"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Max. yosh</FormLabel>
                        <FormControl>
                          <Input type={"number"} className={"w-16"} placeholder="30" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>
                <div className={"flex gap-x-12"}>
                  <FormField
                    control={form.control}
                    name="latitude"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl>
                          <Input type={"number"} className={"w-36"} placeholder="67.2133" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="longitude"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl>
                          <Input type={"number"} className={"w-36"} placeholder="41.5123" {...field} />
                        </FormControl>
                        <FormMessage/>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className={"flex justify-between items-end"}>
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
                          <FormItem
                            className="flex items-center space-x-2 border rounded-lg border-gray-300 px-3 py-[10.5px]">
                            <FormControl>
                              <RadioGroupItem value="1"/>
                            </FormControl>
                            <FormLabel className="font-normal">
                              Erkak
                            </FormLabel>
                          </FormItem>
                          <FormItem
                            className="flex items-center space-x-2 border rounded-lg border-gray-300 px-2 py-[10.5px]">
                            <FormControl>
                              <RadioGroupItem value="0"/>
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
                  name="salary"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Salary</FormLabel>
                      <FormControl>
                        <Input type={"number"} className={"w-36"} placeholder="1000000" {...field} />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({field}) => (
                    <FormItem className={"flex flex-col space-y-1"}>
                      <FormLabel>Muddat</FormLabel>
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
            <div className="grid grid-cols-2 gap-x-12">
              <FormField
                control={form.control}
                name="requirement"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Talablar</FormLabel>
                    <FormControl>
                      <Textarea placeholder="3yil tajriba ...." {...field} />
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="benefit"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Imtiyozlar</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Qulay ofis va axil jamoa..." {...field} />
                    </FormControl>
                    <FormMessage/>
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
  )
}

export default EditJobPage;