import axios from "axios";
import { getAuthToken } from "./auth";

const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const cleanApiUrl = rawApiUrl.replace(/\/+$/, "").replace(/(?:\/api\/v1)+$/, "");
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
