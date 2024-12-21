import { NextFunction, Request, Response } from "express";
import Expense, { IExpense } from "../models/expenseModel";
import { EXPENSE_CATEGORIES } from "../utils/const";

//Get all expenses - api/expenses
const getExpenses = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  try {
    const expenses: IExpense[] = await Expense.find({
      user: _id,
    }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
};

//Create expense - api/expenses
const createExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user;
  const { name, amount, date, category, reference } = req.body;
  if (!name || !amount || !category) {
    res.status(400);
    throw new Error("Please enter required fields");
  }
  try {
    const newExpense = await Expense.create({
      user: _id,
      name: name,
      amount: amount,
      date: date,
      category: category,
      reference: reference,
    });
    res.status(201).json(newExpense);
  } catch (error) {
    next(error);
  }
};

//Edit expense - api/expenses/:id
const editExpense = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { id } = req.params;
  try {
    const expense = await Expense.findById(id);
    if (!expense) {
      res.status(404);
      throw new Error("Expense not found");
    }
    if (expense.user.toString() !== _id.toString()) {
      res.status(403);
      throw new Error("Not authorized");
    }
    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedExpense);
  } catch (error) {
    next(error);
  }
};

//Delete expense - api/expenses/:id
const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user;
  const { id } = req.params;
  try {
    const expense = await Expense.findById(id);
    if (!expense) {
      res.status(404);
      throw new Error("Expense not found");
    }
    if (expense.user.toString() !== _id.toString()) {
      res.status(403);
      throw new Error("Not authorized");
    }
    const deletedExpense = await Expense.findByIdAndDelete(id);
    res.status(200).json(deletedExpense?._id);
  } catch (error) {
    next(error);
  }
};

const getExpensesByDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id: userId } = req.user;
  try {
    const expensesByDate = await Expense.aggregate([
      {
        $match: {
          user: userId,
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%b %d", date: "$date" } },
          originalDate: { $first: "$date" },
          amount: { $sum: "$amount" },
        },
      },
      {
        $sort: { originalDate: 1 },
      },
    ]);
    res.status(200).json(expensesByDate);
  } catch (error) {
    next(error);
  }
};

const getExpensesByMonth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id: userId } = req.user;
  const currentYear = new Date().getFullYear();
  try {
    const expensesByMonth = await Expense.aggregate([
      {
        $match: {
          user: userId,
          date: {
            $gte: new Date(currentYear, 0, 1),
            $lte: new Date(currentYear, 11, 31),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$date" } },
          totalExpenses: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id.month": 1 },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          totalExpenses: 1,
        },
      },
    ]);
    res.status(200).json(expensesByMonth);
  } catch (error) {
    next(error);
  }
};

const getExpensesByDateRange = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id: userId } = req.user;
  const { startDate, endDate } = req.query;
  try {
    if (!startDate && !endDate) {
      return res.status(400).json({
        message: "Invalid date range",
      });
    }
    const expenses: IExpense[] = await Expense.aggregate([
      {
        $match: {
          user: userId,
          date: {
            $gte: new Date(startDate as string),
            $lte: new Date(endDate as string),
          },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%b %d", date: "$date" } },
          originalDate: { $first: "$date" },
          amount: { $sum: "$amount" },
        },
      },
      {
        $sort: { originalDate: 1 },
      },
    ]);
    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
};

//Group expenses by category
const getExpensesGroupedByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id: userId } = req.user;
    const categories = Object.values(EXPENSE_CATEGORIES);
    const groupedExpenses = await Expense.aggregate([
      { $match: { user: userId, category: { $in: categories } } },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
          expenses: { $push: "$$ROOT" },
        },
      },
    ]);

    res.status(200).json(groupedExpenses);
  } catch (error) {
    next(error);
  }
};

export {
  getExpenses,
  createExpense,
  editExpense,
  deleteExpense,
  getExpensesByDate,
  getExpensesByMonth,
  getExpensesByDateRange,
  getExpensesGroupedByCategory,
};
