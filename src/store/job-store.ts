import { Job } from "@/types";
import { create } from "zustand";
import { getJobs, getJobById, createJob, updateJob, activateJobStatus, deactivateJobStatus, deleteJob } from "@/store/api";

interface JobState{
  jobs: Job[],
  job: Job | null,
  getJobs: () => Promise<void>,
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
}

const useJobStore = create<JobState>((set) => ({
  jobs: [],
  job: null,
  getJobs: async () => {
    const jobs = await getJobs();
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
  }
}));

export default useJobStore;