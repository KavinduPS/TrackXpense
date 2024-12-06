import { Response } from "express";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

export interface UserPayload {
  _id: ObjectId;
  name: string;
  email: string;
}

export const generateToken = (res: Response, _id: string): void => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT secret is not defined");
  }
  const token = jwt.sign({ _id }, secret, { expiresIn: "30d" });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export const verifyToken = (token: string): UserPayload => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT secret is not defined");
  }
  try {
    return jwt.verify(token, secret) as UserPayload;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
