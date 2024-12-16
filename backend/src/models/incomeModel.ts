import mongoose, { Schema } from "mongoose";

export interface IIncome {
  user: mongoose.Types.ObjectId;
  name: string;
  amount: number;
  date: Date;
  source: string;
  reference?: string;
}

const incomeSchema: Schema = new Schema({
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
  source: {
    type: String,
    required: true,
  },
  reference: {
    type: String,
  },
});

export default mongoose.model<IIncome>("Income", incomeSchema);
