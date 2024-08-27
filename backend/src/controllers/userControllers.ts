import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";

//Create user - api/users/register
const registerUser = (req: Request, res: Response) => {
  res.json({ message: "Register user" });
};

//Login user - api/users/login
const loginUser = (req: Request, res: Response) => {
  res.json({ message: "Login user" });
};

//Get user - api/users/profile
const getUser = (req: Request, res: Response) => {
  res.json({ message: "Get user" });
};

export { registerUser, loginUser, getUser };
