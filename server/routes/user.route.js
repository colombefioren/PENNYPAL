import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  getUserProfile,
  updateProfile,
  changePassword,
} from "../controllers/user.controller.js";
import {
  validateUpdateProfile,
  validateChangePassword,
} from "../middleware/validate.js";

const router = Router();

router.get("/profile", requireAuth, getUserProfile);
router.put("/profile", requireAuth, validateUpdateProfile, updateProfile);
router.patch(
  "/profile/password",
  requireAuth,
  validateChangePassword,
  changePassword
);

export default router;
