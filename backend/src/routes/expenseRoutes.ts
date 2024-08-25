import express from "express";
import {
  getExpenses,
  createExpense,
  editExpense,
  deleteExpense,
} from "../controllers/expenseControllers";

const router = express.Router();

router.get("/", getExpenses);
router.post("/", createExpense);
router.put("/:id", editExpense);
router.delete("/:id", deleteExpense);

export default router;
