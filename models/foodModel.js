import mongoose from "mongoose";

const Schema = mongoose.Schema;

const foodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    unitAmount: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Food = mongoose.model("Food", foodSchema);
