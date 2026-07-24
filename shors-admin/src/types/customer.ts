import { Preorder } from "./preorder";

export interface Customer {
  id: number;
  name: string;
  email?: string | null;
  phone: string;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  createdAt: string;
  updatedAt: string;
  
  // Computed stats from backend
  totalOrders: number;
  totalQuantity: number;
  lastOrderDate: string | null;

  // Relations (Available in detailed fetch)
  preorders?: Preorder[];
}

export interface PaginatedCustomers {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: Customer[];
}

export interface GetCustomersOptions {
  page?: number;
  limit?: number;
  search?: string;
}
