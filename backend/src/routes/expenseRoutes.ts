import express from "express";
import {
  getExpenses,
  createExpense,
  editExpense,
  deleteExpense,
  getExpensesByDate,
  getExpensesByMonth,
  getExpensesByDateRange,
  getExpensesGroupedByCategory,
} from "../controllers/expenseControllers";
import { protectRoute } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protectRoute, getExpenses);
router.post("/", protectRoute, createExpense);
router.put("/:id", protectRoute, editExpense);
router.delete("/:id", protectRoute, deleteExpense);
router.get("/by-date", protectRoute, getExpensesByDate);
router.get("/by-month", protectRoute, getExpensesByMonth);
router.get("/date-range", protectRoute, getExpensesByDateRange);
router.get("/by-category", protectRoute, getExpensesGroupedByCategory);

export default router;
