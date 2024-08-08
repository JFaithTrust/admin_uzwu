import { Job } from "@/types";
import { create } from "zustand";
import {
  activateJobStatus,
  createJob,
  deactivateJobStatus,
  deleteJob,
  getJobById, getJobCount,
  getJobsPagination,
  updateJob
} from "@/store/api";

interface JobState {
  jobs: Job[],
  job: Job | null,
  count: number,
  getJobsPagination: (pageNumber: number, pageSize: number) => Promise<void>,
  getJobById: (id: string) => Promise<void>,
  createJob: (job: {
    title: string;
    salary: number;
    gender: number;
    workingTime: string;
    workingSchedule: string;
    deadline: Date;
    instagramLink: string | undefined;
    telegramLink: string | undefined
    tgUserName: string;
    phoneNumber: string;
    benefit: string;
    requirement: string;
    minAge: number;
    maxAge: number;
    longitude: number;
    latitude: number;
    categoryId: string;
    districtId: string;
  }) => Promise<void>,
  updateJob: (job: {
    id: string;
    title: string;
    salary: number;
    gender: number;
    workingTime: string;
    workingSchedule: string;
    deadline: Date;
    instagramLink: string | undefined;
    telegramLink: string | undefined
    tgUserName: string;
    phoneNumber: string;
    benefit: string;
    requirement: string;
    minAge: number;
    maxAge: number;
    longitude: number;
    latitude: number;
    categoryId: string;
    districtId: string;
  }) => Promise<void>,
  updateJobStatus: (id: string, status: boolean) => Promise<void>,
  deleteJob: (id: string) => Promise<void>
  updateJobCount: () => Promise<void>
}

const useJobStore = create<JobState>((set) => ({
  jobs: [],
  job: null,
  count: 0,
  getJobsPagination: async (pageNumber: number, pageSize: number) => {
    const jobs = await getJobsPagination(pageNumber, pageSize);
    return set(
      (state) => ({...state, jobs})
    );
  },
  getJobById: async (id: string) => {
    const job = await getJobById(id);
    return set(
      (state) => ({...state, job})
    );
  },
  createJob: async (job) => {
    const newJob = await createJob(job);
    return set(
      (state) => ({...state, jobs: [...state.jobs, newJob]})
    );
  },
  updateJob: async (job) => {
    const updatedJob = await updateJob(job);
    return set(
      (state) => ({
        ...state,
        jobs: state.jobs.map((j) => j.id === updatedJob.id ? updatedJob : j)
      })
    );
  },
  updateJobStatus: async (id, status) => {
    if(status){
      const updatedJob = await deactivateJobStatus(id);
      return set(
        (state) => ({
          ...state,
          jobs: state.jobs.map((j) => j.id === updatedJob.id ? updatedJob : j)
        })
      );
    }else{
      const updatedJob = await activateJobStatus(id);
      return set(
        (state) => ({
          ...state,
          jobs: state.jobs.map((j) => j.id === updatedJob.id ? updatedJob : j)
        })
      );
    }
  },
  deleteJob: async (id) => {
    await deleteJob(id);
    return set(
      (state) => ({
        ...state,
        jobs: state.jobs.filter((j) => j.id !== id)
      })
    );
  },
  updateJobCount: async () => {
    const count = await getJobCount();
    return set(
      (state) => ({...state, count })
    );
  }
}));

export default useJobStore;