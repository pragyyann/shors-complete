import { Customer } from "./customer";
import { Product } from "./product";

export type PreorderStatus = "NEW" | "CONTACTED" | "CONFIRMED" | "IN_PRODUCTION" | "READY" | "DELIVERED" | "CANCELLED";

export interface Preorder {
  id: number;
  customerId: number;
  productId: number;
  fullName: string;
  quantity: number;
  status: PreorderStatus;
  message?: string;
  internalNotes?: string;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  customer?: Customer;
  product?: Product;
}

export interface PaginatedPreorders {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: Preorder[];
}

export interface GetPreordersOptions {
  page?: number;
  limit?: number;
  status?: PreorderStatus;
  search?: string;
  sort?: "desc" | "asc";
}

export interface UpdatePreorderData {
  status?: PreorderStatus;
  adminNotes?: string;
}
