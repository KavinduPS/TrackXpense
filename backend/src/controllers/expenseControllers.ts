import { NextFunction, Request, Response } from "express";
import Expense, { IExpense } from "../models/expenseModel";

//Get all expenses - api/expenses
const getExpenses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const expenses: IExpense[] = await Expense.find();
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
  const { title, amount, date, category, description } = req.body;
  if (!title || !amount || !date || !category) {
    res.status(400);
    throw new Error("Please enter required fields");
  }
  try {
    const newExpense = await Expense.create({
      title: title,
      amount: amount,
      date: date,
      category: category,
      description: description,
    });
    res.status(201).json(newExpense);
  } catch (error) {
    next(error);
  }
};

//Edit expense - api/expenses/:id
const editExpense = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findById(id);
    if (!expense) {
      res.status(404);
      throw new Error("Expense not found");
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
  const { id } = req.params;
  try {
    const expense = await Expense.findById(id);
    if (!expense) {
      res.status(404);
      throw new Error("Expense not found");
    }
    const deletedExpense = await Expense.findByIdAndDelete(id);
    res.status(200).json(deletedExpense?._id);
  } catch (error) {
    next(error);
  }
};

export { getExpenses, createExpense, editExpense, deleteExpense };
