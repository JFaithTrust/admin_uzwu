"use client"

import { BottomGradient } from "@/components/ui/bottom-gradient";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/user-store";
import { useForm } from "react-hook-form";
import { LoginFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "@/store/axios";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BorderGradientInput } from "../ui/border-gradient-input";

export default function LoginForm() {

  const { setUser } = useUserStore()
  const router = useRouter()

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    }
  })

  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    try {
      const { data } = await axios.post('/Auth/login',values)
      if(data) {
        setUser({
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          birthDate: data.birthDate,
          token: data.token,
          email: data.email,
          phoneNumber: values.phoneNumber
        })
        toast.success("Logged in successfully.")
        router.push('/dashboard')
      }else{
        toast.error("An error occurred. Please try again.")
      }
    } catch (error: any) {
      toast.error("An error occurred. Please try again.")
    }
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Uzworks Uz Admin Panel
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Enter your phone number and password to continue.
      </p>
      <Form {...form}>
        <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-2 mb-4">
            <FormField
              name="phoneNumber"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <BorderGradientInput
                      type={"tel"}
                      placeholder={"Enter your phone number"}
                      className={"peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <BorderGradientInput
                      type={"password"}
                      placeholder={"***********"}
                      className={"peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <button
              className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-blue-100 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
              type="submit"
            >
              Login &rarr;
              <BottomGradient/>
            </button>
          </div>
        </form>
      </Form>
    </div>
  )
}