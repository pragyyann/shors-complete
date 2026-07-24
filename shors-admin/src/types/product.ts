export interface Collection {
  id: number;
  name: string;
  slug: string;
  slot: string;
  description: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  publicId: string;
  imageType: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  category: string;
  name: string;
  slug: string;
  description: string | null;
  material: string | null;
  preorderMessage: string | null;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
  images?: ProductImage[];
}

export interface ProductApiResponse {
  success: boolean;
  data: Product | Product[];
}

export interface CollectionApiResponse {
  success: boolean;
  data: Collection | Collection[];
}

export interface CreateProductPayload {
  name: string;
  slug: string;
  category: string;
  description?: string;
  isActive?: boolean;
}

export type UpdateProductPayload = Partial<CreateProductPayload>;
