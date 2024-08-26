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
const createExpense = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    if (
      !req.body.title ||
      !req.body.amount ||
      !req.body.date ||
      !req.body.category
    ) {
      return res.status(400).json({ message: "Please enter required fields" });
    }
    const newExpense = await Expense.create({
      title: req.body.title,
      amount: req.body.amount,
      date: req.body.date,
      category: req.body.category,
      description: req.body.description,
    });
    res.status(201).json(newExpense);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error creating expense" });
  }
};

//Edit expense - api/expenses/:id
const editExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const expense = await Expense.findById(id);
  if (!expense) {
    return res.status(400).json({ message: "Expense not found" });
  }
  const updatedExpense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedExpense);
};

//Delete expense - api/expenses/:id
const deleteExpense = async (req: Request, res: Response) => {
  const { id } = req.params;
  const expense = await Expense.findById(id);
  if (!expense) {
    return res.status(400).json({ message: "Expense not found" });
  }
  const deletedExpense = await Expense.findByIdAndDelete(id);
  res.status(200).json(deletedExpense?._id);
};

export { getExpenses, createExpense, editExpense, deleteExpense };
