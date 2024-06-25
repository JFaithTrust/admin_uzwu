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
  dueDate: z.date({
    required_error: "Please select a date",
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

export const UpdateDistrictSchema = z.object({
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

export const CreateWorkerSchema  = z.object(
  {
    deadline: z.date({
      required_error: "Please select a date",
      invalid_type_error: "That's not a date!",
    }),
    birthDate: z.date({
      required_error: "Please select a date",
      invalid_type_error: "That's not a date!",
    }),
    title: z.string().min(3, {
      message: "Job title must be at least 3 characters long",
    }),
    salary: z.string().min(1, {
      message: "Job salary must be positive",
    }),
    gender: z.string(),
    workingTime: z.string().min(3, {
      message: "Job working time must be at least 3 characters long",
    }),
    workingSchedule: z.string().min(3, {
      message: "Job working schedule must be at least 3 characters long",
    }),
    telegramLink: z.string().optional(),
    instagramLink: z.string().optional(),
    tgUserName: z.string().min(3, {
      message: "Tg user name must be more than 3 characters",
    }),
    phoneNumber: z.string().min(4, {
      message: "Job phone number must be correct",
    }),
    categoryId: z.string().min(3, {
      message: "Job category name must be selected",
    }),
    districtId: z.string().min(3, {
      message: "Job district name must be at selected",
    }),
  }
)

export const updateWorkerSchema  = z.object(
  {
    deadline: z.date({
      required_error: "Please select a date",
      invalid_type_error: "That's not a date!",
    }),
    birthDate: z.date({
      required_error: "Please select a date",
      invalid_type_error: "That's not a date!",
    }),
    title: z.string().min(3, {
      message: "Job title must be at least 3 characters long",
    }),
    salary: z.string().min(1, {
      message: "Job salary must be positive",
    }),
    gender: z.string(),
    workingTime: z.string().min(3, {
      message: "Job working time must be at least 3 characters long",
    }),
    workingSchedule: z.string().min(3, {
      message: "Job working schedule must be at least 3 characters long",
    }),
    telegramLink: z.string().optional(),
    instagramLink: z.string().optional(),
    tgUserName: z.string().min(3, {
      message: "Tg user name must be more than 3 characters",
    }),
    phoneNumber: z.string().min(4, {
      message: "Job phone number must be correct",
    }),
    categoryId: z.string().min(3, {
      message: "Job category name must be selected",
    }),
    regionId: z.string().min(3, {
      message: "Job region name must be at selected",
    }),
    districtId: z.string().min(3, {
      message: "Job district name must be at selected",
    }),
  }
)

export const CreateJobSchema = z.object({
  title: z.string().min(3, {
    message: "Job title must be at least 3 characters long",
  }),
  salary: z.string().min(1, {
    message: "Job salary must be positive",
  }),
  gender: z.string(),
  workingTime: z.string().min(3, {
    message: "Job working time must be at least 3 characters long",
  }),
  workingSchedule: z.string().min(3, {
    message: "Job working schedule must be at least 3 characters long",
  }),
  deadline: z.date({
    required_error: "Please select a date",
    invalid_type_error: "That's not a date!",
  }),
  telegramLink: z.string().optional(),
  instagramLink: z.string().optional(),
  tgUserName: z.string().min(3, {
    message: "Tg user name must be more than 3 characters",
  }),
  phoneNumber: z.string().min(4, {
    message: "Job phone number must be correct",
  }),
  benefit: z.string().min(3, {
    message: "Job benefit must be at least 3 characters long",
  }),
  requirement: z.string().min(3, {
    message: "Job requirement must be at least 3 characters long",
  }),
  minAge: z.string().min(1, {
    message: "Job salary must be positive",
  }),
  maxAge: z.string().min(1, {
    message: "Job salary must be positive",
  }),
  longitude: z.string().min(1, {
    message: "Job salary must be positive",
  }),
  latitude: z.string().min(1, {
    message: "Job salary must be positive",
  }),
  categoryId: z.string().min(3, {
    message: "Job category name must be selected",
  }),
  districtId: z.string().min(3, {
    message: "Job district name must be at selected",
  }),
})

export const UpdateJobSchema = z.object({
  title: z.string().min(3, {
    message: "Job title must be at least 3 characters long",
  }),
  salary: z.string().min(1, {
    message: "Job salary must be positive",
  }),
  gender: z.string(),
  workingTime: z.string().min(3, {
    message: "Job working time must be at least 3 characters long",
  }),
  workingSchedule: z.string().min(3, {
    message: "Job working schedule must be at least 3 characters long",
  }),
  deadline: z.date({
    required_error: "Please select a date",
    invalid_type_error: "That's not a date!",
  }),
  telegramLink: z.string().optional(),
  instagramLink: z.string().optional(),
  tgUserName: z.string().min(3, {
    message: "Tg user name must be more than 3 characters",
  }),
  phoneNumber: z.string().min(4, {
    message: "Job phone number must be correct",
  }),
  benefit: z.string().min(3, {
    message: "Job benefit must be at least 3 characters long",
  }),
  requirement: z.string().min(3, {
    message: "Job requirement must be at least 3 characters long",
  }),
  minAge: z.string().min(1, {
    message: "Job salary must be positive",
  }),
  maxAge: z.string().min(1, {
    message: "Job salary must be positive",
  }),
  longitude: z.string().min(1, {
    message: "Job salary must be positive",
  }),
  latitude: z.string().min(1, {
    message: "Job salary must be positive",
  }),
  categoryId: z.string().min(3, {
    message: "Job category name must be selected",
  }),
  regionId: z.string().min(3, {
    message: "Job region name must be at selected",
  }),
  districtId: z.string().min(3, {
    message: "Job district name must be at selected",
  }),
})