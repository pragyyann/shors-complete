import { z } from "zod";

export const updateHomepageShowcaseModuleSchema = z.object({
  body: z.object({
    blockOneLabel: z.string().optional().nullable(),
    blockOneCollectionName: z.string().optional().nullable(),
    blockOneDescription: z.string().optional().nullable(),
    blockOneProductOneId: z.union([
      z.coerce.number().int().positive(),
      z.string().refine((val) => val === 'null').transform(() => null),
      z.null()
    ]).optional(),
    blockOneProductTwoId: z.union([
      z.coerce.number().int().positive(),
      z.string().refine((val) => val === 'null').transform(() => null),
      z.null()
    ]).optional(),

    blockTwoLabel: z.string().optional().nullable(),
    blockTwoCollectionName: z.string().optional().nullable(),
    blockTwoDescription: z.string().optional().nullable(),
    blockTwoProductOneId: z.union([
      z.coerce.number().int().positive(),
      z.string().refine((val) => val === 'null').transform(() => null),
      z.null()
    ]).optional(),
    blockTwoProductTwoId: z.union([
      z.coerce.number().int().positive(),
      z.string().refine((val) => val === 'null').transform(() => null),
      z.null()
    ]).optional(),

    blockOneIsActive: z
      .union([z.boolean(), z.string()])
      .optional()
      .transform((val) => {
        if (typeof val === "string") return val === "true";
        return val;
      }),
    blockTwoIsActive: z
      .union([z.boolean(), z.string()])
      .optional()
      .transform((val) => {
        if (typeof val === "string") return val === "true";
        return val;
      }),
  }),
});
