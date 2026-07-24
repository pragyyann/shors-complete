import { Request, Response, NextFunction } from "express";

// Placeholder for rate limiting middleware since we're using a simple setup
// In production, you would use 'express-rate-limit' or similar

export const apiRateLimiter = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement rate limiting logic (e.g., max 100 requests per 15 min)
  next();
};

export const authRateLimiter = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Implement stricter rate limiting for auth endpoints
  next();
};
