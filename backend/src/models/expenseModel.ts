import mongoose, { Schema } from "mongoose";

export interface IExpense {
  title: string;
  amount: number;
  date: Date;
  category: string;
  description: string;
}

const expenseSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

export default mongoose.model("Expense", expenseSchema);
