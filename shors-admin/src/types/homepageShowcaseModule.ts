export interface FeaturedProduct {
  id: number;
  name: string;
  category: string;
  images: { imageUrl: string; imageType: string }[];
}

export interface HomepageShowcaseModule {
  id: number;
  blockOneBannerImage: string | null;
  blockOneBannerImagePublicId: string | null;
  blockOneLabel: string | null;
  blockOneCollectionName: string | null;
  blockOneIsActive: boolean;
  blockOneDescription: string | null;
  blockOneProductOneId: number | null;
  blockOneProductTwoId: number | null;
  
  blockTwoBannerImage: string | null;
  blockTwoBannerImagePublicId: string | null;
  blockTwoLabel: string | null;
  blockTwoCollectionName: string | null;
  blockTwoIsActive: boolean;
  blockTwoDescription: string | null;
  blockTwoProductOneId: number | null;
  blockTwoProductTwoId: number | null;
  
  createdAt: string;
  updatedAt: string;
  
  blockOneProductOne?: FeaturedProduct | null;
  blockOneProductTwo?: FeaturedProduct | null;
  blockTwoProductOne?: FeaturedProduct | null;
  blockTwoProductTwo?: FeaturedProduct | null;
}

export interface HomepageShowcaseModuleApiResponse {
  success: boolean;
  data: HomepageShowcaseModule;
}
