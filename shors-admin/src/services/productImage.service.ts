import { axiosInstance } from "../lib/axios";
import { ProductImageApiResponse, ImageType } from "../types/productImage";
import { AxiosProgressEvent } from "axios";

export const productImageService = {
  getImages: async (productId: number): Promise<ProductImageApiResponse> => {
    const response = await axiosInstance.get<ProductImageApiResponse>(
      `/products/${productId}/images`
    );
    return response.data;
  },

  uploadImage: async (
    productId: number,
    file: File | Blob,
    imageType: ImageType,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  ): Promise<ProductImageApiResponse> => {
    const formData = new FormData();
    // Use a filename if it's a blob from our "Set as Primary" workaround
    formData.append("image", file, file instanceof File ? file.name : "primary-image.jpg");
    formData.append("imageType", imageType);

    const response = await axiosInstance.post<ProductImageApiResponse>(
      `/products/${productId}/images`,
      formData,
      {
        headers: {
          "Content-Type": undefined,
        },
        onUploadProgress,
      }
    );
    return response.data;
  },

  updateDisplayOrder: async (
    imageId: number,
    displayOrder: number
  ): Promise<ProductImageApiResponse> => {
    const response = await axiosInstance.put<ProductImageApiResponse>(
      `/products/images/${imageId}`,
      { displayOrder }
    );
    return response.data;
  },

  deleteImage: async (
    imageId: number
  ): Promise<{ success: boolean; message: string }> => {
    const response = await axiosInstance.delete(`/products/images/${imageId}`);
    return response.data;
  },
};
