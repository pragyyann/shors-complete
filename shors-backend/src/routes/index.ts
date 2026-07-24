import { Router } from "express";
import authRoutes from "./auth.routes";
import heroRoutes from "./hero.routes";
import productRoutes from "./product.routes";
import homepageShowcaseModuleRoutes from "./homepageShowcaseModule.routes";
import preorderRoutes from "./preorder.routes";
import uploadRoutes from "./upload.routes";
import dashboardRoutes from "./dashboard.routes";
import settingsRoutes from "./settings.routes";
import communityRoutes from "./community.routes";

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
