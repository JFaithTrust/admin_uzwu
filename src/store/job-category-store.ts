import { getJobCategories, getJobCategoryById, createJobCategory, updateJobCategory, deleteJobCategory } from "@/store/api";
import {JobCategory} from "@/types";
import {create} from "zustand";

interface JobCategoryState{
  jobCategories: JobCategory[];
  jobCategory: JobCategory | null;
  getJobCategories: () => Promise<void>;
  getJobCategoryById: (id: string) => Promise<void>;
  createJobCategory: (jobCategory: {
    title: string;
    description: string;
  }) => Promise<void>;
  updateJobCategory: (jobCategory: JobCategory) => Promise<void>;
  deleteJobCategory: (id: string) => Promise<void>;
}

const useJobCategoryStore = create<JobCategoryState>((set) => ({
  jobCategories: [],
  jobCategory: null,
  getJobCategories: async () => {
    const jobCategories = await getJobCategories();
    return set(
      (state) => ({...state, jobCategories})
    );
  },
  getJobCategoryById: async (id: string) => {
    const jobCategory = await getJobCategoryById(id);
    return set(
      (state) => ({...state, jobCategory})
    );
  },
  createJobCategory: async (jobCategory) => {
    const newJobCategory = await createJobCategory(jobCategory);
    return set(
      (state) => ({...state, jobCategories: [...state.jobCategories, newJobCategory]})
    );
  },
  updateJobCategory: async (jobCategory) => {
    const updatedJobCategory = await updateJobCategory(jobCategory);
    return set(
      (state) => ({
        ...state,
        jobCategories: state.jobCategories.map((j) => j.id === updatedJobCategory.id ? updatedJobCategory : j),
      })
    );
  },
  deleteJobCategory: async (id) => {
    await deleteJobCategory(id);
    return set(
      (state) => ({
        ...state,
        jobCategories: state.jobCategories.filter((j) => j.id !== id),
      })
    );
  },
}));