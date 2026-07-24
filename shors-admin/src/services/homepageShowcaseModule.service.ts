import { axiosInstance } from "../lib/axios";
import { HomepageShowcaseModuleApiResponse } from "../types/homepageShowcaseModule";

export const homepageShowcaseModuleService = {
  getHomepageShowcase: async (): Promise<HomepageShowcaseModuleApiResponse> => {
    const response = await axiosInstance.get<HomepageShowcaseModuleApiResponse>(
      "/homepage-showcase-module"
    );
    return response.data;
  },

  updateHomepageShowcase: async (
    data: FormData
  ): Promise<HomepageShowcaseModuleApiResponse> => {
    const response = await axiosInstance.put<HomepageShowcaseModuleApiResponse>(
      "/homepage-showcase-module",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },
};
