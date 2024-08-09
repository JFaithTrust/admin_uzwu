import { District } from "@/types";
import { create } from "zustand";
import {
  createDistrict,
  deleteDistrict,
  getDistrictById,
  getDistricts,
  getDistrictsByRegionId,
  updateDistrict
} from "@/store/api";

interface DistrictState{
  districts: District[];
  district: District | null;
  getDistricts: () => Promise<void>;
  getDistrictById: (id: string) => Promise<void>;
  getDistrictsByRegionId: (regionId: string) => Promise<void>;
  createDistrict: (district: {
    name: string;
  }) => Promise<void>;
  updateDistrict: (district: {
    id: string;
    name: string;
  }) => Promise<void>;
  deleteDistrict: (id: string) => Promise<void>;
}

const useDistrictStore = create<DistrictState>((set) => ({
  districts: [],
  district: null,
  getDistricts: async () => {
    const districts = await getDistricts();
    return set(
      (state) => ({...state, districts})
    );
  },
  getDistrictById: async (id: string) => {
    const district = await getDistrictById(id);
    return set(
      (state) => ({...state, district})
    );
  },
  getDistrictsByRegionId: async (regionId: string) => {
    const districts = await getDistrictsByRegionId(regionId);
    return set(
      (state) => ({...state, districts})
    );
  },
  createDistrict: async (district) => {
    const newDistrict = await createDistrict(district);
    return set(
      (state) => ({...state, districts: [...state.districts, newDistrict]})
    );
  },
  updateDistrict: async (district) => {
    const updatedDistrict = await updateDistrict(district);
    return set(
      (state) => ({
        ...state,
        districts: state.districts.map((d) => d.id === updatedDistrict.id ? updatedDistrict : d),
      })
    );
  },
  deleteDistrict: async (id) => {
    await deleteDistrict(id);
    return set(
      (state) => ({
        ...state,
        districts: state.districts.filter((d) => d.id !== id),
      })
    );
  },
}))

export default useDistrictStore;