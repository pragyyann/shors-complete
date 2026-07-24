import { axiosInstance as api } from "@/lib/axios";
import {
  PaginatedCustomers,
  GetCustomersOptions,
  Customer,
} from "@/types/customer";

export const customerService = {
  getCustomers: async (options: GetCustomersOptions): Promise<PaginatedCustomers> => {
    const { data } = await api.get<{
      success: boolean;
      data: {
        data: Customer[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
      message: string;
    }>("/customers", { params: options });
    
    return {
      total: data.data.total,
      page: data.data.page,
      limit: data.data.limit,
      totalPages: data.data.totalPages,
      data: data.data.data,
    };
  },

  getCustomerById: async (id: number): Promise<Customer> => {
    const { data } = await api.get<{ success: boolean; data: Customer }>(`/customers/${id}`);
    return data.data;
  },
};
