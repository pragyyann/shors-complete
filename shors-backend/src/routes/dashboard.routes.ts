import { Router } from "express";
import { getDashboard } from "../controllers/dashboard.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";

const router = Router();

// Protected Routes
router.get(
  "/",
  authenticate,
  authorize("ADMIN", "EDITOR"),
  getDashboard
);

export default router;
