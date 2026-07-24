import { Router } from "express";
import { joinCommunity, getCommunity } from "../controllers/community.controller.js";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";

const router = Router();

router.post("/", joinCommunity);
router.get("/", authenticate, authorize("ADMIN", "EDITOR"), getCommunity);

export default router;
