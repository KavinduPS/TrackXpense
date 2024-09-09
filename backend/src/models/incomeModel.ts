import mongoose, { Schema } from "mongoose";

// Define the interface for Income
export interface IIncome {
  title: string;
  amount: number;
  date: Date;
  source: string; // income sourse(eg:job,Business...etc)
  description?: string; // Optional field
}

// Create the schema for Income
const incomeSchema: Schema = new Schema({
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
  source: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

// Export the Income model
export default mongoose.model("Income", incomeSchema);
