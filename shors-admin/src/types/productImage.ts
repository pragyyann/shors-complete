export type ImageType = "MAIN" | "HOVER" | "DETAIL_1" | "DETAIL_2";

export interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  publicId: string;
  imageType: ImageType;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImageApiResponse {
  success: boolean;
  data: ProductImage | ProductImage[];
}
