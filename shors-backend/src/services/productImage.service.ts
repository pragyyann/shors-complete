import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";
import { UploadService } from "./upload.service";
import { ImageType } from "@prisma/client";

const uploadService = new UploadService();

interface UploadResult {
  url: string;
  publicId: string;
}

export class ProductImageService {
  async getProductImages(productId: number) {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    return prisma.productImage.findMany({
      where: { productId },
      orderBy: { displayOrder: "asc" },
    });
  }

  async uploadProductImage(productId: number, fileBuffer: Buffer, imageType: ImageType) {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    if (!["MAIN", "HOVER", "DETAIL_1", "DETAIL_2"].includes(imageType)) {
      throw new ApiError(400, "Invalid imageType. Allowed values: MAIN, HOVER, DETAIL_1, DETAIL_2.");
    }

    // Check if replacing existing image for this slot
    const existingImage = await prisma.productImage.findFirst({
      where: {
        productId,
        imageType,
      },
    });

    if (existingImage) {
      // Delete from Cloudinary
      try {
        await uploadService.deleteImage(existingImage.publicId);
      } catch (error) {
        console.error("Failed to delete existing Cloudinary asset", {
          imageId: existingImage.id,
          publicId: existingImage.publicId,
          error,
        });
      }

      // Delete from database
      await prisma.productImage.delete({
        where: { id: existingImage.id },
      });
    }

    // Calculate display order based on type
    let displayOrder = 0;
    if (imageType === "MAIN") displayOrder = 0;
    else if (imageType === "HOVER") displayOrder = 1;
    else if (imageType === "DETAIL_1") displayOrder = 2;
    else if (imageType === "DETAIL_2") displayOrder = 3;

    // Upload new image
    const uploadResult = await uploadService.uploadImage(fileBuffer) as UploadResult;

    // Save to database
    return prisma.productImage.create({
      data: {
        productId,
        imageUrl: uploadResult.url,
        publicId: uploadResult.publicId,
        imageType,
        displayOrder,
      },
    });
  }

  async updateProductImageDisplayOrder(imageId: number, displayOrder: number) {
    const image = await prisma.productImage.findUnique({ where: { id: imageId } });
    if (!image) {
      throw new ApiError(404, "Product image not found");
    }

    return prisma.productImage.update({
      where: { id: imageId },
      data: { displayOrder },
    });
  }

  async deleteProductImage(imageId: number) {
    const image = await prisma.productImage.findUnique({ where: { id: imageId } });
    if (!image) {
      throw new ApiError(404, "Product image not found");
    }

    // Delete from Cloudinary
    try {
      await uploadService.deleteImage(image.publicId);
    } catch (error) {
      console.error("Failed to delete Cloudinary asset", {
        imageId: image.id,
        publicId: image.publicId,
        error,
      });
    }

    // Delete from database
    await prisma.productImage.delete({
      where: { id: imageId },
    });
  }
}
