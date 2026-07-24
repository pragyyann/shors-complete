import { Router } from "express";
import { getHero, updateDesktopMedia, updateMobileMedia } from "../controllers/hero.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

// Public
router.get("/", getHero);

// Protected
router.put(
  "/media/desktop",
  authenticate,
  authorize("ADMIN", "EDITOR"),
  upload.single("media"),
  updateDesktopMedia
);

router.put(
  "/media/mobile",
  authenticate,
  authorize("ADMIN", "EDITOR"),
  upload.single("media"),
  updateMobileMedia
);

export default router;
