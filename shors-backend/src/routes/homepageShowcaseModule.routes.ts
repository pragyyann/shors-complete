import { Router } from "express";
import {
  getHomepageShowcase,
  updateHomepageShowcase,
} from "../controllers/homepageShowcaseModule.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { validate } from "../middleware/validate.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { updateHomepageShowcaseModuleSchema } from "../validators/homepageShowcaseModule.validator.js";

const router = Router();

// Public route to get the homepage showcase
router.get("/", getHomepageShowcase);

// Protected route to update the homepage showcase
router.put(
  "/",
  authenticate,
  authorize("ADMIN", "EDITOR"),
  upload.fields([
    { name: "blockOneBannerImage", maxCount: 1 },
    { name: "blockTwoBannerImage", maxCount: 1 },
  ]),
  validate(updateHomepageShowcaseModuleSchema),
  updateHomepageShowcase
);

export default router;
