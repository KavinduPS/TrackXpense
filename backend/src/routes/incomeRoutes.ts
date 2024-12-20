import express from "express";
import {
  getIncomes,
  createIncome,
  editIncome,
  deleteIncome,
  getIncomesByDate,
  getIncomesByMonth,
} from "../controllers/incomeControllers";
import { protectRoute } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protectRoute, getIncomes);
router.post("/", protectRoute, createIncome);
router.put("/:id", protectRoute, editIncome);
router.delete("/:id", protectRoute, deleteIncome);
router.get("/by-date", protectRoute, getIncomesByDate);
router.get("/by-month", protectRoute, getIncomesByMonth);

export default router;
