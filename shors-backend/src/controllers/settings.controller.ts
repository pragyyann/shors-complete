import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { AuthService } from "../services/auth.service";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/ApiError";

const authService = new AuthService(prisma);

export const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  
  if (!req.user || !req.user.id) {
    throw new ApiError(401, "Unauthorized");
  }

  await authService.changePassword(req.user.id, currentPassword, newPassword);

  res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});
