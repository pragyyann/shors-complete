import { axiosInstance } from "../lib/axios";
import { ProductApiResponse, CollectionApiResponse, CreateProductPayload, UpdateProductPayload } from "../types/product";

export const productService = {
  getProducts: async (): Promise<ProductApiResponse> => {
    const response = await axiosInstance.get<ProductApiResponse>("/products");
    return response.data;
  },

  getProduct: async (slug: string): Promise<ProductApiResponse> => {
    const response = await axiosInstance.get<ProductApiResponse>(`/products/${slug}`);
    return response.data;
  },

  getCollections: async (): Promise<CollectionApiResponse> => {
    const response = await axiosInstance.get<CollectionApiResponse>("/collections");
    return response.data;
  },

  createProduct: async (data: CreateProductPayload): Promise<ProductApiResponse> => {
    const response = await axiosInstance.post<ProductApiResponse>("/products", data);
    return response.data;
  },

  updateProduct: async (id: number, data: UpdateProductPayload): Promise<ProductApiResponse> => {
    const response = await axiosInstance.put<ProductApiResponse>(`/products/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id: number): Promise<{ success: boolean; message: string }> => {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  },
};
