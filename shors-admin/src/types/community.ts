export interface CommunityMember {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  sourcePage: string | null;
  triggerType: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedCommunityMembers {
  data: CommunityMember[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetCommunityOptions {
  page?: number;
  limit?: number;
}
