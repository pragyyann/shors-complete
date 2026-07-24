import { z } from "zod";
import { PreorderStatus } from "@prisma/client";

export const updatePreorderSchema = z.object({
  body: z.object({
    status: z.nativeEnum(PreorderStatus, {
      message: "Invalid preorder status",
    }).optional(),
    adminNotes: z.string().optional(),
    notes: z.string().optional(),
  }),
});

export const createPreorderSchema = z.object({
  body: z.object({
    productId: z.number(),
    quantity: z.number().min(1).default(1),
    fullName: z.string().min(2),
    phone: z.string().min(7),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    city: z.string().optional().or(z.literal("")),
    message: z.string().optional().or(z.literal("")),
  }),
});
