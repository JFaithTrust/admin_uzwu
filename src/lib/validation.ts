import * as z from "zod";

export const LoginFormSchema = z.object({
  phoneNumber: z.string().min(3, {
    message: "Phone number must be at least 3 characters long",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export const CreateFaqSchema = z.object({
  question: z.string().min(3, {
    message: "Question must be at least 3 characters long",
  }),
  answer: z.string().min(3, {
    message: "Answer must be at least 3 characters long",
  }),
});

export const CreateFeedbackSchema = z.object({
  message: z.string().min(3, {
    message: "Message must be at least 3 characters long",
  }),
  fullName: z.string().min(3, {
    message: "Full name must be at least 3 characters long",
  }),
});

export const CreateDistrictSchema = z.object({
  regionId: z.string().min(3, {
    message: "Region name must be at least 3 characters long",
  }),
  name: z.string().min(3, {
    message: "Category name must be at least 3 characters long",
  }),
});

export const CreateRegionSchema = z.object({
  name: z.string().min(3, {
    message: "Region name must be at least 3 characters long",
  }),
});

export const CreateJobCategorySchema = z.object({
  title: z.string().min(3, {
    message: "Category name must be at least 3 characters long",
  }),
  description: z.string().min(3, {
    message: "Category description must be at least 3 characters long",
  }),
});