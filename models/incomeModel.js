import mongoose from "mongoose";

const Schema = mongoose.Schema;

const incomeSchema = new Schema(
  {
    appointment: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
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

incomeSchema.index({ date: 1 });
incomeSchema.index({ amount: 1 });

export const Income = mongoose.model("Income", incomeSchema);
