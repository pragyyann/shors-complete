import { axiosInstance as api } from "@/lib/axios";
import { ChangePasswordPayload } from "@/types/settings";

export const settingsService = {
  changePassword: async (payload: ChangePasswordPayload) => {
    const { data } = await api.put<{ success: boolean; message: string }>("/settings/change-password", payload);
    return data;
  },
};
