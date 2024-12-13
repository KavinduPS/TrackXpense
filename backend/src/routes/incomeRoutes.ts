import express from "express";
import {
  getIncomes,
  createIncome,
  editIncome,
  deleteIncome,
} from "../controllers/incomeControllers";
import { protectRoute } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protectRoute, getIncomes);
router.post("/", protectRoute, createIncome);
router.put("/:id", protectRoute, editIncome);
router.delete("/:id", protectRoute, deleteIncome);

export default router;
