import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/userControllers";
import { protectRoute } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protectRoute, getUser);

export default router;
