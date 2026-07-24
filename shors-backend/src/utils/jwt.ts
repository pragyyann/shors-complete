import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const generateToken = (payload: { id: number; email: string; role: string }): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as any,
  });
};
