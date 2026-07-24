import { axiosInstance as api } from "@/lib/axios";
import { PaginatedCommunityMembers, GetCommunityOptions, CommunityMember } from "@/types/community";

export const communityService = {
  getCommunity: async (options: GetCommunityOptions): Promise<PaginatedCommunityMembers> => {
    const { data } = await api.get<{
      success: boolean;
      data: CommunityMember[];
      meta: { total: number; page: number; limit: number; totalPages: number };
    }>("/community", { params: options });
    
    return {
      total: data.meta.total,
      page: data.meta.page,
      limit: data.meta.limit,
      totalPages: data.meta.totalPages,
      data: data.data,
    };
  },
};
