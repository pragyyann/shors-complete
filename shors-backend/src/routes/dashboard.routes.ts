import { Router } from "express";
import { getDashboard } from "../controllers/dashboard.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

const router = Router();

// Protected Routes
router.get(
  "/",
  authenticate,
  authorize("ADMIN", "EDITOR"),
  getDashboard
);

export default router;
