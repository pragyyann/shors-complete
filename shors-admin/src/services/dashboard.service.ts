import { axiosInstance as api } from "@/lib/axios";
import { DashboardData } from "@/types/dashboard";

export const dashboardService = {
  getDashboardData: async (): Promise<DashboardData> => {
    const { data } = await api.get<{ success: boolean; data: DashboardData }>("/dashboard");
    return data.data;
  },
};
