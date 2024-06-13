import {Region} from "@/types";
import {create} from "zustand";
import { getRegions, getRegionById, createRegion, updateRegion, deleteRegion } from "@/store/api";

interface RegionState{
  regions: Region[];
  region: Region | null;
  getRegions: () => Promise<void>;
  getRegionById: (id: string) => Promise<void>;
  createRegion: (region: {
    name: string;
  }) => Promise<void>;
  updateRegion: (region: Region) => Promise<void>;
  deleteRegion: (id: string) => Promise<void>;
}

const useRegionStore = create<RegionState>((set) => ({
  regions: [],
  region: null,
  getRegions: async () => {
    const regions = await getRegions();
    return set(
      (state) => ({...state, regions})
    );
  },
  getRegionById: async (id: string) => {
    const region = await getRegionById(id);
    return set(
      (state) => ({...state, region})
    );
  },
  createRegion: async (region) => {
    const newRegion = await createRegion(region);
    return set(
      (state) => ({...state, regions: [...state.regions, newRegion]})
    );
  },
  updateRegion: async (region) => {
    const updatedRegion = await updateRegion(region);
    return set(
      (state) => ({
        ...state,
        regions: state.regions.map((r) => r.id === updatedRegion.id ? updatedRegion : r),
      })
    );
  },
  deleteRegion: async (id) => {
    await deleteRegion(id);
    return set(
      (state) => ({
        ...state,
        regions: state.regions.filter((r) => r.id !== id),
      })
    );
  },
}));