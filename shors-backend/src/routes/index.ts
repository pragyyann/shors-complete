import { Router } from "express";
import authRoutes from "./auth.routes.js";
import heroRoutes from "./hero.routes.js";
import productRoutes from "./product.routes.js";
import homepageShowcaseModuleRoutes from "./homepageShowcaseModule.routes.js";
import preorderRoutes from "./preorder.routes.js";
import uploadRoutes from "./upload.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import settingsRoutes from "./settings.routes.js";
import communityRoutes from "./community.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/hero", heroRoutes);
router.use("/homepage-showcase-module", homepageShowcaseModuleRoutes);
router.use("/products", productRoutes);
router.use("/preorders", preorderRoutes);
router.use("/uploads", uploadRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/settings", settingsRoutes);
router.use("/community", communityRoutes);

export default router;
