import { UserPayLoad } from "../utils/authUtils";

declare global {
  namespace NodeJS {
    interface ProcessENV {
      NODE_ENV: "development" | "production" | "test";
      PORT?: string;
      MONGO_URI: string;
      APP_ORIGIN: string;
      JWT_SECRET: string;
    }
  }
}

export {};
