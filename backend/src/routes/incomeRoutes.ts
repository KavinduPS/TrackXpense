import express from "express";
import {
  getIncomes,
  createIncome,
  editIncome,
  deleteIncome,
} from "../controllers/incomeControllers";

const router = express.Router();

router.get("/", getIncomes);
router.post("/", createIncome);
router.put("/:id", editIncome);
router.delete("/:id", deleteIncome);

export default router;