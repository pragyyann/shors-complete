import axios from "axios";
import { getAuthToken } from "./auth";

export const axiosInstance = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "") + "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
