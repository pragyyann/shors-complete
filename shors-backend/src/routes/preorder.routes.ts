import { Router } from "express";
import {
  getPreorders,
  getPreorderById,
  updatePreorder,
  createPreorder,
} from "../controllers/preorder.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { validate } from "../middleware/validate.middleware.js";
import { updatePreorderSchema, createPreorderSchema } from "../validators/preorder.validator.js";

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
