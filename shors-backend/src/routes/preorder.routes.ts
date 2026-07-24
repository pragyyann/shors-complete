import { Router } from "express";
import {
  getPreorders,
  getPreorderById,
  updatePreorder,
  createPreorder,
} from "../controllers/preorder.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate.middleware";
import { updatePreorderSchema, createPreorderSchema } from "../validators/preorder.validator";

const router = Router();

// Public Routes
router.post(
  "/public",
  validate(createPreorderSchema),
  createPreorder
);

// Apply auth middleware to all other routes in this file
router.use(authenticate);
router.use(authorize("ADMIN", "EDITOR"));

// Protected Routes
router.get("/", getPreorders);
router.get("/:id", getPreorderById);
router.put(
  "/:id",
  validate(updatePreorderSchema),
  updatePreorder
);

export default router;
