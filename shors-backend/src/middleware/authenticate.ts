import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Not authorized, no token");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new ApiError(401, "Not authorized, no token");
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: number; email: string; role: string };
    
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    next(new ApiError(401, "Not authorized, token failed"));
  }
};
