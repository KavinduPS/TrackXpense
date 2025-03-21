import mongoose, { Schema } from "mongoose";

export interface IExpense {
  user: mongoose.Types.ObjectId;
  name: string;
  amount: number;
  date: Date;
  category: string;
  reference?: string;
}

const expenseSchema: Schema<IExpense> = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
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
  reference: {
    type: String,
  },
});

export default mongoose.model<IExpense>("Expense", expenseSchema);
