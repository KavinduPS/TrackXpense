import mongoose, { Schema } from "mongoose";

export interface IGoal {
  user: mongoose.Types.ObjectId;
  name: string;
  targetAmount: number;
  savedAmount: number;
  deadline: Date;
}

const goalSchema: Schema<IGoal> = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  savedAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  deadline: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IGoal>("Goal", goalSchema);
