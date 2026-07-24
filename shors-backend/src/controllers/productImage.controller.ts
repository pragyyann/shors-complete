import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { ProductImageService } from "../services/productImage.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ImageType } from "@prisma/client";

const productImageService = new ProductImageService();

export const getProductImages = asyncHandler(async (req: Request, res: Response) => {
  const productId = parseInt(req.params.productId as string, 10);
  const images = await productImageService.getProductImages(productId);

  res.status(200).json({
    success: true,
    data: images,
  });
});

export const uploadProductImage = asyncHandler(async (req: Request, res: Response) => {
  const productId = parseInt(req.params.productId as string, 10);
  const imageType = req.body.imageType as ImageType;

  if (!imageType || !["MAIN", "HOVER", "DETAIL_1", "DETAIL_2"].includes(imageType)) {
    throw new ApiError(400, "Valid imageType (MAIN, HOVER, DETAIL_1, DETAIL_2) is required");
  }

  if (!req.file) {
    throw new ApiError(400, "Image file is required");
  }

  const image = await productImageService.uploadProductImage(productId, req.file.buffer, imageType);

  res.status(201).json({
    success: true,
    message: "Product image uploaded successfully",
    data: image,
  });
});

export const updateProductImageDisplayOrder = asyncHandler(async (req: Request, res: Response) => {
  const imageId = parseInt(req.params.imageId as string, 10);
  const displayOrder = parseInt(req.body.displayOrder as string, 10);

  if (isNaN(displayOrder)) {
    throw new ApiError(400, "displayOrder must be a valid number");
  }

  const image = await productImageService.updateProductImageDisplayOrder(imageId, displayOrder);

  res.status(200).json({
    success: true,
    message: "Product image display order updated",
    data: image,
  });
});

export const deleteProductImage = asyncHandler(async (req: Request, res: Response) => {
  const imageId = parseInt(req.params.imageId as string, 10);
  await productImageService.deleteProductImage(imageId);

  res.status(200).json({
    success: true,
    message: "Product image deleted successfully",
  });
});
