import { Worker } from "@/types"
import { create } from "zustand";
import { getWorkers, getWorkerById, createWorker, updateWorker, activateWorkerStatus, deactivateWorkerStatus, deleteWorker } from "@/store/api"

interface WorkerState{
  workers: Worker[],
  worker: Worker | null,
  getWorkers: () => Promise<void>,
  getWorkerById: (id: string) => Promise<void>,
  createWorker: (worker: {
    deadline: Date;
    birthDate: Date;
    title: string;
    salary: number;
    gender: number;
    workingTime: string;
    workingSchedule: string;
    instagramLink: string | undefined;
    telegramLink: string | undefined;
    tgUserName: string;
    phoneNumber: string;
    districtId: string;
    categoryId: string
  }) => Promise<void>,
  updateWorker: (worker: {
    id: string;
    deadline: Date;
    birthDate: Date;
    title: string;
    salary: number;
    gender: number;
    workingTime: string;
    workingSchedule: string;
    instagramLink: string | undefined;
    telegramLink: string | undefined;
    tgUserName: string;
    phoneNumber: string;
    districtId: string;
    categoryId: string
  }) => Promise<void>,
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
  updateWorker: async (worker) => {
    const updatedWorker = await updateWorker(worker);
    return set(
      (state) => ({
        ...state,
        workers: state.workers.map((w) => w.id === updatedWorker.id ? updatedWorker : w)
      })
    );
  },
  updateWorkerStatus: async (id, status) => {
    if(status){
      const updatedWorker = await deactivateWorkerStatus(id);
      return set(
        (state) => ({
          ...state,
          workers: state.workers.map((w) => w.id === updatedWorker.id ? updatedWorker : w)
        })
      );
    }else{
      const updatedWorker = await activateWorkerStatus(id);
      return set(
        (state) => ({
          ...state,
          workers: state.workers.map((w) => w.id === updatedWorker.id ? updatedWorker : w)
        })
      );
    }
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