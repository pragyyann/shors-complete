import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { ApiError } from "../utils/ApiError";

export const validate = (schema: ZodSchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (error) {
    if (error instanceof ZodError) {
      const issues = (error as any).errors || (error as any).issues || [];
      const errorMessage = issues.map((e: any) => `${e.path.join(".")}: ${e.message}`).join(", ");
      return next(new ApiError(400, `Validation Error: ${errorMessage}`));
    }
    return next(error);
  }
};


