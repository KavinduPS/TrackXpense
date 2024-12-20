import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
} from "../controllers/userControllers";
import { protectRoute } from "../middleware/authMiddleware";
import { changePassword } from "../controllers/userControllers";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protectRoute, getUser);
router.post("/logout", logoutUser);
router.put("/change-password", changePassword);
export default router;
