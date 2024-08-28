import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import expensesRoutes from "./routes/expenseRoutes";
import userRoutes from "./routes/userRoutes";
import errorHandler from "./middleware/errorHandle";
dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/expenses", expensesRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  throw new Error("Test error");
  res.json({ message: "TrackXpense API is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
