import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import expensesRoutes from "./routes/expenseRoutes";
dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/expenses", expensesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "TrackXpense API is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
