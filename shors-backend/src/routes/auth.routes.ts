import { Router } from "express";
import { loginAdmin } from "../controllers/auth.controller";
import { validate } from "../middleware/validate.middleware";
import { loginSchema } from "../validators/auth.validator";
import { authRateLimiter } from "../middleware/rateLimiter.middleware";

const router = Router();

router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Auth routes are working"
  });
});

router.post("/login", authRateLimiter, validate(loginSchema), loginAdmin);

export default router;
