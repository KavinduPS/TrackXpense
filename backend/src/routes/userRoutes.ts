import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  verifyResetToken,
  editUser,
} from "../controllers/userControllers";
import { protectRoute } from "../middleware/authMiddleware";
import { changePassword } from "../controllers/userControllers";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protectRoute, getUser);
router.put("/change-password", protectRoute, changePassword);
router.put("/:id", protectRoute, editUser);
router.post("/logout", protectRoute, logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/verify-reset-token", verifyResetToken);

export default router;
