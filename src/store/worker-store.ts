import { create } from "zustand";
import { Worker } from "@/types"
import { getWorkers, getWorkerById, createWorker, updateWorker, updateWorkerStatus, deleteWorker } from "./api"

interface WorkerState{
  workers: Worker[],
  worker: Worker | null,
  getWorkers: () => Promise<void>,
  getWorkerById: (id: string) => Promise<void>,
  createWorker: (worker: {
    title: string,
    gender: number,
    salary: number,
    phoneNumber: string,
    tgUserName: string,
    instagramLink?: string,
    telegramLink?: string,
    workingTime: string,
    workingSchedule: string,
    birthDate: Date,
    deadline: Date,
    districtId: string,
    categoryId: string
  }) => Promise<void>,
  updateWorker: (worker: Worker) => Promise<void>,
  updateWorkerStatus: (id: string, status: boolean) => Promise<void>
  deleteWorker: Promise<void>
}

// const useWorkerStore = create<WorkerState>((set) => ({
//   workers: [],
//   worker: null,
//   getWorkers: async () => {
//
//   }
// }))