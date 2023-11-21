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
    date: {
      type: Date,
      required: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

foodSchema.index({ branch: 1 });

export const Food = mongoose.model("Food", foodSchema);
