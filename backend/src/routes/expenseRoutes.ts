import express from "express";
import {
  getExpenses,
  createExpense,
  editExpense,
  deleteExpense,
  getExpensesGroupedByCategory,
} from "../controllers/expenseControllers";

const router = express.Router();

router.get("/", getExpenses);
router.post("/", createExpense);
router.put("/:id", editExpense);
router.delete("/:id", deleteExpense);
router.get("/grouped-by-category", getExpensesGroupedByCategory);


export default router;
