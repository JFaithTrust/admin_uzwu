import axios from "@/store/axios";
import {District, FAQ, Feedback, Job, JobCategory, Region, Worker} from "@/types";

// District
export async function getDistricts() {
  const {data} = await axios.get<District[]>("/api/District/GetAll");
  return data;
}

export async function getDistrictById(id: string) {
  const {data} = await axios.get<District>(`/api/District/GetById/${id}`);
  return data;
}

export async function getDistrictsByRegionId(regionId: string) {
  const {data} = await axios.get<District[]>(`/api/District/GetByRegionId/${regionId}`);
  return data;
}

export async function createDistrict(district: {name: string}) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  const {data} = await axios.post<District>("/api/District/Create", district, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
  return data;
}

export async function updateDistrict(district: District) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  const {data} = await axios.put<District>("/api/District/Update", district, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
  return data;
}

export async function deleteDistrict(id: string) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  await axios.delete(`/api/District/Delete/${id}`, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
}

// Region
export async function getRegions() {
  const {data} = await axios.get<Region[]>("/api/Region/GetAll");
  return data;
}

export async function getRegionById(id: string) {
  const {data} = await axios.get<Region>(`/api/Region/GetById/${id}`);
  return data;
}

export async function createRegion(region: {name: string}) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  const {data} = await axios.post<Region>("/api/Region/Create", region, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
  return data;
}

export async function updateRegion(region: Region) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  const {data} = await axios.put<Region>("/api/Region/Update", region, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
  return data;
}

export async function deleteRegion(id: string) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  await axios.delete(`/api/Region/Delete/${id}`, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
}

// FAQ
export async function getFaqs() {
  const {data} = await axios.get<FAQ[]>("/api/FAQ/GetAll");
  return data;
}

export async function getFaqById(id: string) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  const {data} = await axios.get<FAQ>(`/api/FAQ/GetById/${id}`, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
  return data;
}

export async function createFaq(faq: {question: string; answer: string}) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  const {data} = await axios.post<FAQ>("/api/FAQ/Create", faq, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
  return data;
}

export async function updateFaq(faq: FAQ) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  const {data} = await axios.put<FAQ>("/api/FAQ/Update", faq, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
  return data;
}

export async function deleteFaq(id: string) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  await axios.delete(`/api/FAQ/Delete/${id}`, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
}

// Feedback
export async function getFeedbacks() {
  const {data} = await axios.get<Feedback[]>("/api/Feedback/GetAll");
  return data;
}

export async function getFeedbackById(id: string) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  const {data} = await axios.get<Feedback>(`/api/Feedback/GetById/${id}`, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
  return data;
}

export async function createFeedback(feedback: {message: string; fullName: string; dueDate: Date}) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  const {data} = await axios.post<Feedback>("/api/Feedback/Create", feedback, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
  return data;
}

export async function updateFeedback(feedback: Feedback) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  const {data} = await axios.put<Feedback>("/api/Feedback/Update", feedback, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
  return data;
}

export async function deleteFeedback(id: string) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  await axios.delete(`/api/Feedback/Delete/${id}`, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
}

// Job Category
export async function getJobCategories() {
  const {data} = await axios.get<JobCategory[]>("/api/JobCategory/GetAll");
  return data;
}

export async function getJobCategoryById(id: string) {
  const {data} = await axios.get<JobCategory>(`/api/JobCategory/GetById/${id}`);
  return data;
}

export async function createJobCategory(jobCategory: {title: string, description: string}) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  const {data} = await axios.post<JobCategory>("/api/JobCategory/Create", jobCategory, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
  return data;
}

export async function updateJobCategory(jobCategory: JobCategory) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  const {data} = await axios.put<JobCategory>("/api/JobCategory/Update", jobCategory, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
  return data;
}

export async function deleteJobCategory(id: string) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  await axios.delete(`/api/JobCategory/Delete/${id}`, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
}

// Job
export async function getJobs() {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  const {data} = await axios.get<Job[]>("/api/Job/GetAllForAdmin", {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
  return data;
}

export async function getJobById(id: string) {
  const {data} = await axios.get<Job>(`/api/Job/GetById/${id}`);
  return data;
}

export async function createJob(job:{
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
}){
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;
  const {data} = await axios.post<Job>("/api/Job/Create", job, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
  return data;
}

export async function updateJob(job: Job) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;
  const {data} = await axios.put<Job>("/api/Job/Update", job, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
  return data;
}

export async function activateJobStatus(id: string){
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;
  const { data } = await axios.put<Job>(`api/Job/Activate/${id}`,{}, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  })
  return data;
}

export async function deactivateJobStatus(id: string){
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;
  const { data } = await axios.put<Job>(`api/Job/Deactivate/${id}`,{}, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  })
  return data;
}

export async function deleteJob(id: string) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;
  await axios.delete(`/api/Job/Delete/${id}`, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
}

// Worker
export async function getWorkers() {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  const { data} = await axios.get<Worker[]>("/api/Worker/GetAllForAdmin", {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
  return data;
}

export async function getWorkerById(id: string) {
  const {data} = await axios.get<Worker>(`/api/Worker/GetById/${id}`);
  return data;
}

export async function createWorker(worker: {
  instagramLink: string | undefined;
  gender: number;
  telegramLink: string | undefined;
  workingTime: string;
  title: string;
  salary: number;
  tgUserName: string;
  birthDate: Date;
  workingSchedule: string;
  phoneNumber: string;
  districtId: string;
  deadline: Date;
  categoryId: string
}) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  const {data} = await axios.post<Worker>("/api/Worker/Create", worker, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
  return data;
}

export async function updateWorker(worker: Worker) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  const {data} = await axios.put<Worker>("/api/Worker/Update", worker, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
  return data;
}

export async function activateWorkerStatus(id: string){
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  const { data } = await axios.put<Worker>(`api/Worker/Activate/${id}`,{}, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  })
  return data;
}

export async function deactivateWorkerStatus(id: string){
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  const { data } = await axios.put<Worker>(`api/Worker/Deactivate/${id}`,{}, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  })
  return data;
}

export async function deleteWorker(id: string) {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  await axios.delete(`/api/Worker/Delete/${id}`, {
    headers: {
      Authorization: `Bearer ${initialUser.token}`,
    },
  });
}