export type HeroMediaType = 'IMAGE' | 'VIDEO';

export interface Hero {
  id: number;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  mediaType: HeroMediaType | null;
  desktopMediaUrl: string | null;
  desktopPublicId: string | null;
  mobileMediaUrl: string | null;
  mobilePublicId: string | null;
  ctaText: string | null;
  ctaLink: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HeroApiResponse {
  success: boolean;
  data: Hero;
}

export interface HeroUploadResponse {
  success: boolean;
  message: string;
  data: {
    mediaType: HeroMediaType | null;
    desktopMediaUrl: string | null;
    mobileMediaUrl: string | null;
  };
}
