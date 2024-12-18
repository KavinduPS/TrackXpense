import { UserPayLoad } from "../utils/authUtils";

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload; //adding user property to Request
    }
  }
}

export {};
