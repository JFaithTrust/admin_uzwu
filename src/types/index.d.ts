class BaseObject{
  id: string;
  createDate: Date;
  title: string;
  salary: number;
  gender: string;
  workingTime: string;
  workingSchedule: string;
  isTop: boolean;
  status: boolean;
  deadline: Date;
  telegramLink: string;
  instagramLink: string;
  tgUserName: string;
  phoneNumber: string;
  jobCategory: JobCategory;
  district: District;
}

export class Job extends BaseObject {
  benefit: string;
  requirement: string;
  minAge: number;
  maxAge: number;
  latitude: number;
  longitude: number;
}

export class Worker extends BaseObject {
  createdBy: string;
  birthDate: Date;
  fullName: string;
  userName: string;
}

export interface District {
  id: string;
  name: string;
  region: Region;
}

export interface Region {
  id: string;
  name: string;
}

export interface FAQ{
  id: string;
  question: string;
  answer: string;
  createDate: Date;
}

export interface Feedback{
  id: string;
  message: string;
  fullName: string;
  dueDate: Date;
}

export interface JobCategory {
  id: string;
  title: string;
  description: string;
}