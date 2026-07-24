import { axiosInstance as api } from "@/lib/axios";
import {
  PaginatedPreorders,
  GetPreordersOptions,
  UpdatePreorderData,
  Preorder,
} from "@/types/preorder";

export const preorderService = {
  getPreorders: async (options: GetPreordersOptions): Promise<PaginatedPreorders> => {
    const { data } = await api.get<{
      success: boolean;
      data: Preorder[];
      meta: { total: number; page: number; limit: number; totalPages: number };
    }>("/preorders", { params: options });
    
    return {
      total: data.meta.total,
      page: data.meta.page,
      limit: data.meta.limit,
      totalPages: data.meta.totalPages,
      data: data.data,
    };
  },

  getPreorderById: async (id: number): Promise<Preorder> => {
    const { data } = await api.get<{ success: boolean; data: Preorder }>(`/preorders/${id}`);
    return data.data;
  },

  updatePreorder: async (id: number, payload: UpdatePreorderData): Promise<Preorder> => {
    const { data } = await api.put<{ success: boolean; data: Preorder }>(`/preorders/${id}`, payload);
    return data.data;
  },
};
