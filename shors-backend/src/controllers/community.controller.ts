import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const communitySchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email().optional().or(z.literal("")),
  sourcePage: z.string().optional(),
  triggerType: z.string().optional(),
});

export const joinCommunity = async (req: Request, res: Response) => {
  try {
    const validatedData = communitySchema.parse(req.body);

    const newMember = await prisma.communityMember.create({
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
        email: validatedData.email || null,
        sourcePage: validatedData.sourcePage,
        triggerType: validatedData.triggerType,
      },
    });

    res.status(201).json({
      success: true,
      data: newMember,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, errors: (error as any).errors || error.issues });
    }
    console.error("Join Community Error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getCommunity = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [total, data] = await Promise.all([
      prisma.communityMember.count(),
      prisma.communityMember.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    res.status(200).json({
      success: true,
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get Community Error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

