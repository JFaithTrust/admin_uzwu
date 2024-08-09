import axios from 'axios'
import { redirect } from "next/navigation";

export const API_URL = 'http://45.130.148.122:27'

const $api = axios.create({
  baseURL: `${API_URL}`,
})

$api.interceptors.request.use((config) => {
  const initialUser = typeof window !== 'undefined' && localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  config.headers.Authorization = `Bearer ${initialUser.token}`
  return config
})

$api.interceptors.response.use(config => {
    return config
  },
  error => {
    const originalRequest = error.config

    if (error?.response?.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      localStorage.removeItem("user")
      redirect("/")
    }

    throw error
  }
)

export default $api