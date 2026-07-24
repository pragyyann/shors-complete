import app from "./app";
import { env } from "./config/env";
import { logger } from "./utils/logger";
import { prisma } from "./lib/prisma";

const PORT = env.PORT || 5000;

// Log routes recursively
function printRoutes(layer: any, prefix: string = '') {
  if (layer.route) {
    const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
    console.log(`[ROUTE] ${methods} ${prefix}${layer.route.path}`);
  } else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
    const newPrefix = layer.regexp.source.replace('^\\', '').replace('\\/?(?=\\/|$)', '').replace('^', '').replace('?(?=\\/|$)', '');
    layer.handle.stack.forEach((stackItem: any) => printRoutes(stackItem, prefix + newPrefix));
  }
}

const server = app.listen(PORT, () => {
  logger.info(`Server running in ${env.NODE_ENV} mode on port ${PORT}`);
  console.log("\nRegistered API Routes:");
  if (app._router && app._router.stack) {
    app._router.stack.forEach((layer: any) => printRoutes(layer));
  }
  console.log("");
});

// Handle graceful shutdown
const gracefulShutdown = async () => {
  logger.info("Graceful shutdown initiated...");
  server.close(async () => {
    logger.info("HTTP server closed.");
    await prisma.$disconnect();
    logger.info("Database connection closed.");
    process.exit(0);
  });

  // Force close after 10 seconds
  setTimeout(() => {
    logger.error("Could not close connections in time, forcefully shutting down");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  logger.error(`Unhandled Rejection: ${err.message}`, err);
  gracefulShutdown();
});

// Handle uncaught exceptions
process.on("uncaughtException", (err: Error) => {
  logger.error(`Uncaught Exception: ${err.message}`, err);
  gracefulShutdown();
});
