import { UserPayLoad } from "../../utils/authUtils";
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user: UserPayload; //adding user property to Request
    }
  }
}

export {};
