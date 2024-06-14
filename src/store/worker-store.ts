import { Worker } from "@/types"
import { create } from "zustand";
import { getWorkers, getWorkerById, createWorker, updateWorker, updateWorkerStatus, deleteWorker } from "@/store/api"

interface WorkerState{
  workers: Worker[],
  worker: Worker | null,
  getWorkers: () => Promise<void>,
  getWorkerById: (id: string) => Promise<void>,
  createWorker: (worker: {
    title: string;
    gender: number;
    salary: number;
    instagramLink?: string;
    telegramLink?: string;
    tgUsername: string;
    workingTime: string;
    workingSchedule: string;
    birthDate: Date;
    deadline: Date;
    phoneNumber: string;
    districtId: string;
    categoryId: string;
  }) => Promise<void>,
  updateWorker: (worker: Worker) => Promise<void>,
  updateWorkerStatus: (id: string, status: boolean) => Promise<void>,
  deleteWorker: (id: string) => Promise<void>
}

const useWorkerStore = create<WorkerState>((set) => ({
  workers: [],
  worker: null,
  getWorkers: async () => {
    const workers = await getWorkers();
    return set(
      (state) => ({...state, workers})
    );
  },
  getWorkerById: async (id: string) => {
    const worker = await getWorkerById(id);
    return set(
      (state) => ({...state, worker})
    );
  },
  createWorker: async (worker) => {
    const newWorker = await createWorker(worker);
    return set(
      (state) => ({...state, workers: [...state.workers, newWorker]})
    );
  },
  updateWorker: async (worker: Worker) => {
    const updatedWorker = await updateWorker(worker);
    return set(
      (state) => ({
        ...state,
        workers: state.workers.map((w) => w.id === updatedWorker.id ? updatedWorker : w)
      })
    );
  },
  updateWorkerStatus: async (id, status) => {
    const updatedWorker = await updateWorkerStatus(id, status);
    return set(
      (state) => ({
        ...state,
        workers: state.workers.map((w) => w.id === updatedWorker.id ? updatedWorker : w)
      })
    );
  },
  deleteWorker: async (id) => {
    await deleteWorker(id);
    return set(
      (state) => ({
        ...state,
        workers: state.workers.filter((w) => w.id !== id)
      })
    );
  }
}));

export default useWorkerStore;