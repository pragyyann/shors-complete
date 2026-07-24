import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { AuthService } from "../services/auth.service";
import { prisma } from "../lib/prisma";

const authService = new AuthService(prisma);

export const loginAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { token, user } = await authService.login(req.body.email, req.body.password);
  
  res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    user
  });
});

