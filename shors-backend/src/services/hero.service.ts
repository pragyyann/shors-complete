import { prisma } from "../lib/prisma";
import { UploadService } from "./upload.service";
import { ApiError } from "../utils/ApiError";

const uploadService = new UploadService();

export class HeroService {
  async getHero() {
    let hero = await prisma.hero.findFirst();
    if (!hero) {
      // If hero doesn't exist, create an empty one to guarantee one row
      hero = await prisma.hero.create({ data: {} });
    }
    return hero;
  }

  async updateDesktopMedia(fileBuffer: Buffer) {
    const hero = await this.getHero();

    // 1. Upload new media
    const result = await uploadService.uploadImage(fileBuffer) as any;

    // 2. Delete previous media if exists
    if (hero.desktopPublicId) {
      try {
        await uploadService.deleteImage(hero.desktopPublicId);
      } catch (error) {
        console.error("Failed to delete previous desktop media:", error);
      }
    }

    // 3. Update Hero
    // By default, assuming uploaded image is of mediaType "IMAGE". 
    // Cloudinary format or user input might specify VIDEO, but we'll set IMAGE.
    const updatedHero = await prisma.hero.update({
      where: { id: hero.id },
      data: {
        desktopMediaUrl: result.url,
        desktopPublicId: result.publicId,
        mediaType: "IMAGE",
      },
    });

    return updatedHero;
  }

  async updateMobileMedia(fileBuffer: Buffer) {
    const hero = await this.getHero();

    // 1. Upload new media
    const result = await uploadService.uploadImage(fileBuffer) as any;

    // 2. Delete previous media if exists
    if (hero.mobilePublicId) {
      try {
        await uploadService.deleteImage(hero.mobilePublicId);
      } catch (error) {
        console.error("Failed to delete previous mobile media:", error);
      }
    }

    // 3. Update Hero
    const updatedHero = await prisma.hero.update({
      where: { id: hero.id },
      data: {
        mobileMediaUrl: result.url,
        mobilePublicId: result.publicId,
        mediaType: "IMAGE",
      },
    });

    return updatedHero;
  }
}
