import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";
import { UploadService } from "./upload.service";
import { Prisma } from "@prisma/client";

const uploadService = new UploadService();

interface UploadResult {
  url: string;
  publicId: string;
}

export class HomepageShowcaseModuleService {
  async getHomepageShowcase() {
    let showcase = await prisma.homepageShowcaseModule.findFirst({
      include: {
        blockOneProductOne: { include: { images: true } },
        blockOneProductTwo: { include: { images: true } },
        blockTwoProductOne: { include: { images: true } },
        blockTwoProductTwo: { include: { images: true } },
      },
    });

    if (!showcase) {
      showcase = await prisma.homepageShowcaseModule.create({
        data: {
          blockOneIsActive: false,
          blockTwoIsActive: false,
        },
        include: {
          blockOneProductOne: { include: { images: true } },
          blockOneProductTwo: { include: { images: true } },
          blockTwoProductOne: { include: { images: true } },
          blockTwoProductTwo: { include: { images: true } },
        },
      });
    }

    return showcase;
  }

  async updateHomepageShowcase(
    data: Prisma.HomepageShowcaseModuleUncheckedUpdateInput,
    fileBufferOne?: Buffer,
    fileBufferTwo?: Buffer
  ) {
    let showcase = await prisma.homepageShowcaseModule.findFirst();

    if (!showcase) {
      showcase = await prisma.homepageShowcaseModule.create({
        data: {
          blockOneIsActive: false,
          blockTwoIsActive: false,
        },
      });
    }

    // Validate products if provided
    const productIdsToCheck = [
      data.blockOneProductOneId,
      data.blockOneProductTwoId,
      data.blockTwoProductOneId,
      data.blockTwoProductTwoId,
    ].filter((id) => id != null) as number[];

    if (productIdsToCheck.length > 0) {
      const existingProducts = await prisma.product.findMany({
        where: { id: { in: productIdsToCheck } },
      });
      if (existingProducts.length !== new Set(productIdsToCheck).size) {
        throw new ApiError(404, "One or more selected products not found");
      }
    }

    let blockOneBannerImage = showcase.blockOneBannerImage;
    let blockOneBannerImagePublicId = showcase.blockOneBannerImagePublicId;
    let blockTwoBannerImage = showcase.blockTwoBannerImage;
    let blockTwoBannerImagePublicId = showcase.blockTwoBannerImagePublicId;

    // Handle new image upload for Block 1
    if (fileBufferOne) {
      if (blockOneBannerImagePublicId) {
        try {
          await uploadService.deleteImage(blockOneBannerImagePublicId);
        } catch (error) {
          console.error("Failed to delete existing Cloudinary asset", {
            homepageShowcaseId: showcase.id,
            publicId: blockOneBannerImagePublicId,
            error,
          });
        }
      }
      const uploadResult = (await uploadService.uploadImage(fileBufferOne)) as UploadResult;
      blockOneBannerImage = uploadResult.url;
      blockOneBannerImagePublicId = uploadResult.publicId;
    }

    // Handle new image upload for Block 2
    if (fileBufferTwo) {
      if (blockTwoBannerImagePublicId) {
        try {
          await uploadService.deleteImage(blockTwoBannerImagePublicId);
        } catch (error) {
          console.error("Failed to delete existing Cloudinary asset", {
            homepageShowcaseId: showcase.id,
            publicId: blockTwoBannerImagePublicId,
            error,
          });
        }
      }
      const uploadResult = (await uploadService.uploadImage(fileBufferTwo)) as UploadResult;
      blockTwoBannerImage = uploadResult.url;
      blockTwoBannerImagePublicId = uploadResult.publicId;
    }

    return prisma.homepageShowcaseModule.update({
      where: { id: showcase.id },
      data: {
        ...data,
        blockOneBannerImage,
        blockOneBannerImagePublicId,
        blockTwoBannerImage,
        blockTwoBannerImagePublicId,
      },
      include: {
        blockOneProductOne: { include: { images: true } },
        blockOneProductTwo: { include: { images: true } },
        blockTwoProductOne: { include: { images: true } },
        blockTwoProductTwo: { include: { images: true } },
      },
    });
  }
}
