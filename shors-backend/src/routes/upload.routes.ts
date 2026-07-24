import { Router } from "express";
import { uploadImage, deleteImage } from "../controllers/upload.controller";
import { upload } from "../middleware/upload.middleware";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

const router = Router();

router.use(authenticate, authorize("ADMIN", "EDITOR"));

router.post("/image", upload.single("image"), uploadImage);
router.delete("/:publicId", deleteImage);


export default router;

