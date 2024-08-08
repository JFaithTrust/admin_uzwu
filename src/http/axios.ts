import axios, { AxiosInstance } from "axios";

const BASE_URL = "http://45.130.148.122:27";

const $axios: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
export default $axios;