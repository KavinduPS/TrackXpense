import express from "express";
import {
  getGoals,
  createGoal,
  addSavings,
  deleteGoal,
} from "../controllers/goalControllers";
import { protectRoute } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protectRoute, getGoals);
router.post("/", protectRoute, createGoal);
router.put("/:id", protectRoute, addSavings);
router.delete("/:id", protectRoute, deleteGoal);

export default router;
