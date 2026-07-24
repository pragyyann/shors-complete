import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    category: z.string({ message: "Category is required" }),
    name: z.string({ message: "Name is required" }).min(2, "Name must be at least 2 characters"),
    slug: z.string({ message: "Slug is required" }).min(2, "Slug must be at least 2 characters"),
    description: z.string().optional(),
    material: z.string().optional(),
    preorderMessage: z.string().optional(),
    isFeatured: z.boolean().optional(),
    isActive: z.boolean().optional(),
    displayOrder: z.number().int().optional(),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    slug: z.string().min(2, "Slug must be at least 2 characters").optional(),
    description: z.string().optional(),
    material: z.string().optional(),
    preorderMessage: z.string().optional(),
    isFeatured: z.boolean().optional(),
    isActive: z.boolean().optional(),
    displayOrder: z.number().int().optional(),
    category: z.string().optional(),
  }),
});
