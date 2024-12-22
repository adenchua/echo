import axios, { AxiosStatic } from "axios";

export default function getAxiosInstance(): AxiosStatic {
  // requires this flag to set cookies to header
  axios.defaults.withCredentials = true;

  return axios;
}
