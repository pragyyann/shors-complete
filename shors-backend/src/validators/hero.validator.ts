import { z } from "zod";

export const createHeroSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    subtitle: z.string().optional(),
    imageUrl: z.string().url("Must be a valid URL"),
    isActive: z.boolean().default(true),
  }),
});

export const updateHeroSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    imageUrl: z.string().url().optional(),
    isActive: z.boolean().optional(),
  }),
});
