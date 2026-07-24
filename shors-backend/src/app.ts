import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { env } from "./config/env.js";
import { corsOptions } from "./config/cors.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";
import { apiRateLimiter } from "./middleware/rateLimiter.middleware.js";
import routes from "./routes/index.js";

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(apiRateLimiter);

// Logging
if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Request parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(compression());

// Health check
app.get("/api/v1/health", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "Server is running smoothly" });
});

// API Routes
app.use("/api/v1", routes);

// 404 Handler
app.use(notFoundHandler);

// Centralized Error Handler
app.use(errorHandler);

export default app;
