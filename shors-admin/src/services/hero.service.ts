import { axiosInstance } from "../lib/axios";
import { HeroApiResponse, HeroUploadResponse } from "../types/hero";
import { AxiosProgressEvent } from "axios";

export const heroService = {
  getHero: async (): Promise<HeroApiResponse> => {
    const response = await axiosInstance.get<HeroApiResponse>("/hero");
    return response.data;
  },

  uploadDesktopMedia: async (
    file: File,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  ): Promise<HeroUploadResponse> => {
    const formData = new FormData();
    formData.append("media", file);

    const response = await axiosInstance.put<HeroUploadResponse>(
      "/hero/media/desktop",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      }
    );
    return response.data;
  },

  uploadMobileMedia: async (
    file: File,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  ): Promise<HeroUploadResponse> => {
    const formData = new FormData();
    formData.append("media", file);

    const response = await axiosInstance.put<HeroUploadResponse>(
      "/hero/media/mobile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
      }
    );
    return response.data;
  },
};
