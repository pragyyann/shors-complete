import { Router } from "express";
import {
  getProducts,
  getProductBySlug,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { validate } from "../middleware/validate.middleware.js";
import { createProductSchema, updateProductSchema } from "../validators/product.validator.js";

const router = Router();

import {
  getProductImages,
  uploadProductImage,
  updateProductImageDisplayOrder,
  deleteProductImage
} from "../controllers/productImage.controller.js";
import { upload } from "../middleware/upload.middleware.js";

// Public Routes
router.get("/", getProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/:productId/images", getProductImages); // Image route
router.get("/:slug", getProductBySlug); // Ensure this is after /collection/:slug

// Protected Image Routes
router.post(
  "/:productId/images",
  authenticate,
  authorize("ADMIN", "EDITOR"),
  upload.single("image"),
  uploadProductImage
);

router.put(
  "/images/:imageId",
  authenticate,
  authorize("ADMIN", "EDITOR"),
  updateProductImageDisplayOrder
);

router.delete(
  "/images/:imageId",
  authenticate,
  authorize("ADMIN"),
  deleteProductImage
);

// Protected Product Routes
router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validate(createProductSchema),
  createProduct
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN", "EDITOR"),
  validate(updateProductSchema),
  updateProduct
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteProduct
);

export default router;
