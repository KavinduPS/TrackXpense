import jwt from "jsonwebtoken";

export interface UserPayload {
  userId: string;
}

export const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT secret is not defined");
  }
  const payload: UserPayload = { userId };
  return jwt.sign(payload, secret, { expiresIn: "30d" });
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
