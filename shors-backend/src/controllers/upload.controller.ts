import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { UploadService } from "../services/upload.service";
import { ApiError } from "../utils/ApiError";

const uploadService = new UploadService();

export const uploadImage = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new ApiError(400, "Image file is missing");
  }

  const result = await uploadService.uploadImage(req.file.buffer);

  res.status(200).json({
    success: true,
    message: "Image uploaded successfully",
    data: result,
  });
});

export const deleteImage = asyncHandler(async (req: Request, res: Response) => {
  // Use a catch-all approach if the publicId contains slashes
  // In Express, route definition will capture the param.
  const publicId = req.params.publicId as string;

  if (!publicId) {
    throw new ApiError(400, "Public ID is missing");
  }

  await uploadService.deleteImage(publicId);

  res.status(200).json({
    success: true,
    message: "Image deleted successfully",
  });
});
