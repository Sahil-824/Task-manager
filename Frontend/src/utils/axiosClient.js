import axios from "axios";
import { KEY_ACCESS_TOKEN, getItem } from "./localStorageManager";

import toast from "react-hot-toast";

const baseURL = "http://localhost:4000";

export const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((request) => {
  const accessToken = getItem(KEY_ACCESS_TOKEN);
  request.headers["Authorization"] = `Bearer ${accessToken}`;

  return request;
});

axiosClient.interceptors.response.use(
  async (response) => {
    const data = response.data;

    if (data.status === "ok") {
      return data;
    }

    toast.error(data.message);

    
    const error = data.message;

    
    return Promise.reject(error);
  },
  async (error) => {
    return Promise.reject(error);
  }
);
