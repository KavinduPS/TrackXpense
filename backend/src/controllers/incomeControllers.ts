import { NextFunction, Request, Response } from "express";
import Income, { IIncome } from "../models/incomeModel";

// Get all incomes - api/incomes
const getIncomes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const incomes: IIncome[] = await Income.find();
    res.status(200).json(incomes);
  } catch (error) {
    next(error);
  }
};

// Create income - api/incomes
const createIncome = async (req: Request, res: Response, next: NextFunction) => {
  const { title, amount, date, source, description } = req.body;
  if (!title || !amount || !date || !source) {
    res.status(400);
    throw new Error("Please enter required fields");
  }
  try {
    const newIncome = await Income.create({
      title: title,
      amount: amount,
      date: date,
      source: source,
      description: description,
    });
    res.status(201).json(newIncome);
  } catch (error) {
    next(error);
  }
};

// Edit income - api/incomes/:id
const editIncome = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const income = await Income.findById(id);
    if (!income) {
      res.status(404);
      throw new Error("Income not found");
    }
    const updatedIncome = await Income.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedIncome);
  } catch (error) {
    next(error);
  }
};

// Delete income - api/incomes/:id
const deleteIncome = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const income = await Income.findById(id);
    if (!income) {
      res.status(404);
      throw new Error("Income not found");
    }
    const deletedIncome = await Income.findByIdAndDelete(id);
    res.status(200).json(deletedIncome?._id);
  } catch (error) {
    next(error);
  }
};

export { getIncomes, createIncome, editIncome, deleteIncome };
