import { Request, Response, NextFunction } from "express";
import { verifyToken, UserPayload } from "../utils/authUtils";

export interface AuthRequest extends Request {
  user?: UserPayload;
}

export const protectRoute = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};
