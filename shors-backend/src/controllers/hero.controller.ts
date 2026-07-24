import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { HeroService } from "../services/hero.service.js";

const heroService = new HeroService();

export const getHero = asyncHandler(async (req: Request, res: Response) => {
  const hero = await heroService.getHero();

  res.status(200).json({
    success: true,
    data: hero,
  });
});

export const updateDesktopMedia = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({
      success: false,
      message: "Media file is required.",
    });
    return;
  }

  const updatedHero = await heroService.updateDesktopMedia(req.file.buffer);

  res.status(200).json({
    success: true,
    message: "Hero media updated successfully",
    data: {
      mediaType: updatedHero.mediaType,
      desktopMediaUrl: updatedHero.desktopMediaUrl,
      mobileMediaUrl: updatedHero.mobileMediaUrl,
    },
  });
});

export const updateMobileMedia = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({
      success: false,
      message: "Media file is required.",
    });
    return;
  }

  const updatedHero = await heroService.updateMobileMedia(req.file.buffer);

  res.status(200).json({
    success: true,
    message: "Hero media updated successfully",
    data: {
      mediaType: updatedHero.mediaType,
      desktopMediaUrl: updatedHero.desktopMediaUrl,
      mobileMediaUrl: updatedHero.mobileMediaUrl,
    },
  });
});
