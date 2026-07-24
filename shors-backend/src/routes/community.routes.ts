import { Router } from "express";
import { joinCommunity, getCommunity } from "../controllers/community.controller";
import { authenticate } from "../middleware/authenticate";
import { authorize } from "../middleware/authorize";

const router = Router();

router.post("/", joinCommunity);
router.get("/", authenticate, authorize("ADMIN", "EDITOR"), getCommunity);

export default router;
