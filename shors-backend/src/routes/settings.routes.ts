import { Router } from "express";
import { changePassword } from "../controllers/settings.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { validate } from "../middleware/validate.middleware.js";
import { changePasswordSchema } from "../validators/settings.validator.js";

const router = Router();

router.use(authenticate, authorize("ADMIN"));
router.put("/change-password", validate(changePasswordSchema), changePassword);

export default router;
