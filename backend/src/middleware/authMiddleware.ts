import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/authUtils";
import User from "../models/userModel";

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
