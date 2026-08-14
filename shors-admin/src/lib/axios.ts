import axios from "axios";
import { getAuthToken } from "./auth";

let cleanApiUrl = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").trim();
while (cleanApiUrl.endsWith("/")) cleanApiUrl = cleanApiUrl.slice(0, -1);
while (cleanApiUrl.endsWith("/api/v1")) {
  cleanApiUrl = cleanApiUrl.slice(0, -7);
  while (cleanApiUrl.endsWith("/")) cleanApiUrl = cleanApiUrl.slice(0, -1);
}
export const API_BASE_URL = `${cleanApiUrl}/api/v1`;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
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
