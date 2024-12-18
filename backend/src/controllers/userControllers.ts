import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import User, { IUser } from "../models/userModel";
import { generateToken } from "../utils/authUtils";
import bcrypt from "bcrypt";

//Create user - api/users/register
const registerUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter required fields");
  }
  try {
    //find user
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      generateToken(res, user.id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    }
  } catch (error) {
    next(error);
  }
};

//Login user - api/users/login
const loginUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      generateToken(res, user.id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
};

//Get user - api/users/profile
const getUser = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Error fetching user profile");
  }
};

const logoutUser = async (req: AuthRequest, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "Logout user",
  });
};

export { registerUser, loginUser, getUser, logoutUser };
