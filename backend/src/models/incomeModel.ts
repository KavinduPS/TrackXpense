import mongoose, { Schema } from "mongoose";


export interface IIncome {
  title: string;
  amount: number;
  date: Date;
  source: string; 
  description?: string; // Optional
}


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


export default mongoose.model("Income", incomeSchema);
