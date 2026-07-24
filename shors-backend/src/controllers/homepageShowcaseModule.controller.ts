import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { HomepageShowcaseModuleService } from "../services/homepageShowcaseModule.service.js";
import { ApiError } from "../utils/ApiError.js";

const homepageShowcaseModuleService = new HomepageShowcaseModuleService();

export const getHomepageShowcase = asyncHandler(async (req: Request, res: Response) => {
  const showcase = await homepageShowcaseModuleService.getHomepageShowcase();

  res.status(200).json({
    success: true,
    data: showcase,
  });
});

export const updateHomepageShowcase = asyncHandler(async (req: Request, res: Response) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
  
  const fileBufferOne = files?.blockOneBannerImage?.[0]?.buffer;
  const fileBufferTwo = files?.blockTwoBannerImage?.[0]?.buffer;
  
  // Extract only the allowed fields to pass to the service
  const updateData = {
    blockOneLabel: req.body.blockOneLabel,
    blockOneCollectionName: req.body.blockOneCollectionName,
    blockOneDescription: req.body.blockOneDescription,
    blockOneProductOneId: req.body.blockOneProductOneId === 'null' ? null : (req.body.blockOneProductOneId ? parseInt(req.body.blockOneProductOneId, 10) : undefined),
    blockOneProductTwoId: req.body.blockOneProductTwoId === 'null' ? null : (req.body.blockOneProductTwoId ? parseInt(req.body.blockOneProductTwoId, 10) : undefined),
    
    blockTwoLabel: req.body.blockTwoLabel,
    blockTwoCollectionName: req.body.blockTwoCollectionName,
    blockTwoDescription: req.body.blockTwoDescription,
    blockTwoProductOneId: req.body.blockTwoProductOneId === 'null' ? null : (req.body.blockTwoProductOneId ? parseInt(req.body.blockTwoProductOneId, 10) : undefined),
    blockTwoProductTwoId: req.body.blockTwoProductTwoId === 'null' ? null : (req.body.blockTwoProductTwoId ? parseInt(req.body.blockTwoProductTwoId, 10) : undefined),
    blockOneIsActive: req.body.blockOneIsActive !== undefined ? req.body.blockOneIsActive === 'true' || req.body.blockOneIsActive === true : undefined,
    blockTwoIsActive: req.body.blockTwoIsActive !== undefined ? req.body.blockTwoIsActive === 'true' || req.body.blockTwoIsActive === true : undefined,
  };

  // Filter out undefined values
  const cleanData = Object.fromEntries(
    Object.entries(updateData).filter(([_, v]) => v !== undefined)
  );

  const showcase = await homepageShowcaseModuleService.updateHomepageShowcase(
    cleanData,
    fileBufferOne,
    fileBufferTwo
  );

  res.status(200).json({
    success: true,
    message: "Homepage showcase updated successfully",
    data: showcase,
  });
});
