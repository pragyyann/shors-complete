import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { DashboardService } from "../services/dashboard.service.js";

const dashboardService = new DashboardService();

export const getDashboard = asyncHandler(async (req: Request, res: Response) => {
  const dashboardData = await dashboardService.getDashboardData();

  res.status(200).json({
    success: true,
    data: dashboardData,
  });
});
