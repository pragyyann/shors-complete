import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { PreorderService } from "../services/preorder.service";
import { PreorderStatus } from "@prisma/client";

const preorderService = new PreorderService();

export const getPreorders = asyncHandler(async (req: Request, res: Response) => {
  const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
  const status = req.query.status as PreorderStatus;
  const search = req.query.search as string;
  const sort = req.query.sort as "desc" | "asc";

  const result = await preorderService.getPreorders({
    page,
    limit,
    status,
    search,
    sort,
  });

  res.status(200).json({
    success: true,
    data: result.data,
    meta: {
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    },
  });
});

export const getPreorderById = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);
  const preorder = await preorderService.getPreorderById(id);

  res.status(200).json({
    success: true,
    data: preorder,
  });
});

export const updatePreorder = asyncHandler(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id as string, 10);
  
  const status = req.body.status as PreorderStatus | undefined;
  const internalNotes = req.body.adminNotes !== undefined ? req.body.adminNotes : req.body.internalNotes;

  const updateData: { status?: PreorderStatus; internalNotes?: string } = {};
  if (status !== undefined) updateData.status = status;
  if (internalNotes !== undefined) updateData.internalNotes = internalNotes;

  const preorder = await preorderService.updatePreorder(id, updateData);

  res.status(200).json({
    success: true,
    message: "Preorder updated successfully",
    data: preorder,
  });
});

export const createPreorder = asyncHandler(async (req: Request, res: Response) => {
  const preorder = await preorderService.createPreorder(req.body);

  res.status(201).json({
    success: true,
    message: "Preorder created successfully",
    data: preorder,
  });
});
