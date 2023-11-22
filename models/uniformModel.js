import mongoose from "mongoose";

const Schema = mongoose.Schema;

const uniformSchema = new Schema({
  childName: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  outPrice: {
    type: Number,
    required: true,
  },
  inPrice: {
    type: Number,
    required: true,
  },
  childPrice: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

export const Uniform = mongoose.model("Uniform", uniformSchema);
