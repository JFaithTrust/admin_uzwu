
import {District, FAQ, Feedback, Job, JobCategory, Region, Worker} from "@/types";
import $axios from "@/http/axios";
import $api from "@/http/api";

// District
export async function getDistricts() {
  const {data} = await $axios.get<District[]>("/api/District/GetAll");
  return data;
}

export async function getDistrictById(id: string) {
  const {data} = await $axios.get<District>(`/api/District/GetById/${id}`);
  return data;
}

export async function getDistrictsByRegionId(regionId: string) {
  const {data} = await $axios.get<District[]>(`/api/District/GetByRegionId/${regionId}`);
  return data;
}

export async function createDistrict(district: {name: string}) {
  const {data} = await $api.post<District>("/api/District/Create", district);
  return data;
}

export async function updateDistrict(district: {
  id: string;
  name: string;
}) {

  const {data} = await $api.put<District>("/api/District/Update", district);
  return data;
}

export async function deleteDistrict(id: string) {
  await $api.delete(`/api/District/Delete/${id}`);
}

// Region
export async function getRegions() {
  const {data} = await $axios.get<Region[]>("/api/Region/GetAll");
  return data;
}

export async function getRegionById(id: string) {
  const {data} = await $axios.get<Region>(`/api/Region/GetById/${id}`);
  return data;
}

export async function createRegion(region: {name: string}) {
  const {data} = await $api.post<Region>("/api/Region/Create", region);
  return data;
}

export async function updateRegion(region: Region) {
  const {data} = await $api.put<Region>("/api/Region/Update", region);
  return data;
}

export async function deleteRegion(id: string) {
  await $api.delete(`/api/Region/Delete/${id}`);
}

// FAQ
export async function getFaqs() {
  const {data} = await $axios.get<FAQ[]>("/api/FAQ/GetAll");
  return data;
}

export async function getFaqById(id: string) {
  const {data} = await $api.get<FAQ>(`/api/FAQ/GetById/${id}`);
  return data;
}

export async function createFaq(faq: {question: string; answer: string}) {
  const {data} = await $api.post<FAQ>("/api/FAQ/Create", faq);
  return data;
}

export async function updateFaq(faq: FAQ) {
  const {data} = await $api.put<FAQ>("/api/FAQ/Update", faq);
  return data;
}

export async function deleteFaq(id: string) {
  await $api.delete(`/api/FAQ/Delete/${id}`);
}

// Feedback
export async function getFeedbacks() {
  const {data} = await $axios.get<Feedback[]>("/api/Feedback/GetAll");
  return data;
}

export async function getFeedbackById(id: string) {
  const {data} = await $api.get<Feedback>(`/api/Feedback/GetById/${id}`);
  return data;
}

export async function createFeedback(feedback: {message: string; fullName: string; dueDate: Date}) {
  const {data} = await $api.post<Feedback>("/api/Feedback/Create", feedback);
  return data;
}

export async function updateFeedback(feedback: Feedback) {
  const {data} = await $api.put<Feedback>("/api/Feedback/Update", feedback);
  return data;
}

export async function deleteFeedback(id: string) {
  await $api.delete(`/api/Feedback/Delete/${id}`);
}

// Job Category
export async function getJobCategories() {
  const {data} = await $axios.get<JobCategory[]>("/api/JobCategory/GetAll");
  return data;
}

export async function getJobCategoryById(id: string) {
  const {data} = await $axios.get<JobCategory>(`/api/JobCategory/GetById/${id}`);
  return data;
}

export async function createJobCategory(jobCategory: {title: string, description: string}) {
  const {data} = await $api.post<JobCategory>("/api/JobCategory/Create", jobCategory);
  return data;
}

export async function updateJobCategory(jobCategory: JobCategory) {
  const {data} = await $api.put<JobCategory>("/api/JobCategory/Update", jobCategory);
  return data;
}

export async function deleteJobCategory(id: string) {
  await $api.delete(`/api/JobCategory/Delete/${id}`);
}

// Job
export async function getJobsPagination(pageNumber: number, pageSize: number) {
  const {data} = await $api.get<Job[]>(`/api/Job/GetAllForAdmin?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  return data;
}

export async function getJobById(id: string) {
  const {data} = await $axios.get<Job>(`/api/Job/GetById/${id}`);
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
  const {data} = await $api.post<Job>("/api/Job/Create", job);
  return data;
}

export async function updateJob(job: {
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
}) {
  const {data} = await $api.put<Job>("/api/Job/Update", job);
  return data;
}

export async function activateJobStatus(id: string){
  const { data } = await $api.put<Job>(`api/Job/Activate/${id}`,{})
  return data;
}

export async function deactivateJobStatus(id: string){
  const { data } = await $api.put<Job>(`api/Job/Deactivate/${id}`,{})
  return data;
}

export async function deleteJob(id: string) {
  await $api.delete(`/api/Job/Delete/${id}`);
}

export async function getJobCount() {
  const { data } = await $api.get<number>("/api/Job/GetCountForFilter");
  return data;
}

// Worker
export async function getWorkersPagination(pageNumber: number, pageSize: number) {
  const { data} = await $api.get<Worker[]>(`/api/Worker/GetAllForAdmin?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  return data;
}

export async function getWorkerById(id: string) {
  const {data} = await $axios.get<Worker>(`/api/Worker/GetById/${id}`);
  return data;
}

export async function createWorker(worker: {
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
}) {
  const {data} = await $api.post<Worker>("/api/Worker/Create", worker);
  return data;
}

export async function updateWorker(worker: {
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
}) {
  const {data} = await $api.put<Worker>("/api/Worker/Update", worker);
  return data;
}

export async function activateWorkerStatus(id: string){
  const { data } = await $api.put<Worker>(`api/Worker/Activate/${id}`,{})
  return data;
}

export async function deactivateWorkerStatus(id: string){
  const { data } = await $api.put<Worker>(`api/Worker/Deactivate/${id}`,{})
  return data;
}

export async function deleteWorker(id: string) {
  await $api.delete(`/api/Worker/Delete/${id}`);
}

export async function getWorkerCount() {
  const { data } = await $axios.get<number>("/api/Job/GetCountForFilter");
  return data;
}