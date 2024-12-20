import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/authUtils";
import User from "../models/userModel";
import jwt from "jsonwebtoken";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = verifyToken(token);
      const user = await User.findById(decoded._id).select("-password");
      if (!user) {
        return res
          .status(401)
          .json({ message: "Access denied. User not found." });
      }
      req.user = {
        _id: user._id,
        email: user.email,
        name: user.name,
      };
      next();
    } catch (error) {
      res.status(403).json({ message: "Access denied. Invalid token." });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
};



export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ message: "Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};