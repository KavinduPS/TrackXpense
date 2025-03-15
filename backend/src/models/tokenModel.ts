import mongoose, { Schema } from "mongoose";

export interface IToken {
  user: mongoose.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const tokenSchema: Schema<IToken> = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});

export default mongoose.model<IToken>("Token", tokenSchema);
