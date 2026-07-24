import { Router } from "express";
import { uploadImage, deleteImage } from "../controllers/upload.controller.js";
import { upload } from "../middleware/upload.middleware.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";

const router = Router();

router.use(authenticate, authorize("ADMIN", "EDITOR"));

router.post("/image", upload.single("image"), uploadImage);
router.delete("/:publicId", deleteImage);


export default router;

