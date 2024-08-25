import { Request, Response } from "express";
import Expense, { IExpense } from "../models/expenseModel";

//Get all expenses - api/expenses
const getExpenses = async (req: Request, res: Response) => {
  try {
    const expenses: IExpense[] = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error fetching expenses" });
  }
};

//Create expense - api/expenses
const createExpense = (req: Request, res: Response) => {
  res.json({ message: "Set Expense" });
};

//Edit expense - api/expenses/:id
const editExpense = (req: Request, res: Response) => {
  res.json({ message: `Edit Expense ${req.params.id}` });
};

//Delete expense - api/expenses/:id
const deleteExpense = (req: Request, res: Response) => {
  res.json({ message: `Delete Expense ${req.params.id} ` });
};

export { getExpenses, createExpense, editExpense, deleteExpense };
