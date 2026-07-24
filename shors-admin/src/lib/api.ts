import { axiosInstance } from "./axios";

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: User;
}

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>("/auth/login", credentials);
    return response.data;
  },
};
