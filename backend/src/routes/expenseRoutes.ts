import express from "express";
import {
  getExpenses,
  createExpense,
  editExpense,
  deleteExpense,
  getExpensesByDate,
  getExpensesByDateRange,
} from "../controllers/expenseControllers";
import { protectRoute } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protectRoute, getExpenses);
router.post("/", protectRoute, createExpense);
router.put("/:id", protectRoute, editExpense);
router.delete("/:id", protectRoute, deleteExpense);
router.get("/by-date", protectRoute, getExpensesByDate);
router.get("/date-range", protectRoute, getExpensesByDateRange);

export default router;
