import { Router } from "express";
import { changePassword } from "../controllers/settings.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";
import { validate } from "../middleware/validate.middleware";
import { changePasswordSchema } from "../validators/settings.validator";

const router = Router();

router.use(authenticate, authorize("ADMIN"));
router.put("/change-password", validate(changePasswordSchema), changePassword);

export default router;
