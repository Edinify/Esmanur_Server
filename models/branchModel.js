import mongoose from "mongoose";

const Schema = mongoose.Schema;

const branchSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Branch = mongoose.model("Branch", branchSchema);
