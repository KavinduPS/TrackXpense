import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import expensesRoutes from "./routes/expenseRoutes";
import userRoutes from "./routes/userRoutes";
import errorHandler from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/expenses", expensesRoutes);
app.use("/api/users", userRoutes);

app.get("/", async (req, res, next) => {
  try {
    return res.json({ message: "TrackXpense API is running" });
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
