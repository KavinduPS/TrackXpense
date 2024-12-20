import { NextFunction, Request, Response } from "express";
import Income, { IIncome } from "../models/incomeModel";

// Get all incomes - api/incomes
const getIncomes = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  try {
    const incomes: IIncome[] = await Income.find({
      user: _id,
    });
    res.status(200).json(incomes);
  } catch (error) {
    next(error);
  }
};

// Create income - api/incomes
const createIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user;
  const { name, amount, date, source, description } = req.body;
  if (!name || !amount || !source) {
    res.status(400);
    throw new Error("Please enter required fields");
  }
  try {
    const newIncome = await Income.create({
      user: _id,
      name: name,
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
  const { _id } = req.user;
  const { id } = req.params;
  try {
    const income = await Income.findById(id);
    if (!income) {
      res.status(404);
      throw new Error("Income not found");
    }
    if (income.user.toString() !== _id.toString()) {
      res.status(403);
      throw new Error("Not authorized");
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
const deleteIncome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user;
  const { id } = req.params;
  try {
    const income = await Income.findById(id);
    if (!income) {
      res.status(404);
      throw new Error("Income not found");
    }
    if (income.user.toString() !== _id.toString()) {
      res.status(403);
      throw new Error("Not authorized");
    }
    const deletedIncome = await Income.findByIdAndDelete(id);
    res.status(200).json(deletedIncome?._id);
  } catch (error) {
    next(error);
  }
};

const getIncomesByDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id: userId } = req.user;
  try {
    const incomesByDate = await Income.aggregate([
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
    res.status(200).json(incomesByDate);
  } catch (error) {
    next(error);
  }
};

const getIncomesByMonth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id: userId } = req.user;
  const currentYear = new Date().getFullYear();
  try {
    const incomesByMonth = await Income.aggregate([
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
          totalIncomes: { $sum: "$amount" },
        },
      },
      {
        $sort: { "_id.month": 1 },
      },

      {
        $project: {
          _id: 0,
          month: "$_id.month",
          totalIncomes: 1,
        },
      },
    ]);
    res.status(200).json(incomesByMonth);
  } catch (error) {
    next(error);
  }
};

export {
  getIncomes,
  createIncome,
  editIncome,
  deleteIncome,
  getIncomesByDate,
  getIncomesByMonth,
};
