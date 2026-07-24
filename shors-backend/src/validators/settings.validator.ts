import { z } from "zod";

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(6, "Current password must be at least 6 characters"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password do not match",
    path: ["confirmPassword"],
  }),
});
