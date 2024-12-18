import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import incomeRoutes from "./routes/incomeRoutes";
import expensesRoutes from "./routes/expenseRoutes";
import userRoutes from "./routes/userRoutes";
import { errorHandler, notFound } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/expenses", expensesRoutes);
app.use("/api/users", userRoutes);
app.use("/api/incomes", incomeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "TrackXpense API is running" });
});

app.use(errorHandler);
app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
