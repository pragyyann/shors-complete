import { PreorderStatus } from "./preorder";
import { Customer } from "./customer";

export interface DashboardSummary {
  totalProducts: number;
  totalHomepageShowcases: number;
  totalCustomers: number;
  totalPreorders: number;
}

export interface DashboardOrdersCount {
  NEW: number;
  CONTACTED: number;
  CONFIRMED: number;
  CANCELLED: number;
}

export interface DashboardTopProduct {
  id: number;
  name: string;
  preorderCount: number;
}

export interface DashboardRecentPreorder {
  id: number;
  customerId: number;
  productId: number;
  quantity: number;
  status: PreorderStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  customer: Customer;
}

export interface DashboardData {
  summary: DashboardSummary;
  orders: DashboardOrdersCount;
  recentPreorders: DashboardRecentPreorder[];
  topProducts: DashboardTopProduct[];
}
