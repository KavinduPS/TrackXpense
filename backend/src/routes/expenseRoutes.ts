import express from "express";
import {
  getExpenses,
  createExpense,
  editExpense,
  deleteExpense,
} from "../controllers/expenseControllers";
import { protectRoute } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protectRoute, getExpenses);
router.post("/", protectRoute, createExpense);
router.put("/:id", protectRoute, editExpense);
router.delete("/:id", protectRoute, deleteExpense);

export default router;
