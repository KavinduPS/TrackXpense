import { NextFunction, Request, Response } from "express";
import Goal, { IGoal } from "../models/goalModel";

//Get all goals - api/goals
const getGoals = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  try {
    const goals: IGoal[] = await Goal.find({
      user: _id,
    }).sort({ date: -1 });
    res.status(200).json(goals);
  } catch (error) {
    next(error);
  }
};

//Create a goal - api/goal
const createGoal = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { name, targetAmount, savedAmount, deadline } = req.body;
  if (!name || !targetAmount || !deadline) {
    res.status(400);
    throw new Error("Please enter required fields");
  }
  try {
    const newGoal = await Goal.create({
      user: _id,
      name: name,
      targetAmount: targetAmount,
      savedAmount: savedAmount,
      deadline: deadline,
    });
    res.status(201).json(newGoal);
  } catch (error) {
    next(error);
  }
};

//add savings - api/goals/:id
const addSavings = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { id } = req.params;
  const { amount } = req.body;
  try {
    const goal = await Goal.findById(id);
    if (!goal) {
      res.status(404);
      throw new Error("Goal not found");
    }
    if (goal.user.toString() !== _id.toString()) {
      res.status(403);
      throw new Error("Not authorized");
    }

    goal.savedAmount += amount;

    if (goal.savedAmount >= goal.targetAmount) {
      res.status(200).json({ message: "Goal achieved!" });
    }

    await goal.save();

    res.status(200).json(goal);
  } catch (error) {
    next(error);
  }
};

//Delete goal - api/goals/:id
const deleteGoal = async (req: Request, res: Response, next: NextFunction) => {
  const { _id } = req.user;
  const { id } = req.params;
  try {
    const goal = await Goal.findById(id);
    if (!goal) {
      res.status(404);
      throw new Error("Goal not found");
    }
    if (goal.user.toString() !== _id.toString()) {
      res.status(403);
      throw new Error("Not authorized");
    }
    const deletedGoal = await Goal.findByIdAndDelete(id);
    res.status(200).json(deletedGoal?._id);
  } catch (error) {
    next(error);
  }
};

export { getGoals, createGoal, addSavings, deleteGoal };
