import { Router } from "express";
import {
  getHomepageShowcase,
  updateHomepageShowcase,
} from "../controllers/homepageShowcaseModule.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate.middleware";
import { upload } from "../middleware/upload.middleware";
import { updateHomepageShowcaseModuleSchema } from "../validators/homepageShowcaseModule.validator";

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
